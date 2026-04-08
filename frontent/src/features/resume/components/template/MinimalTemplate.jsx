const MinimalTemplate = ({ data }) => {
  return (
    <div className="h-full bg-white text-slate-900 p-5 font-sans">
      <header className="border-b border-slate-300 pb-4 mb-4">
        <h1 className="text-[20px] font-bold tracking-wide uppercase">
          {data.name}
        </h1>
        <p className="text-sm text-slate-600 mt-1">{data.title}</p>

        <div className="mt-3 text-[11px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Summary
        </h2>
        <p className="text-xs leading-5 text-slate-700">{data.summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Experience
        </h2>

        {data.experiences.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{exp.role}</h3>
                <p className="text-xs text-slate-500">{exp.company}</p>
              </div>
              <span className="text-[11px] text-slate-500 whitespace-nowrap">
                {exp.duration}
              </span>
            </div>

            <ul className="mt-2 space-y-1 text-xs text-slate-700 list-disc pl-4">
              {exp.bullets.slice(0, 2).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Education
        </h2>

        {data.education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-sm font-semibold">{edu.degree}</h3>
            <p className="text-xs text-slate-500">
              {edu.school} • {edu.duration}
            </p>
            <p className="text-xs text-slate-600">{edu.grade}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {data.skills.slice(0, 8).map((skill) => (
            <span
              key={skill}
              className="text-[10px] border border-slate-300 px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MinimalTemplate;