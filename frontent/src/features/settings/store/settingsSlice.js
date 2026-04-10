import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSettingsService, updateSettingsService } from '../services/settingsService';

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

const initialState = {
  profile: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    links: {
      linkedin: '',
      github: '',
      portfolio: ''
    },
    avatar: null
  },
  account: {
    twoFactorEnabled: false,
    emailVerified: false,
    activeSessions: []
  },
  resume: {
    defaultResumeId: null,
    visibility: 'private',
    parsingPreferences: {
      autoUpdate: true,
      extractSkills: true
    }
  },
  preferences: {
    preferredRole: '',
    preferredLocation: '',
    workMode: 'remote', // remote, hybrid, onsite
    employmentType: 'full-time',
    salaryExpectation: '',
    defaultStatus: 'applied'
  },
  notifications: {
    email: true,
    interviewReminders: true,
    followUpReminders: true,
    deadlineAlerts: true,
    inApp: true
  },
  ai: {
    enableSuggestions: true,
    optimizationMode: 'balanced', // keywords, content, balanced
    autoSaveOptimized: false,
    saveHistory: true
  },
  appearance: {
    theme: 'light', // light, dark, system
    density: 'comfortable', // compact, comfortable, spacious
    fontSize: 'md' // sm, md, lg
  },
  privacy: {
    shareData: false,
    trackHistory: true
  },
  loading: false,
  error: null
};

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
    updateResumeSettings: (state, action) => {
      state.resume = { ...state.resume, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateAISettings: (state, action) => {
      state.ai = { ...state.ai, ...action.payload };
    },
    updateAppearance: (state, action) => {
      state.appearance = { ...state.appearance, ...action.payload };
    },
    updatePrivacy: (state, action) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    const applyPayload = (state, payload) => {
      if (payload) {
        const keys = ['profile', 'account', 'resume', 'preferences', 'notifications', 'ai', 'appearance', 'privacy'];
        keys.forEach(key => {
          if (payload[key]) {
             state[key] = { ...state[key], ...payload[key] };
          }
        });
      }
    };

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
      })
      .addCase(updateSettingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettingsThunk.fulfilled, (state, action) => {
        state.loading = false;
        applyPayload(state, action.payload);
      })
      .addCase(updateSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  updateProfile,
  updateAccount,
  updateResumeSettings,
  updatePreferences,
  updateNotifications,
  updateAISettings,
  updateAppearance,
  updatePrivacy,
  setLoading,
  setError
} = settingsSlice.actions;

export default settingsSlice.reducer;
