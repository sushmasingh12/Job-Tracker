import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSettingsThunk } from '../features/settings/store/settingsSlice';
import SettingsSidebar from '../features/settings/components/SettingsSidebar';
import ProfileSettings from '../features/settings/components/ProfileSettings';
import AccountSettings from '../features/settings/components/AccountSettings';
import ResumeSettings from '../features/settings/components/ResumeSettings';
import ApplicationPreferences from '../features/settings/components/ApplicationPreferences';
import NotificationSettings from '../features/settings/components/NotificationSettings';
import AISettings from '../features/settings/components/AISettings';
import AppearanceSettings from '../features/settings/components/AppearanceSettings';
import PrivacySettings from '../features/settings/components/PrivacySettings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettingsThunk());
  }, [dispatch]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'resume':
        return <ResumeSettings />;
      case 'preferences':
        return <ApplicationPreferences />;
      case 'notifications':
        return <NotificationSettings />;
      case 'ai':
        return <AISettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-border dark:border-neutral-700 p-6 sm:p-8 animate-cardIn">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
