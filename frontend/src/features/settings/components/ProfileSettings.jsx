import { useState, useRef } from 'react';
import { useSettings } from '../hooks/useSettings';
import { FormField } from '../../../shared/components/ui/FormField';

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level', sub: '0–2 years' },
  { value: 'mid', label: 'Mid Level', sub: '2–5 years' },
  { value: 'senior', label: 'Senior', sub: '5–8 years' },
  { value: 'lead', label: 'Lead / Staff', sub: '8–12 years' },
  { value: 'executive', label: 'Executive', sub: '12+ years' },
];

const WORK_MODES = [
  { value: 'remote', label: 'Remote', icon: 'fa-solid fa-house-laptop' },
  { value: 'hybrid', label: 'Hybrid', icon: 'fa-solid fa-building-user' },
  { value: 'onsite', label: 'On-site', icon: 'fa-solid fa-building' },
];

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

const NOTICE_PERIODS = ['Immediate', '15 days', '1 month', '2 months', '3 months'];

const POPULAR_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
  'Django', 'FastAPI', 'Java', 'Spring Boot', 'Go', 'Rust', 'C++',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB',
  'GraphQL', 'REST API', 'Figma', 'UI/UX', 'Machine Learning', 'SQL',
];

// ── Skill tag input ───────────────────────────────────────────────────────────
const SkillsInput = ({ skills, onChange }) => {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);

  const addSkill = (skill) => {
    const clean = skill.trim();
    if (clean && !skills.includes(clean) && skills.length < 30) {
      onChange([...skills, clean]);
    }
    setInput('');
  };

  const removeSkill = (skill) => onChange(skills.filter((s) => s !== skill));

  const suggestions = POPULAR_SKILLS.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !skills.includes(s)
  ).slice(0, 6);

  return (
    <div className="space-y-2">
      {/* Existing skill tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                <i className="fa-solid fa-xmark text-[10px]" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
              e.preventDefault();
              addSkill(input);
            }
          }}
          placeholder="Add a skill (press Enter or comma)"
          className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        {/* Autocomplete dropdown */}
        {focused && input && suggestions.length > 0 && (
          <div className="absolute z-10 top-full mt-1 w-full bg-white dark:bg-slate-800 border border-neutral-border dark:border-slate-700 rounded-xl shadow-lg overflow-hidden">
            {suggestions.map((s) => (
              <button
                key={s}
                onMouseDown={() => addSkill(s)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-primary/5 hover:text-primary transition-colors text-neutral-text dark:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick-add popular skills */}
      {skills.length === 0 && !input && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted mb-1.5">Quick add</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_SKILLS.slice(0, 10).map((s) => (
              <button
                key={s}
                onClick={() => addSkill(s)}
                className="px-2.5 py-1 text-[11px] rounded-full border border-neutral-border hover:border-primary hover:text-primary transition-colors text-neutral-muted"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="text-[10px] text-neutral-muted">{skills.length}/30 skills added</p>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ProfileSettings = () => {
  const { settings, updateProfile, saveSettings, uploadAvatar, avatarLoading } = useSettings();
  const { profile } = settings;
  const avatarInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updateProfile({ [parent]: { ...profile[parent], [child]: value } });
    } else {
      updateProfile({ [name]: value });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Profile Information</h3>
        <p className="text-sm text-neutral-muted">Your professional identity — visible to you only</p>
      </div>

      {/* ── Avatar + Basic Info ── */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div
            onClick={() => avatarInputRef.current?.click()}
            className="w-28 h-28 rounded-3xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/60 cursor-pointer"
          >
            {avatarLoading ? (
              <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
            ) : profile.avatar ? (
              <>
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-3xl transition-opacity">
                  <i className="fa-solid fa-camera text-white text-xl" />
                </div>
              </>
            ) : (
              <i className="fa-solid fa-camera text-2xl text-primary/50 group-hover:text-primary transition-colors" />
            )}
          </div>
          <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          <p className="text-[10px] text-center mt-2 font-semibold uppercase tracking-wider text-neutral-muted">
            {profile.avatar ? 'Change Photo' : 'Upload Photo'}
          </p>
        </div>

        {/* Basic fields */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Full Name <span className="text-danger">*</span></label>
            <input name="fullName" value={profile.fullName} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Your full name" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Current Job Title</label>
            <input name="jobTitle" value={profile.jobTitle} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. Frontend Developer" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Phone</label>
            <input name="phone" value={profile.phone} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="+91 98765 43210" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Location</label>
            <input name="location" value={profile.location} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="City, Country" />
          </div>

          {/* Bio — full width */}
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Professional Bio</label>
              <span className={`text-[10px] ${(profile.bio?.length || 0) > 450 ? 'text-amber-400' : 'text-neutral-muted'}`}>
                {profile.bio?.length || 0}/500
              </span>
            </div>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              maxLength={500}
              rows={3}
              placeholder="Write a short professional summary — recruiters & AI will use this context..."
              className="inpttext w-full resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* ── Open to Work ── */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-neutral-border dark:border-slate-700 bg-neutral-background-light dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${profile.openToWork ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-neutral-border dark:bg-slate-700'}`}>
            <i className={`fa-solid fa-briefcase text-lg ${profile.openToWork ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-muted'}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-text dark:text-white">Open to Work</p>
            <p className="text-xs text-neutral-muted">Mark yourself as actively looking for opportunities</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={profile.openToWork} onChange={() => updateProfile({ openToWork: !profile.openToWork })} />
          <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
        </label>
      </div>

      {/* ── Job Preferences ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-5">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-sliders text-primary" /> Job Preferences
        </h4>

        {/* Experience level */}
        <div className="space-y-2">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Experience Level</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {EXPERIENCE_LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() => updateProfile({ experienceLevel: lvl.value })}
                className={`p-3 rounded-xl border text-left transition-all ${profile.experienceLevel === lvl.value ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-border dark:border-slate-700 hover:border-primary/40 text-neutral-muted dark:text-slate-400'}`}
              >
                <p className="text-xs font-semibold">{lvl.label}</p>
                <p className="text-[10px] mt-0.5 opacity-70">{lvl.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Work mode */}
        <div className="space-y-2">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Preferred Work Mode</label>
          <div className="flex gap-2 flex-wrap">
            {WORK_MODES.map((mode) => (
              <button
                key={mode.value}
                onClick={() => updateProfile({ workMode: mode.value })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${profile.workMode === mode.value ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-border dark:border-slate-700 text-neutral-muted hover:border-primary/40'}`}
              >
                <i className={`${mode.icon} text-base`} />
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Employment type + notice period */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Employment Type</label>
            <select name="employmentType" value={profile.employmentType} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
              {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Notice Period</label>
            <select name="noticePeriod" value={profile.noticePeriod} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none">
              <option value="">Select</option>
              {NOTICE_PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-neutral-muted">Expected Salary (₹/yr)</label>
            <input name="expectedSalary" value={profile.expectedSalary} onChange={handleChange} className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="e.g. 15 LPA" />
          </div>
        </div>
      </div>

      {/* ── Skills ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-3">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-code text-primary" /> Skills
          <span className="text-[10px] font-normal text-neutral-muted ml-1">Used by AI to tailor your resume & applications</span>
        </h4>
        <SkillsInput
          skills={profile.skills || []}
          onChange={(skills) => updateProfile({ skills })}
        />
      </div>

      {/* ── Professional Links ── */}
      <div className="pt-4 border-t border-neutral-border dark:border-slate-700 space-y-4">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-link text-primary" /> Professional Links
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'links.linkedin', icon: 'fa-brands fa-linkedin', color: 'text-[#0077B5]', placeholder: 'linkedin.com/in/yourname' },
            { name: 'links.github', icon: 'fa-brands fa-github', color: 'text-neutral-text dark:text-white', placeholder: 'github.com/yourname' },
            { name: 'links.portfolio', icon: 'fa-solid fa-globe', color: 'text-primary', placeholder: 'yourportfolio.com' },
            { name: 'links.twitter', icon: 'fa-brands fa-x-twitter', color: 'text-neutral-text dark:text-white', placeholder: 'x.com/yourhandle' },
          ].map(({ name, icon, color, placeholder }) => {
            const [, child] = name.split('.');
            return (
              <div key={name} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className={`${icon} ${color} text-base`} />
                </div>
                <input
                  name={name}
                  value={profile.links?.[child] || ''}
                  onChange={handleChange}
                  className="inpttext pl-10 w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Save ── */}
      <div className="flex justify-end pt-4">
        <button
          onClick={saveSettings}
          disabled={settings.loading}
          className="px-8 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 text-sm disabled:opacity-60"
        >
          {settings.loading && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
          {settings.loading ? 'Saving…' : 'Save Profile Changes'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;