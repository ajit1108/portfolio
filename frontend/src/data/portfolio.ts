// ============================================================
// Ajit Birajdar — Portfolio Data (verified from resume + GitHub)
// ============================================================

export const personalInfo = {
  name: "Ajit Birajdar",
  headline: "Full Stack Java Developer",
  tagline:
    "Building scalable backend systems & intelligent web applications with Java, Spring Boot, and React.",
  bio: "Full Stack Java Developer and Machine Learning Enthusiast with hands-on experience building full-stack web applications using Java, Spring Boot, React, MongoDB, and Machine Learning. Experienced in developing real-world projects that combine modern web technologies with intelligent solutions. Strong problem-solving skills with a keen interest in software development, backend engineering, and applying technology to solve practical problems.",
  location: "Kolhapur, Maharashtra, India",
  phone: "+91 8308129957",
  phoneHref: "+918308129957",
  phoneUrl: "https://wa.me/918308129957",
  email: "ajitbirajdar1108@gmail.com",
  emailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=ajitbirajdar1108@gmail.com",
  github: "https://github.com/ajit1108",
  linkedin: "https://www.linkedin.com/in/ajit-birajdar-5934822b0/",
  available: true,
  stats: [
    { label: "CGPA", value: "8.7", suffix: "" },
    { label: "Projects Built", value: "3", suffix: "+" },
    { label: "Technologies", value: "15", suffix: "+" },
  ],
};

export const skills = [
  {
    category: "Languages",
    icon: "Code",
    color: "#a78bfa",
    items: ["Java", "JavaScript", "Python", "C"],
  },
  {
    category: "Frontend",
    icon: "Monitor",
    color: "#60a5fa",
    items: ["React.js", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    icon: "Server",
    color: "#34d399",
    items: ["Spring Boot", "REST APIs", "Spring Data JPA", "WebSocket"],
  },
  {
    category: "Databases",
    icon: "Database",
    color: "#f472b6",
    items: ["MongoDB", "MySQL"],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    color: "#fb923c",
    items: ["Machine Learning", "Scikit-learn", "Google Gemini"],
  },
  {
    category: "Tools & Platforms",
    icon: "Wrench",
    color: "#facc15",
    items: ["Git", "GitHub", "VS Code", "Jira", "Netlify", "Render", "Vercel", "Maven"],
  },
];

export const projects = [
  {
    id: 1,
    title: "CalmPulse",
    subtitle: "Stress Burnout Detection System",
    description:
      "An AI-powered burnout detection system that analyzes user inputs to identify potential stress and burnout levels using Machine Learning. Features RESTful APIs for user authentication, assessment management, and real-time stress predictions.",
    techStack: ["Spring Boot", "MongoDB", "Machine Learning", "Scikit-learn", "HTML", "CSS"],
    category: "AI/ML",
    github: "https://github.com/ajit1108/calmpulse1",
    live: "https://calmpulse123.netlify.app/",
    highlights: [
      "ML prediction service integrated with Spring Boot backend",
      "RESTful APIs for auth, assessment management & predictions",
      "MongoDB for persistent storage of user profiles & assessments",
      "Scalable architecture separating auth, prediction & assessment services",
    ],
  },
  {
    id: 2,
    title: "SocialNetwork",
    subtitle: "Full Stack Social Media Platform",
    description:
      "A full-stack social networking platform with user authentication, profile management, posts, friend requests, real-time one-to-one chat, and role-based access control.",
    techStack: ["Spring Boot", "React", "MySQL", "WebSocket", "STOMP", "SockJS"],
    category: "Full Stack",
    github: "https://github.com/ajit1108/SocialNetwork",
    live: null,
    highlights: [
      "Real-time messaging using WebSocket with STOMP and SockJS",
      "RESTful APIs for users, posts, friendships & messaging",
      "MySQL for persistent management of all relational data",
      "Responsive React frontend with role-based access control",
    ],
  },
  {
    id: 3,
    title: "RetailX",
    subtitle: "Retail Management Application",
    description:
      "A modern retail management application designed to streamline product inventory, sales tracking, and business operations for retail environments.",
    techStack: ["React", "REST APIs", "Node.js"],
    category: "Full Stack",
    github: "https://github.com/ajit1108/RetailX_App",
    live: null,
    highlights: [
      "Product inventory and sales tracking features",
      "REST API integration for data management",
      "Modern responsive UI for retail operations",
    ],
  },
  {
    id: 4,
    title: "Keystone",
    subtitle: "Field Service Management Platform",
    description:
      "A role-based field service management platform where customers raise service requests, dispatchers triage and assign them, technicians work them in the field, and managers close them out. Includes SLA tracking, parts inventory, photo attachments, and reporting.",
    techStack: ["Spring Boot", "Java", "Spring Security", "MongoDB", "JWT", "Docker"],
    category: "Full Stack",
    github: "https://github.com/ajit1108/keystones",
    live: "https://keystones-web.onrender.com/",
    highlights: [
      "Work order lifecycle with status history and role-gated transitions",
      "SLA tracking with on-track, at-risk and breach notifications",
      "Parts inventory with atomic stock decrements and overdraw checks",
      "JWT-secured REST API with authenticated attachments and reports",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Business Systems (CSBS)",
    institution: "Kolhapur Institute of Technology's College of Engineering",
    location: "Kolhapur, Maharashtra",
    period: "2023 – 2027",
    score: "CGPA: 8.7",
    type: "graduation",
    current: true,
  },
  {
    degree: "Higher Secondary Education (12th)",
    institution: "Chh. Shivaji Arts, Science and Commerce Junior College",
    location: "Solapur, Maharashtra",
    period: "2023",
    score: "66.17%",
    type: "higher-secondary",
    current: false,
  },
  {
    degree: "Secondary Education (10th)",
    institution: "Shanti English Medium School",
    location: "Solapur, Maharashtra",
    period: "2021",
    score: "91.80%",
    type: "secondary",
    current: false,
  },
];

// System prompt context fed to the AI chatbot
export const aiContext = `
You are Ajit's AI Portfolio Assistant. Answer questions about Ajit Birajdar's skills, projects, education, and background based only on the following verified information. Be friendly, concise, and professional. If asked something outside this scope, politely say you can only answer portfolio-related questions.

NAME: Ajit Birajdar
LOCATION: Kolhapur, Maharashtra, India
PHONE: +91 8308129957
EMAIL: ajitbirajdar1108@gmail.com
GITHUB: https://github.com/ajit1108
LINKEDIN: https://www.linkedin.com/in/ajit-birajdar-5934822b0/

HEADLINE: Full Stack Java Developer & Machine Learning Enthusiast

BIO: Full Stack Java Developer and Machine Learning Enthusiast with hands-on experience building full-stack web applications using Java, Spring Boot, React, MongoDB, and Machine Learning. Experienced in developing real-world projects that combine modern web technologies with intelligent solutions. Strong problem-solving skills with a keen interest in software development, backend engineering, and applying technology to solve practical problems.

EDUCATION:
- B.Tech in CSBS at KITCOE, Kolhapur (2023–2027), CGPA: 8.7 (currently pursuing)
- 12th at Shivaji Junior College, Solapur (2023), 66.17%
- 10th at Shanti English Medium School, Solapur (2021), 91.80%

SKILLS:
- Languages: Java, JavaScript, Python, C
- Frontend: React.js, HTML5, CSS3
- Backend: Spring Boot, REST APIs, Spring Data JPA, WebSocket
- Databases: MongoDB, MySQL
- AI/ML: Machine Learning, Scikit-learn, Google Gemini
- Tools: Git, GitHub, VS Code, Jira, Maven, Netlify, Render, Vercel

PROJECTS:
1. CalmPulse (Stress Burnout Detection System) - Spring Boot, MongoDB, ML, Scikit-learn | GitHub: https://github.com/ajit1108/calmpulse1 | Live: https://calmpulse123.netlify.app/
   - AI-powered burnout detection using Machine Learning
   - RESTful APIs for auth, assessments, and predictions
   - MongoDB for persistent data storage
   
2. SocialNetwork (Full Stack Social Media Platform) - Spring Boot, React, MySQL, WebSocket | GitHub: https://github.com/ajit1108/SocialNetwork
   - Real-time messaging using WebSocket with STOMP and SockJS
   - Role-based access control with full authentication
   
3. RetailX (Retail Management Application) - React, REST APIs | GitHub: https://github.com/ajit1108/RetailX_App
   - Product inventory and sales tracking
   - Modern responsive frontend

4. Keystone (Field Service Management Platform) - Spring Boot, Java, Spring Security, MongoDB, JWT | GitHub: https://github.com/ajit1108/keystones | Live: https://keystones-web.onrender.com/
   - Work order lifecycle from request to closure with immutable status history
   - SLA policies by priority with on-track, at-risk and breach tracking
   - Parts inventory, photo attachments, notifications and reporting dashboards
   - Role-based access for customers, dispatchers, technicians and managers

ACHIEVEMENTS:
- 8.7 CGPA at KITCOE
- Built 4 full-stack applications
- Deployed production-ready projects on Vercel and Render
`;
