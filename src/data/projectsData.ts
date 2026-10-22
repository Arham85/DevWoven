import { MilestoneProject } from '../types';

export const PROGRESSIVE_PROJECTS: MilestoneProject[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Developer Portfolio',
    difficulty: 'Starter',
    estimatedHours: 12,
    tagline: 'Milestone 01 • Clean Semantic Showcase',
    phaseRelation: 'Phase 01: Foundations of the Web',
    description: 'Build your personal developer home on the web. Showcase your bio, learning journey, featured projects, and an interactive contact modal with clean semantic markup.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git & GitHub'],
    keyFeatures: [
      'Semantic header, nav, main, article, and footer layout',
      'Fully responsive navigation bar with mobile hamburger drawer',
      'Dynamic project filter pills (All, Front-End, Back-End)',
      'Accessible contact form with client-side field validation',
      'Deployed live on GitHub Pages with custom README documentation'
    ],
    acceptanceCriteria: [
      'Passes HTML/CSS validation with zero console errors',
      'Fluid mobile viewports from 320px up to 1440px without horizontal scroll',
      'Tab keyboard navigable with visible focus outlines',
      'Lighthouse accessibility score > 95'
    ]
  },
  {
    id: 'task-manager',
    title: 'Interactive Kanban Task Manager',
    difficulty: 'Core',
    estimatedHours: 25,
    tagline: 'Milestone 02 • Component State & Local Storage',
    phaseRelation: 'Phase 02: Front-End Development',
    description: 'Create a productive Kanban-style task dashboard with drag/drop column sorting, priority tags, search filters, and persistent browser storage.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
    keyFeatures: [
      'Create, edit, archive, and delete tasks with priority badges',
      'Multiple task status columns (Backlog, In Progress, In Review, Done)',
      'Instant debounced search and category tagging',
      'Persistent state synced to browser localStorage',
      'Keyboard shortcuts for creating tasks (Cmd/Ctrl + N)'
    ],
    acceptanceCriteria: [
      'Typed without any `any` types in TypeScript strict mode',
      'State changes never mutate original arrays or objects',
      'Data survives page reloads seamlessly',
      'Clean micro-interactions for drag-over and item completions'
    ]
  },
  {
    id: 'fullstack-blog-dashboard',
    title: 'Full-Stack Content & Analytics Hub',
    difficulty: 'Full-Stack',
    estimatedHours: 45,
    tagline: 'Milestone 03 • Complete End-to-End App',
    phaseRelation: 'Phases 03 & 04: Back-End, Database & Deployment',
    description: 'Engineer a complete full-stack publishing platform with user registration, secure JWT authentication, relational database storage, and a live production deployment.',
    technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL / MongoDB', 'JWT Auth', 'Vercel / Render'],
    keyFeatures: [
      'User signup, login with bcrypt password hashing and JWT sessions',
      'Protected API routes with role-based authorization (Author / Reader)',
      'Rich article editor with image upload handling and markdown preview',
      'Relational or document database persistence with schema migrations',
      'Live production deployment on Vercel/Render with environment variables'
    ],
    acceptanceCriteria: [
      'Passwords never stored in plain text; tokens in secure cookies',
      'REST endpoints follow clean HTTP status codes and error responses',
      'SQL injection & XSS prevention validated',
      'Live working URL and public GitHub repository with setup instructions'
    ]
  }
];
