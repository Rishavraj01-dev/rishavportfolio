export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  date: string;
  readTime: string;
  title: string;
  intro: string[];
  sections: BlogSection[];
  conclusionTitle: string;
  conclusion: string[];
};

export const blogs: BlogPost[] = [
  {
    slug: "building-a-scalable-job-portal",
    date: "APR 13, 2026",
    readTime: "7 MIN",
    title: "From Idea to Production: Building a Scalable Job Portal (HHH Jobs)",
    intro: [
      "Most developers build projects. Few build systems.",
      "HHH Jobs was my attempt to go beyond a simple CRUD application and create a production-ready job portal with real-world architecture.",
    ],
    sections: [
      {
        heading: "The Vision",
        paragraphs: [
          "I wanted to solve a real problem: how do modern job platforms handle multiple users, roles, and real-time data efficiently?",
          "Instead of copying existing platforms, I focused on building a scalable system, a role-based architecture, and a performance-optimized experience.",
        ],
      },
      {
        heading: "Engineering Stack",
        bullets: [
          "React.js for a dynamic UI",
          "Node.js and Express for backend APIs",
          "Supabase for database and authentication",
          "JWT and OAuth for secure authentication",
        ],
      },
      {
        heading: "What Makes It Different",
        paragraphs: [
          "This was not just a job portal. It was a multi-system platform designed to reflect real product complexity.",
        ],
        bullets: [
          "Role-based dashboards for Admin, HR, Student, and Super Admin",
          "Smart resume builder",
          "Application Tracking System (ATS)",
          "Dynamic routing based on roles",
          "Integrated blog system",
        ],
      },
      {
        heading: "Real Challenges I Faced",
        bullets: [
          "Managing complex role-based access control",
          "Handling API failures and data mismatches",
          "Improving performance metrics like LCP, CLS, and TBT",
        ],
      },
      {
        heading: "Key Learnings",
        bullets: [
          "Real-world systems require strong architecture",
          "Debugging is a superpower",
          "Performance optimization is non-negotiable",
        ],
      },
    ],
    conclusionTitle: "Final Thoughts",
    conclusion: [
      'This project transformed my thinking from "how to build features" to "how to build scalable systems."',
    ],
  },
  {
    slug: "ai-resume-analyzer",
    date: "APR 13, 2026",
    readTime: "6 MIN",
    title: "Building an AI Resume Analyzer That Thinks Like a Recruiter",
    intro: [
      "Recruiters spend seconds scanning resumes, so I asked myself a simple question: can AI do the same faster and smarter?",
      "That question led me to build an AI-powered resume analyzer focused on practical feedback and real hiring signals.",
    ],
    sections: [
      {
        heading: "The Core Idea",
        paragraphs: [
          "The system does not just read resumes. It tries to understand them.",
        ],
        bullets: [
          "Extract skills",
          "Evaluate resume structure",
          "Match candidates to job roles",
          "Provide actionable feedback",
        ],
      },
      {
        heading: "Tech Behind the Intelligence",
        bullets: [
          "Python with FastAPI",
          "NLP using spaCy and Scikit-learn",
          "PDF parsing pipeline",
          "React.js for the frontend UI",
        ],
      },
      {
        heading: "How It Works",
        bullets: [
          "User uploads a resume",
          "System extracts text and structured data",
          "NLP pipeline processes the content",
          "AI generates a score with targeted suggestions",
        ],
      },
      {
        heading: "Challenges That Made It Real",
        bullets: [
          "Handling messy PDF formats",
          "Building accurate skill extraction logic",
          "Avoiding false predictions",
        ],
      },
      {
        heading: "What I Learned",
        bullets: [
          "AI is 80% data and 20% model",
          "Simplicity beats unnecessary complexity in ML systems",
          "UX matters even in AI products",
        ],
      },
    ],
    conclusionTitle: "Final Thoughts",
    conclusion: [
      "This project helped me understand that AI is not magic. It is structured problem-solving at scale.",
    ],
  },
  {
    slug: "designing-a-real-world-erp-system",
    date: "APR 13, 2026",
    readTime: "6 MIN",
    title: "Designing a Real-World ERP System: Beyond Code, Into Business Logic",
    intro: [
      "ERP systems are not just software. They are the operating system of a company.",
      "Instead of building a simple dashboard, I designed a complete ERP system with real-world workflows and role hierarchies.",
    ],
    sections: [
      {
        heading: "The Goal",
        paragraphs: [
          "The aim was to simulate how real companies operate internally: who approves what, how data flows, and how decisions are tracked.",
        ],
      },
      {
        heading: "System Architecture",
        bullets: [
          "Super Admin for system control",
          "Admin for company operations",
          "HR for employee management",
          "Manager for approvals and team control",
          "Employee as the execution layer",
          "Payroll as the finance layer",
        ],
      },
      {
        heading: "Real Workflow Example",
        paragraphs: [
          "An employee submits leave, the manager approves it, HR verifies it, and payroll updates the record. That chain prevents unauthorized actions and keeps decisions traceable.",
        ],
      },
      {
        heading: "Complex Challenges",
        bullets: [
          "Designing approval hierarchies",
          "Handling real-time updates",
          "Avoiding data inconsistencies",
        ],
      },
      {
        heading: "Key Learnings",
        bullets: [
          "Business logic is often more complex than coding itself",
          "Systems should be scalable from day one",
          "Clean UX drives better adoption",
        ],
      },
    ],
    conclusionTitle: "Final Thoughts",
    conclusion: [
      "This project taught me that great developers do not just write code. They design systems.",
    ],
  },
];

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}
