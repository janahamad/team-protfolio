// backend/src/Data/teamdata.js

export const teamMembers = [
  {
    id: 1,
    name: "Rana",
    position: "Full Stack Developer",
    image: "",
    yearsExperience: 1,
    diagrams: [],
    bio: "Innovative software engineer passionate about building scalable, user-centric applications using modern web technologies and clean architecture principles.",
    skills: [
      "Python", "JavaScript", "React", "Node.js", "Django", "PostgreSQL", "Docker", "Git"
    ],
    experience: [
      {
        role: "Technical Committee Leader",
        company: "Newtech",
        period: "Apr 2026 - Present",
        tasks: "Led the technical team in designing and developing the Newtech platform from scratch. Coordinated task distribution, managed the development workflow, reviewed technical progress, and ensured effective collaboration to deliver a functional and high-quality software solution."
      }
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
    yearsExperience: 1,
    diagrams: [],
    bio: "Infrastructure & DevOps Engineer experienced in cloud infrastructure, ERP administration, system integrations, automation, and data analytics. Skilled in Linux, Docker, Kubernetes, ERP, Power BI, n8n, and API integrations, with a software development background that bridges infrastructure, business systems, and application development.",
    skills: [
      "Docker", "Linux & Windows Server", "Nginx", "HAProxy", "CI/CD",
      "MongoDB Replicas", "MinIO", "AWS", "GCP", "VPS Administration",
      "Redis", "RabbitMQ", "Grafana Monitoring", "ELK Stack (Logstash, Kibana)",
      "Network Security (UFW, Fail2Ban, SSL)", "FastAPI"
    ],
    experience: [
      {
        role: "System & Infrastructure Engineer",
        company: "Aljawad Premium",
        period: "Dec 2025 - Jun 2026",
        tasks: "Deployed and managed containerized applications using Docker across development and production environments; supported Kubernetes (k3s) workloads and end-to-end infrastructure operations including servers, VPS hosting, backups, and monitoring. Managed technical projects and implemented ERPNext integrations with Power BI, n8n workflows, and AI-based automation solutions to streamline reporting, automate business processes, and support operational decision-making. Administered ERPNext, including user management, system configuration, monitoring, troubleshooting, permissions, and process support for internal teams. Designed and implemented ERPNext client scripts, server scripts, custom reports, and automation workflows to improve data accuracy, optimize business processes, and enhance system performance."
      },
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
      "Oracle Cloud Infrastructure Certified Foundations Associate (2023)"
    ],
    certificationBadges: [
      { title: "AWS Certified Cloud Practitioner", image: "/badges/aws-cloud-practitioner.png" },
      { title: "Oracle Cloud Infrastructure Foundations Associate", image: "/badges/oracle-oci-foundations.png" }
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/janaalghasham",
      github: "https://github.com/janahamad",
      phone: "+966550720727"
    }
  },
];
export const projects = [
  // --- SOLO PROJECTS ---
  {
    id: 1,
    title: "SmartMargin",
    description: "A responsive web app that helps small business owners calculate profit margins and visualize cost breakdowns in real time.",
    image: null,
    team: [1], // Rana solo
    technologies: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Banking System",
    description: "A terminal-based banking system built using Python with OOP, file handling, and exception handling.",
    image: null,
    team: [1], // Rana solo
    technologies: ["Python"]
  },

  // --- GROUP PROJECTS ---
  {
    id: 3,
    title: "Team Portfolio Website",
    description: `One of the projects I worked on was developing a Team Portfolio Platform, a centralized web application designed to showcase team members, their skills, experience, achievements, and project contributions through a modern and interactive user experience.

The goal was to move beyond static company profile pages and create a platform that highlights the people behind the work while providing visitors with a professional overview of the team's capabilities and expertise.

The Challenge

Many organizations maintain simple "About Us" pages that provide limited information about team members.

While these pages often list names and job titles, they rarely communicate:

Technical expertise
Professional experience
Project contributions
Certifications
Career achievements
Team capabilities

The objective was to build a platform that presents this information in a more engaging, scalable, and maintainable way.

Project Vision

The platform was designed to act as a digital showcase for both individuals and teams.

Visitors can explore:

Team member profiles
Technical skills
Professional experience
Certifications
Project portfolios
Technical diagrams and visual content
Team achievements

Rather than maintaining multiple profile pages manually, all information is managed centrally through a backend API.

System Architecture

The application follows a modern full-stack architecture consisting of a React frontend and a Node.js backend.

Users
   │
   ▼
React Frontend
   │
   ▼
Express API
   │
   ▼
Team Data Services

This separation allows the frontend and backend to evolve independently while keeping the application scalable and maintainable.

Building the Frontend Experience

The frontend was developed using React and Vite to provide a fast and responsive user experience.

Key design goals included:

Modern visual design.
Mobile responsiveness.
Fast loading performance.
Smooth navigation.
Accessible user interfaces.
Professional presentation of technical content.

Each team member receives a dedicated profile page where visitors can learn more about their background, experience, and areas of expertise.

Dynamic Team Profiles

One of the core features of the platform is the ability to dynamically render team member information.

Profiles can include:

Biography
Skills and technologies
Years of experience
Professional achievements
Project involvement
Technical diagrams
Portfolio images

This structure makes it easy to expand the platform as new team members join or existing profiles evolve.

Project Showcase System

A significant part of the platform focuses on highlighting completed projects.

Each project can include:

Descriptions
Technologies used
Screenshots
Visual assets
Architecture diagrams
Business outcomes

This provides visitors with a deeper understanding of the team's capabilities and technical experience.

User Experience Improvements

As the project matured, considerable effort was invested in refining the user experience.

Enhancements included:

Dark mode support.
Theme switching.
Improved accessibility compliance.
Better color contrast.
Enhanced navigation.
Smooth transitions and animations.
Responsive layouts for different screen sizes.

Special attention was given to accessibility standards to ensure readability and usability across a broad range of users.

API-Driven Architecture

The backend was developed using Node.js and Express.js.

Its primary responsibilities include:

Serving team profile data.
Managing project information.
Providing API endpoints for frontend consumption.
Supporting future content management capabilities.

The API-driven design keeps business logic separated from presentation logic, making future enhancements easier to implement.

Containerized Development Environment

To simplify development and deployment, the entire application was containerized using Docker.

The project uses a multi-container architecture:

Frontend Container
        │
        ▼
Backend Container

Benefits include:

Consistent development environments.
Simplified onboarding for developers.
Easier deployment processes.
Reduced environment-specific issues.
Better scalability options.

Docker Compose was used to orchestrate the application stack during development and testing.

Continuous Improvement

Throughout development, the platform underwent multiple design and usability iterations.

Areas of ongoing improvement included:

UI modernization.
Theme customization.
Accessibility enhancements.
Performance optimization.
Code quality improvements.
Better component architecture.

This iterative approach helped transform the platform from a basic portfolio website into a polished professional showcase.

Technologies Used
Frontend
React
Vite
JavaScript
HTML
CSS
Backend
Node.js
Express.js
Infrastructure
Docker
Docker Compose
Nginx
Development Practices
REST APIs
Responsive Design
Accessibility Improvements
Component-Based Architecture
Business Value

The platform delivers value in several ways:

Creates a professional online presence for teams.
Highlights technical expertise and achievements.
Improves visibility of completed projects.
Makes profile management easier and more scalable.
Provides a foundation for future enhancements.
Demonstrates modern web development practices.
Final Thoughts

This project was an opportunity to combine modern frontend development, backend API design, and containerized deployment practices into a single application.

Rather than creating a static portfolio website, the goal was to build a scalable platform capable of showcasing people, projects, and expertise in a professional and engaging way. The result is a flexible system that can continue evolving as the team grows and new projects are added.`,
    image: "/projects/team-portfolio.png",
    team: [1, 2], // Rana + Jana
    technologies: ["React", "Vite", "Node.js", "Express", "Docker"]
  },

  {
    id: 5,
    title: "BoostSEO",
    description: `BoostSEO is a web-based SEO analysis platform designed to help website owners, developers, and marketers quickly identify technical SEO issues and improve search engine visibility through automated audits and actionable recommendations.

🌐 Live Platform:
https://boostseo.jxtechstudio.com/

The project combines a high-performance Python backend with a modern React frontend to deliver comprehensive website audits in seconds, transforming complex SEO data into practical insights that can be acted upon immediately.

The Problem

Many website owners struggle to understand why their websites are not performing well in search engines.

Common challenges include:

Missing or poorly optimized metadata.
Incorrect heading structures.
Images lacking accessibility attributes.
Slow website response times.
Weak internal linking strategies.
Difficulty identifying technical SEO issues.

While many SEO tools can identify problems, they often provide limited guidance on how to fix them.

BoostSEO was built to bridge that gap.

Project Vision

The goal was to create a platform that not only analyzes websites but also explains the results in a way that is useful to both technical and non-technical users.

Instead of overwhelming users with raw data, BoostSEO converts findings into clear recommendations and measurable improvement opportunities.

Website URL
      │
      ▼
SEO Analysis Engine
      │
 ┌────┼─────────────────────┐
 │    │                     │
 ▼    ▼                     ▼
Technical SEO   Performance   Accessibility
      │
      ▼
Scoring Engine
      │
      ▼
Recommendations
      │
      ▼
Dashboard & PDF Report
Building the Analysis Engine

The core auditing engine was developed using FastAPI, enabling fast and efficient website analysis.

When a user submits a URL, the system automatically retrieves and analyzes page content to evaluate multiple SEO factors, including:

Page titles
Meta descriptions
Heading hierarchy (H1–H6)
Image alt attributes
Internal links
External links
Content structure
Technical page characteristics

This creates a complete technical snapshot of a website's SEO health.

Dynamic SEO Scoring

A major feature of BoostSEO is its scoring engine.

Rather than presenting a simple checklist, the platform evaluates multiple SEO categories and calculates a weighted score out of 100.

The scoring system helps users:

Understand overall SEO performance.
Identify priority issues.
Measure improvements over time.
Benchmark websites against SEO best practices.
Website Speed Analysis

Performance is a critical component of modern SEO.

BoostSEO includes response-time analysis that evaluates:

Server response speed.
Page accessibility.
Loading responsiveness.

This allows users to understand how website performance may affect both user experience and search rankings.

Actionable Recommendations

One of the most valuable aspects of the platform is its recommendation engine.

For every warning or failed check, BoostSEO generates practical guidance that explains:

What the issue is.
Why it matters.
How to fix it.

This turns technical findings into actionable tasks that developers and website owners can implement immediately.

Professional PDF Reports

To make sharing audit results easier, BoostSEO automatically generates downloadable PDF reports.

Reports include:

SEO scores.
Technical audit findings.
Performance metrics.
Improvement recommendations.

This functionality is particularly useful for consultants, agencies, and businesses that need to share results with clients or stakeholders.

User Experience & Dashboard Design

The frontend was built using React, Vite, and Tailwind CSS to provide a fast and modern user experience.

Key design objectives included:

Clean dashboard layout.
Dark-mode interface.
Responsive design.
Fast navigation.
Easy-to-understand visual reporting.

The result is a platform that makes technical SEO data accessible to users regardless of their technical background.

Technical Architecture

BoostSEO follows a decoupled architecture that separates analysis from presentation.

Backend Responsibilities
Website retrieval.
HTML parsing.
SEO analysis.
Scoring calculations.
Recommendation generation.
PDF report creation.
Frontend Responsibilities
Dashboard rendering.
Audit visualization.
User interaction.
API communication.
Report downloads.

This architecture provides flexibility, maintainability, and scalability for future enhancements.

Technologies Used
Backend
Python
FastAPI
BeautifulSoup
HTTPX
ReportLab
Frontend
React
Vite
Tailwind CSS
JavaScript
Features
Technical SEO Auditing
Dynamic SEO Scoring
Website Performance Analysis
Recommendation Engine
PDF Report Generation
Business Value

BoostSEO provides value to multiple audiences:

Website Owners
Understand SEO issues quickly.
Improve website visibility.
Track optimization progress.
Developers
Identify technical implementation problems.
Validate SEO best practices.
Improve website quality.
Marketing Teams
Monitor SEO performance.
Support optimization campaigns.
Measure improvements over time.
Agencies & Consultants
Generate professional audit reports.
Accelerate client assessments.
Standardize SEO review processes.
Final Thoughts

BoostSEO demonstrates how modern web technologies can simplify technical SEO analysis and transform it into a practical decision-making tool.

By combining automated website auditing, intelligent scoring, performance measurement, actionable recommendations, and professional reporting, the platform helps users move from identifying problems to implementing meaningful improvements.

What started as an SEO auditing tool evolved into a complete technical SEO assessment platform that provides immediate insights and a clear roadmap for website optimization.

🌐 Try it here:
https://boostseo.jxtechstudio.com/`,
    image: "/projects/boostseo.png",
    team: [1, 2],
    technologies: ["Python", "FastAPI", "React", "Vite", "Tailwind CSS", "BeautifulSoup4", "ReportLab"],
    github: "https://github.com/ranaahmd/SEO",
    liveUrl: "https://boostseo.jxtechstudio.com/"
  },

  // --- JANA SOLO PROJECTS ---
  {
    id: 6,
    title: "Careers Portal & Recruitment Management Platform",
    description: `As part of a broader digital transformation initiative, I designed and developed a Careers Portal and Recruitment Management Platform that digitized the entire hiring lifecycle—from publishing job opportunities to evaluating candidates through an internal recruitment dashboard.

The objective was to replace fragmented recruitment processes with a centralized platform that improves efficiency for both applicants and HR teams. The system provides a public-facing careers website for job seekers and an administrative portal for recruitment management.

The Challenge

Recruitment often involves multiple disconnected tools, spreadsheets, emails, and manual processes.

Managing job postings, collecting applications, reviewing resumes, tracking candidates, and coordinating hiring decisions can quickly become time-consuming and difficult to scale.

The goal of this project was to create a streamlined platform that would:

Publish job opportunities online.
Simplify the application process.
Centralize candidate management.
Improve recruitment visibility.
Reduce administrative overhead.
Support a more efficient hiring workflow.
Platform Architecture

The platform was designed with two primary components:

Public Careers Portal

A user-friendly interface where candidates can:

Browse available job openings.
Search for opportunities.
View detailed job descriptions.
Submit applications online.
Upload resumes and supporting information.
Recruitment Management Portal

An internal dashboard that enables HR teams to:

Create and publish jobs.
Manage applicants.
Filter and evaluate candidates.
Track recruitment progress.
Update application statuses.

This separation provided a clean experience for applicants while giving recruiters the tools they need to manage hiring efficiently.

Job Listings Experience

The careers homepage presents available positions in an organized and searchable format.

Each job posting includes:

Job title
Location
Employment type
Summary description
Detailed information page

Applicants can quickly browse opportunities and access complete role requirements before applying.

Detailed Job Pages

Each position has its own dedicated page containing comprehensive information about the opportunity.

This includes:

Position overview
Responsibilities
Requirements
Employment details
Location information
Compensation information
Application deadlines

Providing detailed information helps candidates make informed decisions before submitting applications.

Digital Application Workflow

One of the core goals of the project was eliminating manual application collection.

The platform includes a structured application process that gathers:

Personal information
Contact details
Educational background
Professional experience
Qualifications and certifications
Resume uploads

Applications are submitted directly into the recruitment system, creating a standardized candidate database that is easier to manage and evaluate.

Recruitment Management Dashboard

The internal recruitment dashboard acts as the operational center of the platform.

Recruiters can manage the entire hiring lifecycle from a single interface, including:

Creating new job openings.
Publishing opportunities.
Reviewing candidate submissions.
Monitoring recruitment progress.
Managing applicant records.

This significantly reduces the need for manual tracking and spreadsheet-based workflows.

Multilingual Job Publishing

To support a broader audience, the platform was designed with multilingual job management capabilities.

Recruiters can maintain job information in multiple languages, including:

Job titles
Descriptions
Locations
Requirements

This ensures that applicants can view opportunities in the language most appropriate for them while maintaining a single source of truth for recruitment data.

Candidate Tracking and Evaluation

A centralized applicant management system allows recruiters to review and track candidates throughout the hiring process.

Recruiters can:

View applicant details.
Access uploaded resumes.
Review qualifications and experience.
Monitor application status.
Progress candidates through recruitment stages.

The system provides a structured workflow that helps hiring teams remain organized throughout the recruitment cycle.

Advanced Candidate Filtering

As application volumes increase, finding the right candidates becomes more challenging.

To address this, the platform includes advanced filtering tools that allow recruiters to narrow applicants based on factors such as:

Application status
Experience level
Educational background
Candidate qualifications

These filters help HR teams identify suitable candidates more efficiently and improve overall recruitment productivity.

Business Impact

The platform delivered several important benefits:

Centralized recruitment operations.
Faster candidate processing.
Reduced manual administrative work.
Improved visibility into hiring pipelines.
Better applicant experience.
More consistent candidate evaluation.
Improved scalability for future recruitment growth.

The project transformed recruitment from a collection of disconnected tasks into a structured and manageable digital workflow.

Key Technologies
Node.js
Express.js
MariaDB
JavaScript
File Upload Management
Search & Filtering Systems
Role-Based Administration
Responsive Web Design
Final Thoughts

This project demonstrated how a well-designed recruitment platform can improve both the applicant experience and internal hiring operations.

By combining a public careers portal with an integrated recruitment management dashboard, the system streamlined the hiring lifecycle from job publication to candidate evaluation. The result was a more organized, efficient, and scalable recruitment process that supports long-term organizational growth and digital transformation.`,
    image: "/projects/careers-portal-1.png",
    team: [2], // Jana solo
    technologies: ["Node.js", "Express.js", "MariaDB", "JavaScript"]
  },

  {
    id: 7,
    title: "Secure Power BI Integration for ERP Data",
    description: `One of the most technically interesting projects I worked on involved integrating a business intelligence platform with an ERP system while maintaining security, performance, and ease of use for business users.

The objective was to provide management and department leaders with interactive dashboards powered by ERP data without exposing database credentials, opening direct database access to users, or creating complex reporting workflows.

The Challenge

Business users needed access to operational and financial reporting, but the underlying ERP database contained sensitive information and was hosted within a protected infrastructure environment.

Traditional approaches often involve:

Direct database access for reporting tools.
Shared credentials between multiple users.
VPN dependencies.
Manual report exports.
Security concerns around exposing internal systems.

I wanted a solution that would allow reporting tools to access the required data while keeping the ERP environment protected.

The Architecture

To solve this problem, I designed a middleware layer that acted as a secure bridge between the ERP database and reporting consumers.

The architecture looked like this:

ERP Database
      │
      ▼
Read-Only Database User
      │
      ▼
Proxy API Layer
      │
      ▼
Power BI
      │
      ▼
Business Dashboards

Instead of allowing reporting tools to communicate directly with the ERP database, all requests flowed through a controlled API layer.

This created a clear separation between operational systems and reporting systems.

Creating a Read-Only Data Source

A key design decision was ensuring that reporting activities could never modify production data.

To accomplish this, I implemented a dedicated read-only access layer that exposed only the information required for reporting and analytics.

Benefits included:

Reduced security risk.
Protection against accidental data modification.
Better auditability.
Controlled access to reporting datasets.

This approach allowed business intelligence workloads to operate independently from daily ERP operations.

Building the Proxy API

The heart of the solution was a custom Node.js middleware service.

The proxy API handled:

Authentication.
Database connectivity.
Query execution.
Data formatting.
Response delivery.

Rather than embedding credentials in reporting tools or distributing database access to users, the API managed all communication with the data source.

This significantly improved security and simplified administration.

Solving Connectivity Challenges

One of the common challenges in reporting projects is securely connecting cloud-based analytics tools to privately hosted business systems.

The proxy architecture solved this issue by creating a controlled communication path that allowed authorized reporting services to retrieve data without exposing internal infrastructure directly.

This reduced the need for complex networking configurations while maintaining security boundaries.

Optimizing Data for Reporting

Raw ERP data is rarely ready for business reporting.

To improve usability, I implemented several transformations and optimizations before the data reached reporting consumers.

These included:

Data normalization.
Business-friendly field naming.
Dataset filtering.
Performance optimization.
Pagination handling.
Aggregated reporting views.

The goal was to ensure that report developers could focus on analysis rather than data preparation.

Dynamic Reporting Workflows

The integration supported dynamic reporting scenarios where dashboards automatically refreshed using current ERP data.

Examples included:

Operational performance reporting.
Sales analytics.
Inventory monitoring.
Financial summaries.
Management dashboards.

This eliminated the need for manual exports and ensured stakeholders always had access to current information.

Supporting Large Datasets

As data volumes grew, performance became an important consideration.

The solution was designed to handle large reporting datasets efficiently by:

Limiting unnecessary data transfers.
Optimizing query execution.
Implementing pagination strategies.
Reducing processing overhead on production systems.

These improvements helped maintain responsiveness while minimizing the impact on the ERP environment.

Security Considerations

Security was a major focus throughout the project.

Several controls were implemented, including:

Read-only data access.
Credential isolation.
Controlled API endpoints.
Restricted database permissions.
Separation between operational and reporting environments.

These safeguards helped ensure that reporting functionality did not introduce unnecessary risk to business systems.

Business Impact

The project delivered several important benefits:

Enabled self-service reporting for business users.
Reduced dependence on manual data exports.
Improved visibility into operational performance.
Protected production ERP systems from direct access.
Simplified report development and maintenance.
Provided a scalable foundation for future analytics initiatives.

Most importantly, it allowed stakeholders to access reliable, up-to-date information without compromising system security.

Technologies Used
Data & Reporting
Power BI
SQL
ERP Data Sources
Middleware
Node.js
REST APIs
JSON Processing
Database
MariaDB
Infrastructure
Linux
Secure Networking
Authentication Controls
Final Thoughts

This project demonstrated that effective business intelligence is not only about creating dashboards—it is also about building secure and reliable data pipelines.

By introducing a proxy API layer between the ERP system and reporting platform, I was able to create a solution that balanced accessibility, performance, and security. The result was a reporting environment that empowered decision-makers with real-time insights while protecting the integrity of operational systems.`,
    image: "/projects/power-bi-integration.png",
    team: [2],
    technologies: ["Power BI", "Node.js", "SQL", "MariaDB", "REST APIs", "Linux"]
  },

  {
    id: 8,
    title: "AI-Powered HR & ERP Analytics Platform",
    description: `Over the past year, one of the most interesting projects I worked on was building an automation and analytics platform that connected our HR system (Jisr) with our ERP system (ERPNext) using n8n as the orchestration engine. The goal was simple: eliminate manual reporting, improve visibility across departments, and transform operational data into actionable insights.

The Challenge

Like many organizations, critical business data was spread across multiple systems. HR information lived inside Jisr, while operational, inventory, and sales data resided in ERPNext. Producing management reports often required exporting data to Excel, cleaning it manually, performing calculations, and preparing summaries for decision-makers.

This process consumed valuable time and made it difficult to obtain real-time insights.

The Solution

I designed an automation platform using n8n as the central integration hub.

The platform continuously collects data from Jisr APIs and ERPNext databases, processes and enriches the data using custom JavaScript logic, and then sends the results to Google Gemini AI for analysis and interpretation.

The workflow looks like this:

Jisr API + ERPNext
        ↓
      n8n
(Data Processing)
        ↓
   Gemini AI
(Analysis Layer)
        ↓
Reports, Dashboards,
Alerts & Insights

Instead of delivering raw numbers, the platform generates business-focused insights and recommendations automatically.

HR Analytics Workflows

One of the largest components of the project focused on HR analytics.

Saudization Compliance Monitoring

The system retrieves employee and branch information from Jisr and calculates Saudization percentages across the organization.

Using predefined compliance thresholds, the workflow identifies branches that may be approaching risk levels and highlights areas requiring attention before they become compliance issues.

Attendance Analysis

Attendance records are automatically collected and categorized into:

On-time employees
Late arrivals
Absences

The workflow produces branch-level performance rankings and attendance summaries, helping management quickly identify trends and recognize high-performing teams.

Leave Balance Monitoring

The platform tracks annual leave balances and identifies employees with unusually high leave accumulations.

This helps management understand potential financial liabilities and encourages proactive leave planning before balances become excessive.

Employee Retention Insights

Using employee tenure and workforce data, the system highlights departments experiencing higher turnover patterns and identifies areas where employee retention may require attention.

ERPNext Automation

Beyond HR, I also developed several ERPNext-focused workflows.

Inventory Analytics

One workflow analyzes stock levels across dozens of brands and products.

Using ERPNext data, the system automatically identifies:

Products at risk of stock-out
Overstocked inventory
Slow-moving items

Instead of sending raw inventory lists, Gemini AI generates recommendations tailored to different departments, including purchasing, sales, and inventory management teams.

Sales Performance Analysis

I built an AI-powered reporting process that analyzes low-performing products and sales trends.

The workflow generates structured recommendations and suggested actions that managers can immediately use when planning promotions, purchasing decisions, or inventory adjustments.

ERP Data Quality Checks

Several scheduled workflows perform automated validation and auditing of ERP data, helping identify incomplete records, pending transactions, and inconsistencies before they affect reporting accuracy.

Adding AI to the Process

The most interesting part of the project was integrating Google Gemini AI.

Rather than asking managers to interpret spreadsheets and reports manually, the system sends structured business data to Gemini and requests analytical summaries.

The AI acts like a virtual business analyst by:

Identifying trends
Highlighting risks
Explaining unusual patterns
Suggesting corrective actions
Generating executive summaries

This transforms large datasets into concise and understandable reports.

Natural Language Business Intelligence

One feature I particularly enjoyed building was a natural language business intelligence interface.

Users can submit a question through a webhook endpoint, such as:

"Which products have the lowest sales this month?"

The workflow automatically:

Receives the request.
Retrieves live ERPNext data.
Sends relevant information to Gemini.
Returns a concise business-focused answer.

This effectively creates an AI-powered assistant capable of answering questions using real company data.

Business Impact

The project delivered several measurable improvements:

Reduced manual reporting effort.
Improved visibility into HR and operational metrics.
Enabled proactive decision-making through automated alerts.
Provided real-time access to business insights.
Improved data consistency and reporting reliability.
Demonstrated how AI can be integrated into existing enterprise systems without replacing them.
Key Technologies
n8n
ERPNext
Jisr API
MariaDB
JavaScript
REST APIs
Google Gemini AI
Webhooks
SQL
Final Thoughts

This project demonstrated the power of combining workflow automation, enterprise systems, and AI into a single platform. By connecting Jisr and ERPNext through n8n and enriching the data with Gemini AI, I was able to create a system that not only automates reporting but also helps management make faster and better-informed decisions.

Rather than treating data as something stored in separate systems, the platform turns it into a continuously available source of operational intelligence.`,
    image: "/projects/hr-erp-analytics.png",
    team: [2],
    technologies: ["n8n", "ERPNext", "Jisr API", "Google Gemini AI", "MariaDB", "JavaScript"]
  },

  {
    id: 9,
    title: "Internal Employee Portal",
    description: `One of the most rewarding projects I worked on was developing an Internal Employee Portal, a centralized platform designed to bring together employee services, business intelligence, collaboration tools, and operational workflows into a single application.

The goal was to eliminate the need for employees and managers to switch between multiple systems throughout the day and instead provide a unified digital workspace accessible through a single portal.

The Challenge

As organizations grow, information and tools often become fragmented across different systems.

Employees may use one platform for meeting room reservations, another for reporting, another for business dashboards, and separate tools for communication and approvals. This fragmentation creates inefficiencies and increases the time required to complete routine tasks.

The objective of the project was to create a centralized portal that would:

Simplify access to internal services.
Improve visibility into business performance.
Reduce administrative overhead.
Provide employees with self-service capabilities.
Deliver AI-powered assistance directly within the workplace.
Designing the Platform

The portal was built using:

Node.js
Express.js
EJS
MariaDB
Docker
Kubernetes (k3s)

The application was designed as a modular system where different business functions could be enabled or disabled based on user roles and permissions.

Employees
     │
     ▼
Internal Employee Portal
     │
 ┌───┼───────────────────────┐
 │   │                       │
 ▼   ▼                       ▼
Meetings   Business Dashboards   AI Assistant
 │               │                 │
 ▼               ▼                 ▼
Notifications   Analytics      Workflow Automation

This architecture allowed the platform to grow over time while maintaining a consistent user experience.

Meeting Room Management

One of the first features implemented was a meeting room booking system.

Employees could view room availability through a calendar interface and reserve meeting spaces directly from the portal.

Once a reservation was created, automated email notifications were sent to attendees, ensuring everyone remained informed without requiring manual coordination.

The system reduced scheduling conflicts and simplified resource management across departments.

Strategy and Goal Tracking

To support organizational planning, I developed a strategy management module that allowed departments to submit and track goals within defined planning periods.

Managers could:

Create departmental objectives.
Track progress throughout the reporting cycle.
Review submissions from multiple departments.
Monitor organization-wide progress from a centralized dashboard.

Automated notifications helped ensure submissions were completed on time and reduced the need for manual follow-ups.

AI-Powered Employee Assistant

One of the most interesting features was an integrated AI assistant.

The assistant was connected to backend automation workflows through n8n, allowing employees to interact with organizational knowledge and internal processes through a conversational interface.

Users could ask questions directly from the portal and receive responses generated through AI-powered workflows.

This transformed the portal from a static dashboard into an interactive workplace tool.

Business Intelligence Integration

A major objective of the project was to make business data more accessible.

The portal included embedded analytics dashboards that allowed authorized users to view operational and performance metrics without leaving the application.

Instead of requiring separate reporting tools, employees and managers could access insights directly from their daily workspace.

This approach improved adoption of reporting systems and increased visibility into key performance indicators.

Digital Signature System

To reduce paperwork and streamline internal processes, I implemented a digital signature feature.

Employees could create and save their signatures directly within their profile, allowing signed approvals and acknowledgements to become part of digital workflows.

The feature improved convenience while supporting the organization's move toward paperless operations.

Role-Based Access Control

Security and access management were key considerations throughout development.

The platform included:

User management
Role assignment
Permission controls
Feature visibility settings
Administrative management tools

This allowed different user groups to see only the tools and information relevant to their responsibilities.

Administrators could enable or disable features for individual users without modifying application code.

Multilingual User Experience

Since the platform served a diverse workforce, full bilingual support was implemented.

Users could seamlessly switch between:

English
Arabic

The interface, navigation, and application content adapted dynamically based on language preference, improving accessibility for all employees.

Automation Through n8n

Many data-intensive operations were delegated to n8n workflows.

The portal acted as the user-facing interface, while automation workflows handled:

Data aggregation
Business calculations
AI processing
Report generation
External system integrations

This separation of concerns allowed the application to remain lightweight while leveraging powerful backend automation capabilities.

Deploying on Kubernetes

The entire platform was containerized using Docker and deployed on a k3s Kubernetes cluster.

Benefits included:

Simplified deployments
Improved scalability
Service isolation
Easier maintenance
Consistent environments between development and production

Using Kubernetes also provided a solid foundation for future growth and additional services.

Technical Stack
Frontend
EJS Templates
JavaScript
HTML/CSS
Internationalization (i18n)
Backend
Node.js
Express.js
MariaDB
Infrastructure
Docker
Kubernetes (k3s)
Nginx
Integrations
n8n Automation
Email Services
Business Intelligence Dashboards
AI Services
Key Outcomes

The Internal Employee Portal successfully consolidated multiple workplace functions into a single platform and delivered several benefits:

Improved employee experience through a centralized workspace.
Reduced administrative effort through automation.
Simplified meeting room and resource management.
Increased access to business intelligence and reporting.
Enabled AI-powered employee assistance.
Provided scalable infrastructure through Kubernetes deployment.
Established a foundation for future internal digital transformation initiatives.
Final Thoughts

This project was more than just a web application. It was an attempt to create a unified digital workplace where employees could access tools, information, automation, and analytics from a single interface.

By combining modern web technologies, Kubernetes, workflow automation, and AI capabilities, the Internal Employee Portal became a practical example of how internal business systems can be modernized while improving both employee productivity and operational efficiency.`,
    image: "/projects/employee-portal.png",
    team: [2],
    technologies: ["Node.js", "Express.js", "EJS", "MariaDB", "Docker", "Kubernetes (k3s)"]
  },

  {
    id: 10,
    title: "Internal IT Helpdesk & Asset Management System",
    description: `One of the practical internal platforms I developed was an IT Helpdesk and Asset Management System, designed to streamline technical support requests and improve visibility into IT asset allocation across the organization.

The platform was built as a lightweight, self-hosted solution that allowed employees to submit support requests while giving the IT team a centralized workspace for ticket management, issue tracking, and asset administration.

The Challenge

Like many organizations, technical support requests were often received through emails, phone calls, messaging applications, or informal conversations.

This created several problems:

Requests could be overlooked.
Ticket priorities were unclear.
Progress tracking was difficult.
Historical records were fragmented.
Asset assignments were not centrally managed.

The objective was to create a system that would standardize support operations and provide greater accountability throughout the resolution process.

System Overview

The application was developed using:

PHP 8.2
MySQL
Apache
Docker
Kubernetes (k3s)

The platform consists of two primary areas:

Employee Portal

Used by employees to submit support requests.

IT Administration Portal

Used by IT staff to manage, prioritize, and resolve tickets.

Employees
    │
    ▼
Ticket Submission Portal
    │
    ▼
Ticket Database
    │
    ▼
IT Kanban Dashboard
    │
 ┌──┼─────────────┐
 │  │             │
 ▼  ▼             ▼
Open  In Progress  Closed

This workflow ensures every request follows a structured lifecycle from creation to resolution.

Bilingual User Experience

To support a diverse workforce, the system was designed with full bilingual capabilities.

Users can interact with the platform in:

English
Arabic

All forms, labels, categories, and notifications are presented in the user's preferred language, making the system accessible to a wider audience.

Ticket Management Workflow

Employees submit support requests through a structured form that captures information needed by the IT department.

The system organizes requests into a centralized database where administrators can:

Review incoming tickets.
Track ticket status.
Update progress.
Mark issues as resolved.
Close completed requests.

This process replaces ad-hoc communication channels with a standardized support workflow.

Kanban-Based Administration Dashboard

One of the core features of the platform is the administrative Kanban dashboard.

Rather than displaying tickets in long tables, requests are organized visually according to their status.

This allows IT teams to quickly understand:

Current workload.
Pending requests.
Issues currently being addressed.
Recently completed tasks.

The Kanban approach improves operational visibility and helps prioritize support activities.

Email Notifications

To improve communication between employees and the IT department, the platform automatically generates email notifications throughout the ticket lifecycle.

Notifications are sent when:

A ticket is submitted.
Status changes occur.
Issues are resolved.
Requests are closed.

This keeps users informed without requiring manual follow-up from technicians.

IT Asset Management

In addition to helpdesk functionality, I expanded the platform to include asset management capabilities.

The asset module allows IT administrators to track assigned equipment and maintain a record of issued devices.

Examples include:

Laptops
Workstations
Monitors
Mobile devices
Peripheral equipment

Having asset information integrated into the same platform reduces administrative overhead and improves inventory visibility.

Digital Asset Assignment Records

To improve accountability and documentation, the system generates digital assignment records whenever equipment is issued.

These records can be stored electronically and linked directly to employee assignments, creating a centralized history of asset ownership and transfers.

This feature significantly reduced reliance on paper-based processes.

Infrastructure and Deployment

The application was containerized using Docker and deployed on a k3s Kubernetes cluster.

Benefits included:

Simplified deployment management.
Consistent environments.
Easier maintenance.
Reliable service availability.
Scalability for future growth.

The application and database were separated into dedicated services, allowing updates to be performed without impacting stored ticket data.

Security and Access Control

Administrative functions are protected through authenticated access and role-based administration.

Security measures included:

Password hashing.
Session management.
Protected administration interfaces.
Database credential isolation through environment variables.

These controls help ensure that only authorized personnel can access support records and management functions.

Key Technologies
Application Layer
PHP 8.2
Apache
HTML/CSS
JavaScript
Data Layer
MySQL
Communication
SMTP Email Notifications
Infrastructure
Docker
Kubernetes (k3s)
Operations
Asset Tracking
Ticket Lifecycle Management
Kanban Workflow Management
Business Impact

The platform delivered several operational improvements:

Centralized technical support requests.
Improved ticket visibility and accountability.
Faster issue resolution workflows.
Better communication between employees and IT.
Centralized asset tracking.
Reduced manual administration.
Improved historical reporting and record keeping.
Final Thoughts

This project started as a simple helpdesk application but evolved into a broader IT operations platform that combined support ticket management with asset administration.

By building a solution tailored to internal operational needs, I was able to provide a structured workflow for technical support while improving visibility into both service requests and equipment management. The result was a more organized, efficient, and scalable approach to day-to-day IT operations.`,
    image: "/projects/it-helpdesk.png",
    team: [2],
    technologies: ["PHP 8.2", "MySQL", "Apache", "Docker", "Kubernetes (k3s)"]
  },

  {
    id: 11,
    title: "Enterprise Email Archiving with Open Archiver",
    description: `Email remains one of the most important sources of business communication, yet many organizations rely entirely on their mail provider for long-term retention and historical record keeping.

To improve email retention, searchability, and operational control, I deployed and customized Open Archiver, an open-source email archiving platform designed for secure email preservation, indexing, search, and compliance-focused retention.

Rather than building an email archiving system from scratch, the project focused on transforming an open-source solution into a production-ready platform through infrastructure optimization, security hardening, access-control customization, and operational automation.

Why Open Archiver?

After evaluating available options, I selected Open Archiver because it provides:

Email ingestion from IMAP and other enterprise mail systems.
Full-text search across emails and attachments.
Encryption at rest.
Long-term email retention capabilities.
Self-hosted deployment.
Modern containerized architecture.

The platform is built using modern technologies including SvelteKit, Node.js, PostgreSQL, Meilisearch, and Redis-compatible queue systems, making it well suited for enterprise deployments.

Project Objectives

The primary objectives were:

Create a centralized email archive.
Reduce dependency on mailbox storage limits.
Improve historical email search capabilities.
Implement secure employee-level access controls.
Protect archived communications from accidental deletion.
Build a scalable platform capable of handling large email volumes.
Architecture Overview

The deployment consisted of several integrated services:

Corporate Mail System
          │
          ▼
     IMAP Ingestion
          │
          ▼
     Open Archiver
          │
 ┌────────┼─────────┬─────────┐
 │        │         │         │
 ▼        ▼         ▼         ▼
PostgreSQL  Search  Queue  Attachment Parser
            Engine
          │
          ▼
    Encrypted Archive
          │
          ▼
      Web Portal

This architecture separates ingestion, indexing, storage, and search functions to improve scalability and maintainability.

Custom Employee Archive Permissions

One of the most significant customizations implemented during the project was the creation of a secure employee archive model.

The requirement was simple:

Employees should only be able to search and view emails they participated in directly.

To accomplish this, I implemented a custom role structure and search filtering policies that automatically restrict visibility based on email participation.

The result was a "Personal Archive" experience where users could access their own communications while remaining isolated from other users' archived content.

This significantly improved privacy and reduced the risk of unauthorized access to sensitive communications.

Automated Role Provisioning

To simplify administration, the platform was configured to automatically provision predefined access roles during deployment.

Examples included:

System Administrators.
Standard Users.
Read-Only Auditors.
Personal Archive Users.

This reduced onboarding effort and ensured consistent access control policies across the platform.

Storage Lifecycle Optimization

Another challenge involved balancing archive growth with operational efficiency.

The ingestion workflow was customized to focus on long-term retention use cases by selectively processing older communications for archival storage.

Benefits included:

Reduced mailbox storage pressure.
Better separation between active and historical communications.
Improved archive organization.
More predictable storage growth.
Search and Discovery

A major advantage of Open Archiver is its powerful search engine.

The deployment provides rapid searching across:

Email subjects.
Message content.
Sender information.
Recipient information.
Attachments.
Historical communication records.

The platform automatically indexes archived content, making years of communication searchable within seconds.

Attachment Indexing

Business-critical information often resides inside attachments rather than message bodies.

The platform was configured to extract searchable content from documents such as:

PDF files.
Word documents.
Spreadsheets.
Text-based attachments.

This dramatically improves the ability to locate information buried within archived communications.

Infrastructure Hardening

During deployment, infrastructure stability became an important focus area.

Resource-intensive operations such as indexing, synchronization, and application builds required additional optimization to ensure reliable operation.

Improvements included:

Resource management tuning.
Memory optimization.
Background worker stabilization.
Queue management enhancements.
Operational monitoring.

These changes improved reliability during large synchronization and indexing operations.

Security Enhancements

Security was a key requirement throughout the project.

Several protections were implemented, including:

Archive Encryption

Archived email data is stored in encrypted form, protecting communications even if underlying storage is compromised.

Access Isolation

Role-based permissions ensure users only access information relevant to their responsibilities.

Archive Preservation

The archive is maintained independently from the live email environment, ensuring historical records remain available even if messages are removed from active mailboxes.

Technologies Used
Open Source Platform
Open Archiver
Backend Services
Node.js
Express.js
Frontend
SvelteKit
Data & Search
PostgreSQL
Meilisearch
Queue Processing
Valkey (Redis-Compatible)
Content Processing
Apache Tika
Infrastructure
Docker
Linux
Reverse Proxy Architecture
Business Impact

The project delivered several operational improvements:

Centralized email retention.
Rapid historical email search.
Improved mailbox storage management.
Enhanced privacy controls.
Better operational visibility.
Reduced risk of accidental data loss.
Long-term preservation of business communications.
Final Thoughts

This project demonstrates how an open-source platform can be transformed into a production-ready enterprise solution through thoughtful customization and infrastructure engineering.

While the foundation was provided by Open Archiver, my work focused on deployment, security hardening, role-based access control customization, infrastructure optimization, and operational improvements that aligned the platform with real-world organizational requirements.

The result was a scalable and secure email archive that provides long-term communication retention, rapid search capabilities, and controlled user access while remaining fully self-hosted and under organizational control.`,
    image: "/projects/open-archiver.png",
    team: [2],
    technologies: ["Node.js", "Express.js", "SvelteKit", "PostgreSQL", "Meilisearch", "Docker"]
  },

  {
    id: 12,
    title: "GCP to Self-Managed VPS Migration",
    description: `One of the most impactful infrastructure projects I worked on involved the migration of production services from a cloud-hosted environment to a self-managed VPS infrastructure.

The objective was not simply to move applications from one server to another—it was to redesign the deployment environment, improve operational visibility, strengthen security controls, and create a more cost-effective platform capable of supporting future growth.

The Challenge

Over time, the production environment had grown to support multiple business-critical applications and services.

Like many cloud environments, several challenges emerged:

Increasing infrastructure costs.
Fragmented service management.
Limited operational visibility.
Complex deployment workflows.
Inconsistent monitoring and alerting.
Security concerns around exposed services.

The goal was to migrate workloads while minimizing downtime and maintaining service availability throughout the transition.

Planning the Migration

Before moving any workloads, a full assessment of the existing environment was performed.

This included identifying:

Running applications.
Database dependencies.
Networking requirements.
DNS configurations.
SSL certificates.
Scheduled jobs and background services.
Backup requirements.

The migration strategy focused on ensuring that every dependency was documented and validated before production cutover.

Designing the New Environment

Rather than recreating the existing setup exactly as it was, the new infrastructure was redesigned with operational simplicity and scalability in mind.

The target environment consisted of:

Linux-based VPS servers.
Containerized workloads.
Reverse proxy architecture.
Centralized monitoring.
Automated backups.
Improved security controls.

The objective was to create a platform that could be managed efficiently while remaining flexible enough for future expansion.

Application Migration

The migration involved moving multiple production applications and services to the new environment.

Each application underwent:

Configuration validation.
Environment variable migration.
Database connectivity testing.
Service dependency verification.
User acceptance testing.

By validating each workload individually, risks during final cutover were significantly reduced.

Containerization and Service Management

To improve deployment consistency, applications were deployed using containerized environments.

This approach provided several advantages:

Reproducible deployments.
Simplified updates.
Better resource isolation.
Easier troubleshooting.
Faster recovery procedures.

Containerization also reduced configuration drift between environments.

Security Improvements

Security was a major focus of the migration project.

Several enhancements were implemented as part of the transition, including:

Reduced public exposure of services.
Reverse proxy protection.
SSL certificate management.
Improved access controls.
Service isolation.
Infrastructure hardening.

The migration provided an opportunity to address security gaps that had accumulated over time.

Monitoring and Observability

One of the key improvements introduced during the migration was increased visibility into infrastructure health.

A monitoring stack was implemented to track:

Server health.
Resource utilization.
Application availability.
Service uptime.
Performance trends.

This enabled proactive issue detection rather than relying solely on user-reported problems.

Backup and Recovery Strategy

A robust backup strategy was implemented as part of the migration process.

Critical systems were protected through:

Automated backup schedules.
Data retention policies.
Recovery validation procedures.
Disaster recovery planning.

The goal was to ensure that business-critical data could be restored quickly in the event of an unexpected failure.

DNS and Cutover Execution

Once validation was complete, production traffic was migrated using a controlled cutover process.

The migration included:

DNS updates.
SSL verification.
Application testing.
Service monitoring.
Post-migration validation.

Careful planning allowed the transition to occur with minimal disruption to end users.

Performance and Cost Benefits

Following the migration, several improvements were realized:

Operational Benefits
Greater control over infrastructure.
Faster troubleshooting.
Simplified deployment workflows.
Improved monitoring capabilities.
Technical Benefits
Better resource utilization.
Consistent application environments.
Enhanced security posture.
Improved operational visibility.
Business Benefits
Reduced infrastructure costs.
Greater flexibility for future growth.
Better platform reliability.
Increased ownership of critical systems.
Technologies and Practices Used
Infrastructure
Linux Servers
Virtual Private Servers (VPS)
Application Hosting
Docker
Reverse Proxy Architecture
Operations
Monitoring & Alerting
Backup Automation
SSL Management
DNS Administration
Security
Access Control
Service Isolation
Infrastructure Hardening
Lessons Learned

One of the biggest lessons from this project was that successful migrations are primarily planning exercises rather than technical exercises.

The actual movement of applications is often straightforward; understanding dependencies, validating services, preparing rollback plans, and monitoring the environment are what ultimately determine success.

The project reinforced the importance of documentation, automation, observability, and security when managing production systems.

Final Thoughts

Migrating production workloads from a cloud platform to a self-managed VPS environment was more than a hosting change—it was an opportunity to modernize the infrastructure and establish stronger operational practices.

The result was a more controlled, cost-effective, and observable platform capable of supporting business applications with improved reliability, security, and operational efficiency.`,
    image: "/projects/vps-migration.png",
    team: [2],
    technologies: ["Docker", "Linux", "Reverse Proxy", "Monitoring & Alerting"]
  }
];
