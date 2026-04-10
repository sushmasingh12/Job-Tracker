import React from 'react';
import { useSettings } from '../hooks/useSettings';


const AppearanceSettings = () => {
  const { settings, updateAppearance } = useSettings();
  const { appearance } = settings;

  const themes = [
    { id: 'light', label: 'Light', icon: 'fa-solid fa-sun' },
    { id: 'dark', label: 'Dark', icon: 'fa-solid fa-moon' },
    { id: 'system', label: 'System', icon: 'fa-solid fa-display' },
  ];

  const densities = [
    { id: 'compact', label: 'Compact' },
    { id: 'comfortable', label: 'Comfortable' },
    { id: 'spacious', label: 'Spacious' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Appearance & Layout</h3>
        <p className="text-sm text-neutral-muted">Customize how the dashboard looks and feels</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-table-columns w-4 h-4 text-primary flex items-center justify-center"></i>
          Theme Preference
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => {
            return (
              <button
                key={theme.id}
                onClick={() => updateAppearance({ theme: theme.id })}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${appearance.theme === theme.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-neutral-border dark:border-neutral-700 hover:border-primary/40'
                  }`}
              >
                <div className={`p-2 rounded-lg flex items-center justify-center w-9 h-9 ${appearance.theme === theme.id ? 'bg-primary text-white' : 'bg-neutral-background-light dark:bg-neutral-700 text-neutral-muted'}`}>
                  <i className={`${theme.icon} text-lg`} />
                </div>
                <span className="text-sm font-semibold text-neutral-text dark:text-white">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Density Selection */}
      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700 space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-expand w-4 h-4 text-primary flex items-center justify-center"></i>
          Layout Density
        </h4>
        <div className="flex bg-neutral-background-light dark:bg-neutral-900/60 p-1 rounded-xl w-fit border border-neutral-border dark:border-neutral-700">
          {densities.map((item) => (
            <button
              key={item.id}
              onClick={() => updateAppearance({ density: item.id })}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${appearance.density === item.id
                  ? 'bg-white dark:bg-neutral-800 text-primary shadow-sm'
                  : 'text-neutral-muted hover:text-neutral-text'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700 space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-font w-4 h-4 text-primary flex items-center justify-center"></i>
          Interface Font Size
        </h4>
        <div className="max-w-md space-y-4">
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={appearance.fontSize === 'sm' ? 0 : appearance.fontSize === 'md' ? 1 : 2}
            onChange={(e) => {
              const val = ['sm', 'md', 'lg'][e.target.value];
              updateAppearance({ fontSize: val });
            }}
            className="w-full h-2 bg-neutral-border dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-muted">
            <span>Small</span>
            <span>Default</span>
            <span>Large</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
