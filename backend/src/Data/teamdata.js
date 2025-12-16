// backend/src/Data/teamdata.js

export const teamMembers = [
  {
    id: 1,
    name: "Rana",
    position: "Full Stack Developer",
    image: "",
    bio: "Innovative software engineer passionate about building scalable, user-centric applications using modern web technologies and clean architecture principles.",
    skills: [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "Django",
      "PostgreSQL",
      "Docker",
      "Git"
    ],
    social: {
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
      twitter: ""
    }
  },
  {
    id: 2,
    name: "Jana",
    position: "Infrastructure & DevOps Engineer",
    image: "",
    bio: "Computer Science graduate with hands-on experience in DevOps, cloud infrastructure, and containerized deployments. Passionate about reliability, automation, and scalable systems.",
    skills: [
      "Docker",
      "Linux",
      "Nginx",
      "CI/CD",
      "MongoDB",
      "MinIO",
      "AWS",
      "GCP",
      "VPS Administration"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/janaalghasham",
      github: "",
      twitter: ""
    }
  },
  {
    id: 3,
    name: "Manar",
    position: "UI/UX & Frontend Developer",
    image: "",
    bio: "Full Stack developer focused on building accessible, user-centered interfaces with strong attention to usability, performance, and clean UI design.",
    skills: [
      "React",
      "TypeScript",
      "UI/UX Design",
      "Tailwind CSS",
      "REST APIs",
      "Testing",
      "Git"
    ],
    social: {
      linkedin: "https://sa.linkedin.com/in/manar-mal-214018327",
      github: "",
      twitter: ""
    }
  },
  {
    id: 4,
    name: "Shatha",
    position: "Project Manager",
    image: "",
    bio: "Project manager focused on team coordination, delivery planning, and ensuring projects are delivered efficiently and on time.",
    skills: [
      "Agile",
      "Scrum",
      "Team Management",
      "Communication",
      "Planning"
    ],
    social: {
      linkedin: "",
      github: "",
      twitter: ""
    }
  }
];

export const projects = [
  // --- SOLO PROJECTS ---
  {
    id: 1,
    title: "SmartMargin",
    description: "A responsive web app that helps small business owners calculate profit margins and visualize cost breakdowns in real time.",
    team: [1], // Rana solo
    technologies: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Banking System",
    description: "A terminal-based banking system built using Python with OOP, file handling, and exception handling.",
    team: [1], // Rana solo
    technologies: ["Python"]
  },

  // --- GROUP PROJECTS ---
  {
    id: 3,
    title: "Team Portfolio Website",
    description: "A modern team portfolio showcasing members, skills, and projects.",
    team: [1, 2], // Rana + Jana
    technologies: ["React", "Node.js", "Express"]
  },
  {
    id: 4,
    title: "E-Learning Platform for Learning Difficulties",
    description: "An accessible e-learning platform designed for users with hearing and reading difficulties.",
    team: [1, 3], // Rana + Manar
    technologies: ["React", "ASP.NET Core", "PostgreSQL"]
  }
];
