export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  gradient: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlight: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  accentColor: string; // 'pink' | 'purple' | 'mint' | 'orange'
  description: string;
  skills: {
    name: string;
    level: string; // e.g. 'Foundational', 'Intermediate', 'Exploring'
    badge: string;
    description: string;
  }[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    institution: string;
    location: string;
    batch: string;
    bioShort: string;
    bioLong: string;
    learningStatus: string;
    coordinates: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    resumeUrl: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  skills: SkillCategory[];
  projects: Project[];
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "AKSHAY KRISHNA KS",
    role: "Computer Science and Artificial Intelligence Student",
    institution: "Thejus Engineering College, Thrissur, Kerala, India",
    location: "Thrissur, Kerala, India",
    batch: "First Batch • CS & AI Program",
    bioShort: "Computer Science & AI Student exploring the intersection of code, intelligence, and creative technology.",
    bioLong: "I'm Akshay Krishna Ks, a Computer Science and Artificial Intelligence student at Thejus Engineering College, Thrissur, part of the first batch of the CS & AI program. I'm exploring the world of programming, intelligent systems, and creative technology, constantly learning and building new things.",
    learningStatus: "Currently learning & building",
    coordinates: "10.5276° N, 76.2144° E",
    email: "akshaykrishnaks.dev@gmail.com", // [EDITABLE PLACEHOLDER]
    github: "https://github.com/akshaykrishnaks", // [EDITABLE PLACEHOLDER]
    linkedin: "https://linkedin.com/in/akshaykrishnaks", // [EDITABLE PLACEHOLDER]
    twitter: "https://x.com/akshaykrishnaks", // [EDITABLE PLACEHOLDER]
    resumeUrl: "#", // [EDITABLE PLACEHOLDER]
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  stats: [
    {
      label: "Academic Stream",
      value: "CS & AI",
      detail: "Inaugural Cohort",
    },
    {
      label: "Institution",
      value: "Thejus",
      detail: "Engineering College, Thrissur",
    },
    {
      label: "Focus Area",
      value: "Intelligent Systems",
      detail: "Algorithms & Creative Web",
    },
    {
      label: "Current Status",
      value: "Active Builder",
      detail: "Exploring & Prototyping",
    },
  ],
  skills: [
    {
      id: "programming",
      title: "Programming",
      accentColor: "pink",
      description: "Core algorithmic logic and language foundations",
      skills: [
        {
          name: "Python",
          level: "Foundations & Scripting",
          badge: "Active",
          description: "Data manipulation, object-oriented concepts, and algorithmic problem solving.",
        },
        {
          name: "C / C++",
          level: "Academic Core",
          badge: "Foundational",
          description: "Memory management, pointers, and fundamental data structures.",
        },
        {
          name: "Java",
          level: "Object-Oriented",
          badge: "Learning",
          description: "OOP principles, modular architecture, and class hierarchies.",
        },
        {
          name: "JavaScript / TypeScript",
          level: "Modern Web Logic",
          badge: "Building",
          description: "ES6+, asynchronous event loops, and type-safe frontend scripting.",
        },
      ],
    },
    {
      id: "web-dev",
      title: "Web Development",
      accentColor: "mint",
      description: "Interactive browser interfaces and responsive frontend architectures",
      skills: [
        {
          name: "React.js",
          level: "Component Architecture",
          badge: "Practicing",
          description: "Hooks, state lifecycles, and component-driven user interfaces.",
        },
        {
          name: "HTML5 & Modern CSS",
          level: "Semantic Layouts",
          badge: "Core",
          description: "Responsive flexbox/grid systems, SVG graphics, and CSS variables.",
        },
        {
          name: "Tailwind CSS",
          level: "Utility-First Styling",
          badge: "Proficient",
          description: "Rapid design system implementation and bespoke cosmic dark themes.",
        },
        {
          name: "Vite / Modern Tooling",
          level: "Build Pipeline",
          badge: "Exploring",
          description: "Fast module bundlers, HMR development, and deployment workflows.",
        },
      ],
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      accentColor: "purple",
      description: "Academic focus on intelligence, data patterns, and intelligent agents",
      skills: [
        {
          name: "Machine Learning Concepts",
          level: "Theoretical Core",
          badge: "Curriculum",
          description: "Supervised and unsupervised learning, regression, classification, and evaluation metrics.",
        },
        {
          name: "Neural Network Fundamentals",
          level: "Architecture Concepts",
          badge: "Exploring",
          description: "Perceptrons, activation functions, backpropagation, and deep learning basics.",
        },
        {
          name: "Data Analysis & NumPy",
          level: "Data Wrangling",
          badge: "Hands-on",
          description: "Matrix operations, exploratory data analysis, and visual statistics.",
        },
        {
          name: "AI Agents & Modern LLMs",
          level: "Creative Technology",
          badge: "Researching",
          description: "Prompt engineering, agentic workflows, and API integration.",
        },
      ],
    },
    {
      id: "tools",
      title: "Tools & Technologies",
      accentColor: "orange",
      description: "Developer environment, version control, and creative workspaces",
      skills: [
        {
          name: "Git & GitHub",
          level: "Version Control",
          badge: "Daily Tool",
          description: "Branching strategies, repository management, and open-source collaboration.",
        },
        {
          name: "VS Code & Antigravity",
          level: "Development IDEs",
          badge: "Primary",
          description: "Configured developer environment with extensions and modern AI pairings.",
        },
        {
          name: "Linux / Terminal CLI",
          level: "Environment",
          badge: "Exploring",
          description: "Shell scripting, command line utilities, and package managers.",
        },
        {
          name: "Figma & UI Prototyping",
          level: "Visual Design",
          badge: "Creative",
          description: "Wireframing, dark-mode design systems, and typography layout exploration.",
        },
      ],
    },
  ],
  projects: [
    {
      id: "neural-canvas",
      number: "01",
      title: "Neural Canvas",
      category: "AI & Interactive Generative Art",
      year: "2026",
      description: "An experimental browser playground blending particle physics with neural-inspired weight matrices.",
      longDescription: "A creative web experiment exploring how neural activation layers can be visualized as living particle fields. Built with HTML5 Canvas, modern reactive components, and mathematical vector mathematics.",
      tags: ["TypeScript", "HTML5 Canvas", "Neural Visualization", "Tailwind CSS"],
      gradient: "from-[#BD65FF]/40 via-[#FF83B4]/30 to-[#54E6AB]/20",
      githubUrl: "https://github.com/akshaykrishnaks/neural-canvas", // [PLACEHOLDER]
      liveUrl: "https://neural-canvas-demo.vercel.app", // [PLACEHOLDER]
      featured: true,
      highlight: "Real-time particle dynamics responding to node activations",
    },
    {
      id: "orbital-cosmos",
      number: "02",
      title: "Orbital Cosmos",
      category: "Creative Coding & UI Engine",
      year: "2025",
      description: "Futuristic astronomical simulation featuring neon planetary orbits and interactive gravity nodes.",
      longDescription: "An interactive astronomical UI designed to test spatial layout algorithms and concentric SVG/Canvas orbital systems. Inspired by deep cosmic telescope telemetry and neon cybernetic cartography.",
      tags: ["React", "Motion", "Canvas 2D", "Mathematical Physics"],
      gradient: "from-[#FF83B4]/40 via-[#FFB66D]/30 to-[#BD65FF]/20",
      githubUrl: "https://github.com/akshaykrishnaks/orbital-cosmos", // [PLACEHOLDER]
      liveUrl: "https://orbital-cosmos-demo.vercel.app", // [PLACEHOLDER]
      featured: true,
      highlight: "Multi-ring orbital math with smooth relativistic parallax",
    },
    {
      id: "vision-pulse",
      number: "03",
      title: "Vision Pulse",
      category: "Computer Vision & Edge Classifier",
      year: "2025",
      description: "Browser-based computer vision prototype detecting gestures and spatial motion vectors.",
      longDescription: "A computer vision experiment running lightweight object and gesture recognition routines in the browser. Exploring low-latency inference and minimal futuristic HUD telemetry overlays.",
      tags: ["Python", "OpenCV Prototype", "TensorFlow.js", "Web HUD"],
      gradient: "from-[#54E6AB]/40 via-[#BD65FF]/30 to-[#11102F]/60",
      githubUrl: "https://github.com/akshaykrishnaks/vision-pulse", // [PLACEHOLDER]
      liveUrl: "https://vision-pulse-demo.vercel.app", // [PLACEHOLDER]
      featured: false,
      highlight: "Low latency edge classification with cyberpunk HUD interface",
    },
    {
      id: "static-garden",
      number: "04",
      title: "Static Garden",
      category: "Minimalist Web Experiment",
      year: "2024",
      description: "Digital botanical simulation driven by cellular automata and algorithmic growth patterns.",
      longDescription: "An exploration into cellular automata rules and algorithmic vegetation generation. Users can manipulate entropy parameters, growth velocity, and procedural color palettes in real time.",
      tags: ["Algorithms", "Cellular Automata", "JavaScript", "Generative Art"],
      gradient: "from-[#FFB66D]/40 via-[#54E6AB]/30 to-[#BD65FF]/20",
      githubUrl: "https://github.com/akshaykrishnaks/static-garden", // [PLACEHOLDER]
      liveUrl: "https://static-garden-demo.vercel.app", // [PLACEHOLDER]
      featured: false,
      highlight: "Conway-style cellular growth rules with organic bloom curves",
    },
  ],
};

