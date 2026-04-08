const ModernTemplate = ({ data }) => {
  return (
    <div className="h-full bg-white text-slate-900 grid grid-cols-[110px_1fr] overflow-hidden">
      <aside className="bg-slate-900 text-white p-4">
        <div className="w-14 h-14 rounded-full bg-slate-700 mx-auto mb-4" />

        <div className="mb-5">
          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2">
            Contact
          </h3>
          <div className="space-y-1 text-[10px] text-slate-200">
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.location}</p>
            <p>{data.linkedin}</p>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-2">
            Skills
          </h3>
          <div className="space-y-1 text-[10px] text-slate-200">
            {data.skills.slice(0, 8).map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </div>
      </aside>

      <main className="p-5">
        <header className="mb-4">
          <h1 className="text-xl font-bold uppercase tracking-wide">
            {data.name}
          </h1>
          <p className="text-sm text-blue-700 font-medium mt-1">{data.title}</p>
        </header>

        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Profile
          </h2>
          <p className="text-xs leading-5 text-slate-700">{data.summary}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Experience
          </h2>

          {data.experiences.map((exp, index) => (
            <div key={index} className="mb-3 border-l-2 border-blue-600 pl-3">
              <div className="flex justify-between gap-2">
                <h3 className="text-sm font-semibold">{exp.role}</h3>
                <span className="text-[10px] text-slate-500">{exp.duration}</span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{exp.company}</p>
              <ul className="text-xs text-slate-700 list-disc pl-4 space-y-1">
                {exp.bullets.slice(0, 2).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Education
          </h2>

          {data.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold">{edu.degree}</h3>
              <p className="text-xs text-slate-500">
                {edu.school} • {edu.duration}
              </p>
              <p className="text-xs text-slate-700">{edu.grade}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ModernTemplate;