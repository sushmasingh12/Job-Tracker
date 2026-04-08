import React, { useState } from 'react';

// Color map for job status badges
const STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-700',
  'Phone Screen': 'bg-yellow-100 text-yellow-700',
  Interview: 'bg-purple-100 text-purple-700',
  'Final Round': 'bg-primary-light text-primary-dark',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
  default: 'bg-neutral-100 text-neutral-600',
};

const CountdownTimer = ({ countdown }) => {
  if (!countdown) return null;

  if (countdown.expired) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-red-500">event_busy</span>
        <div>
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">
            Interview Passed
          </p>
          <p className="text-sm text-neutral-muted">How did it go?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 min-w-[270px]">
      <div className="p-2 bg-primary/10 rounded-full text-primary shrink-0">
        <span className="material-symbols-outlined">timer</span>
      </div>
      <div>
        <p className="text-xs font-semibold text-primary uppercase tracking-wide">
          Interview In
        </p>
        <div className="text-xl font-bold text-neutral-text font-mono flex gap-1 items-end">
          <span>{String(countdown.days).padStart(2, '0')}</span>
          <span className="text-sm font-normal text-neutral-muted mb-0.5">d</span>
          <span>:</span>
          <span>{String(countdown.hours).padStart(2, '0')}</span>
          <span className="text-sm font-normal text-neutral-muted mb-0.5">h</span>
          <span>:</span>
          <span>{String(countdown.minutes).padStart(2, '0')}</span>
          <span className="text-sm font-normal text-neutral-muted mb-0.5">m</span>
        </div>
      </div>
    </div>
  );
};

const InterviewHeader = ({
  profile,
  onSelectProfile,
  countdown,
  interviewDate,
  onSetInterviewDate,
}) => {
  const [showDateInput, setShowDateInput] = useState(false);

  const handleDateChange = (e) => {
    onSetInterviewDate(e.target.value);
    setShowDateInput(false);
  };

  const statusClass =
    STATUS_COLORS[profile?.status] || STATUS_COLORS.default;

  return (
    <div className="bg-white border-b border-neutral-border p-6">
      <div className="mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          {/* Left: Profile Info */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-border shrink-0">
              <span className="material-symbols-outlined text-3xl text-neutral-muted">
                {profile ? 'business' : 'work'}
              </span>
            </div>

            {profile ? (
              <div>
                <h1 className="text-2xl font-bold text-neutral-text leading-tight">
                  {profile.jobTitle}
                </h1>
                <div className="flex items-center gap-2 text-neutral-muted mt-1 text-sm">
                  <span className="font-medium text-neutral-600">
                    {profile.company}
                  </span>
                  {profile.location && (
                    <>
                      <span className="text-xs">•</span>
                      <span>{profile.location}</span>
                    </>
                  )}
                </div>

                <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                  {profile.status && (
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusClass}`}
                    >
                      {profile.status}
                    </span>
                  )}

                  {/* Set interview date */}
                  {showDateInput ? (
                    <input
                      type="datetime-local"
                      className="text-xs border border-neutral-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      defaultValue={interviewDate || ''}
                      onChange={handleDateChange}
                      onBlur={() => setShowDateInput(false)}
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => setShowDateInput(true)}
                      className="px-2.5 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-medium rounded-full transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[11px]">
                        calendar_today
                      </span>
                      {interviewDate ? 'Change Date' : 'Set Interview Date'}
                    </button>
                  )}

                  <button
                    onClick={onSelectProfile}
                    className="px-2.5 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-medium rounded-full transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[11px]">
                      swap_horiz
                    </span>
                    Change Profile
                  </button>
                </div>
              </div>
            ) : (
              /* No profile selected */
              <div>
                <h1 className="text-2xl font-bold text-neutral-text">
                  Interview Prep
                </h1>
                <p className="text-neutral-muted text-sm mt-1">
                  Select a job to start preparing
                </p>
                <button
                  onClick={onSelectProfile}
                  className="mt-2.5 px-4 py-1.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    add
                  </span>
                  Select Job Profile
                </button>
              </div>
            )}
          </div>

          {/* Right: Countdown Timer */}
          {profile && (
            <div>
              {countdown ? (
                <CountdownTimer countdown={countdown} />
              ) : (
                <button
                  onClick={() => setShowDateInput(true)}
                  className="bg-neutral-50 border border-dashed border-neutral-300 rounded-xl p-4 flex items-center gap-3 hover:border-primary hover:bg-blue-50 transition-all group min-w-[220px]"
                >
                  <div className="p-2 bg-neutral-100 rounded-full group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-neutral-400 group-hover:text-primary transition-colors">
                      calendar_today
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-neutral-500 group-hover:text-primary uppercase tracking-wide transition-colors">
                      Set Interview Date
                    </p>
                    <p className="text-sm text-neutral-400">
                      Track your countdown
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewHeader;