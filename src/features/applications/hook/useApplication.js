import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addApplication } from "../store/applicationsSlice";

export const RULES = {
  jobTitle: {
    required: "Job title is required",
    minLength: { value: 2, message: "Minimum 2 characters" },
    maxLength: { value: 120, message: "Maximum 120 characters" },
  },
  company: {
    required: "Company name is required",
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

export const useApplicationForm = () => {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    jobTitle: "",
    company: "",
    location: "",
    applicationDate: new Date().toISOString().split("T")[0],
    status: "Applied", // Fixed: Match STATUS_CONFIG keys (capitalized)
    salaryMin: "",
    salaryMax: "",
    jobPostUrl: "",
    jobDescription: "",
    notes: "",
  });

  const onSubmit = useCallback((data) => {
    try {
      // Create new application object with required fields
      const newApplication = {
        id: Date.now(), // Simple ID generation - consider UUID for production
        role: data.jobTitle,
        company: data.company,
        location: data.location || "Remote",
        workType: "Remote",
        appliedDate: new Date(data.applicationDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }),
        salary: data.salaryMin && data.salaryMax 
          ? `$${Number(data.salaryMin).toLocaleString()} - $${Number(data.salaryMax).toLocaleString()}`
          : data.salaryMin 
            ? `$${Number(data.salaryMin).toLocaleString()}+`
            : data.salaryMax 
              ? `Up to $${Number(data.salaryMax).toLocaleString()}`
              : "Not disclosed",
        status: data.status,
        initial: data.company.charAt(0).toUpperCase(),
        gradientFrom: "from-blue-500",
        gradientTo: "to-purple-500",
        accentColor: "bg-blue-500/80",
        description: data.jobDescription,
        responsibilities: [],
        requirements: [],
        benefits: [],
        matchScore: 0,
        matchLabel: "New",
        matchColor: "text-slate-400",
        statusHistory: [
          { 
            label: "Applied", 
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }), 
            icon: "send", 
            color: "bg-blue-500" 
          },
        ],
      };
      
      // Dispatch action to add application to store
      dispatch(addApplication(newApplication));
      
      // Reset form after successful submission
      reset();
      
      // Return success for caller to handle UI updates
      return { success: true, data: newApplication };
    } catch (err) {
      console.error("Failed to submit application:", err);
      return { success: false, error: err.message };
    }
  }, [dispatch, reset]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    reset,
    errors,
    isSubmitting,
    isDirty,
    isValid,
  };
};
