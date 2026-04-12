import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createApplicationThunk,
  updateApplicationThunk,
} from "../store/applicationsSlice";

export const RULES = {
  jobTitle: {
    required: "Job title is required",
    minLength: { value: 2, message: "Minimum 2 characters" },
    maxLength: { value: 120, message: "Maximum 120 characters" },
  },
  company: {
    minLength: { value: 2, message: "Minimum 2 characters" },
  },
  applicationDate: {
    required: "Application date is required",
  },
  status: {
    required: "Please select a status",
  },
  salaryMin: {
    min: { value: 0, message: "Cannot be negative" },
    validate: (v, vals) =>
      !v ||
      !vals.salaryMax ||
      Number(v) <= Number(vals.salaryMax) ||
      "Min must be ≤ Max",
  },
  salaryMax: {
    min: { value: 0, message: "Cannot be negative" },
    validate: (v, vals) =>
      !v ||
      !vals.salaryMin ||
      Number(v) >= Number(vals.salaryMin) ||
      "Max must be ≥ Min",
  },
  jobPostUrl: {
    pattern: {
      value: /^$|^https?:\/\/.+/,
      message: "Must start with https://",
    },
  },
  jobDescription: {
    required: "Job description is required",
    minLength: { value: 20, message: "Add at least 20 characters" },
    maxLength: { value: 5000, message: "Maximum 5000 characters" },
  },
  notes: {
    maxLength: { value: 1000, message: "Maximum 1000 characters" },
  },
};

// Converts ISO date string → "YYYY-MM-DD" for <input type="date">
const toDateInputValue = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
  return d.toISOString().split("T")[0];
};

/**
 * @param {Function} onClose   - callback to close the modal
 * @param {Object}  [editData] - pre-filled app object (transformed) when editing
 */
export const useApplicationForm = (onClose, editData = null) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const isEditMode = Boolean(editData?.id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: isEditMode
      ? {
        jobTitle: editData.role || "",
        company: editData.company || "",
        location: editData.location !== "Not specified" ? editData.location : "",
        workType: editData.workType || "On-site",
        applicationDate: toDateInputValue(editData.applicationDate),
        status: editData.status || "Applied",
        // salaryRange is stored as a formatted string on the backend;
        // individual min/max cannot be reliably recovered — left blank
        salaryMin: "",
        salaryMax: "",
        jobPostUrl: editData.jobPostUrl || "",
        jobDescription: editData.jobDescription || "",
        notes: editData.notes || "",
      }
      : {
        jobTitle: "",
        company: "",
        location: "",
        workType: "On-site",
        applicationDate: new Date().toISOString().split("T")[0],
        status: "Applied",
        salaryMin: "",
        salaryMax: "",
        jobPostUrl: "",
        jobDescription: "",
        notes: "",
      },
  });

  const onSubmit = useCallback(
    async (data) => {
      let resultAction;

      if (isEditMode) {
        resultAction = await dispatch(
          updateApplicationThunk({ id: editData.id, formData: data })
        );
      } else {
        resultAction = await dispatch(createApplicationThunk(data));
      }

      const thunk = isEditMode ? updateApplicationThunk : createApplicationThunk;

      if (thunk.fulfilled.match(resultAction)) {
        reset();
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose?.();
        }, 2000);
      }
    },
    [dispatch, reset, onClose, isEditMode, editData]
  );

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    reset,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    showToast,
    isEditMode,
  };
};