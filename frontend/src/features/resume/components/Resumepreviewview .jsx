const ResumePreviewView = ({ sections, template = 'modern' }) => {
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

  const styles = {
    modern: {
      container: "font-sans text-slate-900 mx-auto",
      header: "pb-5 border-b-2 border-slate-800",
      name: "text-2xl font-bold tracking-tight text-slate-900",
      jobTitle: "mt-1 text-sm text-slate-600 font-medium",
      contactWrap: "mt-2 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1",
      sectionWrap: "pt-6",
      sectionHeadingWrap: "flex items-center gap-3 mb-3",
      sectionHeadingText: "text-xs font-black tracking-[0.18em] text-slate-700 uppercase whitespace-nowrap",
      sectionHeadingLine: "flex-1 h-[1.5px] bg-slate-300",
      itemContainer: "pt-4 border-t border-dashed border-slate-200",
      itemTitle: "text-sm font-semibold text-slate-900",
      itemSubtitle: "text-xs text-slate-500 mt-0.5",
      textParagraph: "text-sm leading-7 text-slate-700",
      bulletIcon: "◆",
      bulletIconClass: "text-slate-400 shrink-0 mt-[5px] text-[8px]",
      tagWrap: "px-2 py-0.5 text-xs rounded-md border border-slate-200 bg-slate-50 text-slate-600"
    },
    professional: {
      container: "font-serif text-neutral-900 mx-auto",
      header: "pb-4 border-b-[1.5px] border-neutral-400 text-center flex flex-col items-center",
      name: "text-3xl font-bold text-black uppercase tracking-wide",
      jobTitle: "mt-1 text-sm text-neutral-700 italic",
      contactWrap: "mt-2 text-xs text-neutral-800 flex flex-wrap justify-center gap-x-4 gap-y-1",
      sectionWrap: "pt-5",
      sectionHeadingWrap: "border-b-[1.5px] border-neutral-400 mb-3 pb-1",
      sectionHeadingText: "text-sm font-bold tracking-widest text-black uppercase",
      sectionHeadingLine: "hidden",
      itemContainer: "pt-3 mt-3 border-t border-neutral-200",
      itemTitle: "text-sm font-bold text-black",
      itemSubtitle: "text-[13px] text-neutral-700 mt-0.5 italic",
      textParagraph: "text-sm leading-6 text-neutral-800",
      bulletIcon: "•",
      bulletIconClass: "text-black shrink-0 mt-[4px] text-sm font-bold",
      tagWrap: "px-2 py-0.5 text-xs border border-neutral-300 bg-white text-neutral-700 font-sans"
    },
    minimal: {
      container: "font-sans font-light text-gray-800 mx-auto",
      header: "pb-6 text-left",
      name: "text-4xl font-light tracking-tight text-gray-900",
      jobTitle: "mt-1 text-sm text-gray-500 font-normal",
      contactWrap: "mt-3 text-[13px] text-gray-400 flex flex-wrap gap-x-4 gap-y-1",
      sectionWrap: "pt-8",
      sectionHeadingWrap: "mb-4",
      sectionHeadingText: "text-lg font-medium text-gray-900 capitalize",
      sectionHeadingLine: "hidden",
      itemContainer: "pt-4 mt-4 border-t border-gray-100",
      itemTitle: "text-sm font-medium text-gray-900",
      itemSubtitle: "text-[13px] text-gray-400 mt-0.5",
      textParagraph: "text-[13px] leading-relaxed text-gray-600",
      bulletIcon: "—",
      bulletIconClass: "text-gray-300 shrink-0 mt-[2px] text-[10px]",
      tagWrap: "px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-sm"
    }
  };

  const t = styles[template] || styles.modern;

  const renderSkillLine = (item, index) => {
    const colonIdx = item.indexOf(":");
    if (colonIdx === -1) {
      return (
        <span key={index} className={t.textParagraph}>{item}</span>
      );
    }
    const category = item.substring(0, colonIdx).trim();
    const values = item.substring(colonIdx + 1).trim();
    return (
      <p key={index} className={`${t.textParagraph} mb-1 leading-relaxed`}>
        <span className="font-semibold text-current">{category}:</span>
        <span className="opacity-90"> {values}</span>
      </p>
    );
  };

  const renderGenericSection = (key) => {
    const data = dynamicSections[key];
    if (!data) return null;

    const formattedTitle = formatSectionTitle(key);

    const SectionTitle = () => (
      <div className={t.sectionHeadingWrap}>
        <h2 className={t.sectionHeadingText}>
          {formattedTitle}
        </h2>
        <div className={t.sectionHeadingLine} />
      </div>
    );

    if (typeof data === 'string') {
      return (
        <section className={t.sectionWrap} key={key}>
          <SectionTitle />
          <p className={t.textParagraph}>
            {data}
          </p>
        </section>
      );
    }

    if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0] === 'string') {
        const hasCategoryFormat = data.some(item => item.includes(":"));
        return (
          <section className={t.sectionWrap} key={key}>
            <SectionTitle />
            {hasCategoryFormat ? (
              <div className="space-y-1">
                {data.map((item, index) => renderSkillLine(item, index))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.map((item, index) => (
                  <span
                    key={index}
                    className={t.tagWrap}
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
        <section className={t.sectionWrap} key={key}>
          <SectionTitle />
          <div className="space-y-0">
            {data.map((item, index) => {
              const title = item.role || item.name || item.degree || item.title || (typeof item === 'object' && Object.keys(item).length > 0 ? item[Object.keys(item)[0]] : "") || "";

              const subtitleFields = ['company', 'school', 'org', 'issuer', 'location'];
              const subtitle = subtitleFields.map(f => item[f]).filter(Boolean).join(" · ");

              const date = item.duration || item.year || item.date || "";

              const desc = item.description || item.grade || item.summary || "";
              const bullets = Array.isArray(item.bullets) ? item.bullets : Array.isArray(item.achievements) ? item.achievements : [];
              const tags = Array.isArray(item.tech) ? item.tech : Array.isArray(item.skills) ? item.skills : [];

              return (
                <div key={index} className={index > 0 ? t.itemContainer : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {title && (
                        <h3 className={t.itemTitle}>
                          {title}
                        </h3>
                      )}
                      {subtitle && (
                        <p className={t.itemSubtitle}>{subtitle}</p>
                      )}
                      {desc && !bullets.length && (
                        <p className={`${t.textParagraph} mt-1`}>{desc}</p>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-600 hover:underline whitespace-nowrap mt-1 block"
                        >
                          View Link
                        </a>
                      )}
                    </div>
                    {date && (
                      <span className="text-[11px] text-slate-500 whitespace-nowrap font-medium mt-1">
                        {date}
                      </span>
                    )}
                  </div>
                  {bullets.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-[13px] opacity-90 leading-relaxed">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className={t.bulletIconClass}>{t.bulletIcon}</span>
                          <span>{String(bullet).replace(/^[•▪♦◦\-–]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tags.map((tg, i) => (
                        <span
                          key={i}
                          className={t.tagWrap}
                        >
                          {tg}
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
    <div className={`w-full max-w-3xl bg-white ${t.container}`}>
      <div className="border border-slate-200 rounded-2xl shadow-sm p-10">
        {/* ── Header ── */}
        <header className={t.header}>
          <h1 className={t.name}>
            {basics.name || "Your Name"}
          </h1>

          {basics.title && (
            <p className={t.jobTitle}>
              {basics.title}
            </p>
          )}

          {hasContact && (
            <div className={t.contactWrap}>
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>{basics.phone}</span>}
              {basics.location && <span>{basics.location}</span>}
              {basics.linkedin && (
                <a
                  href={basics.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
                >
                  LinkedIn
                </a>
              )}
              {basics.website && (
                <a
                  href={basics.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
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