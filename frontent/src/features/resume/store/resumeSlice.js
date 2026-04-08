import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchResumeTemplatesService,
  fetchResumesService,
  uploadResumeService,
  analyzeResumeService,
  optimizeResumeService,
  downloadResumeService,
} from "../services/resumeServices";

export const fetchResumeTemplates = createAsyncThunk(
  "resume/fetchTemplates",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchResumeTemplatesService();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchResumes = createAsyncThunk(
  "resume/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchResumesService();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const uploadResume = createAsyncThunk(
  "resume/upload",
  async ({ file }, { rejectWithValue }) => {
    try {
      return await uploadResumeService({ file });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const analyzeResume = createAsyncThunk(
  "resume/analyze",
  async ({ resumeId, jobDescription, jobTitle }, { rejectWithValue }) => {
    try {
      return await analyzeResumeService({ resumeId, jobDescription, jobTitle });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const optimizeResume = createAsyncThunk(
  "resume/optimize",
  async ({ resumeId, jobDescription, template }, { rejectWithValue }) => {
    try {
      return await optimizeResumeService({ resumeId, jobDescription, template });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const downloadResume = createAsyncThunk(
  "resume/download",
  async ({ resumeId, format }, { rejectWithValue }) => {
    try {
      return await downloadResumeService({ resumeId, format });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  resumes: [],
  listLoading: false,
  listError: null,

  templates: [],
  templatesLoading: false,
  templatesError: null,
  defaultTemplate: "modern",

  uploadLoading: false,
  uploadError: null,
  uploadSuccess: false,

  activeResumeId: null,

  analyzeLoading: false,
  analyzeError: null,
  analyzeSuccess: false,
  analysisResult: null,
  currentJobDescription: "",

  optimizeLoading: false,
  optimizeError: null,
  optimizeSuccess: false,
  optimizedResult: null,

  downloadLoading: false,
  downloadError: null,
  downloadData: null,
};

const upsertResumeInList = (state, updatedResume) => {
  if (!updatedResume?._id) return;

  const index = state.resumes.findIndex((r) => r._id === updatedResume._id);

  if (index >= 0) {
    state.resumes[index] = {
      ...state.resumes[index],
      ...updatedResume,
    };
  } else {
    state.resumes.unshift(updatedResume);
  }
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    resetUploadState(state) {
      state.uploadLoading = false;
      state.uploadError = null;
      state.uploadSuccess = false;
    },
    setActiveResumeId(state, action) {
      state.activeResumeId = action.payload;
    },
    clearAnalysis(state) {
      state.analyzeLoading = false;
      state.analyzeError = null;
      state.analyzeSuccess = false;
      state.analysisResult = null;

      state.optimizeLoading = false;
      state.optimizeError = null;
      state.optimizeSuccess = false;
      state.optimizedResult = null;

      state.downloadData = null;
      state.downloadError = null;
    },
    clearOptimizeState(state) {
      state.optimizeLoading = false;
      state.optimizeError = null;
      state.optimizeSuccess = false;
      state.optimizedResult = null;
      state.downloadData = null;
      state.downloadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumeTemplates.pending, (state) => {
        state.templatesLoading = true;
        state.templatesError = null;
      })
      .addCase(fetchResumeTemplates.fulfilled, (state, action) => {
        state.templatesLoading = false;
        state.templates = action.payload?.templates || [];
        state.defaultTemplate = action.payload?.defaultTemplate || "modern";
      })
      .addCase(fetchResumeTemplates.rejected, (state, action) => {
        state.templatesLoading = false;
        state.templatesError = action.payload || "Failed to load templates";
      });

    builder
      .addCase(fetchResumes.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.listLoading = false;
        state.resumes = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload || "Failed to load resumes";
      });

    builder
      .addCase(uploadResume.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadSuccess = true;
        state.uploadError = null;

        upsertResumeInList(state, action.payload);
        state.activeResumeId = action.payload?._id || null;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload || "Upload failed";
        state.uploadSuccess = false;
      });

    builder
      .addCase(analyzeResume.pending, (state) => {
        state.analyzeLoading = true;
        state.analyzeError = null;
        state.analyzeSuccess = false;

        state.optimizedResult = null;
        state.optimizeSuccess = false;
        state.optimizeError = null;
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.analyzeLoading = false;
        state.analyzeSuccess = true;
        state.analyzeError = null;

        state.analysisResult = action.payload;
        state.activeResumeId = action.payload?.resumeId || null;
        state.currentJobDescription = action.meta.arg.jobDescription || "";

        const existingResume = state.resumes.find(
          (r) => r._id === action.payload?.resumeId
        );

        if (existingResume) {
          upsertResumeInList(state, {
            ...existingResume,
            analysis: action.payload,
          });
        }
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.analyzeLoading = false;
        state.analyzeError = action.payload || "Analysis failed";
        state.analyzeSuccess = false;
      });

    builder
      .addCase(optimizeResume.pending, (state) => {
        state.optimizeLoading = true;
        state.optimizeError = null;
        state.optimizeSuccess = false;
      })
      .addCase(optimizeResume.fulfilled, (state, action) => {
        state.optimizeLoading = false;
        state.optimizeSuccess = true;
        state.optimizeError = null;
        state.optimizedResult = action.payload;

        const existingResume = state.resumes.find(
          (r) => r._id === action.payload?.resumeId
        );

        if (existingResume) {
          upsertResumeInList(state, {
            ...existingResume,
            optimizedContent: {
              sections:
                action.payload?.optimizedSections ||
                action.payload?.optimizedContent?.sections ||
                action.payload?.sections ||
                null,
              changesExplained: action.payload?.changesExplained || [],
              newAtsScore: action.payload?.newAtsScore || 0,
              template: action.payload?.template || "modern",
            },
          });
        }
      })
      .addCase(optimizeResume.rejected, (state, action) => {
        state.optimizeLoading = false;
        state.optimizeError = action.payload || "Optimization failed";
        state.optimizeSuccess = false;
      });

    builder
      .addCase(downloadResume.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadResume.fulfilled, (state, action) => {
        state.downloadLoading = false;
        state.downloadData = action.payload;
      })
      .addCase(downloadResume.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload || "Download failed";
      });
  },
});

export const {
  resetUploadState,
  setActiveResumeId,
  clearAnalysis,
  clearOptimizeState,
} = resumeSlice.actions;

const getResumeRoot = (state) => state.resume || state.resumes || initialState;

export const selectAllResumes = (state) => getResumeRoot(state).resumes;
export const selectListLoading = (state) => getResumeRoot(state).listLoading;
export const selectListError = (state) => getResumeRoot(state).listError;

export const selectResumeTemplates = (state) => getResumeRoot(state).templates;
export const selectTemplatesLoading = (state) =>
  getResumeRoot(state).templatesLoading;
export const selectTemplatesError = (state) =>
  getResumeRoot(state).templatesError;
export const selectDefaultTemplate = (state) =>
  getResumeRoot(state).defaultTemplate;

export const selectUploadLoading = (state) => getResumeRoot(state).uploadLoading;
export const selectUploadError = (state) => getResumeRoot(state).uploadError;
export const selectUploadSuccess = (state) => getResumeRoot(state).uploadSuccess;

export const selectActiveResumeId = (state) =>
  getResumeRoot(state).activeResumeId;

export const selectAnalyzeLoading = (state) =>
  getResumeRoot(state).analyzeLoading;
export const selectAnalyzeError = (state) => getResumeRoot(state).analyzeError;
export const selectAnalyzeSuccess = (state) =>
  getResumeRoot(state).analyzeSuccess;
export const selectAnalysisResult = (state) =>
  getResumeRoot(state).analysisResult;
export const selectCurrentJobDescription = (state) =>
  getResumeRoot(state).currentJobDescription;

export const selectOptimizeLoading = (state) =>
  getResumeRoot(state).optimizeLoading;
export const selectOptimizeError = (state) =>
  getResumeRoot(state).optimizeError;
export const selectOptimizeSuccess = (state) =>
  getResumeRoot(state).optimizeSuccess;
export const selectOptimizedResult = (state) =>
  getResumeRoot(state).optimizedResult;

export const selectDownloadLoading = (state) =>
  getResumeRoot(state).downloadLoading;
export const selectDownloadError = (state) =>
  getResumeRoot(state).downloadError;
export const selectDownloadData = (state) =>
  getResumeRoot(state).downloadData;

export default resumeSlice.reducer;