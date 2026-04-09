import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [],
  profilesLoading: false,
  selectedProfile: null,
  showProfileModal: false,
  showManualModal: false,

  questions: [],
  questionsLoading: false,
  error: null,

  activeTab: 'practice',
  activeFilter: 'all',
  expandedQuestionId: null,

  completedQuestions: [],
  savedAnswers: {},
  bookmarkedQuestions: [],

  interviewDate: null,

  mockSession: {
    isActive: false,
    currentIndex: 0,
    timeLeftSeconds: 120,
    responses: {},
    isComplete: false,
    startedAt: null,
  },
};

const resetProgressState = (state) => {
  state.questions = [];
  state.completedQuestions = [];
  state.savedAnswers = {};
  state.bookmarkedQuestions = [];
  state.activeFilter = 'all';
  state.expandedQuestionId = null;
  state.error = null;
  state.mockSession = { ...initialState.mockSession };
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = Array.isArray(action.payload) ? action.payload : [];
    },
    setProfilesLoading: (state, action) => {
      state.profilesLoading = Boolean(action.payload);
    },
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload || null;
      resetProgressState(state);
    },
    setShowProfileModal: (state, action) => {
      state.showProfileModal = Boolean(action.payload);
    },
    setShowManualModal: (state, action) => {
      state.showManualModal = Boolean(action.payload);
    },

    setQuestions: (state, action) => {
      state.questions = Array.isArray(action.payload) ? action.payload : [];
      state.expandedQuestionId = null;
      state.mockSession = { ...initialState.mockSession };
    },
    setQuestionsLoading: (state, action) => {
      state.questionsLoading = Boolean(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    addCustomQuestion: (state, action) => {
      state.questions.push(action.payload);
    },

    setSavedAnswers: (state, action) => {
      state.savedAnswers =
        action.payload && typeof action.payload === 'object' ? action.payload : {};
      state.completedQuestions = Object.keys(state.savedAnswers);
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setExpandedQuestion: (state, action) => {
      state.expandedQuestionId =
        state.expandedQuestionId === action.payload ? null : action.payload;
    },

    markQuestionComplete: (state, action) => {
      const id = action.payload;
      if (!state.completedQuestions.includes(id)) {
        state.completedQuestions.push(id);
      }
    },
    unmarkQuestionComplete: (state, action) => {
      state.completedQuestions = state.completedQuestions.filter(
        (id) => id !== action.payload
      );
    },
    saveAnswer: (state, action) => {
      const { questionId, text = '', rating = null, notes = '' } = action.payload || {};
      if (!questionId) return;

      state.savedAnswers[questionId] = {
        text,
        rating,
        notes,
        savedAt: new Date().toISOString(),
      };

      if (!state.completedQuestions.includes(questionId)) {
        state.completedQuestions.push(questionId);
      }
    },
    toggleBookmark: (state, action) => {
      const id = action.payload;
      if (!id) return;

      if (state.bookmarkedQuestions.includes(id)) {
        state.bookmarkedQuestions = state.bookmarkedQuestions.filter(
          (bid) => bid !== id
        );
      } else {
        state.bookmarkedQuestions.push(id);
      }
    },

    setInterviewDate: (state, action) => {
      state.interviewDate = action.payload || null;
    },

    startMockSession: (state) => {
      if (state.questions.length === 0) return;

      state.mockSession = {
        isActive: true,
        currentIndex: 0,
        timeLeftSeconds: 120,
        responses: {},
        isComplete: false,
        startedAt: new Date().toISOString(),
      };
    },
    tickMockTimer: (state) => {
      if (state.mockSession.isActive && state.mockSession.timeLeftSeconds > 0) {
        state.mockSession.timeLeftSeconds -= 1;
      }
    },
    nextMockQuestion: (state, action) => {
      const response = action.payload?.response ?? null;
      const currentQuestion = state.questions[state.mockSession.currentIndex];
      const currentId = currentQuestion?.id;

      if (currentId && response) {
        state.mockSession.responses[currentId] = response;
      }

      const nextIndex = state.mockSession.currentIndex + 1;

      if (nextIndex >= state.questions.length) {
        state.mockSession.isComplete = true;
        state.mockSession.isActive = false;
        state.mockSession.timeLeftSeconds = 0;
      } else {
        state.mockSession.currentIndex = nextIndex;
        state.mockSession.timeLeftSeconds = 120;
      }
    },
    endMockSession: (state) => {
      state.mockSession.isActive = false;
      state.mockSession.isComplete = true;
    },
    resetMockSession: (state) => {
      state.mockSession = { ...initialState.mockSession };
    },
  },
});

export const {
  setProfiles,
  setProfilesLoading,
  setSelectedProfile,
  setShowProfileModal,
  setShowManualModal,
  setQuestions,
  setQuestionsLoading,
  setError,
  addCustomQuestion,
  setSavedAnswers,
  setActiveTab,
  setActiveFilter,
  setExpandedQuestion,
  markQuestionComplete,
  unmarkQuestionComplete,
  saveAnswer,
  toggleBookmark,
  setInterviewDate,
  startMockSession,
  tickMockTimer,
  nextMockQuestion,
  endMockSession,
  resetMockSession,
} = interviewSlice.actions;

export default interviewSlice.reducer;