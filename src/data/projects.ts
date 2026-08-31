export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "Web App" | "Full Stack" | "AI/ML" | "Mobile" | "Tool";
  architecture?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  year?: number;
  role?: string;
  team?: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    slug: "kompublic-chatbot",
    title: "KomPublic Chatbot",

    shortDescription:
      "AI-assisted chatbot designed to help Case Managers resolve case inquiries faster.",

    description:
      "Developed an AI-assisted chatbot for the KomPublic platform to help Case Managers resolve case-related inquiries faster and improve access to relevant information.",

    longDescription: `
The KomPublic Chatbot was developed as an AI-assisted solution to help Case Managers handle and resolve case inquiries more efficiently.

One of the key technical challenges was implementing secure authentication using Azure services. I researched and implemented Microsoft Entra ID (Azure Active Directory) to provide seamless and secure authentication for users.

After researching, testing, and integrating the authentication flow, the chatbot was successfully rolled out without downtime. This project strengthened my understanding of Azure services, secure authentication, and solving unfamiliar technical challenges through research and experimentation.
    `.trim(),

    technologies: [
      "React",
      "TypeScript",
      "Azure",
      "Microsoft Entra ID",
      "Azure Active Directory",
      "REST APIs",
    ],

    image: "/projects/kompublic-chatbot.jpg",

    githubUrl: "",
    liveUrl: "",

    featured: true,
    category: "Full Stack",

    architecture:
      "React-based frontend integrated with backend services and Microsoft Entra ID (Azure Active Directory) for secure authentication.",

    challenges: [
      "Working with Azure services and secure authentication for the chatbot application.",
      "Implementing Azure Active Directory authentication despite limited initial experience with Azure authentication.",
      "Ensuring a seamless authentication rollout without downtime.",
    ],

    solutions: [
      "Researched Microsoft Entra ID and Azure Active Directory authentication.",
      "Tested and implemented a secure authentication flow for the chatbot application.",
      "Integrated Azure AD successfully while maintaining application availability during rollout.",
    ],

    results: [
      "Enabled seamless and secure authentication for chatbot users.",
      "Completed the Azure AD rollout with zero downtime.",
      "Improved the security and functionality of the chatbot application.",
    ],

    year: 2024,
    role: "Full Stack Developer",
  },

  {
    id: "project-2",
    slug: "kompublic-municipality-case-management",
    title: "KomPublic Municipality Case Management",

    shortDescription:
      "Case management platform used by Danish municipalities with improved data fetching performance.",

    description:
      "Built and maintained a platform for Danish municipalities to manage and track cases with real-time status updates.",

    longDescription: `
The KomPublic Case Management platform is used by Danish municipalities to manage and track cases with real-time status updates.

One of my biggest achievements on this project was improving application performance. When I joined the project, multiple React components were making the same API calls independently, causing redundant network requests and slower page loading.

I analyzed the issue and suggested migrating the state management architecture to Redux Toolkit. I centralized API calls, cached shared data in the Redux store, and updated components to consume shared state instead of making separate requests.

As a result, redundant API calls were significantly reduced and data fetching performance improved by approximately 25%. This was especially meaningful because the improvement directly enhanced the user experience of a production application used by real customers.
    `.trim(),

    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "REST APIs",
      "JavaScript",
      "State Management",
    ],

    image: "/projects/kompublic-case-management.jpg",

    githubUrl: "",
    liveUrl: "",

    featured: true,
    category: "Full Stack",

    architecture:
      "React application using Redux Toolkit for centralized state management and shared API data caching.",

    challenges: [
      "Multiple React components were making duplicate API calls.",
      "Redundant network requests were affecting page loading performance.",
      "Application data needed to be shared efficiently across multiple components.",
    ],

    solutions: [
      "Migrated state management to Redux Toolkit.",
      "Centralized API calls to avoid duplicate network requests.",
      "Cached shared API data in the Redux store.",
      "Updated components to consume shared state instead of fetching the same data independently.",
    ],

    results: [
      "Improved data fetching performance by approximately 25%.",
      "Reduced redundant API calls across the application.",
      "Improved page loading and overall user experience.",
      "Created a more scalable state management architecture for the production platform.",
    ],

    year: 2024,
    role: "Full Stack Developer",
  },

  {
    id: "project-3",
    slug: "activate-everyware-chatbot",
    title: "Activate Everyware Chatbot",

    shortDescription:
      "Visual chatbot builder with drag-and-drop nodes and customisable conversational flows.",

    description:
      "Designed and implemented a visual chatbot builder that allows companies to create fully customisable conversational flows using a drag-and-drop interface.",

    longDescription: `
The Activate Everyware Chatbot project focused on building a visual chatbot builder that enables companies to design and manage custom conversational flows.

Using React Flow, I created a node-based drag-and-drop canvas where users can visually build chatbot conversations.

I also implemented conditional logic within the conversational nodes, allowing businesses to define dynamic question-and-answer flows based on different user responses and conditions.

The result was a flexible and customisable visual tool that makes it easier for companies to design complex chatbot workflows without manually defining every flow through code.
    `.trim(),

    technologies: [
      "React",
      "TypeScript",
      "React Flow",
      "JavaScript",
      "Node.js",
      "Drag and Drop",
    ],

    image: "/projects/activate-everyware-chatbot.jpg",

    githubUrl: "",
    liveUrl: "",

    featured: true,
    category: "Tool",

    architecture:
      "React-based visual application using React Flow to manage a node-based canvas for creating and connecting conversational chatbot flows.",

    challenges: [
      "Creating an intuitive drag-and-drop interface for building chatbot conversations.",
      "Managing complex relationships between conversational nodes.",
      "Implementing conditional logic for dynamic question-and-answer flows.",
    ],

    solutions: [
      "Used React Flow to create a visual node-based chatbot builder.",
      "Implemented drag-and-drop functionality for creating and connecting nodes.",
      "Built conditional logic into the node system to support dynamic conversation paths.",
      "Created a flexible structure for fully customisable conversational workflows.",
    ],

    results: [
      "Enabled companies to build custom chatbot flows visually.",
      "Provided an intuitive drag-and-drop experience for managing conversations.",
      "Supported dynamic question-and-answer flows using conditional logic.",
      "Made complex chatbot workflow creation more flexible and manageable.",
    ],

    year: 2025,
    role: "Full Stack Developer",
  },
];

export const getProjectBySlug = (
  slug: string
): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getProjectsByCategory = (
  category: string
): Project[] => {
  return projects.filter((p) => p.category === category);
};
