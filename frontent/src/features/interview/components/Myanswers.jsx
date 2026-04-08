import React, { useState } from 'react';

const RATING_MAP = {
  confident: {
    label: 'Confident',
    icon: 'sentiment_very_satisfied',
    color: 'text-success bg-success/10',
  },
  okay: {
    label: 'Okay',
    icon: 'sentiment_neutral',
    color: 'text-warning bg-warning/10',
  },
  needs_work: {
    label: 'Needs Work',
    icon: 'sentiment_dissatisfied',
    color: 'text-danger bg-danger/10',
  },
};

const TYPE_COLOR = {
  behavioral: 'bg-purple-100 text-purple-700',
  technical: 'bg-orange-100 text-orange-700',
  leadership: 'bg-teal-100 text-teal-700',
  product: 'bg-blue-100 text-blue-700',
  situational: 'bg-pink-100 text-pink-700',
  default: 'bg-neutral-100 text-neutral-600',
};

const AnswerCard = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeClass =
    TYPE_COLOR[question.type?.toLowerCase()] || TYPE_COLOR.default;
  const ratingInfo = answer.rating ? RATING_MAP[answer.rating] : null;
  const savedDate = answer.savedAt
    ? new Date(answer.savedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeClass}`}
              >
                {question.type || 'General'}
              </span>
              {ratingInfo && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${ratingInfo.color}`}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {ratingInfo.icon}
                  </span>
                  {ratingInfo.label}
                </span>
              )}
              {savedDate && (
                <span className="text-xs text-neutral-muted">{savedDate}</span>
              )}
            </div>
            <p className="text-sm font-semibold text-neutral-text line-clamp-2">
              {question.question}
            </p>
          </div>
          <span className="material-symbols-outlined text-neutral-muted text-[20px] shrink-0 mt-1">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {/* Answer preview (collapsed) */}
        {!isExpanded && answer.text && (
          <p className="text-xs text-neutral-muted mt-2 line-clamp-2">
            {answer.text}
          </p>
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-neutral-border p-5 space-y-4 bg-neutral-50">
          <div>
            <p className="text-xs font-semibold text-neutral-text uppercase tracking-wider mb-2">
              Your Answer
            </p>
            <div className="bg-white border border-neutral-border rounded-lg p-4">
              <p className="text-sm text-neutral-text leading-relaxed whitespace-pre-wrap">
                {answer.text}
              </p>
            </div>
          </div>

          {answer.notes && (
            <div>
              <p className="text-xs font-semibold text-neutral-text uppercase tracking-wider mb-2">
                Notes
              </p>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p className="text-sm text-amber-800 whitespace-pre-wrap">
                  {answer.notes}
                </p>
              </div>
            </div>
          )}

          {question.hint && (
            <div>
              <p className="text-xs font-semibold text-neutral-text uppercase tracking-wider mb-2">
                Tip
              </p>
              <p className="text-xs text-neutral-muted">{question.hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MyAnswers = ({ questions, savedAnswers }) => {
  const [filterRating, setFilterRating] = useState('all');

  // Get questions that have saved answers
  const answeredQuestions = questions.filter(
    (q) => savedAnswers[q.id]?.text
  );

  const filteredAnswers = answeredQuestions.filter((q) => {
    if (filterRating === 'all') return true;
    return savedAnswers[q.id]?.rating === filterRating;
  });

  if (answeredQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-neutral-400">
            edit_note
          </span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-text mb-2">
          No saved answers yet
        </h3>
        <p className="text-sm text-neutral-muted max-w-sm">
          Practice questions in the Practice tab and save your answers. They'll
          all appear here for review.
        </p>
      </div>
    );
  }

  const needsWorkCount = answeredQuestions.filter(
    (q) => savedAnswers[q.id]?.rating === 'needs_work'
  ).length;

  return (
    <div className="p-6 space-y-5">
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            id: 'all',
            label: 'Total Answered',
            count: answeredQuestions.length,
            icon: 'edit_note',
            color: 'text-primary bg-primary/10',
          },
          {
            id: 'confident',
            label: 'Confident',
            count: answeredQuestions.filter(
              (q) => savedAnswers[q.id]?.rating === 'confident'
            ).length,
            icon: 'sentiment_very_satisfied',
            color: 'text-success bg-success/10',
          },
          {
            id: 'needs_work',
            label: 'Needs Work',
            count: needsWorkCount,
            icon: 'sentiment_dissatisfied',
            color: 'text-danger bg-danger/10',
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilterRating(item.id)}
            className={`p-3.5 rounded-xl border text-center transition-all ${
              filterRating === item.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'bg-white border-neutral-border hover:bg-neutral-50'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${item.color} rounded-full p-1 inline-block mb-1`}
            >
              {item.icon}
            </span>
            <p className="text-xl font-bold text-neutral-text">{item.count}</p>
            <p className="text-xs text-neutral-muted">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Focus Alert */}
      {needsWorkCount > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-red-400 text-[18px] mt-0.5 shrink-0">
            priority_high
          </span>
          <div>
            <p className="text-sm font-semibold text-red-700">
              {needsWorkCount} question{needsWorkCount > 1 ? 's' : ''} need
              more practice
            </p>
            <p className="text-xs text-red-500 mt-0.5">
              Focus on these before your interview to build confidence.
            </p>
          </div>
        </div>
      )}

      {/* Answer Cards */}
      <div className="space-y-3">
        {filteredAnswers.length === 0 ? (
          <div className="text-center py-8 text-neutral-muted text-sm">
            No answers with this rating yet.
          </div>
        ) : (
          filteredAnswers.map((q) => (
            <AnswerCard key={q.id} question={q} answer={savedAnswers[q.id]} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyAnswers;