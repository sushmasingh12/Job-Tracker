import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateCoverLetterAPI,downloadCoverLetterAPI } from "../services/coverServices";


// ─── Async Thunks ─────────────────────────────────────────────────────────────



export const downloadCoverLetter = createAsyncThunk(
  "coverLetter/download",
  async ({ format }, { getState, rejectWithValue }) => {
    try {
      const { generatedLetter, jobDetails } = getState().coverLetter;
      await downloadCoverLetterAPI({ content: generatedLetter, format, jobTitle: jobDetails.jobTitle });
      return format;
    } catch (err) {
      return rejectWithValue(err.message || "Download failed");
    }
  }
);
export const generateCoverLetter = createAsyncThunk(
  "coverLetter/generate",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState().coverLetter;
      const data = payload ?? {
        jobDetails: state.jobDetails,
        experience: state.experience,
        tone: state.tone,
        applicationId: state.applicationId,
      };
      return await generateCoverLetterAPI(data);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to generate cover letter");
    }
  }
);

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  currentStep: 1,
  applicationId: null,
  source: "manual",

  jobDetails: {
    jobTitle: "",
    companyName: "",
    location: "",
    industry: "",
    jobType: "full-time",
    jobDescription: "",
    hiringManagerName: "",
  },

  experience: {
    experiences: [
      { id: 1, title: "", company: "", duration: "", achievement: "" },
    ],
    skills: [],
    education: {
      degree: "",
      institution: "",
      graduationYear: "",
      gpa: "",
    },
  },

  tone: "professional",
  generatedLetter: "",
  loading: false,
  downloadLoading: false,
  error: null,
  downloadError: null,
};

const coverSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 4) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setApplicationContext: (state, action) => {
      const {
        applicationId = null,
        jobDetails = {},
        generatedLetter = "",
        tone = state.tone,
      } = action.payload || {};

      state.applicationId = applicationId;
      state.source = applicationId ? "application" : "manual";
      state.jobDetails = { ...state.jobDetails, ...jobDetails };
      if (generatedLetter) {
        state.generatedLetter = generatedLetter;
      }
      state.tone = tone;
    },

    clearApplicationContext: (state) => {
      state.applicationId = null;
      state.source = "manual";
    },

    setJobDetails: (state, action) => {
      state.jobDetails = { ...state.jobDetails, ...action.payload };
    },

    setExperiences: (state, action) => {
      state.experience.experiences = action.payload;
    },
    addExperience: (state) => {
      state.experience.experiences.push({
        id: Date.now(),
        title: "",
        company: "",
        duration: "",
        achievement: "",
      });
    },
    removeExperience: (state, action) => {
      if (state.experience.experiences.length > 1) {
        state.experience.experiences = state.experience.experiences.filter(
          (exp) => exp.id !== action.payload
        );
      }
    },
    updateExperience: (state, action) => {
      const { id, field, value } = action.payload;
      const exp = state.experience.experiences.find((e) => e.id === id);
      if (exp) exp[field] = value;
    },
    addSkill: (state, action) => {
      const skill = action.payload.trim();
      if (skill && !state.experience.skills.includes(skill)) {
        state.experience.skills.push(skill);
      }
    },
    removeSkill: (state, action) => {
      state.experience.skills = state.experience.skills.filter(
        (s) => s !== action.payload
      );
    },
    setEducation: (state, action) => {
      state.experience.education = {
        ...state.experience.education,
        ...action.payload,
      };
    },
    setTone: (state, action) => {
      state.tone = action.payload;
    },
    setGeneratedLetter: (state, action) => {
      state.generatedLetter = action.payload;
    },
    resetCoverLetter: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCoverLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCoverLetter.fulfilled, (state, action) => {
  state.loading = false;
  state.generatedLetter = action.payload.letter ?? action.payload;
  state.currentStep = 4;
})
      .addCase(generateCoverLetter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downloadCoverLetter.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadCoverLetter.fulfilled, (state) => {
        state.downloadLoading = false;
      })
      .addCase(downloadCoverLetter.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
      });
  },
});

export const {
  nextStep,
  prevStep,
  setCurrentStep,
  setApplicationContext,
  clearApplicationContext,
  setJobDetails,
  setExperiences,
  addExperience,
  removeExperience,
  updateExperience,
  addSkill,
  removeSkill,
  setEducation,
  setTone,
  setGeneratedLetter,
  resetCoverLetter,
} = coverSlice.actions;

export const selectCurrentStep = (state) => state.coverLetter.currentStep;
export const selectJobDetails = (state) => state.coverLetter.jobDetails;
export const selectExperience = (state) => state.coverLetter.experience;
export const selectTone = (state) => state.coverLetter.tone;
export const selectGeneratedLetter = (state) => state.coverLetter.generatedLetter;
export const selectLoading = (state) => state.coverLetter.loading;
export const selectDownloadLoading = (state) => state.coverLetter.downloadLoading;
export const selectError = (state) => state.coverLetter.error;
export const selectApplicationId = (state) => state.coverLetter.applicationId;

export default coverSlice.reducer;