import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0" onClick={(e) => e.stopPropagation()}>
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
  </label>
);

const PRIVACY_OPTIONS = [
  {
    key: 'publicProfile',
    label: 'Public Profile',
    desc: 'Let recruiters discover your profile and open-to-work status',
    icon: 'fa-solid fa-user-tie',
    color: 'text-blue-500',
  },
  {
    key: 'allowRecruiterContact',
    label: 'Allow Recruiter Contact',
    desc: 'Let verified recruiters send you job opportunities via in-app messaging',
    icon: 'fa-solid fa-handshake',
    color: 'text-emerald-500',
  },
  {
    key: 'showSalaryExpectation',
    label: 'Show Salary Expectation',
    desc: 'Display your expected salary on your public profile',
    icon: 'fa-solid fa-indian-rupee-sign',
    color: 'text-amber-500',
  },
  {
    key: 'shareData',
    label: 'Anonymized Data Sharing',
    desc: 'Share non-identifiable data to help improve AI models and salary insights',
    icon: 'fa-solid fa-chart-simple',
    color: 'text-violet-500',
  },
  {
    key: 'trackHistory',
    label: 'Track Search History',
    desc: 'Remember previous searches and keywords for better AI recommendations',
    icon: 'fa-solid fa-clock-rotate-left',
    color: 'text-slate-500',
  },
];

const DATA_RETENTION_OPTIONS = [
  { value: 6, label: '6 months' },
  { value: 12, label: '1 year' },
  { value: 24, label: '2 years' },
  { value: 0, label: 'Forever' },
];

const PrivacySettings = () => {
  const { settings, updatePrivacy, saveSettings } = useSettings();
  const { privacy } = settings;
  const [clearConfirm, setClearConfirm] = useState(false);
  const [clearDone, setClearDone] = useState(false);

  const handleToggle = (key) => updatePrivacy({ [key]: !privacy[key] });

  const handleClearHistory = () => {
    // In a real app dispatch a thunk here
    setClearConfirm(false);
    setClearDone(true);
    setTimeout(() => setClearDone(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-emerald-500" />
          Privacy & Data Management
        </h3>
        <p className="text-sm text-neutral-muted">Control your personal data, visibility, and storage</p>
      </div>

      {/* ── Privacy controls ── */}
      <div className="space-y-3">
        {PRIVACY_OPTIONS.map((opt) => (
          <div
            key={opt.key}
            className="flex items-center justify-between p-4 rounded-2xl border border-neutral-border dark:border-slate-700 hover:bg-neutral-background-light dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
            onClick={() => handleToggle(opt.key)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${privacy[opt.key] ? 'bg-primary/10' : 'bg-neutral-border dark:bg-slate-700'}`}>
                <i className={`${opt.icon} ${privacy[opt.key] ? opt.color : 'text-neutral-muted'} text-base`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-text dark:text-white group-hover:text-primary transition-colors">
                  {opt.label}
                </p>
                <p className="text-xs text-neutral-muted truncate">{opt.desc}</p>
              </div>
            </div>
            <Toggle checked={!!privacy[opt.key]} onChange={() => handleToggle(opt.key)} />
          </div>
        ))}
      </div>

      {/* ── Data retention ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-3">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-database text-primary" /> Data Retention
        </h4>
        <p className="text-xs text-neutral-muted">Choose how long we keep your application history and AI optimization records.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DATA_RETENTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updatePrivacy({ dataRetentionMonths: opt.value })}
              className={`p-3 rounded-xl border text-center text-sm font-semibold transition-all ${privacy.dataRetentionMonths === opt.value ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-border dark:border-slate-700 text-neutral-muted hover:border-primary/40'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Export data ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-file-export text-primary" /> Export Your Data
        </h4>
        <p className="text-xs text-neutral-muted">Download all your applications, resumes, and activity history.</p>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: 'fa-solid fa-file-code', label: 'Export as JSON', variant: 'outline' },
            { icon: 'fa-solid fa-file-csv', label: 'Export as CSV', variant: 'outline' },
            { icon: 'fa-solid fa-download', label: 'Download All Resumes', variant: 'primary' },
          ].map(({ icon, label, variant }) => (
            <button
              key={label}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${variant === 'primary' ? 'bg-primary hover:bg-primary-dark text-white border-primary shadow-md shadow-primary/20' : 'border-neutral-border dark:border-slate-700 text-neutral-text dark:text-white hover:border-primary hover:text-primary'}`}
            >
              <i className={`${icon} text-sm`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Clear history ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700">
        {clearDone && (
          <div className="mb-3 flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-xl">
            <span className="material-symbols-outlined text-emerald-500">check_circle</span>
            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Application history cleared.</p>
          </div>
        )}

        <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg w-9 h-9 flex items-center justify-center">
              <i className="fa-solid fa-clock-rotate-left text-orange-600 dark:text-orange-500 text-base" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-text dark:text-white">Clear Application History</p>
              <p className="text-xs text-neutral-muted">Remove activity logs. Resumes and saved applications will be kept.</p>
            </div>
          </div>
          {!clearConfirm ? (
            <button
              onClick={() => setClearConfirm(true)}
              className="px-4 py-2 text-xs font-semibold border border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors shrink-0"
            >
              Clear History
            </button>
          ) : (
            <div className="flex gap-2 items-center shrink-0">
              <p className="text-xs text-orange-600 font-medium">Are you sure?</p>
              <button onClick={() => setClearConfirm(false)} className="px-3 py-1.5 text-xs border border-neutral-border rounded-lg text-neutral-muted">Cancel</button>
              <button onClick={handleClearHistory} className="px-3 py-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">Confirm</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Save ── */}
      <div className="flex justify-end pt-2">
        <button
          onClick={saveSettings}
          disabled={settings.loading}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-60"
        >
          {settings.loading && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
          {settings.loading ? 'Saving…' : 'Save Privacy Settings'}
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;