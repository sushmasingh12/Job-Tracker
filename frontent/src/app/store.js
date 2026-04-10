import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import applicationsReducer from "../features/applications/store/applicationsSlice"
import resumeReducer from "../features/resume/store/resumeSlice";
import coverLetterReducer from "../features/coverLetter/store/coverSlice";
import interviewReducer from "../features/interview/store/interviewSlice";
import settingsReducer from "../features/settings/store/settingsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        applications: applicationsReducer,
        resumes: resumeReducer,
        coverLetter: coverLetterReducer,
        interview: interviewReducer,
        settings: settingsReducer,
    }
});

export default store;

