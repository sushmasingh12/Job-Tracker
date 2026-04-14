import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchSettingsService,
  updateSettingsService,
  changePasswordService,
  sendEmailOtpService,
  verifyEmailOtpService,
  deleteAccountService,
} from '../services/settingsService';

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const fetchSettingsThunk = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSettingsService();
      return response.settings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
    }
  }
);

export const updateSettingsThunk = createAsyncThunk(
  'settings/updateSettings',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateSettingsService(payload);
      return response.settings;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update settings');
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  'settings/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      await changePasswordService({ currentPassword, newPassword });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

// Step 1: send OTP to new email
export const sendEmailOtpThunk = createAsyncThunk(
  'settings/sendEmailOtp',
  async ({ newEmail }, { rejectWithValue }) => {
    try {
      await sendEmailOtpService({ newEmail });
      return newEmail;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
  }
);

// Step 2: verify OTP and update email
export const verifyEmailOtpThunk = createAsyncThunk(
  'settings/verifyEmailOtp',
  async ({ newEmail, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyEmailOtpService({ newEmail, otp });
      return response.email; // confirmed new email from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid or expired OTP');
    }
  }
);

export const deleteAccountThunk = createAsyncThunk(
  'settings/deleteAccount',
  async ({ password }, { rejectWithValue }) => {
    try {
      await deleteAccountService({ password });
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete account');
    }
  }
);

// ── Initial State ─────────────────────────────────────────────────────────────

const initialState = {
  profile: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    bio: '',
    experienceLevel: 'mid',      // entry, mid, senior, lead, executive
    openToWork: true,
    preferredRoles: [],          // ['Frontend Developer', 'React Developer']
    preferredLocations: [],      // ['Remote', 'Bengaluru']
    workMode: 'remote',          // remote, hybrid, onsite
    employmentType: 'full-time', // full-time, part-time, contract, freelance
    expectedSalary: '',
    noticePeriod: '',            // 'Immediate', '15 days', '1 month', '2 months', '3 months'
    skills: [],                  // ['React', 'Node.js', ...]
    links: {
      linkedin: '',
      github: '',
      portfolio: '',
      twitter: '',
    },
    avatar: null,
  },

  account: {
    twoFactorEnabled: false,
    emailVerified: false,
    activeSessions: [],
  },

  notifications: {
    email: true,
    interviewReminders: true,
    followUpReminders: true,
    deadlineAlerts: true,
    inApp: true,
    applicationStatusChange: true,
    weeklyDigest: true,
    aiInsights: false,
    marketTrends: false,
    reminderFrequency: 'daily',  // immediate, daily, weekly
  },

  privacy: {
    shareData: false,
    trackHistory: true,
    publicProfile: false,
    showSalaryExpectation: false,
    allowRecruiterContact: true,
    dataRetentionMonths: 12,
  },

  // ── Email change OTP flow ─────────────────────────────────────────────────
  emailChange: {
    step: 'idle',        // idle | pending_otp | verifying | success | error
    pendingEmail: '',
    otpSentAt: null,
    error: null,
  },

  // ── Password change ───────────────────────────────────────────────────────
  passwordChange: {
    loading: false,
    success: false,
    error: null,
  },

  // ── Global async state ────────────────────────────────────────────────────
  loading: false,
  error: null,
  saveSuccess: false,
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateAccount: (state, action) => {
      state.account = { ...state.account, ...action.payload };
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updatePrivacy: (state, action) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    resetEmailChange: (state) => {
      state.emailChange = initialState.emailChange;
    },
    resetPasswordChange: (state) => {
      state.passwordChange = initialState.passwordChange;
    },
    clearSaveSuccess: (state) => {
      state.saveSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const applyPayload = (state, payload) => {
      if (payload) {
        ['profile', 'account', 'notifications', 'privacy'].forEach((key) => {
          if (payload[key]) {
            state[key] = { ...state[key], ...payload[key] };
          }
        });
      }
    };

    // ── fetchSettings ─────────────────────────────────────────────────────
    builder
      .addCase(fetchSettingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        applyPayload(state, action.payload);
      })
      .addCase(fetchSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── updateSettings ────────────────────────────────────────────────────
    builder
      .addCase(updateSettingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(updateSettingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.saveSuccess = true;
        applyPayload(state, action.payload);
      })
      .addCase(updateSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── changePassword ────────────────────────────────────────────────────
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.passwordChange = { loading: true, success: false, error: null };
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.passwordChange = { loading: false, success: true, error: null };
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.passwordChange = { loading: false, success: false, error: action.payload };
      });

    // ── sendEmailOtp ──────────────────────────────────────────────────────
    builder
      .addCase(sendEmailOtpThunk.pending, (state) => {
        state.emailChange = { step: 'pending_otp', pendingEmail: '', otpSentAt: null, error: null };
      })
      .addCase(sendEmailOtpThunk.fulfilled, (state, action) => {
        state.emailChange = {
          step: 'pending_otp',
          pendingEmail: action.payload,
          otpSentAt: new Date().toISOString(),
          error: null,
        };
      })
      .addCase(sendEmailOtpThunk.rejected, (state, action) => {
        state.emailChange = { step: 'error', pendingEmail: '', otpSentAt: null, error: action.payload };
      });

    // ── verifyEmailOtp ────────────────────────────────────────────────────
    builder
      .addCase(verifyEmailOtpThunk.pending, (state) => {
        state.emailChange.step = 'verifying';
        state.emailChange.error = null;
      })
      .addCase(verifyEmailOtpThunk.fulfilled, (state, action) => {
        state.profile.email = action.payload;
        state.emailChange = { step: 'success', pendingEmail: action.payload, otpSentAt: null, error: null };
      })
      .addCase(verifyEmailOtpThunk.rejected, (state, action) => {
        state.emailChange.step = 'pending_otp'; // stay on OTP screen
        state.emailChange.error = action.payload;
      });
  },
});

export const {
  updateProfile,
  updateAccount,
  updateNotifications,
  updatePrivacy,
  resetEmailChange,
  resetPasswordChange,
  clearSaveSuccess,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;