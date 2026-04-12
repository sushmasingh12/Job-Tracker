import React from 'react';
import { useSettings } from '../hooks/useSettings';

const NOTIFICATION_GROUPS = [
  {
    title: 'Job Applications',
    icon: 'fa-solid fa-briefcase',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    options: [
      { key: 'applicationStatusChange', label: 'Status Changes', desc: 'When an application moves to Interview, Offer, or Rejected' },
      { key: 'followUpReminders', label: 'Follow-up Reminders', desc: 'Remind you to follow up after submitting applications' },
      { key: 'deadlineAlerts', label: 'Application Deadlines', desc: 'Alerts for closing dates on saved job posts' },
    ],
  },
  {
    title: 'Interviews & Events',
    icon: 'fa-solid fa-calendar-check',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    options: [
      { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Alerts 24h and 1h before scheduled interviews' },
    ],
  },
  {
    title: 'AI & Insights',
    icon: 'fa-solid fa-sparkles',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    options: [
      { key: 'aiInsights', label: 'AI Resume Insights', desc: 'Suggestions to improve your resume for tracked roles' },
      { key: 'marketTrends', label: 'Market Trends', desc: 'Weekly digest on in-demand skills and salary trends for your roles' },
    ],
  },
  {
    title: 'Communications',
    icon: 'fa-solid fa-envelope',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    options: [
      { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
      { key: 'inApp', label: 'In-App Notifications', desc: 'Desktop alerts while you use the app' },
      { key: 'weeklyDigest', label: 'Weekly Summary', desc: 'A digest of your application progress every Monday' },
    ],
  },
];

const FREQUENCIES = [
  { value: 'immediate', label: 'Immediately', desc: 'As soon as it happens' },
  { value: 'daily', label: 'Daily Digest', desc: 'Bundled once per day' },
  { value: 'weekly', label: 'Weekly', desc: 'Bundled once per week' },
];

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0" onClick={(e) => e.stopPropagation()}>
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
  </label>
);

const NotificationSettings = () => {
  const { settings, updateNotifications, saveSettings } = useSettings();
  const { notifications } = settings;

  const handleToggle = (key) => updateNotifications({ [key]: !notifications[key] });

  const allEnabled = NOTIFICATION_GROUPS.flatMap((g) => g.options).every((o) => notifications[o.key]);
  const toggleAll = () => {
    const update = {};
    NOTIFICATION_GROUPS.flatMap((g) => g.options).forEach((o) => {
      update[o.key] = !allEnabled;
    });
    updateNotifications(update);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Notification Settings</h3>
          <p className="text-sm text-neutral-muted">Choose how and when you want to be notified</p>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs font-semibold text-primary hover:underline shrink-0 mt-1"
        >
          {allEnabled ? 'Disable All' : 'Enable All'}
        </button>
      </div>

      {/* ── Notification groups ── */}
      {NOTIFICATION_GROUPS.map((group) => (
        <div key={group.title} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${group.bg}`}>
              <i className={`${group.icon} ${group.color} text-sm`} />
            </div>
            <h4 className="text-sm font-semibold text-neutral-text dark:text-white">{group.title}</h4>
          </div>

          <div className="space-y-2 pl-1">
            {group.options.map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-border dark:border-slate-700 hover:bg-neutral-background-light dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
                onClick={() => handleToggle(option.key)}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className={`text-sm font-semibold transition-colors group-hover:text-primary ${notifications[option.key] ? 'text-neutral-text dark:text-white' : 'text-neutral-muted'}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-neutral-muted mt-0.5 truncate">{option.desc}</p>
                </div>
                <Toggle
                  checked={!!notifications[option.key]}
                  onChange={() => handleToggle(option.key)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Reminder frequency ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-3">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-clock text-primary" /> Reminder Frequency
        </h4>
        <p className="text-xs text-neutral-muted">How often should we bundle and send your reminders?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FREQUENCIES.map((freq) => (
            <button
              key={freq.value}
              onClick={() => updateNotifications({ reminderFrequency: freq.value })}
              className={`p-3 rounded-xl border text-left transition-all ${notifications.reminderFrequency === freq.value ? 'border-primary bg-primary/10' : 'border-neutral-border dark:border-slate-700 hover:border-primary/40'}`}
            >
              <p className={`text-sm font-semibold ${notifications.reminderFrequency === freq.value ? 'text-primary' : 'text-neutral-text dark:text-white'}`}>
                {freq.label}
              </p>
              <p className="text-xs text-neutral-muted mt-0.5">{freq.desc}</p>
            </button>
          ))}
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
          {settings.loading ? 'Saving…' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;