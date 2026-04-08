const ATSTemplate = ({ data }) => {
  return (
    <div className="h-full bg-white text-black p-5 font-sans">
      <header className="mb-4">
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="text-sm">{data.title}</p>
        <p className="text-[11px] mt-2">
          {data.email} | {data.phone} | {data.location} | {data.linkedin}
        </p>
      </header>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
          Summary
        </h2>
        <p className="text-xs leading-5">{data.summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
          Experience
        </h2>

        {data.experiences.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="text-xs font-bold">
                {exp.role} - {exp.company}
              </h3>
              <span className="text-[11px]">{exp.duration}</span>
            </div>

            <ul className="list-disc pl-4 mt-1 text-xs space-y-1">
              {exp.bullets.slice(0, 3).map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="text-xs">
            <p className="font-bold">{edu.degree}</p>
            <p>
              {edu.school} | {edu.duration}
            </p>
            <p>{edu.grade}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">
          Skills
        </h2>
        <p className="text-xs">{data.skills.slice(0, 10).join(", ")}</p>
      </section>
    </div>
  );
};

export default ATSTemplate;