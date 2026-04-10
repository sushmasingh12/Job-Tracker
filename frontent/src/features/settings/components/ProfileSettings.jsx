import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { FormField } from '../../../shared/components/ui/FormField';
import { Button } from '../../../shared/components/ui/Button';

const ProfileSettings = () => {
  const { settings, updateProfile, saveSettings } = useSettings();
  const { profile } = settings;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      updateProfile({
        [parent]: {
          ...profile[parent],
          [child]: value
        }
      });
    } else {
      updateProfile({ [name]: value });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Profile Information</h3>
        <p className="text-sm text-neutral-muted">Update your personal details and links</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Upload */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <i className="fa-solid fa-camera text-2xl text-primary/50 group-hover:text-primary transition-colors"></i>
            )}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <p className="text-[10px] text-center mt-2 font-semibold uppercase tracking-wider text-neutral-muted">Update Photo</p>
        </div>

        {/* Basic Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormField label="Full Name" placeholder="John Doe">
            <input
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField label="Email Address" placeholder="john@example.com">
            <input
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="john@example.com"
            />
          </FormField>

          <FormField label="Phone Number" placeholder="+1 (555) 000-0000">
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="+1 (555) 000-0000"
            />
          </FormField>

          <FormField label="Location" placeholder="San Francisco, CA">
            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="City, Country"
            />
          </FormField>

          <FormField label="Job Title" placeholder="Senior Frontend Developer" className="md:col-span-2">
            <input
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className="inpttext w-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="What is your current role?"
            />
          </FormField>
        </div>
      </div>

      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700">
        <h4 className="text-sm font-semibold text-neutral-text dark:text-white mb-4">Professional Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-brands fa-linkedin w-4 h-4 text-[#0077B5] flex items-center justify-center text-base"></i>
            </div>
            <input
              name="links.linkedin"
              value={profile.links.linkedin}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="LinkedIn Profile"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-code-branch w-4 h-4 text-neutral-text dark:text-white flex items-center justify-center text-base"></i>
            </div>
            <input
              name="links.GitBranch"
              value={profile.links.GitBranch}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="GitBranch Profile"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-globe w-4 h-4 text-primary flex items-center justify-center text-base"></i>
            </div>
            <input
              name="links.portfolio"
              value={profile.links.portfolio}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="Portfolio Website"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button variant="primary" className="px-8" onClick={saveSettings} disabled={settings.loading}>
          {settings.loading ? 'Saving...' : 'Save Profile Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
