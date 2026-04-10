import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { FormField } from '../../../shared/components/ui/FormField';
import { Button } from '../../../shared/components/ui/Button';

const ApplicationPreferences = () => {
  const { settings, updatePreferences } = useSettings();
  const { preferences } = settings;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePreferences({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Application Preferences</h3>
        <p className="text-sm text-neutral-muted">Set default values for your future job applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Preferred Job Role">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-briefcase w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <input
              name="preferredRole"
              value={preferences.preferredRole}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="e.g. Frontend Engineer"
            />
          </div>
        </FormField>

        <FormField label="Preferred Location">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-location-dot w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <input
              name="preferredLocation"
              value={preferences.preferredLocation}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="e.g. Remote, New York"
            />
          </div>
        </FormField>

        <FormField label="Work Mode">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-globe w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <select
              name="workMode"
              value={preferences.workMode}
              onChange={handleChange}
              className="inpttext pl-10 w-full appearance-none bg-white dark:bg-neutral-800"
            >
              <option value="remote">Fully Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>
        </FormField>

        <FormField label="Employment Type">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-calendar-days w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <select
              name="employmentType"
              value={preferences.employmentType}
              onChange={handleChange}
              className="inpttext pl-10 w-full appearance-none bg-white dark:bg-neutral-800"
            >
              <option value="full-time">Full-time</option>
              <option value="contract">Contract</option>
              <option value="part-time">Part-time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
        </FormField>

        <FormField label="Salary Expectation">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-wallet w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <input
              name="salaryExpectation"
              value={preferences.salaryExpectation}
              onChange={handleChange}
              className="inpttext pl-10 w-full"
              placeholder="e.g. $120k - $150k"
            />
          </div>
        </FormField>

        <FormField label="Default App Status">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-list-check w-4 h-4 text-neutral-muted flex items-center justify-center"></i>
            </span>
            <select
              name="defaultStatus"
              value={preferences.defaultStatus}
              onChange={handleChange}
              className="inpttext pl-10 w-full appearance-none bg-white dark:bg-neutral-800"
            >
              <option value="applied">Applied</option>
              <option value="wishlist">Wishlist</option>
              <option value="interviewing">Interviewing</option>
            </select>
          </div>
        </FormField>
      </div>

      <div className="pt-6 flex justify-end">
        <Button variant="primary" className="px-8">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default ApplicationPreferences;
