import { useState, useEffect, useRef } from 'react';
import { useSettings } from '../hooks/useSettings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../../auth/store/authSlice';
import { logout as logoutService } from '../../auth/services/authService';
import { updateSettingsThunk } from '../store/settingsSlice';

// ── Password strength calculator ──────────────────────────────────────────────
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Very Weak', color: 'bg-red-500', text: 'text-red-500' };
  if (score === 2) return { score, label: 'Weak', color: 'bg-orange-400', text: 'text-orange-400' };
  if (score === 3) return { score, label: 'Fair', color: 'bg-amber-400', text: 'text-amber-400' };
  if (score === 4) return { score, label: 'Strong', color: 'bg-emerald-400', text: 'text-emerald-400' };
  return { score, label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
};



// ── Email Change Section ──────────────────────────────────────────────────────
const EmailChangeSection = () => {
  const { settings, directChangeEmail, resetEmailChange } = useSettings();
  const { emailChange, profile } = settings;

  const [newEmail, setNewEmail] = useState('');

  const handleUpdateEmail = () => {
    const emailLower = newEmail.trim().toLowerCase();
    if (!emailLower || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLower)) return;
    if (emailLower === (profile.email || '').toLowerCase()) return;
    directChangeEmail(emailLower);
  };

  const handleReset = () => {
    setNewEmail('');
    resetEmailChange();
  };

  const step = emailChange.step;

  return (
    <div className="space-y-4 p-5 rounded-2xl border border-neutral-border dark:border-slate-700 bg-neutral-background-light dark:bg-slate-800/40">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-envelope text-primary" />
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white">Email Settings</h4>
      </div>

      <p className="text-xs text-neutral-muted">
        Current Address: <span className="font-medium text-neutral-text dark:text-slate-300">{profile.email || '—'}</span>
      </p>

      {/* ── Step: success ── */}
      {step === 'success' && (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl">
          <span className="material-symbols-outlined text-emerald-500">check_circle</span>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Email updated successfully!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500">Your new address: {emailChange.pendingEmail}</p>
          </div>
          <button onClick={handleReset} className="ml-auto text-xs text-emerald-600 hover:underline">Update again</button>
        </div>
      )}

      {/* ── Form: idle or error ── */}
      {step !== 'success' && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="inpttext flex-1 focus:border-primary focus:ring-2 focus:ring-primary/20"
              onKeyDown={(e) => e.key === 'Enter' && handleUpdateEmail()}
              disabled={step === 'verifying'} // reusing 'verifying' as 'loading'
            />
            <button
              onClick={handleUpdateEmail}
              disabled={!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) || step === 'verifying'}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center justify-center gap-2"
            >
              {step === 'verifying' && (
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              )}
              Update Email
            </button>
          </div>
          
          {emailChange.error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <i className="fa-solid fa-circle-exclamation" /> {emailChange.error}
            </p>
          )}

          <p className="text-[10px] text-neutral-muted italic">
            Note: Updating your email will require you to use the new address for future logins.
          </p>
        </div>
      )}
    </div>
  );
};

// ── Password Change Section ───────────────────────────────────────────────────
const PasswordChangeSection = () => {
  const { changePassword, resetPasswordChange, settings } = useSettings();
  const { passwordChange } = settings;

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const strength = getPasswordStrength(form.newPassword);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleShow = (key) => setShowPasswords((p) => ({ ...p, [key]: !p[key] }));

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword || form.newPassword !== form.confirmPassword) return;
    await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
  };

  useEffect(() => {
    if (passwordChange.success) {
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      const t = setTimeout(resetPasswordChange, 3000);
      return () => clearTimeout(t);
    }
  }, [passwordChange.success]);



  return (
    <div className="space-y-4">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-text dark:text-white">
        <i className="fa-solid fa-key text-primary" />
        Change Password
      </h4>

      {passwordChange.success && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl">
          <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Password updated successfully!</p>
        </div>
      )}

      {passwordChange.error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <i className="fa-solid fa-circle-exclamation text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">{passwordChange.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Current Password</label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="inpttext w-full pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => toggleShow('current')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-muted hover:text-neutral-text transition-colors"
            >
              <i className={`fa-solid ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
            </button>
          </div>
        </div>

        <div className="hidden md:block" />

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">New Password</label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="inpttext w-full pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => toggleShow('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-muted hover:text-neutral-text transition-colors"
            >
              <i className={`fa-solid ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
            </button>
          </div>
          {form.newPassword && (
            <div className="space-y-1 mt-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-neutral-border dark:bg-slate-700'}`}
                  />
                ))}
              </div>
              <p className={`text-[10px] font-semibold ${strength.text}`}>{strength.label}</p>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
              className="inpttext w-full pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => toggleShow('confirm')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-muted hover:text-neutral-text transition-colors"
            >
              <i className={`fa-solid ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
            </button>
          </div>
          {form.confirmPassword && form.newPassword !== form.confirmPassword && (
            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-circle-exclamation" /> Passwords don't match
            </p>
          )}
        </div>
      </div>

      <div className="pt-1">
        <ul className="text-[11px] text-neutral-muted space-y-1 mb-4">
          {[
            ['At least 8 characters', form.newPassword.length >= 8],
            ['At least one uppercase letter', /[A-Z]/.test(form.newPassword)],
            ['At least one number', /[0-9]/.test(form.newPassword)],
            ['At least one special character', /[^A-Za-z0-9]/.test(form.newPassword)],
          ].map(([rule, met]) => (
            <li key={rule} className={`flex items-center gap-1.5 ${met ? 'text-emerald-500' : ''}`}>
              <i className={`fa-solid ${met ? 'fa-check text-emerald-500' : 'fa-circle text-[6px] text-neutral-border'}`} />
              {rule}
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          disabled={
            !form.currentPassword ||
            !form.newPassword ||
            form.newPassword !== form.confirmPassword ||
            strength.score < 2 ||
            passwordChange.loading
          }
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-lg shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {passwordChange.loading && (
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
          )}
          Update Password
        </button>
      </div>
    </div>
  );
};

// ── Two-Factor Auth Toggle ────────────────────────────────────────────────────
const TwoFactorSection = () => {
  const { settings, updateAccount } = useSettings();
  const dispatch = useDispatch();
  const { twoFactorEnabled } = settings.account;

  const handleToggle = async () => {
    const newVal = !twoFactorEnabled;
    // 1. Update local state for immediate feedback
    updateAccount({ twoFactorEnabled: newVal });
    
    // 2. Persist to backend immediately
    // We construct the full payload to ensure accuracy
    const updatedSettings = {
      ...settings,
      account: {
        ...settings.account,
        twoFactorEnabled: newVal
      }
    };
    dispatch(updateSettingsThunk(updatedSettings));
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-neutral-border dark:border-slate-700 bg-neutral-background-light dark:bg-slate-800/40">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl flex items-center justify-center w-10 h-10 ${twoFactorEnabled ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-neutral-border dark:bg-slate-700'}`}>
          <i className={`fa-solid fa-mobile-screen-button text-lg ${twoFactorEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-muted'}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-text dark:text-white">Two-Factor Authentication</p>
          <p className="text-xs text-neutral-muted">Add an extra layer of security to your account</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={twoFactorEnabled}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
      </label>
    </div>
  );
};

// ── Danger Zone ───────────────────────────────────────────────────────────────
const DangerZone = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const { deleteAccount, settings } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmText !== 'DELETE' || !password) return;
    const res = await deleteAccount(password);
    if (res?.meta?.requestStatus === 'fulfilled') {
      dispatch(logoutAction());
      navigate('/');
    }
  };

  return (
    <div className="pt-8 border-t border-danger/20">
      <h4 className="text-sm font-bold text-danger mb-4 flex items-center gap-2">
        <i className="fa-solid fa-triangle-exclamation" /> Danger Zone
      </h4>

      <div className="p-4 bg-danger/5 rounded-xl border border-danger/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-text dark:text-white">Delete Account</p>
            <p className="text-xs text-neutral-muted max-w-md mt-0.5">
              Permanently delete your account and all data — applications, resumes, cover letters. This cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-danger text-white hover:bg-danger/90 rounded-xl px-5 py-2.5 text-xs font-bold shrink-0 transition-colors"
          >
            Delete Account
          </button>
        </div>

        {showConfirm && (
          <div className="mt-4 pt-4 border-t border-danger/20 space-y-3">
            <p className="text-xs font-semibold text-danger">
              Type <span className="font-mono bg-danger/10 px-1.5 py-0.5 rounded">DELETE</span> to confirm, then enter your password.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "DELETE"'
              className="inpttext w-full border-danger/30 focus:border-danger focus:ring-danger/20"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="inpttext w-full border-danger/30 focus:border-danger focus:ring-danger/20"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowConfirm(false); setConfirmText(''); setPassword(''); }}
                className="px-4 py-2 text-xs font-medium border border-neutral-border rounded-lg text-neutral-muted hover:text-neutral-text transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== 'DELETE' || !password}
                className="px-4 py-2 text-xs font-bold bg-danger text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
const AccountSettings = () => {
  const { settings } = useSettings();
  const { emailVerified } = settings.account;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Account Security</h3>
        <p className="text-sm text-neutral-muted">Manage your credentials and login safety</p>
      </div>

      {/* Verification badge */}
      <div className={`flex items-center justify-between p-4 rounded-xl border ${emailVerified ? 'bg-primary/5 border-primary/20' : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg w-9 h-9 flex items-center justify-center ${emailVerified ? 'bg-primary/10' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
            <i className={`fa-solid ${emailVerified ? 'fa-envelope-circle-check text-primary' : 'fa-envelope text-amber-500'} text-lg`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-text dark:text-white">Email Verification</p>
            <p className="text-xs text-neutral-muted">{emailVerified ? 'Your email is verified and secure' : 'Verify your email to unlock all features'}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${emailVerified ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
          {emailVerified ? 'Verified' : 'Unverified'}
        </span>
      </div>

      {/* Email change */}
      <EmailChangeSection />

      {/* Password change */}
      <div className="space-y-4 pt-2 border-t border-neutral-border dark:border-slate-700">
        <PasswordChangeSection />
      </div>

      {/* 2FA */}
      <div className="space-y-3 pt-2 border-t border-neutral-border dark:border-slate-700">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white">Login Security</h4>
        <TwoFactorSection />
      </div>

      {/* Danger zone */}
      <DangerZone />
    </div>
  );
};

export default AccountSettings;