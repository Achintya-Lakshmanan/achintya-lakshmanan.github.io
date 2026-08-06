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
  highlights: string[]
  /** Logo image URL (e.g. Clearbit). Falls back to monogram if missing/broken. */
  logo?: string
}

export interface Project {
  id: string
  title: string
  period: string
  kind: 'research' | 'build'
  question: string
  contribution: string
  tags: string[]
  evidence: string[]
  status?: string
  links?: ProjectLink[]
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'github' | 'external'
}

export interface CurrentThread {
  label: string
  text: string
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
  positioning: string
  bio: string
  aboutResearch: string
  aboutSoftware: string
  currentThreads: CurrentThread[]
  contactCopy: string
  location: string
  /** Profile photo path under /public (e.g. /me.jpg). Optional. */
  photo?: string
  socials: SocialLink[]
  nav: NavItem[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  achievements: Achievement[]
}

export const content: SiteContent = {
  name: 'Achintya Lakshmanan',
  email: 'aql6062@psu.edu',
  location: 'University Park, PA',
  photo: '/me.jpg',
  positioning:
    'LLM researcher and software engineer building systems that plan, share context, and hold up under real evaluation.',
  bio: 'I’m an MS CSE student and Graduate Researcher at Penn State, working on data-grounded agents, multi-agent RAG, and search-time decoding—with prior experience shipping ML and full-stack products.',
  aboutResearch:
    'The question running through my research is what should live outside the model. Empirical priors and validators can anchor an agent to real behavior; grammar constraints and search can protect high-leverage decisions; matched evaluations can tell genuine adaptation from reproduction.',
  aboutSoftware:
    'I came to research from the building side. I have shipped RAG, collaborative editing, and Power BI tooling in product teams, and I still turn small annoyances on my own computer into native apps and developer tools.',
  currentThreads: [
    {
      label: 'Ground first',
      text: 'Use ATUS time-slot priors and transitions outside the prompt, then score four LLM activity proposals against that structure before selecting the next activity.',
    },
    {
      label: 'Constrain early',
      text: 'Use grammar, schema, and search where the first few choices determine whether the rest of a structured output can succeed.',
    },
    {
      label: 'Audit the metric',
      text: 'Separate reproduction from transfer, policy from execution, and oracle from deployable settings before calling a result progress.',
    },
  ],
  contactCopy:
    'If something here made you curious, send me an email. I am especially happy to talk about LLM systems, careful evaluation, useful developer tools, or work where I get to do all three.',
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
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Highlights', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ],
  education: [
    {
      id: 'ms-psu',
      degree: 'MS Computer Science and Engineering',
      institution: 'Pennsylvania State University',
      location: 'University Park, PA',
      period: 'Expected May 2027',
      gpa: '3.8',
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
      highlights: [
        'On AURA, I evaluate a K-validation controller that scores four LLM activity proposals alongside ATUS time-slot priors and transitions, with policy selections and execution analyzed separately.',
        'I study what a downstream judge inherits when agents share KV caches, using matched perturbation controls to test the mechanism rather than crediting one compression format.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 to Present',
      category: 'teaching',
      logo: '/logos/psu.png',
      highlights: [
        'Prepare course questions, hold office hours, and help students work through course projects.',
        'Mentor secure-coding work and support its experimental design and analysis.',
      ],
    },
    {
      id: 'snu-vip',
      title: 'Research Intern',
      organization: 'Vision and Image Processing Lab, SNU',
      period: 'Aug 2024 to Mar 2025',
      category: 'research',
      logo: '/logos/snu.svg',
      highlights: [
        'Built and evaluated a Mamba-enhanced NeRF pipeline for reconstructing 3D bone structure from a single X-ray.',
        'For a fetal-ultrasound challenge, tested Semi-Mamba and a mutual-learning VMUNet variant on noisy, low-contrast scans.',
      ],
    },
    {
      id: 'snu-speech',
      title: 'Speech Lab Research Intern',
      organization: 'Speech Lab, SNU',
      period: 'Sep 2022 to Nov 2022',
      category: 'research',
      logo: '/logos/snu.svg',
      highlights: [
        'Built Tamil text-to-speech and voice-cloning experiments with encoder-decoder and Tacotron models.',
        'Contributed to voice transcreation for IIT online courses.',
      ],
    },
    {
      id: 'lumel',
      title: 'Product Developer Intern',
      organization: 'Lumel Technologies',
      period: 'Mar 2025 to Jun 2025',
      category: 'industry',
      logo: '/logos/lumel.svg',
      highlights: [
        'Built a TypeScript RAG assistant that translated natural-language requests into Inforiver Matrix formulas.',
        'Built a collaborative JSON editor with React, Node.js, and WebSockets, including real-time shared state and multi-user testing.',
        'Worked on Power BI utilities for parsing Microsoft Project data and generating reusable report themes.',
      ],
    },
    {
      id: 'phosphene',
      title: 'Deep Learning Intern',
      organization: 'Phosphene AI',
      period: 'May 2024 to Jul 2024',
      category: 'industry',
      logo: '/logos/phosphene.png',
      highlights: [
        'Led a five-person team building and evaluating a PyTorch deepfake detector.',
        'Added blur, compression, and color-jitter augmentation and tested MINTIME on multi-identity videos.',
      ],
    },
    {
      id: 'culvii',
      title: 'Software Engineering Intern',
      organization: 'Culvii',
      period: 'Feb 2024 to May 2024',
      category: 'industry',
      logo: '/logos/culvii.svg',
      highlights: [
        'Built parts of a student-management portal in Next.js and Node.js, including class tracking and onboarding.',
        'Added GPT-based assistants to a gamified learning product and worked on the conversation flow and response latency.',
      ],
    },
    {
      id: 'optisol',
      title: 'Machine Learning Intern',
      organization: 'Optisol Business Solutions',
      period: 'May 2023 to Jan 2024',
      category: 'industry',
      logo: '/logos/optisol.png',
      highlights: [
        'Built a React and FastAPI image-generation application around Stable Diffusion and worked on model fine-tuning.',
        'Built a GPT-4 issue-resolution prototype and deployed a YOLOv8 soot detector on a Jetson Nano.',
      ],
    },
  ],
  projects: [
    {
      id: 'aura',
      title: 'AURA: Data-Grounded Agents for Heatwave Simulation',
      period: 'Apr 2026 to Present',
      kind: 'research',
      question:
        'Can an agent model heatwave adaptation without mistaking ordinary daily structure for evidence that the LLM adapted?',
      contribution:
        'I built an ATUS-grounded K-validation and evaluation pipeline. At each decision, the model supplies four candidate activity proposals; candidate-category selection combines proposal support with the ATUS time-slot prior and preceding-activity transition while policy selections and executed actions are logged separately.',
      tags: ['Python', 'vLLM', 'LLM Agents', 'Simulation', 'Evaluation'],
      evidence: [
        'Matched controls compare the same controller with and without LLM proposals.',
        'In the adaptation arm, the heatwave target is withheld from the simulator and used only after the run for evaluation.',
        'The next evaluation is a preregistered paired, multi-seed pilot; no pilot result is reported yet.',
      ],
      status: 'Private research repository',
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      kind: 'research',
      question:
        'When one RAG agent hands its KV cache to a downstream judge, does the judge inherit a decision bias along with the saved context?',
      contribution:
        'In a collaborative study, I helped build and analyze a LangGraph pipeline across three models and two datasets, comparing text re-prefill, FP16 cache transfer, INT4 round trips, and matched-noise controls.',
      tags: ['Python', 'PyTorch', 'LangGraph', 'RAG', 'KV Cache'],
      evidence: [
        'Cache transfer changed downstream decisions in most model-and-dataset settings.',
        'Matched Gaussian and dropout controls tied or beat INT4 in most comparisons, pointing to perturbation magnitude—not INT4 itself.',
        'End-task EM and F1 stayed flat, so whether the decision-level effect improves answer correctness remains unresolved.',
      ],
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
      title: 'MCTS for Controlled Text-to-SQL',
      period: 'Feb 2026 to Present',
      kind: 'research',
      question:
        'Can search spend extra compute on the first 6–10 SQL tokens, where an early schema or structural mistake can doom the entire query?',
      contribution:
        'Working in a fork of genlm/genlm-control, I implemented a hybrid MCTS decoder that keeps expansion and simulation inside the SQL grammar and database schema, searches only the high-leverage prefix, and lets greedy decoding finish the query.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'SPIDER'],
      evidence: [
        'The benchmark separates SMC, oracle MCTS, and deployable non-oracle MCTS instead of mixing gold-assisted and test-time settings.',
        'A bounded Earley-parser cache and rollout-free heuristic took a 64-simulation prompt from a 48 GB OOM to about 10 GB.',
        'End-to-end metrics are being regenerated under a clean harness; the deprecated result table is not used here.',
      ],
      status: 'Evaluation in progress',
      links: [
        {
          label: 'Project fork',
          href: 'https://github.com/Achintya-Lakshmanan/MCTS-for-controlled-text-generation',
          kind: 'github',
        },
      ],
    },
    {
      id: 'notchnest',
      title: 'NotchNest',
      period: '2026',
      kind: 'build',
      question:
        'The MacBook notch takes permanent screen space. Could it become a useful, quiet HUD instead?',
      contribution:
        'I built a native macOS 14+ accessory app in Swift 6, AppKit, and SwiftUI, with compact and expanded states for music, meetings, files, weather, timers, and a camera mirror.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      evidence: [
        'System integrations are event-driven where timing matters, including Bluetooth connect and disconnect notifications.',
        'The app coordinates native panels, permissions, media controls, EventKit, IOKit, CoreAudio, and login-item behavior.',
        'The public repository includes the source, architecture, build script, and macOS permission requirements.',
      ],
      links: [
        {
          label: 'NotchNest repository',
          href: 'https://github.com/Achintya-Lakshmanan/NotchNest',
          kind: 'github',
        },
      ],
    },
    {
      id: 'haze-removal',
      title: 'Dense Non-Homogeneous Haze Removal',
      period: 'Jan to Apr 2024',
      kind: 'build',
      question:
        'How much restoration quality can a compact vision model recover under a four-hour challenge training budget?',
      contribution:
        'I built a compact ResNet U-Net for dense, uneven haze and used histogram equalization to make the limited training run count.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      evidence: [
        'Placed 16th out of 128 challenge submissions.',
        'The submitted model reported 14.4 dB PSNR after about four hours of training.',
        'Kept the architecture small enough for practical per-image inference.',
      ],
    },
    {
      id: 'krypton',
      title: 'Krypton: Financial Investigation Dashboard',
      period: 'Jan to Mar 2024',
      kind: 'build',
      question:
        'Could one investigation view bring transaction anomalies, phishing signals, and network context together for a hackathon analyst?',
      contribution:
        'Our team combined a random-forest transaction model with spam and phishing checks, IP lookup, and a React and Node.js investigation interface.',
      tags: ['Python', 'React', 'Node.js', 'MongoDB', 'ML'],
      evidence: [
        'Won the Encryptcon Shaastra Hackathon organized with IIT Madras and Temenos.',
        'Delivered an end-to-end prototype spanning model inference, APIs, data storage, and the analyst-facing UI.',
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
  skills: [
    {
      id: 'research',
      category: 'ML & research systems',
      skills: [
        'Python',
        'PyTorch',
        'Hugging Face',
        'vLLM',
        'LangGraph',
        'scikit-learn',
      ],
    },
    {
      id: 'web',
      category: 'Web systems',
      skills: ['TypeScript', 'React', 'Node.js', 'Next.js', 'FastAPI', 'WebSockets'],
    },
    {
      id: 'apps',
      category: 'Native & systems',
      skills: ['Swift', 'SwiftUI', 'AppKit', 'C/C++', 'SQL', 'Git', 'Docker'],
    },
    {
      id: 'data',
      category: 'Data & applied ML',
      skills: ['NumPy', 'Pandas', 'OpenCV', 'MongoDB', 'Power BI'],
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
