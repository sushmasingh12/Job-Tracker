
import ATSTemplate from "./ATSTemplate";
import CreativeTemplate from "./CreativeTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import SidebarTemplate from "./SidebarTemplate";


const sampleData = {
  name: "John Doe",
  title: "Senior Software Engineer",
  email: "john.doe@email.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Results-driven software engineer with 8+ years experience building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of leading teams to deliver high-impact projects.",
  experiences: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp Inc.",
      duration: "2021 - Present",
      bullets: [
        "Led development of company-wide dashboard used by 10k+ users, improving reporting efficiency by 40%",
        "Architected microservices migration reducing infrastructure costs by 35%",
        "Mentored junior developers and established code review processes",
      ],
      tech: ["React", "Node.js", "AWS", "PostgreSQL"],
    },
    {
      role: "Software Engineer",
      company: "StartupXYZ",
      duration: "2018 - 2021",
      bullets: [
        "Built full-stack e-commerce platform handling 50k transactions/month",
        "Optimized database queries improving page load times by 60%",
        "Integrated payment gateways and security compliance (PCI-DSS)",
      ],
      tech: ["Vue.js", "Python", "MongoDB", "Docker"],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California",
      duration: "2014 - 2018",
      grade: "GPA: 3.8/4.0",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "GraphQL",
    "Tailwind CSS",
  ],
};
const ResumePreview = ({ templateId }) => {
  switch (templateId) {
    case "minimal":
      return <MinimalTemplate data={sampleData} />;

    case "modern":
      return <ModernTemplate data={sampleData} />;

    case "creative":
      return <CreativeTemplate data={sampleData} />;

    case "ats":
      return <ATSTemplate data={sampleData} />;

    case "sidebar":
      return <SidebarTemplate data={sampleData} />;

    case "professional":
    default:
      return <ProfessionalTemplate data={sampleData} />;
  }
};

export default ResumePreview;