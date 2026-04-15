import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { fetchSettingsThunk } from '../store/settingsSlice';
import SettingsSidebar from '../components/SettingsSidebar';
import ProfileSettings from '../components/ProfileSettings';
import AccountSettings from '../components/AccountSettings';
import ResumeSettings from '../components/ResumeSettings';
import ApplicationPreferences from '../components/ApplicationPreferences';
import NotificationSettings from '../components/NotificationSettings';
import AISettings from '../components/AISettings';
import AppearanceSettings from '../components/AppearanceSettings';
import PrivacySettings from '../components/PrivacySettings';

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
    <>
      <Helmet>
        <title>Account Settings | JobTracker</title>
        <meta
          name="description"
          content="Manage your profile, account preferences, notification settings, and privacy for your JobTracker account."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
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
    </>
  );
};

export default SettingsPage;
