// data/teamData.js

export const teamMembers = [
  {
    id: 1,
    name: "Rana",
    position: "Backend Developer",
    image: "",
    bio: "Passionate about building scalable APIs.",
    skills: ["Node.js", "Express", "MongoDB"],
    social: { twitter: "", linkedin: "", github: "" }
  },
  {
    id: 2,
    name: "Jana",
    position: "Frontend Developer",
    image: "",
    bio: "Creating interactive user experiences.",
    skills: ["React", "CSS", "JavaScript"],
    social: { twitter: "", linkedin: "", github: "" }
  },
  {
    id: 3,
    name: "Manar",
    position: "UI/UX Designer",
    image: "",
    bio: "Designing user-centric interfaces.",
    skills: ["Figma", "Adobe XD"],
    social: { twitter: "", linkedin: "", github: "" }
  },
  {
    id: 4,
    name: "Shatha",
    position: "Project Manager",
    image: "",
    bio: "Leading the team to success.",
    skills: ["Agile", "Management"],
    social: { twitter: "", linkedin: "", github: "" }
  }
];

export const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Our team portfolio showcasing our skills.",
    team: [1, 2], // IDs of Rana and Jana
    technologies: ["React", "Node.js", "Express"]
  },
  {
    id: 2,
    title: "E-commerce App",
    description: "A full-featured shopping platform.",
    team: [1, 3], // IDs of Rana and Manar
    technologies: ["Node.js", "Figma"]
  }
];