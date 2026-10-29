// ============================================================
// Ajit Birajdar — Portfolio Data (verified from resume + GitHub)
// ============================================================

export const personalInfo = {
  name: "Ajit Birajdar",
  firstName: "Ajit",
  headline: "Full Stack Java Developer",
  subHeadline: "& Machine Learning Enthusiast",
  roles: [
    "Full Stack Developer",
    "Java Backend Engineer",
    "Spring Boot Developer",
    "React Developer",
    "ML Enthusiast",
  ],
  tagline:
    "Building scalable backend systems & intelligent web applications with Java, Spring Boot, and React.",
  bio: "Full Stack Java Developer and Machine Learning Enthusiast with hands-on experience building full-stack web applications using Java, Spring Boot, React, MongoDB, and Machine Learning. Experienced in developing real-world projects that combine modern web technologies with intelligent solutions. Strong problem-solving skills with a keen interest in software development, backend engineering, and applying technology to solve practical problems.",
  location: "Kolhapur, Maharashtra, India",
  email: "ajitbirajdar1108@gmail.com",
  github: "https://github.com/ajit1108",
  linkedin: "https://www.linkedin.com/in/ajit-birajdar-5934822b0/",
  avatarUrl: "/avatar.jpg",
  available: true,
  stats: [
    { label: "CGPA", value: "8.76", suffix: "" },
    { label: "DSA Problems", value: "100", suffix: "+" },
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
    items: ["React.js", "HTML5", "CSS3", "TypeScript"],
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
    items: ["MongoDB", "MySQL", "PostgreSQL"],
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
    live: "https://calmpulse1.vercel.app",
    featured: true,
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
    live: "https://social-network-dun-nine.vercel.app",
    featured: true,
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
      "A modern retail management application built with TypeScript, designed to streamline product inventory, sales tracking, and business operations for retail environments.",
    techStack: ["TypeScript", "React", "REST APIs", "Node.js"],
    category: "Full Stack",
    github: "https://github.com/ajit1108/RetailX_App",
    live: null,
    featured: true,
    highlights: [
      "Built with TypeScript for type-safe, maintainable code",
      "Product inventory and sales tracking features",
      "Modern responsive UI for retail operations",
      "REST API integration for data management",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Business Systems (CSBS)",
    institution: "Kolhapur Institute of Technology's College of Engineering",
    shortName: "KITCOE",
    location: "Kolhapur, Maharashtra",
    period: "2023 – 2027",
    score: "CGPA: 8.76",
    type: "graduation",
    current: true,
  },
  {
    degree: "Higher Secondary Education (12th)",
    institution: "Chh. Shivaji Arts, Science and Commerce Junior College",
    shortName: "Shivaji Junior College",
    location: "Maharashtra",
    period: "2023",
    score: "66.17%",
    type: "higher-secondary",
    current: false,
  },
  {
    degree: "Secondary Education (10th)",
    institution: "Shanti English Medium School",
    shortName: "Shanti School",
    location: "Maharashtra",
    period: "2021",
    score: "91.80%",
    type: "secondary",
    current: false,
  },
];

export const achievements = [
  "Solved 100+ Data Structures and Algorithms problems on LeetCode and other competitive coding platforms.",
  "Maintained an 8.76 CGPA throughout B.Tech in Computer Science and Business Systems at KITCOE.",
  "Developed multiple full-stack applications integrating Spring Boot, React, databases, and Machine Learning.",
];

export const softSkills = [
  "Problem Solving",
  "Team Collaboration",
  "Communication",
  "Leadership",
  "Time Management",
  "Analytical Thinking",
];

// System prompt context fed to the AI chatbot
export const aiContext = `
You are Ajit's AI Portfolio Assistant. Answer questions about Ajit Birajdar's skills, projects, education, and background based only on the following verified information. Be friendly, concise, and professional. If asked something outside this scope, politely say you can only answer portfolio-related questions.

NAME: Ajit Birajdar
LOCATION: Kolhapur, Maharashtra, India
EMAIL: ajitbirajdar1108@gmail.com
GITHUB: https://github.com/ajit1108
LINKEDIN: https://www.linkedin.com/in/ajit-birajdar-5934822b0/

HEADLINE: Full Stack Java Developer & Machine Learning Enthusiast

BIO: Full Stack Java Developer and Machine Learning Enthusiast with hands-on experience building full-stack web applications using Java, Spring Boot, React, MongoDB, and Machine Learning. Experienced in developing real-world projects that combine modern web technologies with intelligent solutions. Strong problem-solving skills with a keen interest in software development, backend engineering, and applying technology to solve practical problems.

EDUCATION:
- B.Tech in CSBS at KITCOE, Kolhapur (2023–2027), CGPA: 8.76 (currently pursuing)
- 12th at Shivaji Junior College (2023), 66.17%
- 10th at Shanti English Medium School (2021), 91.80%

SKILLS:
- Languages: Java, JavaScript, Python, C
- Frontend: React.js, HTML5, CSS3, TypeScript
- Backend: Spring Boot, REST APIs, Spring Data JPA, WebSocket
- Databases: MongoDB, MySQL, PostgreSQL
- AI/ML: Machine Learning, Scikit-learn, Google Gemini
- Tools: Git, GitHub, VS Code, Jira, Maven, Netlify, Render, Vercel

PROJECTS:
1. CalmPulse (Stress Burnout Detection System) - Spring Boot, MongoDB, ML, Scikit-learn | GitHub: https://github.com/ajit1108/calmpulse1 | Live: https://calmpulse1.vercel.app
   - AI-powered burnout detection using Machine Learning
   - RESTful APIs for auth, assessments, and predictions
   - MongoDB for persistent data storage
   
2. SocialNetwork (Full Stack Social Media Platform) - Spring Boot, React, MySQL, WebSocket | GitHub: https://github.com/ajit1108/SocialNetwork | Live: https://social-network-dun-nine.vercel.app
   - Real-time messaging using WebSocket with STOMP and SockJS
   - Role-based access control with full authentication
   
3. RetailX (Retail Management Application) - TypeScript, React, REST APIs | GitHub: https://github.com/ajit1108/RetailX_App
   - Product inventory and sales tracking
   - Modern TypeScript-based frontend

ACHIEVEMENTS:
- Solved 100+ DSA problems on LeetCode
- 8.76 CGPA at KITCOE
- Built 3+ full-stack applications

SOFT SKILLS: Problem Solving, Team Collaboration, Communication, Leadership, Time Management, Analytical Thinking
`;
