import { useSettings } from '../hooks/useSettings';
import { Button } from '../../../shared/components/ui/Button';

const ResumeSettings = () => {
  const { settings, updateResumeSettings } = useSettings();
  const { resume } = settings;

  const handleToggle = (key) => {
    updateResumeSettings({
      parsingPreferences: {
        ...resume.parsingPreferences,
        [key]: !resume.parsingPreferences[key]
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Resume Management</h3>
        <p className="text-sm text-neutral-muted">Control how your resumes are parsed and shared</p>
      </div>

      {/* Default Resume */}
      <div className="p-6 bg-neutral-background-light dark:bg-neutral-900/40 rounded-2xl border border-neutral-border dark:border-neutral-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-neutral-800 p-3 rounded-xl shadow-sm flex items-center justify-center w-12 h-12">
              <i className="fa-solid fa-file-arrow-up text-primary text-xl"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-text dark:text-white">Default Resume</p>
              <p className="text-xs text-neutral-muted">Senior_Dev_Resume_v2.pdf</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-xs">Replace</Button>
            <Button variant="primary" className="text-xs">Download</Button>
          </div>
        </div>
      </div>

      {/* Resume Visibility */}
      <div className="space-y-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-text dark:text-white">
          <i className="fa-solid fa-eye w-4 h-4 text-primary flex items-center justify-center"></i>
          Resume Visibility
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['private', 'public', 'recruiter-only'].map((level) => (
            <button
              key={level}
              onClick={() => updateResumeSettings({ visibility: level })}
              className={`p-4 rounded-xl border transition-all text-left ${resume.visibility === level
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-neutral-border dark:border-neutral-700 hover:border-primary/40'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-text dark:text-white">{level.replace('-', ' ')}</span>
                {resume.visibility === level && <i className="fa-solid fa-circle-check w-4 h-4 text-primary flex items-center justify-center"></i>}
              </div>
              <p className="text-[10px] text-neutral-muted">
                {level === 'private' && 'Only you can see this resume.'}
                {level === 'public' && 'Visible to everyone via profile link.'}
                {level === 'recruiter-only' && 'Only verified recruiters can view.'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Parsing Preferences */}
      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700 space-y-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-text dark:text-white">
          <i className="fa-solid fa-sliders w-4 h-4 text-primary flex items-center justify-center"></i>
          AI & Parsing Preferences
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 hover:bg-neutral-background-light dark:hover:bg-neutral-700/30 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-file-magnifying-glass w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
              <span className="text-sm text-neutral-text dark:text-white">Auto-update skills from parsed context</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={resume.parsingPreferences.extractSkills}
                onChange={() => handleToggle('extractSkills')}
              />
              <div className="w-9 h-5 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 hover:bg-neutral-background-light dark:hover:bg-neutral-700/30 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-file-arrow-up w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
              <span className="text-sm text-neutral-text dark:text-white">Sync changes to cloud storage automatically</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={resume.parsingPreferences.autoUpdate}
                onChange={() => handleToggle('autoUpdate')}
              />
              <div className="w-9 h-5 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSettings;
