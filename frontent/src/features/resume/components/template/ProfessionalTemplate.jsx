const ProfessionalTemplate = ({ data }) => {
  return (
    <div className="h-full bg-white text-slate-900 p-6 font-serif">
      <header className="text-center border-b-2 border-slate-800 pb-4 mb-5">
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          {data.name}
        </h1>
        <p className="text-sm mt-1">{data.title}</p>
        <div className="mt-3 text-[11px] text-slate-600 flex justify-center flex-wrap gap-3">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          <span>{data.linkedin}</span>
        </div>
      </header>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1 mb-2">
          Professional Summary
        </h2>
        <p className="text-xs leading-5">{data.summary}</p>
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1 mb-2">
          Work Experience
        </h2>

        {data.experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold">{exp.role}</h3>
                <p className="text-xs text-slate-600">{exp.company}</p>
              </div>
              <span className="text-[11px] text-slate-500">{exp.duration}</span>
            </div>

            <ul className="list-disc pl-4 mt-2 text-xs leading-5">
              {exp.bullets.slice(0, 3).map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-5">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1 mb-2">
          Education
        </h2>

        {data.education.map((edu, index) => (
          <div key={index}>
            <h3 className="text-sm font-bold">{edu.degree}</h3>
            <p className="text-xs text-slate-600">
              {edu.school} • {edu.duration}
            </p>
            <p className="text-xs">{edu.grade}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1 mb-2">
          Core Skills
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          {data.skills.slice(0, 10).map((skill) => (
            <div key={skill}>• {skill}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessionalTemplate;