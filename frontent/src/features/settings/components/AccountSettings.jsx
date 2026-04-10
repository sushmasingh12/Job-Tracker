import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { FormField } from '../../../shared/components/ui/FormField';
import { Button } from '../../../shared/components/ui/Button';

const AccountSettings = () => {
  const { settings, updateAccount } = useSettings();
  const { account } = settings;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-text dark:text-white">Account Security</h3>
        <p className="text-sm text-neutral-muted">Manage your credentials and login safety</p>
      </div>

      {/* Verification Status */}
      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg flex items-center justify-center w-9 h-9">
            <i className="fa-solid fa-envelope-circle-check text-primary text-lg"></i>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-text dark:text-white">Email Verification</p>
            <p className="text-xs text-neutral-muted">Your email is verified and secure</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-md">Verified</span>
      </div>

      {/* Change Password */}
      <div className="space-y-4 pt-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-text dark:text-white">
          <i className="fa-solid fa-key w-4 h-4 text-primary flex items-center justify-center"></i>
          Change Password
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Current Password">
            <input type="password" className="inpttext w-full" placeholder="••••••••" />
          </FormField>
          <div className="hidden md:block"></div>
          <FormField label="New Password">
            <input type="password" className="inpttext w-full" placeholder="••••••••" />
          </FormField>
          <FormField label="Confirm New Password">
            <input type="password" className="inpttext w-full" placeholder="••••••••" />
          </FormField>
        </div>
        <Button variant="outline" className="text-xs">Update Password</Button>
      </div>

      {/* Two-Factor Auth */}
      <div className="pt-6 border-t border-neutral-border dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="bg-neutral-background-light dark:bg-neutral-700 p-2 rounded-lg flex items-center justify-center w-9 h-9">
              <i className="fa-solid fa-shield text-neutral-muted text-lg"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-text dark:text-white">Two-Factor Authentication</p>
              <p className="text-xs text-neutral-muted">Add an extra layer of security to your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={account.twoFactorEnabled}
              onChange={(e) => updateAccount({ twoFactorEnabled: e.target.checked })}
            />
            <div className="w-11 h-6 bg-neutral-border peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-8 border-t border-danger/20">
        <h4 className="text-sm font-bold text-danger mb-4 flex items-center gap-2">
          <i className="fa-solid fa-trash-can w-4 h-4 flex items-center justify-center"></i>
          Danger Zone
        </h4>
        <div className="p-4 bg-danger/5 rounded-xl border border-danger/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-text dark:text-white">Delete Account</p>
            <p className="text-xs text-neutral-muted max-w-md">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <Button className="bg-danger text-white hover:bg-danger/90 border-none px-6 text-xs font-bold">
            Delete Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
