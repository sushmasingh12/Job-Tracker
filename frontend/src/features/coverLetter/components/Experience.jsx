import { FormField } from "../../../shared/components/ui/FormField";
import useExperience from "../hooks/useExperience";

const SUGGESTED_SKILLS = [
  "Leadership",
  "Communication",
  "Project Management",
  "Data Analysis",
  "Problem Solving",
  "React",
  "Python",
  "SQL",
];

const Experience = () => {
  const {
    fields,
    handleAddExperience,
    handleRemoveExperience,
    getExpRegistration,
    skills,
    skillInput,
    setSkillInput,
    handleSkillKeyDown,
    handleAddSuggestedSkill,
    handleRemoveSkill,
    educationReg,
    errors,
    onSubmit,
    handleBack,
  } = useExperience();

  return (
    <div className="space-y-8">
      {/* ── Work Experience Card ───────────────────────────────────────────── */}
      <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-text">
              Work Experience
            </h2>
            <p className="text-sm text-neutral-muted mt-1">
              Add your most relevant work experiences for this role.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddExperience}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-primary/40 text-primary text-sm font-semibold hover:bg-primary-light/10 hover:border-primary transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add More
          </button>
        </div>

        <form id="experience-form" onSubmit={onSubmit} noValidate>
          <div className="space-y-6">
            {fields.map((field, index) => {
              const { titleReg, companyReg, durationReg, achievementReg } =
                getExpRegistration(index);

              return (
                <div
                  key={field.id}
                  className="relative p-6 rounded-xl border border-neutral-border bg-background-light/50 group"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-semibold text-neutral-text">
                        Experience {index + 1}
                      </span>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Job Title */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
                        Job Title
                      </label>
                      <FormField
                        icons="badge"
                        registration={titleReg}
                        placeholder="e.g. Software Engineer"
                        error={errors?.experiences?.[index]?.title}
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
                        Company
                      </label>
                      <FormField
                        icons="apartment"
                        registration={companyReg}
                        placeholder="e.g. Meta, Startup Inc."
                        error={errors?.experiences?.[index]?.company}
                      />
                    </div>

                    {/* Duration */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
                        Duration
                      </label>
                      <FormField
                        icons="calendar_month"
                        registration={durationReg}
                        placeholder="e.g. Jan 2022 – Present"
                        error={errors?.experiences?.[index]?.duration}
                      />
                    </div>

                    {/* Top Achievement */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
                        Top Achievement
                      </label>
                      <FormField
                        icons="emoji_events"
                        registration={achievementReg}
                        placeholder="e.g. Increased revenue by 30%"
                        error={errors?.experiences?.[index]?.achievement}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>

      {/* ── Skills Card ───────────────────────────────────────────────────── */}
      <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-text">
            Skills &amp; Expertise
          </h2>
          <p className="text-sm text-neutral-muted mt-1">
            Add your key skills. These will be woven into your cover letter.
          </p>
        </div>

        <div className="space-y-3">
          {/* Skill Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted text-xl">
              psychology
            </span>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-border bg-neutral-surface text-neutral-text placeholder-neutral-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Added Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-light/15 text-primary border border-primary/20 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-primary-dark transition-colors"
                  >
                    <span className="material-symbols-outlined text-base leading-none">
                      close
                    </span>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Suggested Skills */}
          <div>
            <p className="text-xs font-semibold text-neutral-muted uppercase tracking-wide mb-2">
              Suggested
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).map(
                (skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleAddSuggestedSkill(skill)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-background-light border border-neutral-border rounded-full text-sm text-neutral-muted hover:border-primary/50 hover:text-primary hover:bg-primary-light/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>
                    {skill}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Education Card ────────────────────────────────────────────────── */}
      <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-4 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-text">
            Education
            <span className="ml-2 text-sm font-normal text-neutral-muted">
              (Optional)
            </span>
          </h2>
          <p className="text-sm text-neutral-muted mt-1">
            Include your highest or most relevant degree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
              Degree / Qualification
            </label>
            <FormField
              icons="school"
              registration={educationReg.degreeReg}
              placeholder="e.g. B.Tech in Computer Science"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
              Institution
            </label>
            <FormField
              icons="account_balance"
              registration={educationReg.institutionReg}
              placeholder="e.g. IIT Delhi"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
              Graduation Year
            </label>
            <FormField
              icons="event"
              registration={educationReg.graduationYearReg}
              placeholder="e.g. 2022"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-text uppercase tracking-wide">
              GPA / Percentage
              <span className="ml-1 text-neutral-muted font-normal normal-case">
                (optional)
              </span>
            </label>
            <FormField
              icons="grade"
              registration={educationReg.gpaReg}
              placeholder="e.g. 8.5 / 10 or 85%"
            />
          </div>
        </div>
      </div>

      {/* ── Footer Buttons ────────────────────────────────────────────────── */}
      <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-6 flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-3 rounded-lg border border-neutral-border text-neutral-text font-medium hover:bg-background-light hover:text-neutral-text transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>
        <button
          type="submit"
          form="experience-form"
          className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all flex items-center gap-2"
        >
          Next Step
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default Experience;