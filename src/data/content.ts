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
  question: string
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

export interface CurrentThread {
  status: string
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
  researchArtifacts: ResearchArtifact[]
  skills: SkillGroup[]
  achievements: Achievement[]
}

export const content: SiteContent = {
  name: 'Achintya Lakshmanan',
  email: 'aql6062@psu.edu',
  location: 'University Park, PA',
  photo: '/me.jpg',
  positioning: 'Software engineer and ML researcher.',
  bio: 'I’m a Graduate Researcher and MS CSE student at Penn State. My work spans full-stack applications, native macOS tools, and research on language-model systems.',
  currentThreads: [
    {
      status: 'Evaluating',
      label: 'Data-grounded agent planning',
      text: 'Testing whether real activity patterns can keep simulated decisions plausible—and whether AURA’s evaluation can separate adaptation from routine.',
    },
    {
      status: 'Investigating',
      label: 'Shared context, inherited bias',
      text: 'Studying what a downstream RAG agent picks up when collaborators share KV caches or other altered forms of context.',
    },
    {
      status: 'Building',
      label: 'Search-time constrained decoding',
      text: 'Using grammar-aware MCTS to spend extra compute on the early choices that can make or break a structured answer.',
    },
  ],
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
      title: 'AURA: Data-Grounded Agents for Heatwave Simulation',
      period: 'Apr 2026 to Present',
      kind: 'research',
      question:
        'Can an agent model heatwave adaptation without mistaking ordinary daily structure for evidence that the LLM adapted?',
      approach:
        'AURA is a collaborative simulation effort that combines LLM activity proposals with American Time Use Survey priors and transition structure. The system keeps policy selection separate from executed actions so evaluation can distinguish a model-driven change from ordinary routine.',
      contribution:
        'I built the ATUS-grounded K-validation and evaluation pipeline: at each decision, it scores four model proposals against the time-slot prior and preceding-activity transition.',
      tags: ['Python', 'vLLM', 'LLM Agents', 'Simulation', 'Evaluation'],
      evidence: [
        'Matched controls compare the same controller with and without LLM proposals.',
        'In the adaptation arm, the heatwave target is withheld from the simulator and used only after the run for evaluation.',
        'The next evaluation is a preregistered paired, multi-seed pilot; no pilot result is reported yet.',
      ],
      status: 'Pilot pending',
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      kind: 'research',
      question:
        'When one retrieval agent hands its saved key-value (KV) cache to a downstream judge, does the judge inherit a decision bias along with the saved context?',
      approach:
        'This collaborative study follows context through a multi-agent retrieval-augmented generation (RAG) pipeline across three models and two datasets. It compares ordinary text re-prefill with FP16 cache transfer, INT4 round trips, and matched-noise controls to separate cache sharing from the perturbations introduced by compression.',
      contribution:
        'I helped build the LangGraph pipeline and analyze the decision-level effects, including the controls needed to test whether INT4 itself was responsible.',
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
      approach:
        'The project extends genlm/genlm-control with a hybrid decoder: grammar- and schema-aware Monte Carlo tree search (MCTS) explores the high-leverage SQL prefix, then greedy decoding completes the query. Oracle and deployable settings are evaluated separately.',
      contribution:
        'Working in a fork of the upstream project, I implemented the hybrid decoder and evaluation harness, keeping grammar/schema-valid search and oracle versus deployable paths distinct.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'SPIDER'],
      evidence: [
        'The benchmark separates SMC, oracle MCTS, and deployable non-oracle MCTS instead of mixing gold-assisted and test-time settings.',
        'The decoder explores the first 6–10 SQL tokens before greedy completion, where early schema or structural mistakes can compound.',
        'End-to-end metrics are being regenerated under a clean harness; the deprecated result table is not used here.',
      ],
      status: 'Evaluation in progress',
    },
    {
      id: 'notchnest',
      title: 'NotchNest',
      period: '2026',
      kind: 'build',
      question:
        'The MacBook notch takes permanent screen space. Could it become a useful, quiet HUD instead?',
      approach:
        'NotchNest is a native macOS 14+ accessory that turns the notch into compact and expanded surfaces for music, meetings, files, weather, timers, and a camera mirror. It is designed to feel like part of the system rather than another floating dashboard.',
      contribution:
        'I designed and built the app in Swift 6, AppKit, and SwiftUI, including its native integrations, permission flows, and event-driven state changes.',
      tags: ['Swift 6', 'AppKit', 'SwiftUI', 'macOS'],
      evidence: [
        'System integrations are event-driven where timing matters, including Bluetooth connect and disconnect notifications.',
        'The app coordinates native panels, permissions, media controls, EventKit, IOKit, CoreAudio, and login-item behavior.',
        'Native permission flows cover the camera, media, calendar, and login-item surfaces used by the accessory.',
      ],
    },
    {
      id: 'lumel-json-editor',
      title: 'Collaborative JSON Editor at Lumel',
      period: 'Mar to Jun 2025',
      kind: 'build',
      scope: 'professional',
      question:
        'Could analytics teams edit and share structured configuration together without losing track of changes?',
      approach:
        'A React editor paired with Node.js and WebSockets to keep JSON configuration synchronized for collaborative analytics authoring.',
      contribution:
        'I built the editor’s shared-state and synchronization flows in React, Node.js, and WebSockets.',
      tags: ['React', 'Node.js', 'WebSockets', 'TypeScript'],
      evidence: [
        'Professional product work completed during my Lumel Technologies internship.',
        'Built the editor as part of the team’s analytics authoring and collaboration workflow.',
      ],
      status: 'Lumel Technologies',
    },
    {
      id: 'haze-removal',
      title: 'Dense Non-Homogeneous Haze Removal',
      period: 'Jan to Apr 2024',
      kind: 'research',
      question:
        'How much restoration quality can a compact vision model recover under a four-hour challenge training budget?',
      approach:
        'This challenge entry targeted dense, uneven haze with a compact ResNet U-Net and histogram equalization, balancing restoration quality against a tightly limited training run and practical per-image inference.',
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
      question:
        'Could one investigation view bring transaction anomalies, phishing signals, and network context together for a hackathon analyst?',
      approach:
        'Krypton was a team-built hackathon prototype that combined transaction anomaly scoring, spam and phishing checks, IP lookup, and a React and Node.js investigation dashboard in one end-to-end workflow.',
      contribution:
        'I contributed to model building and frontend integration while the team connected APIs, storage, and the analyst-facing workflow.',
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
  researchArtifacts: [
    {
      id: 'secure-code-generation',
      title: 'Improving LLM-Assisted Secure Code Generation through Retrieval-Augmented Generation and Multi-Tool Feedback',
      period: 'arXiv · 2026',
      summary:
        'Coauthored research combining retrieval with compiler diagnostics, CodeQL, and KLEE. The study evaluates 3,242 generated programs from DeepSeek-Coder-1.3B and CodeLlama-7B in a controlled offline C/C++ benchmark.',
      link: 'https://arxiv.org/abs/2601.00509',
      linkLabel: 'Read the paper',
      status: 'Coauthored preprint · individual contributions in paper',
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
