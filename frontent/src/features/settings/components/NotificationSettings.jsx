import React from 'react';
import { useSettings } from '../hooks/useSettings';


const NotificationSettings = () => {
  const { settings, updateNotifications } = useSettings();
  const { notifications } = settings;

  const handleToggle = (key) => {
    updateNotifications({ [key]: !notifications[key] });
  };

  const options = [
    { key: 'email', label: 'Email Notifications', desc: 'Get weekly summaries and direct updates', icon: 'fa-solid fa-envelope' },
    { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Alerts before your scheduled interviews', icon: 'fa-solid fa-calendar-days' },
    { key: 'followUpReminders', label: 'Follow-up Reminders', desc: 'Never forget to follow up after an application', icon: 'fa-solid fa-clock' },
    { key: 'deadlineAlerts', label: 'Deadline Alerts', desc: 'Notifications for closing application dates', icon: 'fa-solid fa-bell' },
    { key: 'inApp', label: 'In-App Notifications', desc: 'Desktop alerts while you use the app', icon: 'fa-solid fa-message' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Notification Settings</h3>
        <p className="text-sm text-neutral-muted">Choose how and when you want to be notified</p>
      </div>

      <div className="space-y-4">
        {options.map((option) => {
          return (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 hover:bg-neutral-background-light dark:hover:bg-neutral-700/30 rounded-2xl border border-neutral-border dark:border-neutral-700 transition-all cursor-pointer group"
              onClick={() => handleToggle(option.key)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl transition-colors flex items-center justify-center w-10 h-10 ${notifications[option.key] ? 'bg-primary/10 text-primary' : 'bg-neutral-background-light dark:bg-neutral-700 text-neutral-muted'}`}>
                  <i className={`${option.icon} text-lg`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-text dark:text-white group-hover:text-primary transition-colors">{option.label}</p>
                  <p className="text-xs text-neutral-muted">{option.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer px-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications[option.key]}
                  onChange={() => handleToggle(option.key)}
                />
                <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationSettings;
