export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'email'
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
  gpa?: string
  coursework?: string[]
  /** Logo image URL (e.g. Clearbit). Falls back to monogram if missing/broken. */
  logo?: string
}

export type ExperienceCategory = 'research' | 'teaching' | 'industry'

export interface Experience {
  id: string
  title: string
  organization: string
  period: string
  category: ExperienceCategory
  context: string
  highlights: string[]
  /** Logo image URL (e.g. Clearbit). Falls back to monogram if missing/broken. */
  logo?: string
}

export interface Project {
  id: string
  title: string
  subtitle?: string
  /** One-line hook shown large at the top of the card. */
  tagline: string
  period: string
  kind: 'research' | 'build'
  scope?: 'personal' | 'team'
  context?: string
  summary: string
  /** Technical write-up shown in the expandable details. Omit to hide the panel. */
  approach?: string
  contribution: string
  highlight?: string
  tags: string[]
  evidence: string[]
  status?: string
  study?: { label: string; text: string }[]
  images?: { src: string; alt: string; width: number; height: number }[]
  imageCaption?: string
  links?: ProjectLink[]
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'github' | 'external'
}

export interface ResearchArtifact {
  id: string
  title: string
  period: string
  summary: string
  link: string
  linkLabel: string
  status: string
}

export interface SkillGroup {
  id: string
  category: string
  skills: string[]
}

export interface Achievement {
  id: string
  title: string
  detail?: string
  /** Logo image URL (e.g. Clearbit). Falls back to monogram if missing/broken. */
  logo?: string
  /** Organization name used for monogram fallback when logo is set. */
  organization?: string
}

export interface SiteContent {
  name: string
  email: string
  copyrightYear: string
  positioning: string
  bio: string
  /** Short lines rendered as the hero's "currently" list. */
  now: string[]
  /** Linked wherever the name appears in the bio, "now" list, or experience. */
  advisor: { name: string; href: string }
  contactCopy: string
  location: string
  /** Profile photo path under /public (e.g. /me.jpg). Optional. */
  photo?: string
  socials: SocialLink[]
  nav: NavItem[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
  researchArtifacts: ResearchArtifact[]
  skills: SkillGroup[]
  achievements: Achievement[]
}

export const content: SiteContent = {
  name: 'Achintya Lakshmanan',
  email: 'aql6062@psu.edu',
  copyrightYear: '2026',
  location: 'University Park, PA',
  photo: '/me.jpg',
  positioning: 'Software engineer and ML research engineer.',
  bio: "I'm a master's student at Penn State and a graduate researcher in the Penn State NLP Group, advised by Prof. Rui Zhang. I work on LLM agents and reinforcement learning, and outside the lab I build full-stack software and native macOS apps.",
  advisor: { name: 'Prof. Rui Zhang', href: 'https://ryanzhumich.github.io/' },
  now: [
    'Researching LLM agents in the Penn State NLP Group with Prof. Rui Zhang',
    'Teaching Assistant for CMPSC 461 at Penn State',
    'MS CSE at Penn State, graduating May 2027',
  ],
  contactCopy:
    "I'm looking for software engineering and ML research roles. If you're working on something interesting, I'd love to hear about it. Email is the fastest way to reach me.",
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/Achintya-Lakshmanan',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/achintya975',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      href: 'mailto:aql6062@psu.edu',
      icon: 'email',
    },
  ],
  nav: [
    { label: 'Research', href: '#research-work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Software', href: '#software-work' },
    { label: 'About', href: '#background' },
    { label: 'Contact', href: '#contact' },
  ],
  education: [
    {
      id: 'ms-psu',
      degree: 'MS Computer Science and Engineering',
      institution: 'Pennsylvania State University',
      location: 'University Park, PA',
      period: 'Expected May 2027',
      gpa: '3.8/4.0',
      logo: '/logos/psu.png',
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
      gpa: '9.15/10',
      logo: '/logos/snu.svg',
      coursework: [
        'Data Structures',
        'Web Technology',
        'Database Management Systems',
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science',
      ],
    },
  ],
  experience: [
    {
      id: 'psu-nlp',
      title: 'Graduate Researcher',
      organization: 'Penn State NLP Group',
      period: 'Apr 2026 to Present',
      category: 'research',
      logo: '/logos/psu.png',
      context:
        'Advised by Prof. Rui Zhang. Research on LLM-driven behavior in daily-routine simulations and context sharing between retrieval-augmented generation (RAG) agents.',
      highlights: [
        'Build the AURA heatwave-simulation pipeline, including planning, validation checks, and execution logs.',
        'Helped build LangGraph experiments comparing text handoffs with same-model KV-cache reuse, then tested whether decision changes translated into better answers.',
        'Run experiments with diffusion language models for reconstructing daily activity routines.',
        'Evaluate activation-steering methods for reducing hallucination in reasoning models.',
      ],
    },
    {
      id: 'psu-ta',
      title: 'Teaching Assistant, CMPSC 461',
      organization: 'Pennsylvania State University',
      period: 'Aug 2026 to Present',
      category: 'teaching',
      logo: '/logos/psu.png',
      context:
        'Teaching assistant for CMPSC 461, helping run the course and supporting undergraduate students.',
      highlights: [
        'Set exam questions and design assignments, and grade student submissions.',
        'Hold office hours to explain course concepts in plain language and help students debug their work.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Aug 2025 to May 2026',
      category: 'teaching',
      logo: '/logos/psu.png',
      context:
        'Supported undergraduate computing courses, from course materials and grading to student projects.',
      highlights: [
        'Set exam questions and assignments, and graded student submissions.',
        'Mentored student projects, helping teams scope their work and turn unclear requirements into concrete next steps.',
        'Held office hours to explain course concepts and help students debug implementations.',
      ],
    },
    {
      id: 'snu-vip',
      title: 'Research Intern',
      organization: 'Vision and Image Processing Lab, SNU',
      period: 'Aug 2024 to Mar 2025',
      category: 'research',
      logo: '/logos/snu.svg',
      context:
        'Medical-imaging experiments in single-view X-ray reconstruction and segmentation of noisy, low-contrast ultrasound images.',
      highlights: [
        'Implemented and evaluated a Mamba-enhanced neural radiance field (NeRF) pipeline for single-view X-ray reconstruction experiments.',
        'Evaluated Semi-Mamba and a VMUNet variant with mutual learning for fetal-ultrasound segmentation under noisy imaging conditions.',
      ],
    },
    {
      id: 'snu-speech',
      title: 'Speech Lab Research Intern',
      organization: 'Speech Lab, SNU',
      period: 'Sep 2022 to Nov 2022',
      category: 'research',
      logo: '/logos/snu.svg',
      context:
        'Speech synthesis and voice cloning for Tamil versions of IIT educational content.',
      highlights: [
        'Built text-to-speech and voice-cloning experiments using encoder-decoder architectures and Tacotron models.',
        'Contributed to adapting IIT online-course narration into Tamil.',
      ],
    },
    {
      id: 'lumel',
      title: 'Product Developer Intern',
      organization: 'Lumel Technologies',
      period: 'Mar 2025 to Jun 2025',
      category: 'industry',
      logo: '/logos/lumel.svg',
      context:
        'Built tools for analytics teams to generate formulas, edit shared JSON configuration, and prepare Power BI reports.',
      highlights: [
        'Developed a TypeScript RAG assistant for Inforiver Matrix formula generation using retrieved product context.',
        'Built the React interface and Node.js/WebSocket synchronization for a shared JSON editor, propagating configuration edits between connected sessions.',
        'Contributed Microsoft Project data parsing and reusable theme utilities for Power BI reporting workflows.',
      ],
    },
    {
      id: 'phosphene',
      title: 'Deep Learning Intern',
      organization: 'Phosphene AI',
      period: 'May 2024 to Jul 2024',
      category: 'industry',
      logo: '/logos/phosphene.png',
      context:
        'Worked in a five-person team on video deepfake detection under compression, blur, color changes, and multiple identities.',
      highlights: [
        'Led implementation of the PyTorch detector and evaluated its performance across varied video conditions.',
        'Added blur, compression, and color-jitter augmentation to training; tested MINTIME on videos containing multiple identities.',
      ],
    },
    {
      id: 'culvii',
      title: 'Software Engineering Intern',
      organization: 'Culvii',
      period: 'Feb 2024 to May 2024',
      category: 'industry',
      logo: '/logos/culvii.svg',
      context:
        'Developed student-management and gamified learning products with GPT-powered conversational assistance.',
      highlights: [
        'Built class-tracking and onboarding features across the Next.js interface and Node.js backend.',
        'Integrated GPT-based learning assistants and worked on conversation flow and response latency.',
      ],
    },
    {
      id: 'optisol',
      title: 'Machine Learning Intern',
      organization: 'Optisol Business Solutions',
      period: 'May 2023 to Jan 2024',
      category: 'industry',
      logo: '/logos/optisol.png',
      context:
        'Applied ML to image generation, automated issue resolution, and computer vision on edge hardware.',
      highlights: [
        'Built a Stable Diffusion application with a React interface and FastAPI backend, and contributed to model fine-tuning.',
        'Developed a GPT-4 issue-resolution prototype and deployed a YOLOv8 soot detector on an NVIDIA Jetson Nano.',
      ],
    },
  ],
  projects: [
    {
      id: 'aura',
      title: 'AURA',
      subtitle: 'Simulating daily life in extreme heat',
      tagline: 'Can language models, including diffusion LMs, produce daily routines that look like real ones?',
      period: 'Apr 2026 to Present',
      kind: 'research',
      context: 'Penn State NLP research',
      summary:
        "AURA simulates how people go about their day during a heatwave, grounded in real time-use survey data. We're studying how well different kinds of language models, including diffusion language models, can plan and reconstruct realistic daily routines.",
      contribution:
        'I work on the simulation and planning pipeline and run the diffusion-LM experiments.',
      tags: ['Python', 'LLM Agents', 'Diffusion LMs', 'Simulation'],
      evidence: [],
      status: 'In progress · paper in preparation',
    },
    {
      id: 'steering',
      title: 'Steering thinking models away from hallucination',
      tagline: 'Can activation steering make reasoning models hallucinate less?',
      period: 'Jul 2026 to Present',
      kind: 'research',
      context: 'Penn State NLP research',
      summary:
        'Testing whether activation-steering methods can reduce hallucination in newer reasoning ("thinking") language models.',
      contribution:
        'I adapt and evaluate steering methods on recent open models.',
      tags: ['Python', 'PyTorch', 'Activation Steering', 'Hallucination'],
      evidence: [],
      status: 'In progress · paper in preparation',
    },
    {
      id: 'attention-bias-rag',
      title: 'Context sharing between LLM agents',
      tagline: "Should agents hand each other text, or the model's own KV cache?",
      period: 'Feb 2026 to Present',
      kind: 'research',
      context: 'Research collaboration',
      summary:
        "This question-answering pipeline tests two ways for LLM agents to share context: passing text or reusing the model's cached context. We compare which evidence the agents accept and whether their final answers improve.",
      contribution:
        "I helped build the LangGraph pipeline and controlled experiments, then compared the evaluator's decisions with the quality of the final answers.",
      status: 'Work in progress',
      tags: ['Python', 'PyTorch', 'LangGraph', 'RAG', 'KV Cache'],
      evidence: [],
      links: [
        {
          label: 'Collaborative repository',
          href: 'https://github.com/vivek032001/Quantized-KV-Cache-Transfer-for-Multi-Agent-RAG',
          kind: 'github',
        },
      ],
    },
    {
      id: 'mcts-llm',
      title: 'Search-guided SQL',
      tagline: 'Tree search over the first few tokens of a SQL query, with grammar and schema guardrails.',
      period: 'Feb 2026 to Present',
      kind: 'research',
      context: 'Reinforcement learning course project',
      summary:
        'A decoder that turns natural-language questions into SQL queries. It uses Monte Carlo tree search to explore different ways to begin a query, with grammar and schema checks keeping candidates valid.',
      contribution:
        'I built the decoder and its benchmark code on top of genlm-control.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'SPIDER'],
      evidence: [],
      status: 'Work in progress',
      links: [{ label: 'Upstream decoder', href: 'https://github.com/genlm/genlm-control', kind: 'github' }],
    },
    {
      id: 'notchnest',
      title: 'NotchNest',
      tagline: 'The MacBook notch, turned into a home for music, calendar, timers, and files.',
      period: '2026',
      kind: 'build',
      scope: 'personal',
      summary:
        'NotchNest puts music controls, upcoming events, timers, and a place to stash files in the MacBook notch. Hover over the notch to open the panel. Move away and it closes.',
      approach:
        'SwiftUI draws the widgets inside an AppKit panel. Separate services handle media, EventKit, and device controls. The panel stays on the built-in notch even when an external display becomes the main screen. Mirroring or closing the lid hides it and returns volume and brightness keys to macOS, while keeping timers and Shelf files in memory. Display notifications and polling keep the UI updated. Each protected service has its own permission flow.',
      contribution:
        'I built the app in Swift, including the widgets and native integrations. I also handled permissions and what happens when displays are connected, mirrored, or disconnected.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      evidence: [
        'Tests simulate display layouts and check permissions, panel sizes, calendar navigation, and the playback timeout. Testing with real external displays is a separate manual step.',
        'Weather currently uses a fixed State College location. Brightness control relies on a private macOS interface and can break after an OS update.',
      ],
      images: [
        { src: '/projects/notchnest-music.png', alt: 'NotchNest music panel with sample artwork, playback controls, and audio output selection', width: 1080, height: 574 },
        { src: '/projects/notchnest-calendar.png', alt: 'NotchNest calendar panel with a month grid, sample events, and a dated reminder', width: 1080, height: 574 },
      ],
      imageCaption: "NotchNest's own app views, rendered with sample data. Music and calendar panels.",
    },
    {
      id: 'haze-removal',
      title: 'Removing dense, uneven haze',
      tagline: 'Restoring photos through dense, uneven haze on a four-hour training budget.',
      period: 'Jan to Apr 2024',
      kind: 'research',
      context: 'Computer vision challenge',
      summary:
        'This was a challenge project on restoring photos affected by dense, uneven haze. The pipeline adjusts contrast first, then uses a small ResNet U-Net to restore the image.',
      approach:
        'I used histogram equalization for contrast adjustment and a compact ResNet U-Net for restoration. A four-hour training budget limited the model size and how many training iterations I could run.',
      contribution:
        'I built the pipeline, trained the model within a four-hour budget, and prepared the submission.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      evidence: [],
      status: 'Completed challenge project',
    },
    {
      id: 'krypton',
      title: 'Krypton',
      tagline: 'A fraud-investigation dashboard that won the Encryptcon hackathon.',
      period: 'Jan to Mar 2024',
      kind: 'build',
      scope: 'team',
      summary:
        'Krypton was our hackathon project for investigating suspicious financial transactions. It puts fraud predictions, transaction timing, and location checks in a React dashboard so an analyst can review them together.',
      approach:
        'A Random Forest uses transaction details, time gaps, and distances between locations to flag suspicious activity in a synthetic dataset. The dashboard gets predictions from Python inference services and includes IP lookups. We also built a companion app for spam and phishing detection.',
      contribution:
        'I worked on the fraud models and connected their predictions to the dashboard. My teammates handled the API and data storage.',
      highlight: 'Winner, Encryptcon Shaastra Hackathon, IIT Madras and Temenos.',
      status: 'Hackathon prototype',
      tags: ['Python', 'React', 'FastAPI', 'MongoDB', 'Random Forest'],
      evidence: [
        'Won the Encryptcon Shaastra Hackathon organized with IIT Madras and Temenos.',
        'The team delivered a working prototype connecting model inference, external checks, data storage, and the analyst interface.',
      ],
      links: [
        {
          label: 'Krypton repository',
          href: 'https://github.com/Achintya-Lakshmanan/Technica_LAVA',
          kind: 'github',
        },
      ],
    },
  ],
  researchArtifacts: [
    {
      id: 'secure-code-generation',
      title: 'Improving LLM-Assisted Secure Code Generation through Retrieval-Augmented Generation and Multi-Tool Feedback',
      period: 'arXiv · 2026',
      summary:
        'An offline study of C/C++ code repair using retrieved examples and compiler, CodeQL, and KLEE feedback. We evaluated 3,242 programs from DeepSeek-Coder-1.3B and CodeLlama-7B. I contributed to the retrieval-based remediation pipeline. The evaluation measures compilation, tool-detected issues, and behavior under test harnesses; it does not establish security for deployed software.',
      link: 'https://arxiv.org/abs/2601.00509',
      linkLabel: 'Read the paper',
      status: 'Coauthored preprint',
    },
  ],
  skills: [
    {
      id: 'research',
      category: 'ML & research',
      skills: [
        'Python',
        'PyTorch',
        'Hugging Face',
        'vLLM',
        'LangGraph',
        'scikit-learn',
        'NumPy / Pandas',
        'OpenCV',
        'MCTS / search',
      ],
    },
    {
      id: 'software',
      category: 'Software',
      skills: [
        'TypeScript',
        'React',
        'Node.js',
        'Next.js',
        'FastAPI',
        'WebSockets',
        'Swift / SwiftUI / AppKit',
        'SQL / MongoDB',
        'Docker / Power BI',
      ],
    },
  ],
  achievements: [
    {
      id: 'encryptcon',
      title: 'Winner, Encryptcon Shaastra Hackathon',
      detail: 'IIT Madras + Temenos',
      organization: 'IIT Madras',
      logo: '/logos/iitm.ico',
    },
    {
      id: 'soft-computing',
      title: 'Gold + Elite Top 2%',
      detail: 'Intro to Soft Computing, IIT Kharagpur',
      organization: 'IIT Kharagpur',
      logo: '/logos/iitkgp.png',
    },
    {
      id: 'accel-ai',
      title: 'Silver + Elite Top 5%',
      detail: 'Applied Accelerated AI, IIT Palakkad',
      organization: 'IIT Palakkad',
    },
    {
      id: 'trinity',
      title: 'Trinity College London Electronic Keyboard Grade 6',
      detail: 'Distinction',
      organization: 'Trinity College London',
      logo: '/logos/trinity.svg',
    },
    {
      id: 'invente',
      title: 'Event Head, Code Triathlon',
      detail: 'Invente 7.0',
    },
    {
      id: 'coding-club',
      title: 'Core Committee (AI/ML)',
      detail: 'SNUC Coding Club',
    },
  ],
}
