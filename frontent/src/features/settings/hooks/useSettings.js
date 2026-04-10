import { useSelector, useDispatch } from 'react-redux';
import {
  updateProfile,
  updateAccount,
  updateResumeSettings,
  updatePreferences,
  updateNotifications,
  updateAISettings,
  updateAppearance,
  updatePrivacy,
  updateSettingsThunk
} from '../store/settingsSlice';

export const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const handleUpdateProfile = (data) => dispatch(updateProfile(data));
  const handleUpdateAccount = (data) => dispatch(updateAccount(data));
  const handleUpdateResumeSettings = (data) => dispatch(updateResumeSettings(data));
  const handleUpdatePreferences = (data) => dispatch(updatePreferences(data));
  const handleUpdateNotifications = (data) => dispatch(updateNotifications(data));
  const handleUpdateAISettings = (data) => dispatch(updateAISettings(data));
  const handleUpdateAppearance = (data) => dispatch(updateAppearance(data));
  const handleUpdatePrivacy = (data) => dispatch(updatePrivacy(data));

  const saveSettings = () => {
    dispatch(updateSettingsThunk(settings));
  };

  return {
    settings,
    updateProfile: handleUpdateProfile,
    updateAccount: handleUpdateAccount,
    updateResumeSettings: handleUpdateResumeSettings,
    updatePreferences: handleUpdatePreferences,
    updateNotifications: handleUpdateNotifications,
    updateAISettings: handleUpdateAISettings,
    updateAppearance: handleUpdateAppearance,
    updatePrivacy: handleUpdatePrivacy,
    saveSettings,
  };
};
