import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
  selectCurrentStep,
  selectLoading,
  selectError,
  generateCoverLetter,
  selectJobDetails,
  selectExperience,
  selectTone,
  selectApplicationId,
} from "../store/coverSlice";

const useCoverLetter = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(selectCurrentStep);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const jobDetails = useSelector(selectJobDetails);
  const experience = useSelector(selectExperience);
  const tone = useSelector(selectTone);
  const applicationId = useSelector(selectApplicationId);

  const goNext = () => dispatch(nextStep());
  const goBack = () => dispatch(prevStep());

  const handleGenerate = () =>
    dispatch(generateCoverLetter({ jobDetails, experience, tone, applicationId }));

  return {
    currentStep,
    loading,
    error,
    goNext,
    goBack,
    handleGenerate,
  };
};

export default useCoverLetter;