import { useState } from 'react';

const RESEARCH_SECTIONS = [
  {
    id: 'overview',
    title: 'Company Overview',
    icon: 'business',
    placeholder:
      'Mission, vision, products/services, company size, founding year...',
  },
  {
    id: 'culture',
    title: 'Culture & Values',
    icon: 'diversity_3',
    placeholder: 'Core values, work environment, employee reviews, perks...',
  },
  {
    id: 'recent_news',
    title: 'Recent News',
    icon: 'newspaper',
    placeholder:
      'Latest announcements, product launches, funding rounds, news...',
  },
  {
    id: 'competitors',
    title: 'Competitors',
    icon: 'compare_arrows',
    placeholder: 'Main competitors, market position, differentiators...',
  },
  {
    id: 'questions',
    title: 'Questions to Ask Them',
    icon: 'live_help',
    placeholder:
      'Thoughtful questions to ask your interviewer about the role, team, growth...',
  },
];

const CompanyResearch = ({ profile }) => {
  const [notes, setNotes] = useState({});
  const [expandedSection, setExpandedSection] = useState('overview');

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <span className="material-symbols-outlined text-4xl text-neutral-300 mb-3">
          domain
        </span>
        <h3 className="text-base font-semibold text-neutral-text mb-2">
          No profile selected
        </h3>
        <p className="text-sm text-neutral-muted">
          Select a job profile to start your company research.
        </p>
      </div>
    );
  }

  const handleNoteChange = (sectionId, value) => {
    setNotes((prev) => ({ ...prev, [sectionId]: value }));
  };

  const totalNotesLength = Object.values(notes).join('').length;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-text">
            {profile.company} Research
          </h2>
          <p className="text-xs text-neutral-muted mt-0.5">
            Know your company inside-out before the interview
          </p>
        </div>
        {profile.company && (
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              profile.company + ' company'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary-dark font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">
              open_in_new
            </span>
            Search on Google
          </a>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          {
            label: 'LinkedIn',
            icon: 'work',
            url: `https://www.linkedin.com/company/${profile.company
              ?.toLowerCase()
              .replace(/\s+/g, '-')}`,
          },
          {
            label: 'Glassdoor',
            icon: 'rate_review',
            url: `https://www.glassdoor.com/Search/Results.htm?keyword=${encodeURIComponent(
              profile.company || ''
            )}`,
          },
          {
            label: 'News',
            icon: 'newspaper',
            url: `https://news.google.com/search?q=${encodeURIComponent(
              profile.company || ''
            )}`,
          },
          {
            label: 'Crunchbase',
            icon: 'trending_up',
            url: `https://www.crunchbase.com/search/organizations/field/organizations/facet_ids/company?q=${encodeURIComponent(
              profile.company || ''
            )}`,
          },
        ].map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-white border border-neutral-border rounded-xl hover:border-primary/30 hover:bg-blue-50 transition-all text-sm font-medium text-neutral-600 hover:text-primary"
          >
            <span className="material-symbols-outlined text-[16px]">
              {link.icon}
            </span>
            {link.label}
            <span className="material-symbols-outlined text-[13px] ml-auto text-neutral-300">
              open_in_new
            </span>
          </a>
        ))}
      </div>

      {/* Research Sections */}
      <div className="space-y-3">
        {RESEARCH_SECTIONS.map((section) => {
          const isExpanded = expandedSection === section.id;
          const hasContent = notes[section.id]?.trim().length > 0;

          return (
            <div
              key={section.id}
              className={`bg-white border rounded-xl overflow-hidden transition-all shadow-sm ${
                isExpanded
                  ? 'border-primary/30 ring-2 ring-primary/10'
                  : 'border-neutral-border hover:border-neutral-300'
              }`}
            >
              <button
                onClick={() =>
                  setExpandedSection(isExpanded ? null : section.id)
                }
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      hasContent
                        ? 'bg-success/10'
                        : isExpanded
                        ? 'bg-primary/10'
                        : 'bg-neutral-100'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        hasContent
                          ? 'text-success'
                          : isExpanded
                          ? 'text-primary'
                          : 'text-neutral-400'
                      }`}
                    >
                      {hasContent ? 'check_circle' : section.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-text">
                      {section.title}
                    </p>
                    {hasContent && (
                      <p className="text-xs text-neutral-muted line-clamp-1">
                        {notes[section.id]}
                      </p>
                    )}
                  </div>
                </div>
                <span className="material-symbols-outlined text-neutral-muted text-[20px]">
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <textarea
                    rows={5}
                    value={notes[section.id] || ''}
                    onChange={(e) =>
                      handleNoteChange(section.id, e.target.value)
                    }
                    placeholder={section.placeholder}
                    className="w-full border border-neutral-border rounded-xl p-3.5 text-sm text-neutral-text placeholder-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none leading-relaxed"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save note */}
      {totalNotesLength > 0 && (
        <p className="text-xs text-neutral-muted text-center">
          <span className="material-symbols-outlined text-[12px] mr-1">
            info
          </span>
          Notes are saved locally during this session. Copy important ones to
          keep them.
        </p>
      )}
    </div>
  );
};

export default CompanyResearch;