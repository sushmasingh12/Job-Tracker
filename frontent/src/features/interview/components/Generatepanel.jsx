import React, { useState } from 'react';

const QUESTION_TYPES = [
  {
    id: 'behavioral',
    label: 'Behavioral',
    icon: 'psychology',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    activeColor: 'bg-purple-600 text-white border-purple-600',
    description: 'STAR-method questions about past experiences',
  },
  {
    id: 'technical',
    label: 'Technical',
    icon: 'code',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    activeColor: 'bg-orange-600 text-white border-orange-600',
    description: 'Role-specific skills and knowledge',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: 'groups',
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    activeColor: 'bg-teal-600 text-white border-teal-600',
    description: 'Managing teams and driving outcomes',
  },
  {
    id: 'product',
    label: 'Product Sense',
    icon: 'lightbulb',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    activeColor: 'bg-blue-600 text-white border-blue-600',
    description: 'Product thinking and domain questions',
  },
  {
    id: 'situational',
    label: 'Situational',
    icon: 'fork_right',
    color: 'text-pink-600 bg-pink-50 border-pink-200',
    activeColor: 'bg-pink-600 text-white border-pink-600',
    description: 'Hypothetical scenario-based questions',
  },
];

const GeneratePanel = ({ profile, questionsCount, loading, onGenerate }) => {
  const [selectedTypes, setSelectedTypes] = useState(['behavioral', 'technical']);
  const [count, setCount] = useState(10);
  const [isExpanded, setIsExpanded] = useState(questionsCount === 0);

  const toggleType = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selectedTypes.length === 0) return;
    onGenerate({ questionTypes: selectedTypes, count });
  };

  // Collapsed state — show summary + re-generate button
  if (!isExpanded && questionsCount > 0) {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-blue-50 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              auto_awesome
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-text">
              {questionsCount} questions generated
            </p>
            <p className="text-xs text-neutral-muted">
              For {profile.jobTitle} at {profile.company}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="text-xs font-medium text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[15px]">refresh</span>
          Regenerate
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">
              auto_awesome
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-text">
              Generate AI Questions
            </h3>
            <p className="text-xs text-neutral-muted">
              Tailored for {profile.jobTitle} at {profile.company}
            </p>
          </div>
        </div>
        {questionsCount > 0 && (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-neutral-muted hover:text-neutral-text"
          >
            <span className="material-symbols-outlined text-[20px]">
              expand_less
            </span>
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Question Types */}
        <div>
          <p className="text-xs font-semibold text-neutral-text mb-3 uppercase tracking-wider">
            Question Types
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {QUESTION_TYPES.map((type) => {
              const isActive = selectedTypes.includes(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    isActive ? type.activeColor : type.color
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {type.icon}
                  </span>
                  <span>{type.label}</span>
                  {isActive && (
                    <span className="material-symbols-outlined text-[14px] ml-auto opacity-80">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {selectedTypes.length === 0 && (
            <p className="text-xs text-red-500 mt-2">
              Select at least one question type
            </p>
          )}
        </div>

        {/* Count Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-neutral-text uppercase tracking-wider">
              Number of Questions
            </p>
            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              {count}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="5"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-neutral-muted mt-1">
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || selectedTypes.length === 0}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">
                auto_awesome
              </span>
              Generate {count} Questions
            </>
          )}
        </button>

        {profile.jobDescription ? (
          <p className="text-xs text-center text-success flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[13px]">
              check_circle
            </span>
            Using your job description for more accurate questions
          </p>
        ) : (
          <p className="text-xs text-center text-neutral-muted flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[13px]">info</span>
            Add a job description in Applications for better questions
          </p>
        )}
      </div>
    </div>
  );
};

export default GeneratePanel;