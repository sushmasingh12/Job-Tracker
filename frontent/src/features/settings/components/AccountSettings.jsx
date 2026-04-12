import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../hooks/useSettings';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../../auth/store/authSlice';
import { logout as logoutService } from '../../auth/services/authService';

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

// ── OTP Input (6 boxes) ───────────────────────────────────────────────────────
const OtpInput = ({ value, onChange, disabled }) => {
  const inputs = useRef([]);
  const digits = value.split('');

  const handleKey = (i, e) => {
    if (e.key === 'Backspace') {
      const next = [...digits];
      if (next[i]) {
        next[i] = '';
        onChange(next.join(''));
      } else if (i > 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  const handleChange = (i, e) => {
    const char = e.target.value.replace(/\D/, '').slice(-1);
    const next = [...digits];
    next[i] = char;
    onChange(next.join(''));
    if (char && i < 5) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted.padEnd(6, '').slice(0, 6));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          disabled={disabled}
          className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-slate-800 text-neutral-text dark:text-white disabled:opacity-50"
        />
      ))}
    </div>
  );
};

// ── Email Change Section ──────────────────────────────────────────────────────
const EmailChangeSection = () => {
  const { settings, sendEmailOtp, verifyEmailOtp, resetEmailChange } = useSettings();
  const { emailChange, profile } = settings;

  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (emailChange.otpSentAt) {
      const elapsed = Math.floor((Date.now() - new Date(emailChange.otpSentAt)) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setCountdown(remaining);
      if (remaining > 0) {
        const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
        return () => clearInterval(t);
      }
    }
  }, [emailChange.otpSentAt]);

  const handleSendOtp = () => {
    if (!newEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) return;
    sendEmailOtp(newEmail.trim());
  };

  const handleVerify = () => {
    if (otp.length !== 6) return;
    verifyEmailOtp(emailChange.pendingEmail, otp);
  };

  const handleReset = () => {
    setNewEmail('');
    setOtp('');
    resetEmailChange();
  };

  const step = emailChange.step;

  return (
    <div className="space-y-4 p-5 rounded-2xl border border-neutral-border dark:border-slate-700 bg-neutral-background-light dark:bg-slate-800/40">
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-envelope text-primary" />
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white">Change Email Address</h4>
      </div>

      <p className="text-xs text-neutral-muted">
        Current: <span className="font-medium text-neutral-text dark:text-slate-300">{profile.email || '—'}</span>
      </p>

      {/* ── Step: success ── */}
      {step === 'success' && (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl">
          <span className="material-symbols-outlined text-emerald-500">check_circle</span>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Email updated successfully!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500">Your new email: {emailChange.pendingEmail}</p>
          </div>
          <button onClick={handleReset} className="ml-auto text-xs text-emerald-600 hover:underline">Change again</button>
        </div>
      )}

      {/* ── Step: idle — enter new email ── */}
      {(step === 'idle' || step === 'error') && step !== 'success' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email address"
              className="inpttext flex-1 focus:border-primary focus:ring-2 focus:ring-primary/20"
              onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
            />
            <button
              onClick={handleSendOtp}
              disabled={!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              Send OTP
            </button>
          </div>
          {step === 'error' && emailChange.error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <i className="fa-solid fa-circle-exclamation" /> {emailChange.error}
            </p>
          )}
        </div>
      )}

      {/* ── Step: pending_otp — enter OTP ── */}
      {(step === 'pending_otp' || step === 'verifying') && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              We sent a 6-digit OTP to <span className="font-bold">{emailChange.pendingEmail}</span>
            </p>
            <p className="text-[10px] text-blue-500 dark:text-blue-500 mt-0.5">Check your inbox (and spam folder)</p>
          </div>

          <OtpInput value={otp} onChange={setOtp} disabled={step === 'verifying'} />

          {emailChange.error && (
            <p className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
              <i className="fa-solid fa-circle-exclamation" /> {emailChange.error}
            </p>
          )}

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleReset}
              className="text-xs text-neutral-muted hover:text-neutral-text transition-colors"
            >
              ← Change email
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSendOtp}
                disabled={countdown > 0 || step === 'verifying'}
                className="text-xs text-primary hover:underline disabled:text-neutral-muted disabled:no-underline disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>

              <button
                onClick={handleVerify}
                disabled={otp.length !== 6 || step === 'verifying'}
                className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {step === 'verifying' && (
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                )}
                Verify & Update
              </button>
            </div>
          </div>
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

  const PasswordInput = ({ name, placeholder, showKey }) => (
    <div className="relative">
      <input
        type={showPasswords[showKey] ? 'text' : 'password'}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="inpttext w-full pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="button"
        onClick={() => toggleShow(showKey)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-muted hover:text-neutral-text transition-colors"
      >
        <i className={`fa-solid ${showPasswords[showKey] ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
      </button>
    </div>
  );

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
          <PasswordInput name="currentPassword" placeholder="Enter current password" showKey="current" />
        </div>

        <div className="hidden md:block" />

        <div className="space-y-1.5">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">New Password</label>
          <PasswordInput name="newPassword" placeholder="At least 8 characters" showKey="new" />
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
          <PasswordInput name="confirmPassword" placeholder="Repeat new password" showKey="confirm" />
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
  const { twoFactorEnabled } = settings.account;

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
          onChange={() => updateAccount({ twoFactorEnabled: !twoFactorEnabled })}
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