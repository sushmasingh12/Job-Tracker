import { useInterview } from "../hook/useInterview";
import GeneratePanel from "./Generatepanel";
import InterviewHeader from "./Interviewheader";
import MockInterview from "./Mockinterview";
import MyAnswers from "./Myanswers";
import QuestionFilters from "./Questionfilters";
import SessionStats from "./Sessionstats";
import ManualProfileModal from "./ManualProfileModal";
import QuestionCard from "./Questioncard";
import ProfileSelectorModal from "./Profileselectormodal";



const TABS = [
  { id: 'practice', label: 'Practice Questions', icon: 'quiz' },
  { id: 'mock', label: 'Mock Interview', icon: 'video_camera_front' },
  { id: 'answers', label: 'My Answers', icon: 'folder_special' },
];

const EmptyPracticeState = () => (
  <div className="p-6">
    <div className="bg-white border border-dashed border-neutral-border rounded-2xl p-10 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-3xl">work</span>
      </div>
      <h2 className="text-xl font-bold text-neutral-text mb-2">Select a job profile</h2>
      <p className="text-sm text-neutral-muted mb-6">
        Pick a saved application first, then generate tailored interview questions.
      </p>
      
    </div>
  </div>
);

const Interview = () => {
  const {
    selectedProfile,
    showProfileModal,
    profiles,
    profilesLoading,
    questionsLoading,
    questions,
    filteredQuestions,
    savedAnswers,
    completedQuestions,
    bookmarkedQuestions,
    activeTab,
    activeFilter,
    mockSession,
    countdown,
    interviewDate,
    sessionStats,
    error,
    openProfileModal,
    closeProfileModal,
    openManualModal,
    closeManualModal,
    showManualModal,
    handleSelectProfile,
    handleGenerateManual,
    generateQuestions,
    changeTab,
    changeFilter,
    handleMarkComplete,
    handleSaveAnswer,
    handleBookmark,
    handleSetInterviewDate,
    handleStartMock,
    handleNextMockQuestion,
    handleEndMock,
    handleResetMock,
    handleAddCustomQuestion,
    handleBack,
  } = useInterview();

  const renderPracticeTab = () => {
    if (!selectedProfile) {
      return <EmptyPracticeState onSelectProfile={openProfileModal} />;
    }

    return (
      <div className="p-6 space-y-6">
        <GeneratePanel
          profile={selectedProfile}
          questionsCount={questions.length}
          loading={questionsLoading}
          onGenerate={generateQuestions}
        />

        {questions.length > 0 && (
          <QuestionFilters
            activeFilter={activeFilter}
            onFilterChange={changeFilter}
            questions={questions}
            bookmarkedCount={bookmarkedQuestions.length}
          />
        )}

        {questionsLoading ? (
          <div className="bg-white border border-neutral-border rounded-2xl p-8 text-center text-sm text-neutral-muted">
            Generating interview questions...
          </div>
        ) : filteredQuestions.length > 0 ? (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                isCompleted={completedQuestions.includes(question.id)}
                isBookmarked={bookmarkedQuestions.includes(question.id)}
                savedAnswer={savedAnswers[question.id]}
                onMarkComplete={handleMarkComplete}
                onSaveAnswer={handleSaveAnswer}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        ) : questions.length > 0 ? (
          <div className="bg-white border border-neutral-border rounded-2xl p-8 text-center text-sm text-neutral-muted">
            No questions match this filter.
          </div>
        ) : (
          <div className="bg-white border border-neutral-border rounded-2xl p-8 text-center text-sm text-neutral-muted">
            Generate your first set of interview questions to begin practice.
          </div>
        )}
      </div>
    );
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'mock':
        return (
          <MockInterview
            questions={questions}
            mockSession={mockSession}
            onStart={handleStartMock}
            onNext={handleNextMockQuestion}
            onEnd={handleEndMock}
            onReset={handleResetMock}
          />
        );
     
      case 'answers':
        return <MyAnswers questions={questions} savedAnswers={savedAnswers} />;
      case 'practice':
      default:
        return renderPracticeTab();
    }
  };

  return (
    <div className="flex-1 min-w-0 bg-background-light flex h-full overflow-hidden">
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <InterviewHeader
          profile={selectedProfile}
          onSelectProfile={openProfileModal}
          onOpenManual={openManualModal}
          onBack={handleBack}
          countdown={countdown}
          interviewDate={interviewDate}
          onSetInterviewDate={handleSetInterviewDate}
        />

        <div className="bg-white border-b border-neutral-border sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav aria-label="Interview tabs" className="flex gap-6 overflow-x-auto">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => changeTab(tab.id)}
                    className={`border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-neutral-muted hover:text-neutral-text hover:border-neutral-300'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">{renderMainContent()}</div>
      </div>

      <SessionStats
        stats={sessionStats}
        questions={questions}
        completedQuestions={completedQuestions}
        bookmarkedQuestions={bookmarkedQuestions}
        onAddCustomQuestion={handleAddCustomQuestion}
      />

      {showProfileModal && (
        <ProfileSelectorModal
          profiles={profiles}
          loading={profilesLoading}
          selectedProfile={selectedProfile}
          onSelect={handleSelectProfile}
          onClose={closeProfileModal}
        />
      )}

      {showManualModal && (
        <ManualProfileModal
          loading={questionsLoading}
          onGenerate={handleGenerateManual}
          onClose={closeManualModal}
        />
      )}
    </div>
  );
};

export default Interview;