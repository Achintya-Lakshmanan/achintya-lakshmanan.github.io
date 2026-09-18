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
    'I’m interested in software engineering, ML, and research engineering roles. If your team works on LLMs, reinforcement learning, or useful software, I’d love to hear about it.',
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
        'Research on LLM-driven behavior in daily-routine simulations and context sharing between retrieval-augmented generation (RAG) agents.',
      highlights: [
        'Built AURA’s controller to score four proposed activities against American Time Use Survey patterns, with separate records of selected plans and executed actions.',
        'Helped build LangGraph experiments comparing text-based context sharing with KV-cache transfer, using quantization and matched-noise controls to study downstream decisions.',
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
        'Support undergraduate computing students through office hours, concept explanations, and project guidance.',
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
        'Medical-imaging research on reconstructing 3D anatomy from limited views and segmenting noisy, low-contrast ultrasound images.',
      highlights: [
        'Built and evaluated a Mamba-enhanced neural radiance field (NeRF) pipeline for reconstructing 3D bone structure from a single X-ray.',
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
        'Built text-to-speech and voice-cloning experiments using encoder–decoder architectures and Tacotron models.',
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
        'Developed a TypeScript RAG assistant for Inforiver Matrix formula generation and a React/Node.js JSON editor with WebSocket synchronization.',
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
      title: 'AURA: Adapting Daily Routines to Extreme Heat',
      period: 'Apr 2026 to Present',
      kind: 'research',
      summary:
        'AURA simulates how daily routines change during extreme heat, combining observed human activity patterns with LLM-generated plans. It tests whether model input changes behavior beyond what the data-driven simulator already produces.',
      approach:
        'The controller scores four proposed activities against time-of-day activity probabilities and transitions from the American Time Use Survey (ATUS). It records selected plans separately from executed actions to distinguish model choices from simulator behavior.',
      contribution:
        'I built the activity-scoring controller and am evaluating how its selected plans translate into simulated behavior during heatwaves.',
      tags: ['Python', 'vLLM', 'LLM Agents', 'Simulation', 'Evaluation'],
      evidence: [
        'Ongoing evaluation compares matched runs with and without LLM input to isolate the model’s contribution.',
        'Heatwave behavior is assessed after each run against an evaluation target withheld from the simulator.',
      ],
      status: 'Ongoing evaluation',
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      kind: 'research',
      summary:
        'A collaborative study of how context sharing affects decisions in multi-agent question answering. It compares passing context as text with transferring an agent’s cached attention state—the key–value (KV) cache—to the next agent.',
      approach:
        'Across three models and two datasets, the pipeline compares text re-prefill, FP16 cache transfer, and INT4 quantization round trips. Matched Gaussian-noise and dropout controls test whether effects come from quantization specifically or from perturbing the cache.',
      contribution:
        'I helped build the LangGraph experiment pipeline, implement comparison controls, and analyze changes in downstream agent decisions.',
      tags: ['Python', 'PyTorch', 'LangGraph', 'RAG', 'KV Cache'],
      evidence: [
        'Cache transfer changed downstream decisions, but final-answer exact-match and F1 scores stayed flat.',
        'Matched noise and dropout controls tied or beat INT4 in most comparisons, so the observed effects were not unique to INT4 quantization.',
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
        'A text-to-SQL decoder that concentrates search on the first few query tokens, where early choices shape the rest of the SQL. Grammar and database-schema constraints guide this search before ordinary greedy decoding takes over.',
      approach:
        'Monte Carlo tree search (MCTS) explores candidate continuations for the first 6–10 SQL tokens under grammar and schema constraints. Greedy decoding completes the query. The evaluation separates oracle-assisted search from the non-oracle configuration intended for deployment.',
      contribution:
        'I implemented the hybrid search/greedy decoder and evaluation harness in an upstream-project fork, with separate oracle and non-oracle test paths.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'SPIDER'],
      evidence: [
        'Evaluation compares decoding baselines and keeps oracle-assisted results separate from deployable settings; final benchmarking is in progress.',
        'Search is limited to the first 6–10 SQL tokens rather than applied throughout query generation.',
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
        'AppKit and SwiftUI power expandable native panels. System events drive state updates across media, calendar, and other utilities, while permission flows govern access to protected macOS services.',
      contribution:
        'I designed and built the Swift 6 app, from its native interface to system integrations, permission handling, and event-driven state management.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      evidence: [
        'Integrates media, calendar, camera, audio, and launch-at-login features in one native macOS utility.',
      ],
    },
    {
      id: 'lumel-json-editor',
      title: 'Collaborative JSON Editor at Lumel',
      period: 'Mar to Jun 2025',
      kind: 'build',
      scope: 'professional',
      summary:
        'A collaborative editor for the JSON configuration behind analytics reports. Multiple users work on shared configuration, with changes synchronized through a React interface and Node.js WebSocket layer.',
      approach:
        'React manages the editing interface and client-side state; a Node.js WebSocket layer carries updates between connected sessions. The shared-state and synchronization flows keep the editor aligned with incoming changes.',
      contribution:
        'I implemented the editor’s shared-state logic and synchronization flows, connecting collaborative editing behavior across the frontend and backend.',
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
        'An image-restoration pipeline for dense, uneven haze, pairing a compact ResNet U-Net with histogram equalization. The model was developed for a challenge with a four-hour training budget.',
      approach:
        'The pipeline combines histogram equalization for contrast adjustment with a compact ResNet U-Net for learned image restoration. Model development and training were constrained by the challenge’s four-hour budget.',
      contribution:
        'I implemented the restoration pipeline, trained the model within the fixed budget, and prepared the challenge submission.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      evidence: [
        'Placed 16th out of 128 challenge submissions, with a reported 14.4 dB peak signal-to-noise ratio (PSNR).',
        'The submitted model was trained in approximately four hours.',
      ],
      status: 'Challenge result',
    },
    {
      id: 'krypton',
      title: 'Krypton: Financial Investigation Dashboard',
      period: 'Jan to Mar 2024',
      kind: 'build',
      summary:
        'Krypton is a team-built financial-fraud prototype combining transaction classification, IP-based location checks, and a companion spam/phishing detection app.',
      approach:
        'A Random Forest uses transaction features, time intervals, and distances between successive locations to identify suspicious activity in a synthetic fraud dataset. A React interface connects to Python inference services, with IP lookups supporting investigation.',
      contribution:
        'I built the fraud-detection models and integrated their predictions into the React frontend; teammates owned the API and storage layers.',
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
        'Coauthored a study of iterative C/C++ code repair using retrieved examples, compiler diagnostics, CodeQL security checks, and KLEE symbolic execution. Tool feedback guides successive revisions, evaluated offline on 3,242 programs generated by DeepSeek-Coder-1.3B and CodeLlama-7B.',
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
