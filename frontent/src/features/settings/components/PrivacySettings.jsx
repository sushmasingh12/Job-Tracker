import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Button } from '../../../shared/components/ui/Button';

const PrivacySettings = () => {
  const { settings, updatePrivacy } = useSettings();
  const { privacy } = settings;

  const handleToggle = (key) => {
    updatePrivacy({ [key]: !privacy[key] });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-shield-halved w-5 h-5 text-green-500 flex items-center justify-center"></i>
          Privacy & Data Management
        </h3>
        <p className="text-sm text-neutral-muted">Control your personal data and document storage</p>
      </div>

      {/* Data Export */}
      <div className="p-6 bg-neutral-background-light dark:bg-neutral-900/40 rounded-2xl border border-neutral-border dark:border-neutral-700 space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white">Export Your Data</h4>
        <p className="text-xs text-neutral-muted">Download a copy of all your applications, resumes, and optimization history. This process may take a few minutes.</p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button variant="outline" className="text-xs gap-2">
            <i className="fa-solid fa-file-code w-4 h-4 flex items-center justify-center"></i>
            Export as JSON
          </Button>
          <Button variant="outline" className="text-xs gap-2">
            <i className="fa-solid fa-file-lines w-4 h-4 flex items-center justify-center"></i>
            Export as CSV
          </Button>
          <Button variant="primary" className="text-xs gap-2">
            <i className="fa-solid fa-download w-4 h-4 flex items-center justify-center"></i>
            Download All Resumes
          </Button>
        </div>
      </div>

      {/* Privacy Options */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white">Privacy Controls</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 hover:bg-neutral-background-light dark:hover:bg-neutral-700/30 rounded-xl transition-all border border-transparent hover:border-neutral-border dark:hover:border-neutral-700">
            <div>
              <p className="text-sm font-semibold text-neutral-text dark:text-white">Anonymized Data Sharing</p>
              <p className="text-xs text-neutral-muted">Share non-identifiable application data to help improve our AI models</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacy.shareData}
                onChange={() => handleToggle('shareData')}
              />
              <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-neutral-background-light dark:hover:bg-neutral-700/30 rounded-xl transition-all border border-transparent hover:border-neutral-border dark:hover:border-neutral-700">
            <div>
              <p className="text-sm font-semibold text-neutral-text dark:text-white">Track Search History</p>
              <p className="text-xs text-neutral-muted">Remember your previous job searches and keywords for better results</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={privacy.trackHistory}
                onChange={() => handleToggle('trackHistory')}
              />
              <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Clear History */}
      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-200 dark:border-orange-800/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <i className="fa-solid fa-clock-rotate-left w-5 h-5 text-orange-600 dark:text-orange-500 flex items-center justify-center"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-text dark:text-white">Clear Application History</p>
              <p className="text-xs text-neutral-muted">Remove all logs of previous applications (Resumes will be kept)</p>
            </div>
          </div>
          <Button variant="outline" className="border-orange-200 text-orange-600 dark:text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/20 text-xs">
            Clear History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
