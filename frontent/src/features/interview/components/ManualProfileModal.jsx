import React, { useState } from 'react';

const ManualProfileModal = ({
  loading,
  onGenerate,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    techStack: '',
    count: 10,
    questionTypes: ['behavioral', 'technical'],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jobTitle.trim()) return;
    onGenerate(formData);
  };

  const toggleType = (type) => {
    setFormData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type]
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col border border-neutral-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-border">
          <div>
            <h2 className="text-lg font-bold text-neutral-text">Manual Practice</h2>
            <p className="text-xs text-neutral-muted mt-0.5">
              Enter details for a custom mock interview
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors text-neutral-muted"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
              Job Profile / Role
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-1.5">
              Technical Stack (Skills)
            </label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, AWS, TypeScript"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">
              Question Types
            </label>
            <div className="flex flex-wrap gap-2">
              {['behavioral', 'technical', 'leadership', 'product', 'situational'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    formData.questionTypes.includes(type)
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-muted hover:bg-neutral-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !formData.jobTitle.trim() || formData.questionTypes.length === 0}
              className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Generate Practice Questions
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="px-6 py-4 bg-primary/5 border-t border-primary/10">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">info</span>
            <p className="text-[11px] leading-relaxed text-neutral-text/70">
              AI will generate tailored questions based on the role and tech stack you provided. This session will be saved for your practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualProfileModal;
