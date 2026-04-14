import { useState, useEffect, useMemo } from 'react';
import { useInterview } from '../hook/useInterview';

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
  const ratingInfo = answer?.rating ? RATING_MAP[answer.rating] : null;
  const savedDate = answer?.savedAt
    ? new Date(answer.savedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : null;

  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${isExpanded ? 'ring-1 ring-primary/20 shadow-md' : 'border-neutral-border hover:shadow-md'}`}>
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
              {ratingInfo ? (
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${ratingInfo.color}`}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {ratingInfo.icon}
                  </span>
                  {ratingInfo.label}
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                  Not Answered
                </span>
              )}
              {savedDate && (
                <span className="text-xs text-neutral-muted">{savedDate}</span>
              )}
            </div>
            <p className="text-sm font-semibold text-neutral-text">
              {question.question}
            </p>
          </div>
          <span className="material-symbols-outlined text-neutral-muted text-[20px] shrink-0 mt-1">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </div>

        {/* Answer preview (collapsed) */}
        {!isExpanded && answer?.text && (
          <p className="text-xs text-neutral-muted mt-2 line-clamp-2">
            {answer.text}
          </p>
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-neutral-border p-5 space-y-4 bg-neutral-50">
          {answer?.text ? (
            <div>
              <p className="text-xs font-semibold text-neutral-text uppercase tracking-wider mb-2">
                Your Answer
              </p>
              <div className="bg-white border border-neutral-border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-neutral-text leading-relaxed whitespace-pre-wrap">
                  {answer.text}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-center">
              <p className="text-xs font-medium text-amber-700">You haven't practiced this question yet.</p>
            </div>
          )}

          {answer?.notes && (
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
                Preparation Tip
              </p>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">lightbulb</span>
                <p className="text-xs text-neutral-muted leading-relaxed">{question.hint}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MyAnswers = () => {
  const { history, historyLoading, loadHistory } = useInterview();
  const [filterRating, setFilterRating] = useState('all');
  const [profileIdFilter, setProfileIdFilter] = useState('all');

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Extract unique profiles from history
  const historyProfiles = useMemo(() => {
    const profiles = history.map(session => {
      const id = session.isManual ? `manual-${session.jobTitleManual}` : session.job?._id;
      const title = session.isManual ? session.jobTitleManual : session.job?.jobTitle;
      const company = session.isManual ? 'Self-Practice' : session.job?.company;
      return { id, title, company };
    });

    // Remove duplicates
    const seen = new Set();
    return profiles.filter(p => {
      const duplicate = seen.has(p.id);
      seen.add(p.id);
      return !duplicate;
    });
  }, [history]);

  // Flatten questions and map answers
  const allData = useMemo(() => {
    const list = [];
    history.forEach(session => {
      const profileId = session.isManual ? `manual-${session.jobTitleManual}` : session.job?._id;
      const profileTitle = session.isManual ? session.jobTitleManual : session.job?.jobTitle;

      session.questions.forEach(q => {
        const answer = session.answers.find(a => a.questionId === q.id);
        list.push({
          ...q,
          sessionProfileId: profileId,
          profileTitle,
          answer
        });
      });
    });
    return list;
  }, [history]);

  const filteredData = allData.filter((item) => {
    const matchesProfile = profileIdFilter === 'all' || item.sessionProfileId === profileIdFilter;
    const matchesRating = filterRating === 'all' || item.answer?.rating === filterRating;
    return matchesProfile && matchesRating;
  });

  const stats = useMemo(() => {
    const answered = allData.filter(d => d.answer?.text).length;
    const confident = allData.filter(d => d.answer?.rating === 'confident').length;
    const needsWork = allData.filter(d => d.answer?.rating === 'needs_work').length;
    return { answered, confident, needsWork };
  }, [allData]);

  if (historyLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-neutral-muted">Loading your question gallery...</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-neutral-400">
            edit_note
          </span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-text mb-2">
          Your question gallery is empty
        </h3>
        <p className="text-sm text-neutral-muted max-w-sm">
          Generate interview questions in the Practice tab. Once generated, they'll appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-text">Saved Question Gallery</h2>
          <p className="text-xs text-neutral-muted">All your generated questions across all roles</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={profileIdFilter}
              onChange={(e) => setProfileIdFilter(e.target.value)}
              className="appearance-none bg-white border border-neutral-border rounded-lg pl-3 pr-10 py-2 text-sm text-neutral-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[200px]"
            >
              <option value="all">All Job Profiles</option>
              {historyProfiles.map(p => (
                <option key={p.id} value={p.id}>{p.title} ({p.company})</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-muted pointer-events-none text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            id: 'all',
            label: 'Total Answered',
            count: stats.answered,
            icon: 'edit_note',
            color: 'text-primary bg-primary/10',
          },
          {
            id: 'confident',
            label: 'Confident',
            count: stats.confident,
            icon: 'sentiment_very_satisfied',
            color: 'text-success bg-success/10',
          },
          {
            id: 'needs_work',
            label: 'Needs Work',
            count: stats.needsWork,
            icon: 'sentiment_dissatisfied',
            color: 'text-danger bg-danger/10',
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilterRating(item.id)}
            className={`p-3.5 rounded-xl border text-center transition-all ${filterRating === item.id
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

      {/* Answer Cards */}
      <div className="space-y-3">
        {filteredData.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-border rounded-2xl py-12 text-center">
            <p className="text-neutral-muted text-sm italic">
              No questions match your current filters.
            </p>
          </div>
        ) : (
          filteredData.map((item, idx) => (
            <AnswerCard key={`${item.sessionProfileId}-${item.id}-${idx}`} question={item} answer={item.answer} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyAnswers;