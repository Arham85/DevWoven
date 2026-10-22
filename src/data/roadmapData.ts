import { RoadmapPhase, Technology } from '../types';

export const VALID_TECH_IDS = [
  'html',
  'css',
  'javascript',
  'git-github',
  'tailwind-css',
  'typescript',
  'react',
  'nodejs',
  'express',
  'rest-apis',
  'sql',
  'postgresql',
  'mongodb',
  'authentication-jwt',
  'vercel-deployment',
] as const;

export type ValidTechId = typeof VALID_TECH_IDS[number];

export const ROADMAP_DATA: RoadmapPhase[] = [
  {
    id: 1,
    numberString: 'Phase 01',
    title: 'Foundations of the Web',
    subtitle: 'The Core Anatomy of Every Website',
    description: 'Master the fundamental building blocks of the web: page structure, styling mechanics, logic execution, and professional version control.',
    suggestedMilestone: 'Build a Multi-Page Responsive Product Showcase',
    technologies: [
      {
        id: 'html',
        name: 'HTML',
        category: 'Front-End',
        phaseId: 1,
        stageNumber: 'Stage #01',
        tagline: 'Semantic Document Architecture',
        whatItIsUsedFor: 'HTML provides the raw skeleton and structural meaning of every website, telling browsers what content is a heading, paragraph, button, image, or navigation list.',
        estimatedHours: 8,
        tutorialUrl: 'https://www.youtube.com/watch?v=HD13eq_Pmp8',
        instructor: 'SuperSimpleDev',
        videoDurationText: '6.5 hours',
        difficulty: 'Beginner',
        aliases: ['html5', 'markup', 'semantics', 'dom', 'web pages', 'tags', 'elements', 'doctype'],
        learningSequence: [
          { stepNumber: 1, title: 'Document Structure & Headings', description: 'Understand <!DOCTYPE html>, <html>, <head>, meta tags, and the <h1>-<h6> hierarchy.' },
          { stepNumber: 2, title: 'Semantic Tags & Accessibility', description: 'Replace generic <div> tags with <header>, <nav>, <main>, <article>, and <section> for SEO and screen readers.' },
          { stepNumber: 3, title: 'Forms & User Inputs', description: 'Craft forms using <input>, <select>, <textarea>, and <button> with proper label bindings.' },
          { stepNumber: 4, title: 'Media, Links & Tables', description: 'Embed accessible images with alt tags, external/internal anchor links, and tabular data structures.' }
        ],
        keyConcepts: [
          'DOM Hierarchy and nesting rules',
          'ARIA roles and accessible landmark tags',
          'Attributes vs tags (id, class, data-*)',
          'SEO meta descriptions and OpenGraph tags'
        ],
        whatYouWillBuild: 'A clean, accessible recipe documentation page with ingredient tables, semantic article tags, and a validated newsletter form.'
      },
      {
        id: 'css',
        name: 'CSS',
        category: 'Front-End',
        phaseId: 1,
        stageNumber: 'Stage #02',
        tagline: 'Visual Styling, Flexbox & Grid Systems',
        whatItIsUsedFor: 'CSS controls the visual layout, typography, color palettes, and responsive adaptiveness across desktop, tablet, and mobile displays.',
        estimatedHours: 16,
        tutorialUrl: 'https://www.youtube.com/watch?v=wRNinF7YQqQ',
        instructor: 'Dave Gray',
        videoDurationText: '11 hours',
        difficulty: 'Beginner',
        aliases: ['css3', 'styling', 'styles', 'flexbox', 'grid', 'responsive', 'media queries', 'box model', 'layout'],
        learningSequence: [
          { stepNumber: 1, title: 'The Box Model & Selectors', description: 'Master margin, border, padding, content box calculations, and selector specificity.' },
          { stepNumber: 2, title: 'Flexbox Layouts (1D Flow)', description: 'Control alignment, wrapping, flex-direction, and justify-content for fluid toolbars and rows.' },
          { stepNumber: 3, title: 'CSS Grid Systems (2D Flow)', description: 'Construct multi-column responsive dashboard cards using grid-template-columns and fr units.' },
          { stepNumber: 4, title: 'Media Queries & Mobile-First', description: 'Design responsive layouts starting from mobile viewports up to ultra-wide displays.' }
        ],
        keyConcepts: [
          'Content-box vs border-box calculations',
          'Flexbox axis alignment & auto margins',
          'CSS Custom Properties (Variables)',
          'Transitions, transforms, and hover micro-interactions'
        ],
        whatYouWillBuild: 'A responsive bento-grid landing page that gracefully morphs between mobile single-column and desktop 3-column layouts.'
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Front-End',
        phaseId: 1,
        stageNumber: 'Stage #03',
        tagline: 'Client-Side Logic & Dynamic Behavior',
        whatItIsUsedFor: 'JavaScript transforms static documents into interactive applications, allowing click handlers, API fetches, form validation, and instant UI state updates.',
        estimatedHours: 24,
        tutorialUrl: 'https://www.youtube.com/watch?v=Zi-Q0t4gMC8',
        instructor: 'Bro Code',
        videoDurationText: '12 hours',
        difficulty: 'Beginner',
        aliases: ['js', 'vanilla js', 'ecmascript', 'es6', 'dom manipulation', 'functions', 'events', 'async', 'promises'],
        learningSequence: [
          { stepNumber: 1, title: 'Variables, Types & Operators', description: 'Understand let/const, primitives, objects, arrays, and template literals.' },
          { stepNumber: 2, title: 'Control Flow & Functions', description: 'Write reusable arrow functions, conditional branching, and array methods (map, filter, reduce).' },
          { stepNumber: 3, title: 'DOM Manipulation & Events', description: 'Select elements, listen to user clicks and inputs, and manipulate classLists dynamically.' },
          { stepNumber: 4, title: 'Asynchronous JS, Promises & Fetch', description: 'Understand the event loop, async/await syntax, and retrieve JSON data from web endpoints.' }
        ],
        keyConcepts: [
          'Scope, closures, and lexical this',
          'Array immutability vs mutation methods',
          'Event bubbling and delegation',
          'Fetch API, JSON parsing, and error catching'
        ],
        whatYouWillBuild: 'An interactive currency exchange calculator that fetches live rates from an API and updates local storage.'
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        category: 'Tools',
        phaseId: 1,
        stageNumber: 'Stage #04',
        tagline: 'Version Control & Team Collaboration',
        whatItIsUsedFor: 'Git tracks every change in your codebase so you can experiment fearlessly, undo bugs, and collaborate with teams around the world via GitHub.',
        estimatedHours: 6,
        tutorialUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        instructor: 'freeCodeCamp',
        videoDurationText: '1.2 hours',
        difficulty: 'Beginner',
        aliases: ['git', 'github', 'version control', 'commits', 'branches', 'pull request', 'pr', 'repository', 'repo', 'terminal'],
        learningSequence: [
          { stepNumber: 1, title: 'Terminal Fundamentals', description: 'Navigate directories, create files, and run basic bash commands.' },
          { stepNumber: 2, title: 'Git Initialization & Staging', description: 'Use git init, git status, git add, and write concise git commit messages.' },
          { stepNumber: 3, title: 'Branching & Merge Conflicts', description: 'Create feature branches with git checkout -b, merge back to main, and resolve conflicts.' },
          { stepNumber: 4, title: 'GitHub Remote & Pull Requests', description: 'Push repositories, open pull requests, and host static sites on GitHub Pages.' }
        ],
        keyConcepts: [
          'Working directory vs Staging index vs Commit history',
          'Atomic commits and conventional commit messages',
          'Remotes, origins, and SSH key authentication',
          '.gitignore patterns for keeping secrets safe'
        ],
        whatYouWillBuild: 'A public GitHub portfolio repository with multiple feature branches merged via verified Pull Requests.'
      }
    ]
  },
  {
    id: 2,
    numberString: 'Phase 02',
    title: 'Front-End Development',
    subtitle: 'Scalable Component Architecture & Modern UI',
    description: 'Transition from vanilla scripts to modern declarative user interfaces with component-driven architecture, type safety, and utility-first styling.',
    suggestedMilestone: 'Build an Interactive Kanban Task Board with Local Storage',
    technologies: [
      {
        id: 'tailwind-css',
        name: 'Tailwind CSS',
        category: 'Front-End',
        phaseId: 2,
        stageNumber: 'Stage #05',
        tagline: 'Utility-First Rapid UI Styling',
        whatItIsUsedFor: 'Tailwind provides low-level utility classes directly in your markup, letting you build custom, responsive designs without writing bulky CSS files.',
        estimatedHours: 8,
        tutorialUrl: 'https://www.youtube.com/watch?v=ft30zcMlFao',
        instructor: 'Traversy Media',
        videoDurationText: '1.5 hours',
        difficulty: 'Beginner',
        aliases: ['tailwind', 'tailwindcss', 'utility css', 'css classes', 'styling library', 'responsive design'],
        learningSequence: [
          { stepNumber: 1, title: 'Utility Class Principles', description: 'Understand spacing scales (p-4, m-2), typography (text-sm, font-semibold), and color palettes.' },
          { stepNumber: 2, title: 'Flex & Grid in Tailwind', description: 'Construct complex layouts quickly with flex, items-center, justify-between, and grid-cols-*.' },
          { stepNumber: 3, title: 'Responsive & State Modifiers', description: 'Use hover:, focus:, active:, and breakpoint prefixes (md:, lg:) for dynamic UI states.' },
          { stepNumber: 4, title: 'Theme Customization & Dark Mode', description: 'Configure custom fonts, brand tokens, and dark: color variants.' }
        ],
        keyConcepts: [
          'Arbitrary values vs design system constraints',
          'Group and peer modifiers for nested interactions',
          'Component extraction without breaking utility flow',
          'Just-In-Time (JIT) compilation and bundle tree-shaking'
        ],
        whatYouWillBuild: 'A polished developer settings panel with light/dark toggles, custom badges, and interactive sliders.'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Front-End',
        phaseId: 2,
        stageNumber: 'Stage #06',
        tagline: 'Type-Safe Robust JavaScript',
        whatItIsUsedFor: 'TypeScript adds static type checking to JavaScript, catching common bugs and typos before your code ever runs in the browser.',
        estimatedHours: 14,
        tutorialUrl: 'https://www.youtube.com/watch?v=30LWjhZzg50',
        instructor: 'freeCodeCamp',
        videoDurationText: '4 hours',
        difficulty: 'Intermediate',
        aliases: ['ts', 'types', 'typescript', 'interfaces', 'generics', 'static typing', 'type safety'],
        learningSequence: [
          { stepNumber: 1, title: 'Primitive & Literal Types', description: 'Declare explicit types for numbers, strings, booleans, and union literals.' },
          { stepNumber: 2, title: 'Interfaces & Custom Types', description: 'Model structured objects, optional properties (?), and readonly fields.' },
          { stepNumber: 3, title: 'Generics & Utility Types', description: 'Write reusable functions with <T>, and use Partial, Pick, Omit, and Record.' },
          { stepNumber: 4, title: 'Type Narrowing & Guards', description: 'Safely handle unknown responses using typeof, instanceof, and discriminator unions.' }
        ],
        keyConcepts: [
          'Static compile-time checking vs runtime execution',
          'Type inference and when to annotate explicitly',
          'Strict null checks and optional chaining',
          'Generics for reusable API responses'
        ],
        whatYouWillBuild: 'A strongly-typed shopping cart module that validates stock levels and discounts with zero compiler warnings.'
      },
      {
        id: 'react',
        name: 'React',
        category: 'Front-End',
        phaseId: 2,
        stageNumber: 'Stage #07',
        tagline: 'Component State & Declarative UI',
        whatItIsUsedFor: 'React is the industry-standard front-end library for building declarative component-driven single page applications with fast reactive updates.',
        estimatedHours: 28,
        tutorialUrl: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA',
        instructor: 'Bro Code',
        videoDurationText: '4 hours',
        difficulty: 'Intermediate',
        aliases: ['reactjs', 'react.js', 'components', 'jsx', 'hooks', 'usestate', 'useeffect', 'virtual dom', 'frontend spa'],
        learningSequence: [
          { stepNumber: 1, title: 'JSX & Component Hierarchies', description: 'Decompose web pages into reusable components and pass data via props.' },
          { stepNumber: 2, title: 'State Management with useState', description: 'Handle user input, toggles, counters, and array lists with immutable updates.' },
          { stepNumber: 3, title: 'Side Effects with useEffect', description: 'Synchronize components with external systems, timers, and API endpoints.' },
          { stepNumber: 4, title: 'Custom Hooks & Context', description: 'Extract reusable business logic and share global states like theme or user profile.' }
        ],
        keyConcepts: [
          'Virtual DOM reconciliation mechanism',
          'Component purity and unidirectional data flow',
          'Controlled vs uncontrolled form inputs',
          'Memoization and clean effect teardowns'
        ],
        whatYouWillBuild: 'A dynamic Kanban project management application with drag-to-reorder columns, search filters, and persistent task metrics.'
      }
    ]
  },
  {
    id: 3,
    numberString: 'Phase 03',
    title: 'Back-End & Data',
    subtitle: 'Server Runtimes, APIs & Persistent Storage',
    description: 'Build servers that handle requests, enforce security, process business logic, and interact with relational and document databases.',
    suggestedMilestone: 'Build a Complete REST API with PostgreSQL and Express',
    technologies: [
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Back-End',
        phaseId: 3,
        stageNumber: 'Stage #08',
        tagline: 'Server-Side JavaScript Runtime',
        whatItIsUsedFor: 'Node.js allows you to execute JavaScript on a server rather than in the browser, providing access to the filesystem, network sockets, and database drivers.',
        estimatedHours: 16,
        tutorialUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        instructor: 'Dave Gray',
        videoDurationText: '8 hours',
        difficulty: 'Intermediate',
        aliases: ['node', 'nodejs', 'server runtime', 'npm', 'backend', 'v8', 'event loop', 'asynchronous'],
        learningSequence: [
          { stepNumber: 1, title: 'V8 Engine & Event Loop', description: 'Understand non-blocking asynchronous I/O and how the single-threaded event loop processes tasks.' },
          { stepNumber: 2, title: 'Modules (CommonJS & ESM)', description: 'Import and export code using import/export and understand package.json dependencies.' },
          { stepNumber: 3, title: 'File System & Streams', description: 'Read, write, and stream large files using the built-in fs and stream modules.' },
          { stepNumber: 4, title: 'HTTP Module & Environment Vars', description: 'Construct a raw HTTP server and manage configuration safely with dotenv.' }
        ],
        keyConcepts: [
          'Event-driven non-blocking architecture',
          'Process lifecycle and environment variables',
          'Buffer, streams, and memory optimization',
          'NPM package management and semantic versioning'
        ],
        whatYouWillBuild: 'A command-line file organizing utility that parses directories, reads metadata, and organizes files by date.'
      },
      {
        id: 'express',
        name: 'Express.js',
        category: 'Back-End',
        phaseId: 3,
        stageNumber: 'Stage #09',
        tagline: 'Fast, Minimalist Web Framework',
        whatItIsUsedFor: 'Express is the go-to backend framework for Node.js, providing intuitive routing, middleware pipelines, and HTTP request/response helpers.',
        estimatedHours: 14,
        tutorialUrl: 'https://www.youtube.com/watch?v=SccSCuHhOw0',
        instructor: 'John Smilga',
        videoDurationText: '8.5 hours',
        difficulty: 'Intermediate',
        aliases: ['express', 'expressjs', 'server framework', 'middleware', 'routing', 'api server', 'backend web framework'],
        learningSequence: [
          { stepNumber: 1, title: 'Basic Routing & Server Setup', description: 'Handle GET, POST, PUT, DELETE requests on structured endpoint paths.' },
          { stepNumber: 2, title: 'Middleware Pipeline', description: 'Write custom request loggers, body parsers (express.json), and CORS headers.' },
          { stepNumber: 3, title: 'Route Parameters & Query Strings', description: 'Extract dynamic params (/users/:id) and query parameters (?page=1&limit=10).' },
          { stepNumber: 4, title: 'Centralized Error Handling', description: 'Capture asynchronous errors cleanly and respond with appropriate HTTP status codes.' }
        ],
        keyConcepts: [
          'Request -> Middleware -> Controller -> Response lifecycle',
          'CORS policies and security header configuration',
          'Express Router for modular route files',
          'Error-handling middleware (err, req, res, next)'
        ],
        whatYouWillBuild: 'A structured note-taking API server with pagination, search queries, and structured JSON validation.'
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        category: 'Back-End',
        phaseId: 3,
        stageNumber: 'Stage #10',
        tagline: 'Standard Client-Server Contract',
        whatItIsUsedFor: 'REST defines the universal conventions for how front-end apps communicate with back-end servers using HTTP verbs and standardized status codes.',
        estimatedHours: 10,
        tutorialUrl: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
        instructor: 'Web Dev Simplified',
        videoDurationText: '1.2 hours',
        difficulty: 'Intermediate',
        aliases: ['api', 'rest', 'apis', 'http methods', 'endpoints', 'json', 'crud', 'status codes', 'client server'],
        learningSequence: [
          { stepNumber: 1, title: 'HTTP Methods & Idempotence', description: 'Master the distinct roles of GET, POST, PUT, PATCH, and DELETE.' },
          { stepNumber: 2, title: 'Status Code Semantics', description: 'Understand 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Error.' },
          { stepNumber: 3, title: 'Resource Modeling & Naming', description: 'Design clean pluralized endpoints like /api/v1/posts/:postId/comments.' },
          { stepNumber: 4, title: 'API Testing with Postman/Insomnia', description: 'Test endpoints, inspect request headers, pass auth bearer tokens, and inspect JSON bodies.' }
        ],
        keyConcepts: [
          'Stateless client-server architecture',
          'Uniform interface and hypermedia principles',
          'Rate limiting and request throttling',
          'API versioning and breaking change policies'
        ],
        whatYouWillBuild: 'A complete OpenAPI/Swagger-documented specification for a bookstore inventory service.'
      },
      {
        id: 'sql',
        name: 'SQL',
        category: 'Database',
        phaseId: 3,
        stageNumber: 'Stage #11',
        tagline: 'Structured Query Language',
        whatItIsUsedFor: 'SQL is the universal language used to query, insert, update, and manage relational data stored in tables with rigid schemas and integrity rules.',
        estimatedHours: 12,
        tutorialUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        instructor: 'freeCodeCamp / Mike Dane',
        videoDurationText: '4.5 hours',
        difficulty: 'Beginner',
        aliases: ['sql', 'database', 'queries', 'rdbms', 'tables', 'select', 'join', 'relational database'],
        learningSequence: [
          { stepNumber: 1, title: 'Table Creation & Data Types', description: 'Define tables with PRIMARY KEY, VARCHAR, INT, TIMESTAMP, and NOT NULL constraints.' },
          { stepNumber: 2, title: 'CRUD Queries', description: 'Write SELECT, INSERT INTO, UPDATE, and DELETE FROM statements with WHERE clauses.' },
          { stepNumber: 3, title: 'Filtering, Sorting & Aggregations', description: 'Use ORDER BY, LIMIT, COUNT(), SUM(), AVG(), and GROUP BY with HAVING.' },
          { stepNumber: 4, title: 'Relational JOINs', description: 'Link related records across tables using INNER JOIN, LEFT JOIN, and foreign keys.' }
        ],
        keyConcepts: [
          'Relational integrity and foreign key constraints',
          'Cartesian products vs matched joins',
          'Aggregate functions and grouping logic',
          'Indexes for query performance optimization'
        ],
        whatYouWillBuild: 'A relational sales database tracking customers, orders, and products with multi-table analytical revenue reports.'
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'Database',
        phaseId: 3,
        stageNumber: 'Stage #12',
        tagline: 'Enterprise Relational Database',
        whatItIsUsedFor: 'PostgreSQL is the world’s most advanced open-source relational database, offering rock-solid ACID transactions, JSONB document support, and high performance.',
        estimatedHours: 14,
        tutorialUrl: 'https://www.youtube.com/watch?v=qw--VYLpxG4',
        instructor: 'freeCodeCamp',
        videoDurationText: '4 hours',
        difficulty: 'Intermediate',
        aliases: ['postgres', 'postgresql', 'psql', 'relational database', 'acid', 'sql', 'postgres db', 'rdbms'],
        learningSequence: [
          { stepNumber: 1, title: 'Installation & psql CLI', description: 'Connect to Postgres instances, manage databases, and execute scripts from the terminal.' },
          { stepNumber: 2, title: 'Advanced Data Types & JSONB', description: 'Store structured JSON alongside strictly typed relational columns.' },
          { stepNumber: 3, title: 'Connecting via Node.js (pg / ORM)', description: 'Use connection pools with the node-postgres library and prevent SQL injection.' },
          { stepNumber: 4, title: 'Migrations & Schemas', description: 'Track database schema changes safely over time with migration tools.' }
        ],
        keyConcepts: [
          'ACID transaction guarantees (BEGIN, COMMIT, ROLLBACK)',
          'Parameterized queries to prevent SQL injection',
          'Connection pooling for high concurrent traffic',
          'Database indexes (B-tree, GIN for JSONB)'
        ],
        whatYouWillBuild: 'A persistent user profile database with connected relational tables for articles, comments, and tag relationships.'
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'Database',
        phaseId: 3,
        stageNumber: 'Stage #13',
        tagline: 'Flexible NoSQL Document Database',
        whatItIsUsedFor: 'MongoDB stores data in flexible, JSON-like BSON documents, making it easy to store nested objects without strict relational schema migrations.',
        estimatedHours: 12,
        tutorialUrl: 'https://www.youtube.com/watch?v=c2M-rlkkT5o',
        instructor: 'John Smilga',
        videoDurationText: '3 hours',
        difficulty: 'Intermediate',
        aliases: ['mongo', 'mongodb', 'nosql', 'document db', 'mongoose', 'bson', 'json database', 'collections'],
        learningSequence: [
          { stepNumber: 1, title: 'Document Data Model', description: 'Understand collections, documents, ObjectIDs, and BSON serialization.' },
          { stepNumber: 2, title: 'MongoDB Query Operators', description: 'Query records with $gt, $in, $regex, and projection options.' },
          { stepNumber: 3, title: 'Mongoose ODM in Node.js', description: 'Define schemas, validators, pre-save hooks, and model methods in TypeScript.' },
          { stepNumber: 4, title: 'Aggregation Pipelines', description: 'Process multi-stage transformations with $match, $group, and $sort.' }
        ],
        keyConcepts: [
          'Embedding vs referencing documents',
          'Mongoose middleware hooks and validation',
          'Indexing collection fields for fast lookup',
          'Replica sets and horizontal sharding overview'
        ],
        whatYouWillBuild: 'A product catalog database with variable attributes (colors, sizes, tags) and multi-facet filtering.'
      }
    ]
  },
  {
    id: 4,
    numberString: 'Phase 04',
    title: 'Full-Stack Projects & Deployment',
    subtitle: 'Security, Production Polish & Going Live',
    description: 'Tie the front-end and back-end together with secure user authentication, environment configurations, and production deployment pipelines.',
    suggestedMilestone: 'Deploy a Full-Stack Web Application to Production',
    technologies: [
      {
        id: 'authentication-jwt',
        name: 'Authentication / JWT',
        category: 'Back-End',
        phaseId: 4,
        stageNumber: 'Stage #14',
        tagline: 'Secure Passwords & Stateless Sessions',
        whatItIsUsedFor: 'Authentication verifies user identity with hashed passwords and issues secure, tamper-proof JSON Web Tokens for authorized API requests.',
        estimatedHours: 14,
        tutorialUrl: 'https://www.youtube.com/watch?v=2PPSXonhIck',
        instructor: 'Dave Gray',
        videoDurationText: '9 hours',
        difficulty: 'Intermediate',
        aliases: ['auth', 'jwt', 'security', 'login', 'signup', 'tokens', 'bcrypt', 'passwords', 'json web tokens', 'authorization'],
        learningSequence: [
          { stepNumber: 1, title: 'Password Hashing with bcrypt', description: 'Never store plain text passwords; generate cryptographic salts and hashes.' },
          { stepNumber: 2, title: 'JWT Structure & Signing', description: 'Decode header, payload, and signature; sign tokens using a secure server secret.' },
          { stepNumber: 3, title: 'Auth Middleware & Protected Routes', description: 'Verify bearer tokens on protected endpoints and attach the user object to requests.' },
          { stepNumber: 4, title: 'Secure Cookies & Refresh Tokens', description: 'Mitigate XSS and CSRF attacks by storing tokens in httpOnly, sameSite cookies.' }
        ],
        keyConcepts: [
          'Stateless JWT vs stateful session cookies',
          'Access tokens vs long-lived Refresh tokens',
          'httpOnly and secure cookie flags',
          'OWASP top 10 security vulnerabilities'
        ],
        whatYouWillBuild: 'A complete authentication system with registration, login, password hashing, and role-protected API routes.'
      },
      {
        id: 'vercel-deployment',
        name: 'Deployment with Vercel',
        category: 'Tools',
        phaseId: 4,
        stageNumber: 'Stage #15',
        tagline: 'Continuous Delivery to the Global Edge',
        whatItIsUsedFor: 'Vercel delivers your front-end and serverless functions directly from GitHub to a lightning-fast global CDN with automated preview builds on every commit.',
        estimatedHours: 6,
        tutorialUrl: 'https://www.youtube.com/watch?v=2hR-uWjBAgw',
        instructor: 'freeCodeCamp',
        videoDurationText: '1 hour',
        difficulty: 'Beginner',
        aliases: ['vercel', 'deployment', 'hosting', 'cloud', 'publish', 'ci/cd', 'production', 'domain', 'ssl', 'serverless'],
        learningSequence: [
          { stepNumber: 1, title: 'Build Pipeline Configuration', description: 'Configure package.json build scripts, output directories (dist), and node version.' },
          { stepNumber: 2, title: 'Connecting GitHub Repositories', description: 'Link repositories for zero-config automatic git push deployments.' },
          { stepNumber: 3, title: 'Environment Variables Management', description: 'Securely inject API URLs and secret keys in production and preview settings.' },
          { stepNumber: 4, title: 'Custom Domains & SSL Certificates', description: 'Configure DNS CNAME/A records and verify automated HTTPS certificates.' }
        ],
        keyConcepts: [
          'CI/CD automated deployment triggers',
          'Edge caching and static site generation benefits',
          'Single Page App (SPA) redirect rewrite rules',
          'Production performance monitoring and analytics'
        ],
        whatYouWillBuild: 'A live, publicly accessible full-stack portfolio app with automated preview branches and a custom domain configuration.'
      }
    ]
  }
];

export const ALL_TECHNOLOGIES: Technology[] = ROADMAP_DATA.flatMap(phase => phase.technologies);
