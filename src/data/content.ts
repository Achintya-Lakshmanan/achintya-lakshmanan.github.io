export interface SocialLink {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  gpa: string
  scale: string
  coursework: string[]
}

export type ExperienceCategory = 'research' | 'industry' | 'teaching'

export interface Experience {
  id: string
  title: string
  organization: string
  period: string
  category: ExperienceCategory
  /** The advisor's name is linked automatically when it appears here. */
  context: string
  highlights: string[]
}

export interface FeaturedResearch {
  title: string
  subtitle: string
  label: string
  status: string
  question: string
  summary: string
  contribution: string
  meta: string
}

export interface ResearchProject {
  id: string
  title: string
  tagline: string
  summary: string
  period: string
  status: string
  tone: 'paper' | 'progress' | 'done'
  accent: 'mint' | 'violet'
  tags: string[]
  link?: string
}

export interface Publication {
  title: string
  venue: string
  year: string
  label: string
  summary: string
  link: string
}

export interface SoftwareProject {
  id: string
  title: string
  label: string
  badge?: string
  tagline: string
  summary: string
  contribution: string
  tags: string[]
  images?: { src: string; alt: string; width: number; height: number }[]
  caption?: string
  link?: { label: string; href: string }
}

export interface Achievement {
  title: string
  detail: string
}

export const content = {
  name: 'Achintya Lakshmanan',
  email: 'aql6062@psu.edu',
  copyrightYear: '2026',
  location: 'University Park, PA',
  photo: '/me.jpg',
  badge: 'Graduate researcher · Penn State NLP Group',
  tokens: ['Ach', 'int', 'ya', ' Lak', 'sh', 'man', 'an'],
  bio: "I'm a master's student at Penn State and a graduate researcher in the Penn State NLP Group, advised by Prof. Rui Zhang. Outside the lab I build full-stack software and native macOS apps.",
  advisor: { name: 'Prof. Rui Zhang', href: 'https://ryanzhumich.github.io/' },
  now: [
    'Researching LLM agents in the Penn State NLP Group with Prof. Rui Zhang',
    'Teaching Assistant for CMPSC 461 at Penn State',
    'MS CSE at Penn State, graduating May 2027',
  ],
  terminal: [
    { call: 'agent.observe()', output: 'MS CSE · Penn State NLP Group' },
    { call: 'agent.plan()', output: 'focus = [LLM agents, RL]' },
    { call: 'agent.act()', output: 'AURA · steering · NotchNest' },
  ],
  contactCopy:
    "I'm looking for software engineering and ML research roles. If you're working on something interesting, I'd love to hear about it. Email is the fastest way to reach me.",
  socials: [
    { label: 'GitHub', href: 'https://github.com/Achintya-Lakshmanan' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/achintya975' },
  ] satisfies SocialLink[],
  nav: [
    { label: 'research', href: '#research' },
    { label: 'experience', href: '#experience' },
    { label: 'software', href: '#software' },
    { label: 'about', href: '#about' },
  ] satisfies NavItem[],
  featured: {
    title: 'AURA',
    subtitle: 'Simulating daily life in extreme heat',
    label: 'Featured · Penn State NLP',
    status: 'In progress · paper in preparation',
    question: 'Can language models, including diffusion LMs, produce daily routines that look like real ones?',
    summary:
      "AURA simulates how people go about their day during a heatwave, grounded in real time-use survey data. We're studying how well different kinds of language models, including diffusion language models, can plan and reconstruct realistic daily routines.",
    contribution: 'I work on the simulation and planning pipeline and run the diffusion-LM experiments.',
    meta: 'Apr 2026 – Present · Python · LLM agents · Diffusion LMs · Simulation',
  } satisfies FeaturedResearch,
  research: [
    {
      id: 'steering',
      title: 'Steering thinking models away from hallucination',
      tagline: 'Can activation steering make reasoning models hallucinate less?',
      summary: 'I adapt and evaluate activation-steering methods on recent open reasoning models.',
      period: 'Jul 2026 – Present',
      status: 'Paper in preparation',
      tone: 'paper',
      accent: 'violet',
      tags: ['PyTorch', 'Activation steering'],
    },
    {
      id: 'context-sharing',
      title: 'Context sharing between LLM agents',
      tagline: "Should agents hand each other text, or the model's own KV cache?",
      summary:
        'A question-answering pipeline comparing two ways for agents to share context. I helped build the LangGraph pipeline and controlled experiments.',
      period: 'Feb 2026 – Present',
      status: 'Work in progress',
      tone: 'progress',
      accent: 'mint',
      tags: ['LangGraph', 'RAG', 'KV cache'],
      link: 'https://github.com/vivek032001/Quantized-KV-Cache-Transfer-for-Multi-Agent-RAG',
    },
    {
      id: 'search-sql',
      title: 'Search-guided SQL',
      tagline: 'Tree search over the first few tokens of a SQL query, with grammar and schema guardrails.',
      summary: 'A reinforcement learning course project. I built the decoder and its benchmark code on top of genlm-control.',
      period: 'Feb 2026 – Present',
      status: 'Work in progress',
      tone: 'progress',
      accent: 'mint',
      tags: ['MCTS', 'Text-to-SQL', 'SPIDER'],
    },
    {
      id: 'haze-removal',
      title: 'Removing dense, uneven haze',
      tagline: 'Restoring photos through dense, uneven haze on a four-hour training budget.',
      summary:
        'A computer vision challenge: contrast adjustment, then a compact ResNet U-Net. I built the pipeline, trained the model, and prepared the submission.',
      period: 'Jan – Apr 2024',
      status: 'Completed',
      tone: 'done',
      accent: 'violet',
      tags: ['PyTorch', 'U-Net'],
    },
  ] satisfies ResearchProject[],
  publication: {
    title: 'Improving LLM-Assisted Secure Code Generation through Retrieval-Augmented Generation and Multi-Tool Feedback',
    venue: 'arXiv',
    year: '2026',
    label: 'publication · coauthored preprint',
    summary:
      'An offline study of C/C++ code repair using retrieved examples and compiler, CodeQL, and KLEE feedback, evaluated on 3,242 programs from DeepSeek-Coder-1.3B and CodeLlama-7B. I contributed to the retrieval-based remediation pipeline.',
    link: 'https://arxiv.org/abs/2601.00509',
  } satisfies Publication,
  experience: [
    {
      id: 'psu-ta',
      title: 'Teaching Assistant, CMPSC 461',
      organization: 'Pennsylvania State University',
      period: 'Aug 2026 – Present',
      category: 'teaching',
      context: 'Helping run the course and supporting undergraduate students.',
      highlights: [
        'Set exam questions and design assignments, and grade student submissions.',
        'Hold office hours to explain course concepts in plain language and help students debug their work.',
      ],
    },
    {
      id: 'psu-nlp',
      title: 'Graduate Researcher',
      organization: 'Penn State NLP Group',
      period: 'Apr 2026 – Present',
      category: 'research',
      context:
        'Advised by Prof. Rui Zhang. Research on LLM-driven behavior in daily-routine simulations, context sharing between agents, and hallucination in reasoning models.',
      highlights: [
        'Build the AURA heatwave-simulation pipeline, including planning, validation checks, and execution logs.',
        'Run experiments with diffusion language models for reconstructing daily activity routines.',
        'Evaluate activation-steering methods for reducing hallucination in reasoning models.',
        'Helped build LangGraph experiments comparing text handoffs with same-model KV-cache reuse.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Aug 2025 – May 2026',
      category: 'teaching',
      context: 'Supported undergraduate computing courses, from course materials and grading to student projects.',
      highlights: [
        'Set exam questions and assignments, and graded student submissions.',
        'Mentored student projects, helping teams scope their work and turn unclear requirements into concrete next steps.',
        'Held office hours to explain course concepts and help students debug implementations.',
      ],
    },
    {
      id: 'lumel',
      title: 'Product Developer Intern',
      organization: 'Lumel Technologies',
      period: 'Mar – Jun 2025',
      category: 'industry',
      context: 'Built tools for analytics teams to generate formulas, edit shared JSON configuration, and prepare Power BI reports.',
      highlights: [
        'Developed a TypeScript RAG assistant for Inforiver Matrix formula generation using retrieved product context.',
        'Built the React interface and Node.js/WebSocket sync for a shared JSON editor across connected sessions.',
        'Contributed Microsoft Project data parsing and reusable theme utilities for Power BI reporting.',
      ],
    },
    {
      id: 'snu-vip',
      title: 'Research Intern',
      organization: 'Vision and Image Processing Lab, SNU',
      period: 'Aug 2024 – Mar 2025',
      category: 'research',
      context: 'Medical-imaging experiments in single-view X-ray reconstruction and segmentation of noisy ultrasound images.',
      highlights: [
        'Implemented and evaluated a Mamba-enhanced NeRF pipeline for single-view X-ray reconstruction.',
        'Evaluated Semi-Mamba and a VMUNet variant with mutual learning for fetal-ultrasound segmentation.',
      ],
    },
    {
      id: 'phosphene',
      title: 'Deep Learning Intern',
      organization: 'Phosphene AI',
      period: 'May – Jul 2024',
      category: 'industry',
      context: 'Five-person team on video deepfake detection under compression, blur, color changes, and multiple identities.',
      highlights: [
        'Led implementation of the PyTorch detector and evaluated it across varied video conditions.',
        'Added blur, compression, and color-jitter augmentation; tested MINTIME on multi-identity videos.',
      ],
    },
    {
      id: 'culvii',
      title: 'Software Engineering Intern',
      organization: 'Culvii',
      period: 'Feb – May 2024',
      category: 'industry',
      context: 'Student-management and gamified learning products with GPT-powered conversational assistance.',
      highlights: [
        'Built class-tracking and onboarding features across the Next.js interface and Node.js backend.',
        'Integrated GPT-based learning assistants and worked on conversation flow and response latency.',
      ],
    },
    {
      id: 'optisol',
      title: 'Machine Learning Intern',
      organization: 'Optisol Business Solutions',
      period: 'May 2023 – Jan 2024',
      category: 'industry',
      context: 'Applied ML to image generation, automated issue resolution, and computer vision on edge hardware.',
      highlights: [
        'Built a Stable Diffusion app with a React interface and FastAPI backend, and contributed to fine-tuning.',
        'Developed a GPT-4 issue-resolution prototype and deployed a YOLOv8 soot detector on a Jetson Nano.',
      ],
    },
    {
      id: 'snu-speech',
      title: 'Speech Lab Research Intern',
      organization: 'Speech Lab, SNU',
      period: 'Sep – Nov 2022',
      category: 'research',
      context: 'Speech synthesis and voice cloning for Tamil versions of IIT educational content.',
      highlights: [
        'Built text-to-speech and voice-cloning experiments with encoder-decoder and Tacotron models.',
        'Contributed to adapting IIT online-course narration into Tamil.',
      ],
    },
  ] satisfies Experience[],
  software: [
    {
      id: 'notchnest',
      title: 'NotchNest',
      label: 'personal macOS app · 2026',
      tagline: 'The MacBook notch, turned into a home for music, calendar, timers, and files.',
      summary:
        'NotchNest puts music controls, upcoming events, timers, and a place to stash files in the MacBook notch. Hover over the notch to open the panel; move away and it closes.',
      contribution:
        'I built the app in Swift, including the widgets and native integrations, and handled permissions and what happens when displays are connected, mirrored, or disconnected.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      images: [
        { src: '/projects/notchnest-music.png', alt: 'NotchNest music panel with artwork, playback controls, and audio output', width: 1080, height: 574 },
        { src: '/projects/notchnest-calendar.png', alt: 'NotchNest calendar panel with a month grid, events, and a reminder', width: 1080, height: 574 },
      ],
      caption: "NotchNest's own app views, rendered with sample data.",
    },
    {
      id: 'krypton',
      title: 'Krypton',
      label: 'team hackathon project · 2024',
      badge: 'Winner · Encryptcon',
      tagline: 'A fraud-investigation dashboard that won the Encryptcon Shaastra hackathon (IIT Madras × Temenos).',
      summary:
        'Krypton puts fraud predictions, transaction timing, and location checks in one React dashboard so an analyst can review suspicious transactions together.',
      contribution:
        'I worked on the fraud models and connected their predictions to the dashboard; my teammates handled the API and data storage.',
      tags: ['Python', 'React', 'FastAPI', 'MongoDB', 'Random Forest'],
      link: { label: 'Krypton repository', href: 'https://github.com/Achintya-Lakshmanan/Technica_LAVA' },
    },
  ] satisfies SoftwareProject[],
  education: [
    {
      id: 'ms-psu',
      degree: 'MS Computer Science and Engineering',
      institution: 'Pennsylvania State University',
      location: 'University Park, PA',
      period: 'expected May 2027',
      gpa: '3.8',
      scale: '4.0',
      coursework: [
        'Algorithm Analysis',
        'Computer Architecture',
        'Probabilistic ML & Diffusion Models',
        'Computer Vision',
        'Deep Learning for NLP',
        'Reinforcement Learning',
      ],
    },
    {
      id: 'btech-snu',
      degree: 'BTech Artificial Intelligence and Data Science',
      institution: 'Shiv Nadar University',
      location: 'Chennai, India',
      period: 'June 2025',
      gpa: '9.15',
      scale: '10',
      coursework: [
        'Data Structures',
        'Web Technology',
        'Database Management Systems',
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science',
      ],
    },
  ] satisfies Education[],
  skills: [
    {
      category: 'ML & research',
      skills: ['Python', 'PyTorch', 'Hugging Face', 'vLLM', 'LangGraph', 'scikit-learn', 'NumPy / Pandas', 'OpenCV', 'MCTS / search'],
    },
    {
      category: 'Software',
      skills: ['TypeScript', 'React', 'Node.js', 'Next.js', 'FastAPI', 'WebSockets', 'Swift / SwiftUI / AppKit', 'SQL / MongoDB', 'Docker'],
    },
  ],
  achievements: [
    { title: 'Winner, Encryptcon Shaastra Hackathon', detail: 'IIT Madras + Temenos' },
    { title: 'Gold + Elite, top 2%', detail: 'Intro to Soft Computing, IIT Kharagpur' },
    { title: 'Silver + Elite, top 5%', detail: 'Applied Accelerated AI, IIT Palakkad' },
    { title: 'Electronic Keyboard Grade 6, Distinction', detail: 'Trinity College London' },
  ] satisfies Achievement[],
  alsoAchieved: 'Also: Event Head, Code Triathlon (Invente 7.0); Core Committee, AI/ML (SNUC Coding Club).',
}
