import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createApplicationThunk } from "../store/applicationsSlice";

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

export const useApplicationForm = (onClose) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
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
      const resultAction = await dispatch(createApplicationThunk(data));

      if (createApplicationThunk.fulfilled.match(resultAction)) {
        reset();
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose?.();
        }, 3000);
      }
    },
    [dispatch, reset, onClose]
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
  };
};