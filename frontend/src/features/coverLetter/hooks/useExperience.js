import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setExperiences,
  addSkill,
  removeSkill,
  setEducation,
  nextStep,
  prevStep,
  selectExperience,
} from "../store/coverSlice";


/**
 * Hook for Step 2 – Experience.
 *
 * - useFieldArray manages the dynamic experience cards
 * - Skills are managed separately (tag-input pattern)
 * - Education fields use standard register
 * - On submit everything is pushed to Redux
 */
const useExperience = () => {
  const dispatch = useDispatch();
  const savedExp = useSelector(selectExperience);

  const [skillInput, setSkillInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      experiences: savedExp.experiences.length
        ? savedExp.experiences
        : [{ title: "", company: "", duration: "", achievement: "" }],
      education: savedExp.education,
    },
  });

  // Dynamic experience rows
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  // Keep skills from Redux
  const skills = savedExp.skills;

  // ── Skill tag input ──────────────────────────────────────────────────────

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skillInput.trim()) {
        dispatch(addSkill(skillInput.trim()));
        setSkillInput("");
      }
    }
  };

  const handleAddSuggestedSkill = (skill) => dispatch(addSkill(skill));
  const handleRemoveSkill = (skill) => dispatch(removeSkill(skill));

  // ── Add / Remove experience row ──────────────────────────────────────────

  const handleAddExperience = () =>
    append({ title: "", company: "", duration: "", achievement: "" });

  const handleRemoveExperience = (index) => {
    if (fields.length > 1) remove(index);
  };

  // ── Submit ───────────────────────────────────────────────────────────────

  const onSubmit = handleSubmit((data) => {
    // Save experiences and education to Redux
    dispatch(
      setExperiences(
        data.experiences.map((exp, i) => ({ ...exp, id: fields[i]?.id ?? i + 1 }))
      )
    );
    dispatch(setEducation(data.education));
    dispatch(nextStep());
  });

  const handleBack = () => dispatch(prevStep());

  // ── Per-field registrations ──────────────────────────────────────────────

  const getExpRegistration = (index) => ({
    titleReg: register(`experiences.${index}.title`),
    companyReg: register(`experiences.${index}.company`),
    durationReg: register(`experiences.${index}.duration`),
    achievementReg: register(`experiences.${index}.achievement`),
  });

  const educationReg = {
    degreeReg: register("education.degree"),
    institutionReg: register("education.institution"),
    graduationYearReg: register("education.graduationYear"),
    gpaReg: register("education.gpa"),
  };

  return {
    // Field array
    fields,
    handleAddExperience,
    handleRemoveExperience,
    getExpRegistration,
    // Skills
    skills,
    skillInput,
    setSkillInput,
    handleSkillKeyDown,
    handleAddSuggestedSkill,
    handleRemoveSkill,
    // Education
    educationReg,
    // Form
    errors,
    onSubmit,
    handleBack,
  };
};

export default useExperience;