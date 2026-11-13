// All site copy lives here. In any string rendered through <RichText>, wrap a figure in
// **double asterisks** to highlight it; the advisor's name is linked automatically.

export interface Link {
  label: string
  href: string
}

export interface Publication {
  title: string
  venue: string
  year: string
  authors: string[]
  summary: string
  /** What it found, in a sentence. */
  findings: string
  /** What I did on it. */
  contribution: string
  link: string
  results: {
    model: string
    headline: string
    label: string
    /** Bar lengths as percentages of the track. */
    before: number
    after: number
    beforeLabel: string
    afterLabel: string
  }[]
}

export interface ResearchProject {
  id: string
  /** Short name, set large on the card. */
  name: string
  /** The question the project asks. */
  question: string
  line: string
  status: string
  tags: string[]
}

export interface SoftwareProject {
  id: string
  title: string
  label: string
  badge?: string
  tagline: string
  summary: string
  stats?: { value: string; label: string }[]
  /** What I personally built, one item per line. */
  built: string[]
  team?: string
  tags: string[]
  images?: { src: string; alt: string; width: number; height: number }[]
  caption?: string
  /** Address shown in a browser bar above each screenshot, for projects that are websites. */
  frame?: string
  links?: Link[]
}

export type ExperienceCategory = 'research' | 'industry' | 'teaching'

export interface Experience {
  id: string
  title: string
  organization: string
  period: string
  category: ExperienceCategory
  /** Path under /public. Falls back to a monogram if missing or broken. */
  logo?: string
  /** What I did there, one item per line. Wrap figures in **double asterisks**. */
  points: string[]
  /** Short name for the chart. */
  short: string
  /** First and last month as YYYY-MM. Leave `end` out for a current role. */
  start: string
  end?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  gpa: string
  logo: string
}

export interface Achievement {
  title: string
  detail: string
  /** Name used for the monogram fallback. */
  organization: string
  logo?: string
}

export const content = {
  name: 'Achintya Lakshmanan',
  email: 'aql6062@psu.edu',
  copyrightYear: '2026',
  location: 'University Park, PA',
  photo: '/me.webp',
  advisor: { name: 'Prof. Rui Zhang', href: 'https://ryanzhumich.github.io/' },
  hero: {
    eyebrow: 'MS CSE · Penn State NLP Group · graduating May 2027',
    sub: "Advised by Prof. Rui Zhang, I fine-tune and steer language models, from simulating how people behave to making reasoning models hallucinate less. Before grad school I shipped ML and full-stack work across four industry internships. I'm applying for PhD positions and for software and ML engineering roles.",
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/Achintya-Lakshmanan' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/achintya975' },
  ] satisfies Link[],
  nav: [
    { label: 'research', href: '#research' },
    { label: 'engineering', href: '#engineering' },
    { label: 'experience', href: '#experience' },
    { label: 'about', href: '#about' },
    { label: 'contact', href: '#contact' },
  ] satisfies Link[],
  // The experience chart runs from the first month to the last; roles with no `end` run to the right edge.
  timeline: { from: '2022-08', to: '2026-12' },
  research: {
    interests:
      "I work on getting language models to behave reliably: fine-tuning them to simulate how real people behave, steering reasoning models to hallucinate less, and training code models with preference optimization. Next I want to take this into reinforcement learning, where a model learns from the results of its own actions.",
    publication: {
      title: 'Improving LLM-Assisted Secure Code Generation through Retrieval-Augmented Generation and Multi-Tool Feedback',
      venue: 'arXiv',
      year: '2026',
      authors: ['Vidyut Sriram', 'Sawan Pandita', 'Achintya Lakshmanan', 'Aneesh Shamraj', 'Suman Saha'],
      summary:
        'A loop in which a model repairs its own C and C++ using compiler errors, CodeQL scans and KLEE symbolic execution, with earlier successful repairs retrieved as examples. Evaluated on 3,242 programs.',
      findings: 'Repair cut security vulnerabilities by 96% for DeepSeek-Coder-1.3B, and the critical security defect rate from 58.55% to 22.19% for CodeLlama-7B.',
      contribution: 'I built the retrieval-based remediation pipeline.',
      link: 'https://arxiv.org/abs/2601.00509',
      results: [
        {
          model: 'DeepSeek-Coder-1.3B',
          headline: '−96%',
          label: 'security vulnerabilities',
          before: 100,
          after: 4,
          beforeLabel: 'before repair',
          afterLabel: 'after',
        },
        {
          model: 'CodeLlama-7B',
          headline: '58.55% → 22.19%',
          label: 'critical security defect rate',
          before: 58.55,
          after: 22.19,
          beforeLabel: 'before repair',
          afterLabel: 'after',
        },
      ],
    } satisfies Publication,
    // Unpublished work: say what each project asks, not what it found.
    current: [
      {
        id: 'aura',
        name: 'AURA',
        question: 'Can LLM agents reproduce how real people behave in a disaster?',
        line: 'Building simulations on LLMs and diffusion language models, and checking them against how people actually behave.',
        status: 'Paper in preparation',
        tags: ['LLM agents', 'simulation', 'diffusion language models'],
      },
      {
        id: 'steering',
        name: 'Steering',
        question: 'Can activation steering make reasoning models hallucinate less?',
        line: 'Adapting published steering methods to open reasoning models, and testing whether the gains hold on unseen questions.',
        status: 'Paper in preparation',
        tags: ['activation steering', 'hallucination', 'reasoning models'],
      },
      {
        id: 'secure-dpo',
        name: 'DPO for code',
        question: 'Can preference training make code models write correct code more reliably?',
        line: 'Training code models with preference optimization (DPO).',
        status: 'Early stage',
        tags: ['DPO', 'alignment', 'code generation'],
      },
    ] satisfies ResearchProject[],
    earlier: {
      kicker: 'NTIRE Dense Haze Removal challenge · Jan – Apr 2024',
      title: 'Dense, non-homogeneous haze removal',
      summary:
        'Restoring photos taken through thick, uneven haze. I paired a lightweight ResNet-based U-Net with histogram equalization, which alone raised PSNR by 20%. The whole model trains in four hours.',
      results: [
        { headline: 'Ranked 16th', label: 'of 128 submissions worldwide' },
      ],
    },
  },
  software: [
    {
      id: 'chillysos',
      title: 'ChillySOS',
      label: 'Team hackathon project · HackPSU Fall 2026',
      badge: 'Winner · Best Use of Vultr',
      tagline: 'Heat and winter-storm planning for Philadelphia: a dashboard for city planners, and an iPhone app for residents and volunteers.',
      summary:
        "The dashboard replays a real recorded heat or cold day and shows who is in danger, hour by hour. It then ranks the city's cooling and warming sites by how much of that danger each one can reach. The app shows residents which sites are open and connects them to a nearby volunteer with one tap.",
      stats: [
        { value: '20,000', label: 'simulated residents, built from Census, NOAA and time-use survey data' },
        { value: '2M+', label: 'resident-hours in TimescaleDB behind the chatbot' },
        { value: '9.2s → 1.1s', label: 'chatbot response time' },
        { value: '0.024', label: 'Brier score of the heat-risk model, against 0.070 for a constant baseline' },
      ],
      built: [
        'The simulation pipeline, from public data to 20,000 residents who each follow a real recorded daily routine.',
        'The SwiftUI iPhone app, its API, and role-based sign-in for residents and volunteers.',
        "A chatbot that answers planners' questions by writing read-only SQL over 2M+ resident-hours in TimescaleDB.",
        'Spoken check-ins and alerts for residents, and the one-command deployment to Vultr.',
      ],
      team: 'My teammates designed the dashboard and branding and trained the site-ranking models.',
      tags: ['Python', 'Swift / SwiftUI', 'TimescaleDB', 'MapLibre', 'scikit-learn', 'Gemini', 'Auth0'],
      images: [
        { src: '/projects/chillysos-heat.webp', alt: 'ChillySOS dashboard replaying a severe Philadelphia heatwave, with simulated residents on a map and a headline of 10.2 hours of predicted danger for unhoused residents', width: 800, height: 624 },
        { src: '/projects/chillysos-cold.webp', alt: 'ChillySOS dashboard in winter-storm mode, with simulated residents on a blue-themed map and a headline of 13.8 hours of predicted danger for unhoused residents', width: 800, height: 624 },
      ],
      caption: 'The planning dashboard replaying a severe heatwave and a winter storm. Residents are simulated.',
      frame: 'chillysos.us',
      links: [
        { label: 'chillysos.us', href: 'https://chillysos.us' },
        { label: 'Repository', href: 'https://github.com/Achintya-Lakshmanan/swelter' },
      ],
    },
    {
      id: 'notchnest',
      title: 'NotchNest',
      label: 'Personal macOS app · 2026',
      tagline: 'The MacBook notch, turned into a home for music, calendar, timers and files.',
      summary:
        'Hover over the notch and a panel opens with music controls, upcoming events, timers and a shelf for files. Move away and it closes.',
      built: [
        'All of it, in Swift 6 with AppKit and SwiftUI: the widgets, the native integrations and the permission flows.',
      ],
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      images: [
        { src: '/projects/notchnest-music.webp', alt: 'NotchNest music panel with artwork, playback controls, and audio output', width: 960, height: 510 },
        { src: '/projects/notchnest-calendar.webp', alt: 'NotchNest calendar panel with a month grid, events, and a reminder', width: 960, height: 510 },
      ],
      caption: 'Screens from NotchNest, filled with sample data.',
      links: [{ label: 'Repository', href: 'https://github.com/Achintya-Lakshmanan/NotchNest' }],
    },
    {
      id: 'krypton',
      title: 'Krypton',
      label: 'Team hackathon project · 2024',
      badge: 'Winner · 1st of 400+ teams',
      tagline: 'A fraud-investigation dashboard for bank analysts, built at Encryptcon (IIT Madras × Temenos).',
      summary:
        'Krypton puts fraud predictions, transaction timing and location checks in one dashboard, so an analyst can review a suspicious transaction without switching tools. It flags one in under 5 s.',
      stats: [
        { value: '1st of 400+', label: 'teams at Encryptcon' },
        { value: '<5s', label: 'to flag a suspicious transaction' },
      ],
      built: ['The random-forest fraud models, and the code that feeds their predictions to the dashboard.'],
      team: 'My teammates built the API and data storage.',
      tags: ['Python', 'React', 'FastAPI', 'MongoDB', 'Random Forest'],
      links: [{ label: 'Repository', href: 'https://github.com/Achintya-Lakshmanan/Technica_LAVA' }],
    },
  ] satisfies SoftwareProject[],
  experience: [
    {
      id: 'psu-nlp',
      short: 'PSU NLP Group',
      start: '2026-04',
      title: 'Graduate Researcher',
      organization: 'Penn State NLP Group · advised by Prof. Rui Zhang',
      period: 'Apr 2026 – Present',
      category: 'research',
      logo: '/logos/psu.webp',
      points: [
        'Build and fine-tune the language-model simulations behind AURA, including diffusion language models.',
        'Adapt activation steering methods to reasoning models, and test whether the gains hold on unseen questions.',
        'Train code models with preference optimization (DPO).',
      ],
    },
    {
      id: 'psu-ta',
      short: 'Penn State TA',
      start: '2026-08',
      title: 'Teaching Assistant',
      organization: 'Pennsylvania State University',
      period: 'Aug 2026 – Present',
      category: 'teaching',
      logo: '/logos/psu.webp',
      points: [
        'CMPSC 461, Programming Language Concepts, in Fall 2026 (**180 students**).',
        'Write exam questions and design assignments, and grade submissions.',
        'Hold office hours to explain course concepts and help students debug their work.',
      ],
    },
    {
      id: 'psu-la',
      short: 'Penn State LA',
      start: '2025-09',
      end: '2026-08',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 – Aug 2026',
      category: 'teaching',
      logo: '/logos/psu.webp',
      points: [
        'CMPSC 461 in Fall 2025 (**about 400 students**) and Spring 2026 (**200**), and CMPSC 311, Systems Programming in C, in Summer 2026 (**30**).',
        'Mentored student projects in help sessions, through implementation, evaluation design and analysis.',
      ],
    },
    {
      id: 'lumel',
      short: 'Lumel',
      start: '2025-03',
      end: '2025-06',
      title: 'Product Developer Intern',
      organization: 'Lumel Technologies',
      period: 'Mar – Jun 2025',
      category: 'industry',
      logo: '/logos/lumel.svg',
      points: [
        'Built a real-time collaborative JSON editor with React, Node.js and WebSockets, supporting **30+ concurrent users**.',
        "Built an LLM-powered RAG service in TypeScript that writes formulas for Inforiver, Lumel's Power BI reporting product, cutting manual effort by **70%**.",
        'Optimized the MS Project to Power BI parser, making enterprise data imports **40% faster**.',
        'Built an automated Power BI theme generator, cutting report customization time by **50%**.',
      ],
    },
    {
      id: 'snu-vip',
      short: 'Shiv Nadar Vision Lab',
      start: '2024-08',
      end: '2025-03',
      title: 'Research Intern',
      organization: 'Vision and Image Processing Lab, Shiv Nadar University Chennai',
      period: 'Aug 2024 – Mar 2025',
      category: 'research',
      logo: '/logos/snu.svg',
      points: [
        'Built a NeRF-based pipeline, enhanced with Mamba modules, that reconstructs 3D bone structure from a single X-ray.',
        'Reached **PSNR 28.54** and **LPIPS 0.309** on clinical X-ray datasets, ahead of the 3DGS and GAMBA baselines.',
        'For the Fetal Ultrasound Grand Challenge, trained semi-supervised segmentation models (Semi-Mamba, and a custom VMUNet variant with mutual learning, attention and multi-scale supervision) on noisy, low-contrast scans, reaching **96% IoU**.',
      ],
    },
    {
      id: 'phosphene',
      short: 'Phosphene AI',
      start: '2024-05',
      end: '2024-07',
      title: 'Deep Learning Intern',
      organization: 'Phosphene AI',
      period: 'May – Jul 2024',
      category: 'industry',
      logo: '/logos/phosphene.png',
      points: [
        'Led a team of five building a deepfake detection pipeline in PyTorch: **91% accuracy** at about **5 s** per video.',
        'Built an augmentation pipeline (blur, compression, color jitter) that raised F1 by **22%** (relative).',
        'Applied the MINTIME detector to videos with several faces, and generated test deepfakes with DeepFaceLab.',
      ],
    },
    {
      id: 'culvii',
      short: 'Culvii',
      start: '2024-02',
      end: '2024-05',
      title: 'Software Engineering Intern',
      organization: 'Culvii',
      period: 'Feb – May 2024',
      category: 'industry',
      logo: '/logos/culvii.svg',
      points: [
        'Built a student-management portal in Next.js and Node.js, with class tracking and onboarding.',
        'Integrated GPT-based assistants into a gamified learning platform, and tuned their conversation flow and response time.',
      ],
    },
    {
      id: 'optisol',
      short: 'Optisol',
      start: '2023-05',
      end: '2024-01',
      title: 'Machine Learning Intern',
      organization: 'Optisol Business Solutions',
      period: 'May 2023 – Jan 2024',
      category: 'industry',
      logo: '/logos/optisol.png',
      points: [
        'Deployed a YOLOv8 soot detector on an NVIDIA Jetson Nano, running in real time: **98% accuracy at 25 FPS**.',
        'Built a GPT-4 issue-resolution app with React and FastAPI, improving employee issue turnaround by **20%**.',
        'Built a UI design generator with React, FastAPI and Stable Diffusion, fine-tuning the diffusion models in PyTorch.',
      ],
    },
    {
      id: 'snu-speech',
      short: 'Shiv Nadar Speech Lab',
      start: '2022-09',
      end: '2022-11',
      title: 'Speech Lab Research Intern',
      organization: 'Speech Lab, Shiv Nadar University Chennai',
      period: 'Sep – Nov 2022',
      category: 'research',
      logo: '/logos/snu.svg',
      points: [
        'Built encoder-decoder text-to-speech systems for Tamil.',
        'Deployed a Tacotron-based voice-cloning model.',
        'Researched voice transcreation for Tamil versions of IIT online courses, reaching a naturalness score of about **3.5 / 5**.',
      ],
    },
  ] satisfies Experience[],
  about: [
    "I came to NLP the long way: a BTech in AI in Chennai, a speech lab building Tamil text-to-speech, a vision lab reconstructing bones in 3D from a single X-ray, and four internships shipping ML and software. What kept pulling me forward was problems where a model has to act, not just answer. That's why I'm heading toward agents and reinforcement learning.",
    "Away from this keyboard I'm usually at a different one: I hold a Grade 6 distinction in electronic keyboard from Trinity College London.",
  ],
  education: [
    {
      id: 'ms-psu',
      degree: 'MS Computer Science and Engineering',
      institution: 'Pennsylvania State University',
      location: 'University Park, PA',
      period: 'Expected May 2027',
      gpa: '3.8 / 4.0',
      logo: '/logos/psu.webp',
    },
    {
      id: 'btech-snu',
      degree: 'BTech Artificial Intelligence and Data Science',
      institution: 'Shiv Nadar University Chennai',
      location: 'Chennai, India',
      period: 'June 2025',
      gpa: '9.15 / 10',
      logo: '/logos/snu.svg',
    },
  ] satisfies Education[],
  /** On the whiteboard in the room, when no project is being read: what I'm up to right now. Keep it current. */
  // Where I've been, pinned on the whiteboard: home and where I am now are named; the rest are countries. [lon, lat]
  travel: {
    home: { name: 'Chennai', at: [80.27, 13.08] },
    now: { name: 'State College', at: [-77.86, 40.79] },
    places: [
      { name: 'Thailand', at: [100.9, 15.2], label: 'above-left' },
      { name: 'Vietnam', at: [106.3, 16.5], label: 'right' },
      { name: 'Malaysia', at: [101.9, 4.4], label: 'left' },
      { name: 'Singapore', at: [103.8, 1.35], label: 'below' },
      { name: 'Japan', at: [138.5, 36.5], label: 'above' },
      { name: 'France', at: [2.4, 46.8], label: 'left' },
      { name: 'Switzerland', at: [8.2, 46.8], label: 'below' },
      { name: 'Germany', at: [10.4, 51.2], label: 'above' },
    ],
  },
  achievements: [
    { title: 'Winner, Best Use of Vultr', detail: 'HackPSU Fall 2026 · ChillySOS', organization: 'HackPSU' },
    { title: '1st place of 400+ teams, Encryptcon', detail: 'IIT Madras × Temenos · Krypton', organization: 'IIT Madras', logo: '/logos/iitm.ico' },
    { title: 'NPTEL Gold + Elite (top 2%) and Silver + Elite (top 5%)', detail: 'Soft Computing, IIT Kharagpur · Applied Accelerated AI, IIT Palakkad', organization: 'IIT Kharagpur', logo: '/logos/iitkgp.png' },
  ] satisfies Achievement[],
  skills: [
    { category: 'Languages', skills: ['Python', 'C/C++', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Go', 'Swift'] },
    { category: 'ML and research', skills: ['PyTorch', 'Hugging Face (Transformers, PEFT)', 'vLLM', 'LoRA / SFT', 'DPO', 'diffusion LMs', 'scikit-learn', 'OpenCV'] },
    { category: 'Software and cloud', skills: ['React', 'Next.js', 'Node.js', 'FastAPI', 'WebSockets', 'SwiftUI / AppKit', 'three.js', 'Docker', 'Linux GPU clusters', 'AWS'] },
    { category: 'Databases', skills: ['PostgreSQL / TimescaleDB', 'MongoDB'] },
  ],
  contactCopy:
    "I finish my MS in May 2027. I'm applying for PhD positions in NLP and for software and ML engineering roles. Email is the fastest way to reach me.",
}
