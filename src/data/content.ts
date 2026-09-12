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
  period: string
  kind: 'research' | 'build'
  scope?: 'professional'
  summary: string
  approach: string
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
  bio: 'I’m a Graduate Researcher and MS CSE student at Penn State (expected May 2027), based in University Park, PA. I build full-stack and native macOS software and research language-model systems. I’m interested in where reinforcement learning meets LLMs, and I love vibe-coding macOS apps and useful little tools.',
  contactCopy:
    'I’m looking for ML, research engineering, and software opportunities where careful experiments can become dependable systems. If that sounds like your team, send me a note.',
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
    { label: 'Software', href: '#software-work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Background', href: '#background' },
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
      context:
        'Collaborative Penn State NLP work on data-grounded simulation and information flow between RAG agents.',
      highlights: [
        'Built AURA’s ATUS-grounded K-validation controller to score four LLM proposals against time-slot priors and transitions, separating policy choice from executed action.',
        'Helped build LangGraph controls for shared KV-cache experiments, comparing re-prefill, quantized transfer, and matched perturbations at the decision level.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 to Present',
      category: 'teaching',
      logo: '/logos/psu.png',
      context:
        'Undergraduate computing support through office hours, course-question preparation, and project help.',
      highlights: [
        'Explain course concepts in plain language and help students debug implementations.',
        'Help students scope longer course projects and turn unclear requirements into concrete next steps.',
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
        'Medical-image reconstruction and segmentation work in sparse, noisy, low-contrast settings.',
      highlights: [
        'Built and evaluated a Mamba-enhanced NeRF pipeline for reconstructing 3D bone structure from one X-ray.',
        'Tested Semi-Mamba and a mutual-learning VMUNet variant for noisy fetal-ultrasound segmentation.',
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
        'Tamil speech and voice-transcreation work for IIT educational content.',
      highlights: [
        'Built text-to-speech and voice-cloning experiments with encoder-decoder and Tacotron models.',
        'Contributed voice transcreation for IIT online courses.',
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
        'Product team building analytics authoring and collaboration tools.',
      highlights: [
        'Built a TypeScript RAG assistant translating natural-language requests into Inforiver Matrix formulas.',
        'Contributed Power BI utilities for Microsoft Project parsing and reusable report themes.',
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
        'Five-person team developing deepfake detection across compression, blur, color variation, and multi-identity video.',
      highlights: [
        'Led the PyTorch detector implementation and evaluation across varied video conditions.',
        'Added blur, compression, and color-jitter augmentation; tested MINTIME on multi-identity videos.',
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
        'Student-management and gamified learning products with conversational assistance.',
      highlights: [
        'Built Next.js and Node.js portal features for class tracking and onboarding.',
        'Added GPT-based learning assistants and improved conversation flow and response latency.',
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
        'Applied-ML internship spanning design image generation, issue resolution, and edge vision.',
      highlights: [
        'Built a React/FastAPI Stable Diffusion app and contributed model fine-tuning.',
        'Built a GPT-4 issue-resolution prototype and deployed YOLOv8 soot detection on a Jetson Nano.',
      ],
    },
  ],
  projects: [
    {
      id: 'aura',
      title: 'AURA: Adapting Daily Routines to Extreme Heat',
      period: 'Apr 2026 to Present',
      kind: 'research',
      summary:
        'AURA is a simulation project studying how daily routines change during extreme heat. It combines observed time-use patterns with language-model activity proposals to test what the model adds.',
      approach:
        'The system combines American Time Use Survey (ATUS) time-slot priors and activity transitions with four LLM proposals. A K-validation controller scores proposals before execution and keeps the chosen plan separate from the action executed.',
      contribution:
        'I built the controller that scores candidate activities before the simulator runs them, and I’m evaluating it on heatwave scenarios.',
      tags: ['Python', 'vLLM', 'LLM Agents', 'Simulation', 'Evaluation'],
      evidence: [
        'Matched runs compare the simulator with and without model input.',
        'The heatwave target is withheld from the simulator and used only for post-run evaluation.',
      ],
      status: 'Ongoing evaluation',
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      kind: 'research',
      summary:
        'This collaborative RAG study tests whether a downstream agent’s decision changes when it receives another agent’s saved context. It compares text re-prefill and KV-cache transfer with matched perturbation controls.',
      approach:
        'The pipeline compares FP16 cache transfer, INT4 round trips, and matched Gaussian and dropout controls across three models and two datasets.',
      contribution:
        'I helped build the LangGraph pipeline and analyze decision-level effects, including the controls needed to test whether INT4 itself was responsible.',
      tags: ['Python', 'PyTorch', 'LangGraph', 'RAG', 'KV Cache'],
      evidence: [
        'Cache transfer changed downstream decisions, but final-answer scores (EM/F1) stayed flat.',
        'Matched Gaussian and dropout controls tied or beat INT4 in most comparisons, pointing to perturbation magnitude rather than INT4 itself.',
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
      summary:
        'A controlled text-to-SQL decoder uses grammar- and schema-aware search on the opening SQL prefix, then greedily completes the query.',
      approach:
        'The hybrid decoder uses grammar- and schema-aware Monte Carlo tree search (MCTS) for the opening SQL prefix, then greedy decoding completes the query. Oracle and deployable settings are evaluated separately.',
      contribution:
        'I implemented the hybrid decoder and evaluation harness in a fork of the upstream project, keeping oracle and deployable paths distinct.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'SPIDER'],
      evidence: [
        'The benchmark keeps SMC, oracle MCTS, and deployable non-oracle MCTS separate.',
        'The decoder searches the first 6–10 SQL tokens before greedy completion.',
      ],
      status: 'Evaluation in progress',
    },
    {
      id: 'notchnest',
      title: 'NotchNest',
      period: '2026',
      kind: 'build',
      summary:
        'NotchNest is a native macOS app that brings music controls, calendar events, and everyday utilities to the MacBook notch.',
      approach:
        'Native AppKit and SwiftUI panels expand on demand and respond to system events and permissions, keeping the accessory compact until more detail is needed.',
      contribution:
        'I designed and built the app in Swift 6, AppKit, and SwiftUI, including its native integrations, permission flows, and event-driven state changes.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      evidence: [
        'The app coordinates media, calendar, camera, audio, and login-item integrations through native APIs and permission flows.',
      ],
    },
    {
      id: 'lumel-json-editor',
      title: 'Collaborative JSON Editor at Lumel',
      period: 'Mar to Jun 2025',
      kind: 'build',
      scope: 'professional',
      summary:
        'A collaborative JSON editor for analytics authoring, built with React, Node.js, and WebSockets to keep shared configuration synchronized.',
      approach:
        'React shared state pairs with a Node.js and WebSocket synchronization layer for collaborative analytics authoring.',
      contribution:
        'I built the editor’s shared-state and synchronization flows during my Lumel Technologies internship.',
      tags: ['React', 'Node.js', 'WebSockets', 'TypeScript'],
      evidence: [
        'Shipped as part of Lumel Technologies’ analytics authoring and collaboration workflow.',
      ],
      status: 'Lumel Technologies',
    },
    {
      id: 'haze-removal',
      title: 'Dense Non-Homogeneous Haze Removal',
      period: 'Jan to Apr 2024',
      kind: 'research',
      summary:
        'A compact image-restoration model that removes dense, uneven haze under a four-hour training budget.',
      approach:
        'A compact ResNet U-Net with histogram equalization balanced restoration quality with the challenge’s training budget and practical per-image inference.',
      contribution:
        'I built and trained the restoration pipeline and prepared the submitted model under the four-hour budget.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      evidence: [
        'Placed 16th out of 128 challenge submissions.',
        'The submitted model reported 14.4 dB PSNR after about four hours of training.',
        'Kept the architecture small enough for practical per-image inference.',
      ],
      status: 'Challenge result',
    },
    {
      id: 'krypton',
      title: 'Krypton: Financial Investigation Dashboard',
      period: 'Jan to Mar 2024',
      kind: 'build',
      summary:
        'Krypton is a team-built fraud-investigation app that combines transaction anomaly scoring, phishing checks, IP lookup, and an analyst dashboard.',
      approach:
        'The React and Node.js prototype connects model predictions and external signals in one investigation view.',
      contribution:
        'I built the investigation models and frontend integration; teammates handled the API and storage layers.',
      tags: ['Python', 'React', 'Node.js', 'MongoDB', 'ML'],
      evidence: [
        'Won the Encryptcon Shaastra Hackathon organized with IIT Madras and Temenos.',
        'Delivered an end-to-end prototype for tracing fraud signals.',
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
        'Coauthored research combining retrieval with compiler diagnostics, CodeQL, and KLEE to evaluate secure C/C++ generation across 3,242 programs from DeepSeek-Coder-1.3B and CodeLlama-7B.',
      link: 'https://arxiv.org/abs/2601.00509',
      linkLabel: 'Read the paper',
      status: 'Coauthored preprint',
    },
  ],
  skills: [
    {
      id: 'research',
      category: 'Research & ML systems',
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
      category: 'Software & product',
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
