const CreativeTemplate = ({ data }) => {
  return (
    <div className="h-full bg-[#fcfcfd] text-slate-900 p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-full blur-2xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-100 rounded-full blur-2xl opacity-70" />

      <header className="relative z-10 mb-5">
        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-2">
          {data.title}
        </p>
        <h1 className="text-2xl font-extrabold uppercase tracking-wide">
          {data.name}
        </h1>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-600">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          <span>{data.linkedin}</span>
        </div>
      </header>

      <section className="relative z-10 mb-4 bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          About Me
        </h2>
        <p className="text-xs leading-5 text-slate-700">{data.summary}</p>
      </section>

      <section className="relative z-10 mb-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Experience
        </h2>

        {data.experiences.map((exp, index) => (
          <div
            key={index}
            className="mb-3 rounded-xl bg-white/80 border border-slate-200 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">{exp.role}</h3>
                <p className="text-xs text-slate-500">{exp.company}</p>
              </div>
              <span className="text-[10px] text-slate-500">{exp.duration}</span>
            </div>

            <ul className="mt-2 list-disc pl-4 text-xs text-slate-700 space-y-1">
              {exp.bullets.slice(0, 2).map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="relative z-10 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/80 border border-slate-200 p-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold">{edu.degree}</h3>
              <p className="text-[10px] text-slate-500">{edu.school}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white/80 border border-slate-200 p-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="text-[10px] px-2 py-1 rounded-full bg-slate-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeTemplate;