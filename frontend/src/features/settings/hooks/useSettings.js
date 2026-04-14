import { useSelector, useDispatch } from 'react-redux';
import {
  updateProfile,
  updateAccount,
  updateNotifications,
  updatePrivacy,
  resetEmailChange,
  resetPasswordChange,
  clearSaveSuccess,
  clearError,
  fetchSettingsThunk,
  updateSettingsThunk,
  changePasswordThunk,
  sendEmailOtpThunk,
  verifyEmailOtpThunk,
  deleteAccountThunk,
} from '../store/settingsSlice';
import { uploadAvatarService } from '../services/settingsService';
import { useState } from 'react';

export const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [avatarLoading, setAvatarLoading] = useState(false);

  // ── Profile ───────────────────────────────────────────────────────────────
  const handleUpdateProfile = (data) => dispatch(updateProfile(data));

  const handleUploadAvatar = async (file) => {
    setAvatarLoading(true);
    try {
      const res = await uploadAvatarService(file);
      dispatch(updateProfile({ avatar: res.avatarUrl }));
    } finally {
      setAvatarLoading(false);
    }
  };

  // ── Account ───────────────────────────────────────────────────────────────
  const handleUpdateAccount = (data) => dispatch(updateAccount(data));

  // ── Password change ───────────────────────────────────────────────────────
  const handleChangePassword = ({ currentPassword, newPassword }) =>
    dispatch(changePasswordThunk({ currentPassword, newPassword }));

  const handleResetPasswordChange = () => dispatch(resetPasswordChange());

  // ── Email change OTP flow ─────────────────────────────────────────────────
  const handleSendEmailOtp = (newEmail) =>
    dispatch(sendEmailOtpThunk({ newEmail }));

  const handleVerifyEmailOtp = (newEmail, otp) =>
    dispatch(verifyEmailOtpThunk({ newEmail, otp }));

  const handleResetEmailChange = () => dispatch(resetEmailChange());

  // ── Notifications ─────────────────────────────────────────────────────────
  const handleUpdateNotifications = (data) => dispatch(updateNotifications(data));

  // ── Privacy ───────────────────────────────────────────────────────────────
  const handleUpdatePrivacy = (data) => dispatch(updatePrivacy(data));

  // ── Save / Fetch ──────────────────────────────────────────────────────────
  const saveSettings = () => dispatch(updateSettingsThunk(settings));
  const fetchSettings = () => dispatch(fetchSettingsThunk());

  // ── Account deletion ──────────────────────────────────────────────────────
  const handleDeleteAccount = (password) =>
    dispatch(deleteAccountThunk({ password }));

  return {
    settings,
    avatarLoading,

    // profile
    updateProfile: handleUpdateProfile,
    uploadAvatar: handleUploadAvatar,

    // account
    updateAccount: handleUpdateAccount,

    // password
    changePassword: handleChangePassword,
    resetPasswordChange: handleResetPasswordChange,

    // email OTP
    sendEmailOtp: handleSendEmailOtp,
    verifyEmailOtp: handleVerifyEmailOtp,
    resetEmailChange: handleResetEmailChange,

    // notifications
    updateNotifications: handleUpdateNotifications,

    // privacy
    updatePrivacy: handleUpdatePrivacy,

    // global
    saveSettings,
    fetchSettings,
    deleteAccount: handleDeleteAccount,
    clearSaveSuccess: () => dispatch(clearSaveSuccess()),
    clearError: () => dispatch(clearError()),
  };
};