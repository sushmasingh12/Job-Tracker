const ResumePreviewView = ({ sections }) => {
  if (!sections) {
    return (
      <div className="text-center py-16 text-slate-500">
        <span className="material-symbols-outlined text-4xl mb-3 block">
          description
        </span>
        <p className="text-sm">
          Optimize your resume to see the AI-enhanced version here
        </p>
      </div>
    );
  }

  const isDynamic = !!sections?.sectionOrder;
  const basics = isDynamic ? (sections.basics || {}) : sections;
  const sectionOrder = isDynamic ? sections.sectionOrder : [
    "summary", "experience", "projects", "skills", "education", 
    "certifications", "achievements", "volunteer", "languages"
  ];
  const dynamicSections = isDynamic ? (sections.sections || {}) : sections;

  const hasContact =
    basics.email ||
    basics.phone ||
    basics.location ||
    basics.linkedin ||
    basics.website;

  const formatSectionTitle = (key) => {
    const titles = {
      summary: "Summary",
      experience: "Experience",
      projects: "Projects",
      skills: "Technical Skills",
      education: "Education",
      certifications: "Certifications",
      achievements: "Achievements",
      volunteer: "Volunteer",
      languages: "Languages",
    };
    return titles[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Renders a skill string like "Languages: Python, JS" with bold category
  // Also handles plain string (no colon) gracefully
  const renderSkillLine = (item, index) => {
    const colonIdx = item.indexOf(":");
    if (colonIdx === -1) {
      return (
        <span key={index} className="text-sm text-slate-700">{item}</span>
      );
    }
    const category = item.substring(0, colonIdx).trim();
    const values = item.substring(colonIdx + 1).trim();
    return (
      <p key={index} className="text-sm leading-relaxed">
        <span className="font-semibold text-slate-800">{category}:</span>
        <span className="text-slate-600"> {values}</span>
      </p>
    );
  };

  const renderGenericSection = (key) => {
    const data = dynamicSections[key];
    if (!data) return null;

    const formattedTitle = formatSectionTitle(key);

    // ── Shared section heading: bold, dark, with bottom border ──
    const SectionTitle = () => (
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs font-black tracking-[0.18em] text-slate-700 uppercase whitespace-nowrap">
          {formattedTitle}
        </h2>
        <div className="flex-1 h-[1.5px] bg-slate-300" />
      </div>
    );

    if (typeof data === 'string') {
      return (
        <section className="pt-6" key={key}>
          <SectionTitle />
          <p className="text-sm leading-7 text-slate-700">
            {data}
          </p>
        </section>
      );
    }

    if (Array.isArray(data) && data.length > 0) {
      // ── String array → skills with bold category ──
      if (typeof data[0] === 'string') {
        // Check if any item has "Category: values" format
        const hasCategoryFormat = data.some(item => item.includes(":"));
        return (
          <section className="pt-6" key={key}>
            <SectionTitle />
            {hasCategoryFormat ? (
              <div className="space-y-1.5">
                {data.map((item, index) => renderSkillLine(item, index))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </section>
        );
      }

      return (
        <section className="pt-6" key={key}>
          <SectionTitle />
          <div className="space-y-5">
            {data.map((item, index) => {
              const title = item.role || item.name || item.degree || item.title || (typeof item === 'object' && Object.keys(item).length > 0 ? item[Object.keys(item)[0]] : "") || "";
              
              const subtitleFields = ['company', 'school', 'org', 'issuer', 'location'];
              const subtitle = subtitleFields.map(f => item[f]).filter(Boolean).join(" · ");
              
              const date = item.duration || item.year || item.date || "";
              
              const desc = item.description || item.grade || item.summary || "";
              const bullets = Array.isArray(item.bullets) ? item.bullets : Array.isArray(item.achievements) ? item.achievements : [];
              const tags = Array.isArray(item.tech) ? item.tech : Array.isArray(item.skills) ? item.skills : [];

              return (
                <div key={index} className={index > 0 ? "pt-4 border-t border-dashed border-slate-200" : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {title && (
                        <h3 className="text-sm font-semibold text-slate-900">
                          {title}
                        </h3>
                      )}
                      {subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                      )}
                      {desc && !bullets.length && (
                        <p className="text-sm text-slate-600 mt-0.5">{desc}</p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline whitespace-nowrap mt-1 block"
                        >
                          View Link
                        </a>
                      )}
                    </div>
                    {date && (
                      <span className="text-xs text-slate-500 whitespace-nowrap font-medium">
                        {date}
                      </span>
                    )}
                  </div>
                  {bullets.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-700 leading-relaxed">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-slate-400 shrink-0 mt-[5px] text-[8px]">◆</span>
                          <span>{String(bullet).replace(/^[•▪♦◦\-–]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-md border border-slate-200 bg-slate-50 text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-3xl bg-white text-slate-900 mx-auto">
      <div className="border border-slate-200 rounded-2xl shadow-sm p-10">
        {/* ── Header ── */}
        <header className="pb-5 border-b-2 border-slate-800">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {basics.name || "Your Name"}
          </h1>

          {basics.title && (
            <p className="mt-1 text-sm text-slate-600 font-medium">
              {basics.title}
            </p>
          )}

          {hasContact && (
            <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>{basics.phone}</span>}
              {basics.location && <span>{basics.location}</span>}
              {basics.linkedin && (
                <a
                  href={basics.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {basics.website && (
                <a
                  href={basics.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Portfolio
                </a>
              )}
            </div>
          )}
        </header>

        {/* ── Dynamic Sections ── */}
        {sectionOrder.map((key) => renderGenericSection(key))}

      </div>
    </div>
  );
};

export default ResumePreviewView;