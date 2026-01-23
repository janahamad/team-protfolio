// backend/src/Data/teamdata.js

export const teamMembers = [
  {
    id: 1,
    name: "Rana",
    position: "Full Stack Developer",
    image: "",
    bio: "Innovative software engineer passionate about building scalable, user-centric applications using modern web technologies and clean architecture principles.",
    skills: [
      "Python", "JavaScript", "React", "Node.js", "Django", "PostgreSQL", "Docker", "Git"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/rana-ahmed-864bb41b7",
      github: "https://github.com/ranaahmd"
    }
  },
  {
    id: 2,
    name: "Jana",
    position: "Infrastructure & DevOps Engineer",
    image: "",
    bio: "Computer Science graduate with extensive experience in high-availability infrastructure, cloud migrations, and DevOps automation. Proven track record in managing VPS environments, containerization, and implementing robust security measures.",
    skills: [
      "Docker", "Linux & Windows Server", "Nginx", "HAProxy", "CI/CD",
      "MongoDB Replicas", "MinIO", "AWS", "GCP", "VPS Administration",
      "Redis", "RabbitMQ", "Grafana Monitoring", "ELK Stack (Logstash, Kibana)",
      "Network Security (UFW, Fail2Ban, SSL)", "FastAPI"
    ],
    experience: [
      {
        role: "Junior Infrastructure Engineer",
        company: "Nadeer",
        period: "Jun - Aug 2025",
        tasks: "Deployed and containerized full-stack applications; managed Docker containers for staging and production on a VPS. Configured high-availability infrastructure using MongoDB replicas and MinIO buckets. Migrated multiple projects from GCP to VPS, enhancing performance and reducing costs. Set up Site24x7 for server monitoring and implemented VPS security measures (UFW, Fail2Ban, SSL). Assisted developers with deployments, domain configuration, and credential management."
      },
      {
        role: "IT Operations Trainee",
        company: "T2",
        period: "Apr - May 2025",
        tasks: "Managed Linux and Windows Server environments, including hosting websites, configuring HAProxy load balancers, deploying Docker containers, and publishing via IIS. Implemented database replication and high availability solutions, with hands-on experience in Grafana monitoring, caching (Redis), messaging (RabbitMQ), scripting, and backup automation."
      },
      {
        role: "DevOps Infrastructure COOP",
        company: "Manafa Capital",
        period: "Jul - Aug 2023",
        tasks: "Gained hands-on experience with IT regulatory compliance and cloud infrastructure management. Tasks included server upgrades, installing and configuring Logstash and Kibana, and developing IT governance and change management policies in line with SAMA requirements."
      }
    ],
    certifications: [
      "AWS Certified Cloud Practitioner (2025)",
      "Oracle Cloud Infrastructure Certified Foundations Associate (2023)",
      "Cisco Networking & Cyberhub Academy - CyberOps Associate (2021)"
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/janaalghasham",
      github: "https://github.com/janahamad",
      phone: "+966550720727"
    }
  },
  {
    id: 3,
    name: "Manar",
    position: "UI/UX & Frontend Developer",
    image: "",
    bio: "Full Stack developer focused on building accessible, user-centered interfaces with strong attention to usability, performance, and clean UI design.",
    skills: [
      "React", "TypeScript", "UI/UX Design", "Tailwind CSS", "REST APIs", "Testing", "Git"
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
      "Agile", "Scrum", "Team Management", "Communication", "Planning"
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
    id: 5,
    title: "SEO Checker Pro",
    description: "A high-performance web application designed for instant technical SEO audits, providing actionable insights, dynamic scoring, and professional PDF reports.",
    team: [1, 2],
    technologies: ["FastAPI", "React", "Tailwind CSS", "BeautifulSoup4", "ReportLab"],
    github: "https://github.com/ranaahmd/SEO"
  }
];