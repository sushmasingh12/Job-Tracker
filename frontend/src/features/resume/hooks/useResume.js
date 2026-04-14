import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  fetchResumes,
  uploadResume,
  analyzeResume,
  optimizeResume,
  downloadResume,
  resetUploadState,
  setActiveResumeId,
  clearAnalysis,
  clearOptimizeState,
  selectAllResumes,
  selectListLoading,
  selectListError,
 
  selectUploadLoading,
  selectUploadError,
  selectUploadSuccess,
  selectActiveResumeId,
  selectAnalyzeLoading,
  selectAnalyzeError,
  selectAnalyzeSuccess,
  selectAnalysisResult,
  selectCurrentJobDescription,
  selectOptimizeLoading,
  selectOptimizeError,
  selectOptimizeSuccess,
  selectOptimizedResult,
  selectDownloadLoading,
  selectDownloadError,
  selectDownloadData,
} from "../store/resumeSlice";

const useResume = () => {
  const dispatch = useDispatch();

  const resumes = useSelector(selectAllResumes);
  const listLoading = useSelector(selectListLoading);
  const listError = useSelector(selectListError);



  const uploadLoading = useSelector(selectUploadLoading);
  const uploadError = useSelector(selectUploadError);
  const uploadSuccess = useSelector(selectUploadSuccess);

  const activeResumeId = useSelector(selectActiveResumeId);

  const analyzeLoading = useSelector(selectAnalyzeLoading);
  const analyzeError = useSelector(selectAnalyzeError);
  const analyzeSuccess = useSelector(selectAnalyzeSuccess);
  const analysisResult = useSelector(selectAnalysisResult);
  const currentJobDescription = useSelector(selectCurrentJobDescription);

  const optimizeLoading = useSelector(selectOptimizeLoading);
  const optimizeError = useSelector(selectOptimizeError);
  const optimizeSuccess = useSelector(selectOptimizeSuccess);
  const optimizedResult = useSelector(selectOptimizedResult);

  const downloadLoading = useSelector(selectDownloadLoading);
  const downloadError = useSelector(selectDownloadError);
  const downloadData = useSelector(selectDownloadData);

  useEffect(() => {
    if (!resumes?.length) {
      dispatch(fetchResumes());
    }
  }, [dispatch, resumes?.length]);

 

  const handleUpload = useCallback(
    (file) => {
      if (!file) return Promise.resolve(null);
      return dispatch(uploadResume({ file }));
    },
    [dispatch]
  );

  const handleResetUpload = useCallback(() => {
    dispatch(resetUploadState());
  }, [dispatch]);

  const handleSetActiveResumeId = useCallback(
    (resumeId) => {
      dispatch(setActiveResumeId(resumeId));
    },
    [dispatch]
  );

  const handleAnalyze = useCallback(
    (resumeId, jobDescription, jobTitle = "") => {
      return dispatch(analyzeResume({ resumeId, jobDescription, jobTitle }));
    },
    [dispatch]
  );

  const handleOptimize = useCallback(
    (resumeId, jobDescription, ) => {
      return dispatch(optimizeResume({ resumeId, jobDescription, }));
    },
    [dispatch]
  );

  const handleDownload = useCallback(
    (resumeId, format = "pdf") => {
      return dispatch(downloadResume({ resumeId, format }));
    },
    [dispatch]
  );

  const handleClearAnalysis = useCallback(() => {
    dispatch(clearAnalysis());
  }, [dispatch]);

  const handleClearOptimize = useCallback(() => {
    dispatch(clearOptimizeState());
  }, [dispatch]);

  return {
    resumes,
    listLoading,
    listError,


    uploadLoading,
    uploadError,
    uploadSuccess,

    activeResumeId,

    analyzeLoading,
    analyzeError,
    analyzeSuccess,
    analysisResult,
    currentJobDescription,

    optimizeLoading,
    optimizeError,
    optimizeSuccess,
    optimizedResult,

    downloadLoading,
    downloadError,
    downloadData,

    handleUpload,
    handleResetUpload,
    handleSetActiveResumeId,
    handleAnalyze,
    handleOptimize,
    handleDownload,
    handleClearAnalysis,
    handleClearOptimize,
  };
};

export default useResume;