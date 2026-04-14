import { useState } from 'react';

const STATUS_DOT = {
  Applied: 'bg-blue-400',
  'Phone Screen': 'bg-yellow-400',
  Interview: 'bg-purple-400',
  'Final Round': 'bg-primary',
  Offer: 'bg-green-400',
  Rejected: 'bg-red-400',
  default: 'bg-neutral-400',
};

const ProfileCard = ({ profile, isSelected, onSelect }) => {
  const dotColor =
    STATUS_DOT[profile.status] || STATUS_DOT.default;
  const appliedDate = profile.applicationDate
    ? new Date(profile.applicationDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <button
      onClick={() => onSelect(profile)}
      className={`w-full text-left p-4 rounded-xl border transition-all group ${
        isSelected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-neutral-border bg-white hover:border-primary/40 hover:bg-neutral-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Company icon */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
            isSelected
              ? 'bg-primary/10 border-primary/20'
              : 'bg-neutral-100 border-neutral-border'
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl ${
              isSelected ? 'text-primary' : 'text-neutral-muted'
            }`}
          >
            business
          </span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-neutral-text text-sm truncate">
                {profile.jobTitle}
              </p>
              <p className="text-xs text-neutral-muted truncate mt-0.5">
                {profile.company}
                {profile.location && ` • ${profile.location}`}
              </p>
            </div>
            {isSelected && (
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                check_circle
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            {profile.status && (
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                <span className="text-xs text-neutral-muted">
                  {profile.status}
                </span>
              </div>
            )}
            {appliedDate && (
              <>
                <span className="text-neutral-200">•</span>
                <span className="text-xs text-neutral-muted">
                  Applied {appliedDate}
                </span>
              </>
            )}
            {profile.jobDescription && (
              <>
                <span className="text-neutral-200">•</span>
                <span className="text-xs text-success flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">
                    description
                  </span>
                  JD available
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

const ProfileSelectorModal = ({
  profiles,
  loading,
  selectedProfile,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filtered = profiles.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.jobTitle?.toLowerCase().includes(q) ||
      p.company?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q)
    );
  });

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col border border-neutral-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-border shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors text-neutral-text group"
              title="Go Back"
            >
              <span className="material-symbols-outlined text-[24px] group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
            </button>
            <div>
              <h2 className="text-lg font-bold text-neutral-text leading-tight">
                Select Job Profile
              </h2>
              <p className="text-xs text-neutral-muted mt-0.5">
                Choose which job you're preparing for
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors text-neutral-muted"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-border shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-neutral-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-neutral-50"
              autoFocus
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm text-neutral-muted">
                Loading your applications...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-neutral-300 mb-3">
                {search ? 'search_off' : 'work_off'}
              </span>
              <p className="text-sm font-medium text-neutral-text">
                {search ? 'No results found' : 'No job applications yet'}
              </p>
              <p className="text-xs text-neutral-muted mt-1">
                {search
                  ? 'Try a different search term'
                  : 'Add jobs in the Applications section first'}
              </p>
            </div>
          ) : (
            filtered.map((profile) => (
              <ProfileCard
                key={profile._id}
                profile={profile}
                isSelected={selectedProfile?._id === profile._id}
                onSelect={onSelect}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-border bg-neutral-50 rounded-b-2xl shrink-0">
          <p className="text-xs text-neutral-muted text-center">
            {profiles.length} application{profiles.length !== 1 ? 's' : ''}{' '}
            found
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelectorModal;