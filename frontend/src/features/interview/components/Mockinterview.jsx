import { useState } from 'react';

const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;
  const isLow = timeLeft <= 30;

  return (
    <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center">
      <svg className="w-16 h-16 sm:w-24 sm:h-24 -rotate-90" viewBox="0 0 96 96">
        {/* Track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={isLow ? '#ef4444' : '#6366f1'}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <span className={`text-sm sm:text-xl font-bold font-mono ${isLow ? 'text-danger' : 'text-neutral-text'}`}>
          {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
          {String(timeLeft % 60).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const TYPE_COLOR = {
  behavioral: 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  leadership: 'bg-teal-100 text-teal-700',
  product: 'bg-blue-100 text-blue-700',
  situational: 'bg-pink-100 text-pink-700',
  default: 'bg-neutral-100 text-neutral-600',
};

const MockInterview = ({
  questions,
  mockSession,
  onStart,
  onNext,
  onEnd,
  onReset,
}) => {
  const [currentResponse, setCurrentResponse] = useState('');
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[mockSession.currentIndex];
  const typeClass =
    TYPE_COLOR[currentQuestion?.type?.toLowerCase()] || TYPE_COLOR.default;

  // No questions
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4 sm:px-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary">
            video_camera_front
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-neutral-text mb-2">
          No questions yet
        </h3>
        <p className="text-sm text-neutral-muted max-w-sm">
          Generate questions in the Practice tab first, then come back to run a
          mock interview session.
        </p>
      </div>
    );
  }

  // Session complete
  if (mockSession.isComplete) {
    const answeredCount = Object.keys(mockSession.responses).length;
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-success/10 rounded-full flex items-center justify-center mb-4 sm:mb-5">
          <span className="material-symbols-outlined text-3xl sm:text-4xl text-success">
            military_tech
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-text mb-2">
          Mock Interview Complete!
        </h2>
        <p className="text-neutral-muted mb-6 sm:mb-8 max-w-sm text-sm sm:text-base">
          You answered {answeredCount} out of {questions.length} questions.
          Great job practicing under pressure!
        </p>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-[240px] sm:max-w-xs">
          <div className="bg-white border border-neutral-border rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-primary">{answeredCount}</p>
            <p className="text-xs text-neutral-muted">Answered</p>
          </div>
          <div className="bg-white border border-neutral-border rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xl sm:text-2xl font-bold text-neutral-text">
              {questions.length - answeredCount}
            </p>
            <p className="text-xs text-neutral-muted">Skipped</p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={onReset}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
          <button
            onClick={onReset}
            className="border border-neutral-border text-neutral-text font-medium py-2.5 px-6 rounded-xl hover:bg-neutral-50 transition-colors text-sm sm:text-base"
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  // Not started
  if (!mockSession.isActive) {
    return (
      <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 text-center shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5">
            <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary">
              video_camera_front
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-text mb-2">
            Mock Interview Session
          </h2>
          <p className="text-neutral-muted text-sm mb-5 sm:mb-6 max-w-sm mx-auto">
            Answer each question with a 2-minute timer. Simulate real interview
            conditions for better preparation.
          </p>

          {/* Rules */}
          <div className="bg-neutral-50 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 text-left space-y-2">
            {[
              { icon: 'timer', text: `${questions.length} questions • 2 min each` },
              { icon: 'mic_off', text: 'Speak or type your answers' },
              { icon: 'skip_next', text: 'Skip questions if stuck' },
              { icon: 'psychology', text: 'Try to answer naturally' },
            ].map((rule) => (
              <div key={rule.icon} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  {rule.icon}
                </span>
                <span className="text-sm text-neutral-600">{rule.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 sm:px-10 rounded-xl transition-colors text-sm sm:text-base"
          >
            Start Mock Interview
          </button>
        </div>
      </div>
    );
  }

  // Active session
  const handleNext = () => {
    onNext(currentResponse.trim() || null);
    setCurrentResponse('');
    setShowHint(false);
  };

  return (
    <div className="p-3 sm:p-6 max-w-2xl mx-auto space-y-3 sm:space-y-4">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-neutral-muted mb-1.5">
          <span>
            Question {mockSession.currentIndex + 1} of {questions.length}
          </span>
          <span>{questions.length - mockSession.currentIndex - 1} remaining</span>
        </div>
        <div className="w-full bg-neutral-100 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((mockSession.currentIndex + 1) / questions.length) * 100
                }%`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-neutral-border rounded-2xl shadow-sm overflow-hidden">
        {/* Top: type + timer */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-border">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span
              className={`text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap ${typeClass}`}
            >
              {currentQuestion?.type || 'General'}
            </span>
            <span className="text-xs text-neutral-muted capitalize hidden sm:inline">
              {currentQuestion?.difficulty} difficulty
            </span>
          </div>
          <CircularTimer
            timeLeft={mockSession.timeLeftSeconds}
            totalTime={120}
          />
        </div>

        {/* Question */}
        <div className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-neutral-text leading-snug mb-4">
            {currentQuestion?.question}
          </h2>

          {/* Hint toggle */}
          {currentQuestion?.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-primary hover:text-primary-dark flex items-center gap-1 mb-4 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                {showHint ? 'visibility_off' : 'tips_and_updates'}
              </span>
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
          )}

          {showHint && currentQuestion?.hint && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4 flex gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[16px] shrink-0">
                tips_and_updates
              </span>
              <p className="text-xs text-amber-800">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Answer textarea */}
          <textarea
            rows={5}
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Type your answer here... (or speak aloud and note key points)"
            className="w-full border border-neutral-border rounded-xl p-3 sm:p-4 text-sm text-neutral-text placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-4 sm:px-6 pb-4 sm:pb-6 gap-3">
          <button
            onClick={onEnd}
            className="text-xs text-neutral-muted hover:text-danger transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">stop</span>
            <span className="hidden sm:inline">End Session</span>
            <span className="sm:hidden">End</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleNext}
              className="px-3 sm:px-4 py-2 sm:py-2.5 border border-neutral-border text-neutral-600 text-xs sm:text-sm font-medium rounded-xl hover:bg-neutral-50 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl transition-colors flex items-center gap-1 sm:gap-2"
            >
              Next
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
