import { useDispatch, useSelector } from "react-redux";
import { setTone,
  nextStep,
  prevStep,
  selectTone,} from "../store/coverSlice";


/**
 * Hook for Step 3 – Choose Tone.
 * Simple selection that is persisted directly to Redux on change.
 */
const useCoverTone = () => {
  const dispatch      = useDispatch();
  const selectedTone  = useSelector(selectTone);

  const handleToneChange = (value) => dispatch(setTone(value));

  const handleNext = () => dispatch(nextStep());
  const handleBack = () => dispatch(prevStep());

  return {
    selectedTone,
    handleToneChange,
    handleNext,
    handleBack,
  };
};

export default useCoverTone;