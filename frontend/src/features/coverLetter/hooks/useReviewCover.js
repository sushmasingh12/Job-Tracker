import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGeneratedLetter,
  downloadCoverLetter,
  generateCoverLetter,
  prevStep,
  selectGeneratedLetter,
  selectLoading,
  selectDownloadLoading,
  selectError,
  selectApplicationId,
} from "../store/coverSlice";
import { saveCoverLetterAPI } from "../services/coverServices";
import { saveApplicationCoverLetterThunk, fetchApplicationByIdThunk  } from "../../applications/store/applicationsSlice";


const useReviewCover = () => {
  const dispatch = useDispatch();
  const generatedLetter = useSelector(selectGeneratedLetter);
  const loading = useSelector(selectLoading);
  const downloadLoading = useSelector(selectDownloadLoading);
  const error = useSelector(selectError);
  const applicationId = useSelector(selectApplicationId);

  const editorRef = useRef(null);
  const isInternalUpdate = useRef(false);
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    if (editorRef.current) {
      editorRef.current.innerHTML = generatedLetter
        ? generatedLetter.replace(/\n/g, "<br/>")
        : "";
    }
  }, [generatedLetter]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      dispatch(setGeneratedLetter(editorRef.current.innerText));
    }
  };

  const handleCopy = async () => {
    const text = editorRef.current?.innerText ?? generatedLetter;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format) => dispatch(downloadCoverLetter({ format }));
  const handleRegenerate = () => dispatch(generateCoverLetter());
  const handleBack = () => dispatch(prevStep());

  const handleSave = async () => {
    setSaveStatus("saving");

    try {
      if (applicationId) {
        await dispatch(
          saveApplicationCoverLetterThunk({
            id: applicationId,
            content: generatedLetter,
          })
        ).unwrap();

        await dispatch(fetchApplicationByIdThunk(applicationId)).unwrap();
      }

      await saveCoverLetterAPI({
        applicationId,
        content: generatedLetter,
      });

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const wordCount = generatedLetter
    ? generatedLetter.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return {
    generatedLetter,
    editorRef,
    handleEditorInput,
    loading,
    downloadLoading,
    error,
    copied,
    saveStatus,
    wordCount,
    handleCopy,
    handleDownload,
    handleRegenerate,
    handleBack,
    handleSave,
  };
};

export default useReviewCover;