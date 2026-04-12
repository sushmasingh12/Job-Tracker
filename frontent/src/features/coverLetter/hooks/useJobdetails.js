import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setJobDetails,
    nextStep,
  selectJobDetails,
 } from "../store/coverSlice";



/**
 * Hook for Step 1 – Job Details.
 *
 * React Hook Form handles local validation & dirty-state.
 * On valid submit the data is pushed to Redux and wizard moves forward.
 */
const useJobDetails = () => {
  const dispatch    = useDispatch();
  const savedValues = useSelector(selectJobDetails);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: savedValues,
  });

  // jobType is a button-group (not a native input), keep it in sync manually
  // eslint-disable-next-line react-hooks/incompatible-library
  const jobType = watch("jobType");

  // If user navigates back, restore previously saved values
  useEffect(() => {
    Object.entries(savedValues).forEach(([key, val]) => setValue(key, val));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /** Called on "Next Step" click */
  const onSubmit = handleSubmit((data) => {
    dispatch(setJobDetails(data));
    dispatch(nextStep());
  });

  /** For the custom job-type button group */
  const handleJobTypeChange = (value) => setValue("jobType", value);

  // ── Field registrations ──────────────────────────────────────────────────

  const jobTitleReg = register("jobTitle", {
    required: { value: true, message: "Job title is required" },
    minLength: { value: 2, message: "At least 2 characters" },
  });

  const companyNameReg = register("companyName");

  const locationReg = register("location");

  const industryReg = register("industry");

  const jobDescriptionReg = register("jobDescription", {
    required: { value: true, message: "Job description is required" },
    minLength: { value: 50, message: "Please add more detail (min 50 chars)" },
    maxLength: { value: 5000, message: "Max 5000 characters" },
  });

  const hiringManagerNameReg = register("hiringManagerName");

  // Word count helper
  const jobDescription = watch("jobDescription", "");
  const charCount = jobDescription?.length ?? 0;

  return {
    register,
    errors,
    isValid,
    onSubmit,
    jobType,
    handleJobTypeChange,
    charCount,
    // Named registrations for FormField component
    jobTitleReg,
    companyNameReg,
    locationReg,
    industryReg,
    jobDescriptionReg,
    hiringManagerNameReg,
  };
};

export default useJobDetails;