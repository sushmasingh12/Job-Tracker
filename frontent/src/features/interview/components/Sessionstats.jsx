import React, { useState } from 'react';

const ConfidenceMeter = ({ score }) => {
  const angle = -90 + (score / 100) * 180;

  let label = 'Low';
  let color = 'text-danger';
  if (score >= 60)      { label = 'High';     color = 'text-success'; }
  else if (score >= 30) { label = 'Moderate'; color = 'text-warning'; }

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-text mb-4 flex items-center gap-2">
        Confidence Meter
        <span
          className="material-symbols-outlined text-neutral-400 text-sm cursor-help"
          title="Based on questions practiced"
        >
          help
        </span>
      </h3>
      {/* FIX: h-22 is not a valid Tailwind utility (skips 22 in the default scale).
          Replaced with h-[88px] which is the closest equivalent (22 × 4px = 88px). */}
      <div className="relative flex justify-center pt-4 pb-2">
        <div className="w-44 h-[88px] relative">
          <svg viewBox="0 0 180 100" className="w-full">
            {/* Background arc */}
            <path
              d="M 10 90 A 80 80 0 0 1 170 90"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Color gradient arcs */}
            <path
              d="M 10 90 A 80 80 0 0 1 55 22"
              fill="none"
              stroke="#f87171"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 55 22 A 80 80 0 0 1 125 22"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 125 22 A 80 80 0 0 1 170 90"
              fill="none"
              stroke="#4ade80"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Needle */}
            <g transform={`rotate(${angle}, 90, 90)`}>
              <line
                x1="90" y1="90"
                x2="90" y2="20"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            {/* Center dot */}
            <circle cx="90" cy="90" r="6" fill="#1e293b" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between text-xs text-neutral-muted px-2">
        <span>Low</span>
        <span className={`font-bold ${color}`}>{label}</span>
        <span>High</span>
      </div>
      <p className="text-xs text-neutral-muted text-center mt-2 px-2">
        {score < 30
          ? 'Just getting started! Keep practicing.'
          : score < 60
          ? "You're gaining momentum! Try harder questions."
          : 'Great progress! Almost interview-ready.'}
      </p>
    </div>
  );
};

const SessionStats = ({
  stats,
  questions,
  completedQuestions,
  bookmarkedQuestions,
  onAddCustomQuestion,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customType, setCustomType] = useState('behavioral');

  const progressPercent =
    stats.total > 0 ? Math.round((stats.practiced / stats.total) * 100) : 0;

  const handleAddCustom = () => {
    if (!customText.trim()) return;
    onAddCustomQuestion(customText.trim(), customType);
    setCustomText('');
    setShowCustomInput(false);
  };

  // Recent activity from completed questions (last 3)
  const recentActivity = completedQuestions
    .slice(-3)
    .reverse()
    .map((id) => questions.find((q) => q.id === id))
    .filter(Boolean);

  return (
    <div className="w-72 xl:w-80 bg-neutral-surface border-l border-neutral-border flex flex-col shrink-0 h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-5 border-b border-neutral-border">
        <h2 className="text-base font-bold text-neutral-text">Session Stats</h2>
        <p className="text-xs text-neutral-muted mt-0.5">
          Track your preparation progress
        </p>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-xs font-semibold text-neutral-muted uppercase tracking-wider">
              Questions Practiced
            </span>
            <span className="text-xl font-bold text-neutral-text">
              {stats.practiced}
              <span className="text-sm font-normal text-neutral-muted">
                /{stats.total}
              </span>
            </span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Stat mini cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-xl border border-neutral-border text-center">
              <div className="text-xs text-neutral-muted mb-1">Bookmarked</div>
              <div className="font-bold text-neutral-text flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-yellow-400 text-sm">
                  bookmark
                </span>
                {bookmarkedQuestions?.length || 0}
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-neutral-border text-center">
              <div className="text-xs text-neutral-muted mb-1">Completed</div>
              <div className="font-bold text-success flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-success text-sm">
                  check_circle
                </span>
                {stats.practiced}
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Meter */}
        <ConfidenceMeter score={stats.confidenceScore} />

        {/* Difficulty Breakdown */}
        {questions.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-neutral-text mb-3 uppercase tracking-wider">
              Difficulty Breakdown
            </h3>
            {['easy', 'medium', 'hard'].map((diff) => {
              const total = questions.filter(
                (q) => q.difficulty?.toLowerCase() === diff
              ).length;
              if (total === 0) return null;
              const done = completedQuestions.filter((id) => {
                const q = questions.find((q) => q.id === id);
                return q?.difficulty?.toLowerCase() === diff;
              }).length;
              const colors = {
                easy: 'bg-success',
                medium: 'bg-warning',
                hard: 'bg-danger',
              };
              return (
                <div key={diff} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize font-medium text-neutral-600">
                      {diff}
                    </span>
                    <span className="text-neutral-muted">{done}/{total}</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${colors[diff]}`}
                      style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-neutral-text mb-3 uppercase tracking-wider">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((q) => (
                <div key={q.id} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-success/10 text-success flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-neutral-text line-clamp-1">
                      {q.question}
                    </p>
                    <p className="text-xs text-neutral-muted capitalize">
                      {q.type} • Practiced
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Custom Question */}
      <div className="p-4 border-t border-neutral-border bg-white mt-auto">
        {showCustomInput ? (
          <div className="space-y-2">
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your custom question..."
              className="w-full border border-neutral-border rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              autoFocus
            />
            <select
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="w-full border border-neutral-border rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="behavioral">Behavioral</option>
              <option value="technical">Technical</option>
              <option value="leadership">Leadership</option>
              <option value="product">Product Sense</option>
              <option value="situational">Situational</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleAddCustom}
                disabled={!customText.trim()}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
              >
                Add Question
              </button>
              <button
                onClick={() => { setShowCustomInput(false); setCustomText(''); }}
                className="px-3 py-2 border border-neutral-border text-neutral-600 text-xs rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="w-full bg-white hover:bg-neutral-50 border border-neutral-border text-neutral-text font-medium py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Add Custom Question
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionStats;