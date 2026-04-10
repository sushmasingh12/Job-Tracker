import React from 'react';
import { useSettings } from '../hooks/useSettings';
const AISettings = () => {
  const { settings, updateAISettings } = useSettings();
  const { ai } = settings;

  const optimizationModes = [
    { id: 'keywords', label: 'Keyword Focus', desc: 'Prioritizes ATS keyword matching' },
    { id: 'content', label: 'Content Depth', desc: 'Focuses on semantic meaning and flow' },
    { id: 'balanced', label: 'Balanced', desc: 'Best of both worlds for ATS and Humans' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-text dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-microchip w-5 h-5 text-primary flex items-center justify-center"></i>
            AI & ATS Optimization
          </h3>
          <p className="text-sm text-neutral-muted">Configure how AI assists your application process</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={ai.enableSuggestions}
            onChange={() => updateAISettings({ enableSuggestions: !ai.enableSuggestions })}
          />
          <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      <div className={`space-y-6 transition-opacity duration-300 ${ai.enableSuggestions ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        {/* Optimization Mode */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles w-4 h-4 text-primary flex items-center justify-center"></i>
            Optimization Mode
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {optimizationModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => updateAISettings({ optimizationMode: mode.id })}
                className={`p-4 rounded-xl border transition-all text-left group ${ai.optimizationMode === mode.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-neutral-border dark:border-neutral-700 hover:border-primary/40'
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${ai.optimizationMode === mode.id ? 'text-primary' : 'text-neutral-text dark:text-white'}`}>{mode.label}</span>
                  {ai.optimizationMode === mode.id && <i className="fa-solid fa-circle-check w-4 h-4 text-primary flex items-center justify-center"></i>}
                </div>
                <p className="text-[10px] text-neutral-muted leading-tight">{mode.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-6 border-t border-neutral-border dark:border-neutral-700 space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-background-light dark:bg-neutral-900/40 rounded-2xl border border-neutral-border dark:border-neutral-700">
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-xl shadow-sm flex items-center justify-center w-10 h-10">
                <i className="fa-solid fa-floppy-disk text-primary text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-text dark:text-white">Auto-save Optimized Resumes</p>
                <p className="text-xs text-neutral-muted">Automatically save changes to application history</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={ai.autoSaveOptimized}
                onChange={() => updateAISettings({ autoSaveOptimized: !ai.autoSaveOptimized })}
              />
              <div className="w-9 h-5 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-background-light dark:bg-neutral-900/40 rounded-2xl border border-neutral-border dark:border-neutral-700">
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-neutral-800 p-2.5 rounded-xl shadow-sm flex items-center justify-center w-10 h-10">
                <i className="fa-solid fa-clock-rotate-left text-primary text-xl"></i>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-text dark:text-white">Save Optimization History</p>
                <p className="text-xs text-neutral-muted">Keep a log of all AI-driven resume changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={ai.saveHistory}
                onChange={() => updateAISettings({ saveHistory: !ai.saveHistory })}
              />
              <div className="w-9 h-5 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
