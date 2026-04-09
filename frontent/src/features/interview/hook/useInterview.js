import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { interviewService } from '../services/interviewServices';
import {
  addCustomQuestion,
  endMockSession,
  markQuestionComplete,
  nextMockQuestion,
  resetMockSession,
  saveAnswer,
  setActiveFilter,
  setActiveTab,
  setError,
  setExpandedQuestion,
  setInterviewDate,
  setProfiles,
  setProfilesLoading,
  setQuestions,
  setQuestionsLoading,
  setSavedAnswers,
  setSelectedProfile,
  setShowProfileModal,
  setShowManualModal,
  startMockSession,
  tickMockTimer,
  toggleBookmark,
  unmarkQuestionComplete,
} from '../store/interviewSlice';


const normalizeAnswers = (payload) => {
  const answersArray = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.answers)
      ? payload.answers
      : [];

  return answersArray.reduce((acc, item) => {
    const questionId = item?.questionId || item?.id;
    if (!questionId) return acc;

    acc[questionId] = {
      text: item?.text || item?.answer || '',
      rating: item?.rating || null,
      notes: item?.notes || '',
      savedAt:
        item?.savedAt ||
        item?.updatedAt ||
        item?.createdAt ||
        new Date().toISOString(),
    };

    return acc;
  }, {});
};

export const useInterview = () => {
  const dispatch = useDispatch();
  const interview = useSelector((state) => state.interview);
  const token = useSelector((state) => state.auth?.token);

  const mockTimerRef = useRef(null);

  const countdown = useMemo(() => {
    if (!interview.interviewDate) return null;

    const diff = new Date(interview.interviewDate).getTime() - Date.now();
    if (Number.isNaN(diff)) return null;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, expired: false };
  }, [interview.interviewDate]);

  useEffect(() => {
    if (interview.mockSession.isActive) {
      clearInterval(mockTimerRef.current);
      mockTimerRef.current = setInterval(() => {
        dispatch(tickMockTimer());
      }, 1000);
    } else {
      clearInterval(mockTimerRef.current);
      mockTimerRef.current = null;
    }

    return () => {
      clearInterval(mockTimerRef.current);
      mockTimerRef.current = null;
    };
  }, [dispatch, interview.mockSession.isActive]);

  useEffect(() => {
    if (interview.mockSession.isActive && interview.mockSession.timeLeftSeconds === 0) {
      dispatch(nextMockQuestion({ response: null }));
    }
  }, [dispatch, interview.mockSession.isActive, interview.mockSession.timeLeftSeconds]);

  const loadProfiles = useCallback(async () => {
    try {
      dispatch(setProfilesLoading(true));
      dispatch(setError(null));

      const response = await interviewService.getProfiles(token);
      // The backend returns { success: true, data: [applications...] }
      const profiles = response?.data || (Array.isArray(response) ? response : []);
      dispatch(setProfiles(profiles));
    } catch (error) {
      dispatch(setError(error.message || 'Failed to load profiles'));
    } finally {
      dispatch(setProfilesLoading(false));
    }
  }, [dispatch, token]);

  const loadSavedAnswers = useCallback(
    async (jobId) => {
      if (!jobId) {
        dispatch(setSavedAnswers({}));
        return;
      }

      try {
        const data = await interviewService.getAnswers(token, jobId);
        dispatch(setSavedAnswers(normalizeAnswers(data)));
      } catch (error) {
        console.error('Failed to load saved answers:', error);
        dispatch(setSavedAnswers({}));
      }
    },
    [dispatch, token]
  );

  const openProfileModal = useCallback(() => {
    dispatch(setShowProfileModal(true));
    loadProfiles();
  }, [dispatch, loadProfiles]);

  const closeProfileModal = useCallback(() => {
    dispatch(setShowProfileModal(false));
  }, [dispatch]);

  const openManualModal = useCallback(() => {
    dispatch(setShowManualModal(true));
  }, [dispatch]);

  const closeManualModal = useCallback(() => {
    dispatch(setShowManualModal(false));
  }, [dispatch]);

  const handleSelectProfile = useCallback(
    async (profile) => {
      dispatch(setSelectedProfile(profile));
      dispatch(setShowProfileModal(false));
      await loadSavedAnswers(profile?._id);
    },
    [dispatch, loadSavedAnswers]
  );

  const generateQuestions = useCallback(
  async ({ questionTypes, count }) => {
    if (!interview.selectedProfile) return;

    try {
      dispatch(setQuestionsLoading(true));
      dispatch(setError(null));

      const data = await interviewService.generateQuestions(token, {
        jobId: interview.selectedProfile._id,
        jobTitle: interview.selectedProfile.jobTitle,
        company: interview.selectedProfile.company,
        jobDescription: interview.selectedProfile.jobDescription || '',
        questionTypes,
        count,
      });

      dispatch(setQuestions(data?.questions || []));
    } catch (error) {
      dispatch(setError(error.message || 'Failed to generate questions'));
    } finally {
      dispatch(setQuestionsLoading(false));
    }
  },
  [dispatch, interview.selectedProfile, token]
);

  const handleGenerateManual = useCallback(
    async ({ jobTitle, techStack, questionTypes, count }) => {
      try {
        dispatch(setQuestionsLoading(true));
        dispatch(setError(null));

        const data = await interviewService.generateQuestions(token, {
          jobId: 'manual',
          jobTitle,
          techStack,
          questionTypes,
          count,
        });

        const manualProfile = {
          _id: 'manual',
          jobTitle,
          company: 'Self-Practice',
          techStack,
          isManual: true,
        };

        dispatch(setSelectedProfile(manualProfile));
        dispatch(setQuestions(data?.questions || []));
        dispatch(setShowManualModal(false));
      } catch (error) {
        dispatch(setError(error.message || 'Failed to generate manual questions'));
      } finally {
        dispatch(setQuestionsLoading(false));
      }
    },
    [dispatch, token]
  );

  const handleAddCustomQuestion = useCallback(
    (questionText, type) => {
      dispatch(
        addCustomQuestion({
          id: `custom-${Date.now()}`,
          question: questionText,
          type: type || 'behavioral',
          difficulty: 'medium',
          hint: 'Your custom question — answer in your own style.',
          prepTimeMinutes: 3,
          tags: ['custom'],
          isCustom: true,
        })
      );
    },
    [dispatch]
  );

  const changeTab = useCallback((tab) => dispatch(setActiveTab(tab)), [dispatch]);
  const changeFilter = useCallback((filter) => dispatch(setActiveFilter(filter)), [dispatch]);
  const toggleExpand = useCallback((id) => dispatch(setExpandedQuestion(id)), [dispatch]);

  const handleMarkComplete = useCallback(
    (id) => {
      if (interview.completedQuestions.includes(id)) {
        dispatch(unmarkQuestionComplete(id));
      } else {
        dispatch(markQuestionComplete(id));
      }
    },
    [dispatch, interview.completedQuestions]
  );

  const handleSaveAnswer = useCallback(
    async (questionId, answerData) => {
      dispatch(saveAnswer({ questionId, ...answerData }));
      dispatch(markQuestionComplete(questionId));

      if (!interview.selectedProfile?._id) return;

      try {
        await interviewService.saveAnswer(token, {
          jobId: interview.selectedProfile._id,
          questionId,
          ...answerData,
        });
      } catch (error) {
        console.error('Answer sync failed:', error);
      }
    },
    [dispatch, interview.selectedProfile, token]
  );

  const handleBookmark = useCallback((id) => dispatch(toggleBookmark(id)), [dispatch]);
  const handleSetInterviewDate = useCallback((date) => dispatch(setInterviewDate(date)), [dispatch]);
  const handleStartMock = useCallback(() => dispatch(startMockSession()), [dispatch]);
  const handleNextMockQuestion = useCallback(
    (response) => dispatch(nextMockQuestion({ response })),
    [dispatch]
  );
  const handleEndMock = useCallback(() => dispatch(endMockSession()), [dispatch]);
  const handleResetMock = useCallback(() => dispatch(resetMockSession()), [dispatch]);

  const filteredQuestions = useMemo(() => {
    const { questions, activeFilter, bookmarkedQuestions } = interview;

    if (activeFilter === 'all') return questions;
    if (activeFilter === 'bookmarked') {
      return questions.filter((q) => bookmarkedQuestions.includes(q.id));
    }

    return questions.filter(
      (q) => q.type?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [interview]);

  const sessionStats = useMemo(() => {
    const total = interview.questions.length;
    const practiced = interview.completedQuestions.length;
    const confidenceScore = total > 0 ? Math.round((practiced / total) * 100) : 0;

    return { total, practiced, confidenceScore };
  }, [interview.completedQuestions.length, interview.questions.length]);

  return {
    ...interview,
    countdown,
    filteredQuestions,
    sessionStats,
    loadProfiles,
    loadSavedAnswers,
    openProfileModal,
    closeProfileModal,
    handleSelectProfile,
    generateQuestions,
    handleGenerateManual,
    openManualModal,
    closeManualModal,
    handleAddCustomQuestion,
    changeTab,
    changeFilter,
    toggleExpand,
    handleMarkComplete,
    handleSaveAnswer,
    handleBookmark,
    handleSetInterviewDate,
    handleStartMock,
    handleNextMockQuestion,
    handleEndMock,
    handleResetMock,
  };
};