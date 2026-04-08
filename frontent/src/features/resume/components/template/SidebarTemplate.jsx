const SidebarTemplate = ({ data }) => {
  return (
    <div className="h-full bg-white text-slate-900 grid grid-cols-[130px_1fr]">
      <aside className="bg-blue-50 p-4 border-r border-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">
          Contact
        </h2>
        <div className="space-y-1 text-[10px] text-slate-600 mb-5">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
          <p>{data.linkedin}</p>
        </div>

        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">
          Skills
        </h2>
        <div className="space-y-1 text-[10px] text-slate-700 mb-5">
          {data.skills.slice(0, 8).map((skill) => (
            <p key={skill}>• {skill}</p>
          ))}
        </div>

        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="text-[10px] text-slate-700 mb-2">
            <p className="font-semibold">{edu.degree}</p>
            <p>{edu.school}</p>
            <p>{edu.duration}</p>
          </div>
        ))}
      </aside>

      <main className="p-5">
        <header className="mb-4">
          <h1 className="text-2xl font-bold uppercase">{data.name}</h1>
          <p className="text-sm text-slate-600 mt-1">{data.title}</p>
        </header>

        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Summary
          </h2>
          <p className="text-xs leading-5 text-slate-700">{data.summary}</p>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
            Experience
          </h2>

          {data.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">{exp.role}</h3>
                  <p className="text-xs text-slate-500">{exp.company}</p>
                </div>
                <span className="text-[10px] text-slate-500">{exp.duration}</span>
              </div>

              <ul className="mt-2 list-disc pl-4 text-xs text-slate-700 space-y-1">
                {exp.bullets.slice(0, 3).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SidebarTemplate;