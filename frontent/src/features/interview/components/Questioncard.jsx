import React, { useState } from 'react';

const TYPE_STYLES = {
  behavioral: 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  leadership: 'bg-teal-100 text-teal-700',
  product: 'bg-blue-100 text-blue-700',
  situational: 'bg-pink-100 text-pink-700',
  default: 'bg-neutral-100 text-neutral-600',
};

const DIFFICULTY_STYLES = {
  easy: { dot: 'bg-success', text: 'text-success', label: 'Easy' },
  medium: { dot: 'bg-warning', text: 'text-warning', label: 'Medium' },
  hard: { dot: 'bg-danger', text: 'text-danger', label: 'Hard' },
};

const RATING_OPTIONS = [
  { value: 'confident', label: 'Confident', icon: 'sentiment_very_satisfied', color: 'text-success' },
  { value: 'okay', label: 'Okay', icon: 'sentiment_neutral', color: 'text-warning' },
  { value: 'needs_work', label: 'Needs Work', icon: 'sentiment_dissatisfied', color: 'text-danger' },
];

const QuestionCard = ({
  question,
  index,
  isCompleted,
  isBookmarked,
  savedAnswer,
  onMarkComplete,
  onSaveAnswer,
  onBookmark,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answerText, setAnswerText] = useState(savedAnswer?.text || '');
  const [notes, setNotes] = useState(savedAnswer?.notes || '');
  const [rating, setRating] = useState(savedAnswer?.rating || null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const typeClass =
    TYPE_STYLES[question.type?.toLowerCase()] || TYPE_STYLES.default;
  const diffStyle =
    DIFFICULTY_STYLES[question.difficulty?.toLowerCase()] ||
    DIFFICULTY_STYLES.medium;

  const handleSave = async () => {
    if (!answerText.trim()) return;
    setIsSaving(true);
    await onSaveAnswer(question.id, { text: answerText, notes, rating });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const typeLabel = question.type
    ? question.type.charAt(0).toUpperCase() + question.type.slice(1)
    : 'General';

  return (
    <div
      className={`bg-white rounded-xl border transition-all shadow-sm ${
        isCompleted
          ? 'border-success/30 bg-success/5'
          : 'border-neutral-border hover:shadow-md'
      } ${isExpanded ? 'ring-2 ring-primary/15' : ''}`}
    >
      {/* Card Header (always visible) */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Left meta */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-neutral-100 text-neutral-500 font-mono text-xs px-2 py-1 rounded">
              #{String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeClass}`}
            >
              {typeLabel}
            </span>
            {question.isCustom && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                Custom
              </span>
            )}
          </div>

          {/* Right: difficulty + actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`block w-2 h-2 rounded-full ${diffStyle.dot}`}
              />
              <span className={`text-xs font-medium ${diffStyle.text}`}>
                {diffStyle.label}
              </span>
            </div>

            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(question.id);
              }}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isBookmarked
                  ? 'text-yellow-500 bg-yellow-50'
                  : 'text-neutral-300 hover:text-yellow-400 hover:bg-yellow-50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            {/* Complete */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkComplete(question.id);
              }}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'text-success bg-success/10'
                  : 'text-neutral-300 hover:text-success hover:bg-success/10'
              }`}
              title={isCompleted ? 'Mark as not done' : 'Mark as done'}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </button>
          </div>
        </div>

        {/* Question text */}
        <h3
          className="text-base font-semibold text-neutral-text leading-snug cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {question.question}
        </h3>

        {/* Collapsed footer */}
        {!isExpanded && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-xs text-neutral-muted">
              {question.prepTimeMinutes && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    schedule
                  </span>
                  {question.prepTimeMinutes} min prep
                </span>
              )}
              {savedAnswer && (
                <span className="flex items-center gap-1 text-success">
                  <span className="material-symbols-outlined text-[14px]">
                    check_circle
                  </span>
                  Answer saved
                </span>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-1.5 px-3.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[15px]">
                play_arrow
              </span>
              Practice
            </button>
          </div>
        )}
      </div>

      {/* Expanded Area */}
      {isExpanded && (
        <div className="border-t border-neutral-border">
          {/* Hint */}
          {question.hint && (
            <div className="mx-5 mt-4 p-3.5 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
              <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <p className="text-sm text-amber-800 leading-relaxed">
                {question.hint}
              </p>
            </div>
          )}

          {/* Tags */}
          {question.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-5 mt-3">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Answer Input */}
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-text mb-2 uppercase tracking-wider">
                Your Answer
              </label>
              <textarea
                rows={5}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Write your answer here using the STAR method (Situation, Task, Action, Result)..."
                className="w-full border border-neutral-border rounded-xl p-3.5 text-sm text-neutral-text placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-text mb-2 uppercase tracking-wider">
                Notes / Key Points
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Bullet points, reminders, follow-up items..."
                className="w-full border border-neutral-border rounded-xl p-3 text-sm text-neutral-text placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              />
            </div>

            {/* Self Rating */}
            <div>
              <label className="block text-xs font-semibold text-neutral-text mb-2 uppercase tracking-wider">
                How did you do?
              </label>
              <div className="flex gap-2">
                {RATING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setRating(rating === opt.value ? null : opt.value)
                    }
                    className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                      rating === opt.value
                        ? 'border-neutral-300 bg-neutral-50 shadow-sm'
                        : 'border-neutral-border hover:bg-neutral-50'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[22px] ${opt.color}`}
                    >
                      {opt.icon}
                    </span>
                    <span className="text-neutral-600">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleSave}
                disabled={!answerText.trim() || isSaving}
                className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {isSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                    Saved!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">
                      save
                    </span>
                    Save Answer
                  </>
                )}
              </button>

              <button
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2.5 border border-neutral-border text-neutral-600 rounded-xl hover:bg-neutral-50 text-sm font-medium transition-colors"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;