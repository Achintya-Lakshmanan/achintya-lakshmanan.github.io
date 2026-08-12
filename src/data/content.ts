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
    'If the work here sparked an idea—whether it is a research collaboration, an engineering opportunity, or a useful tool worth building—I’d love to hear from you.',
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
    { label: 'Exploring', href: '#exploring' },
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
      context:
        'Two collaborative research efforts examine how external structure changes LLM-agent behavior: one grounds simulated daily decisions in real activity data, while the other studies what passes between RAG agents when they share model state.',
      highlights: [
        'For AURA, I built and evaluate a K-validation controller that scores four LLM proposals alongside ATUS time-slot priors and transitions, with policy selections and execution analyzed separately.',
        'For the multi-agent RAG study, I help analyze what a downstream judge inherits through shared KV caches, using matched perturbation controls to test the mechanism rather than crediting one compression format.',
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
        'The role supports CMPSC 461 and CMPSC 311 instruction and extends into undergraduate honors mentoring on secure code generation.',
      highlights: [
        'I prepare course questions, hold office hours, and help students work through assignments and projects.',
        'I mentor secure-coding work and support its experimental design and analysis.',
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
        'The lab projects explored medical-image reconstruction and segmentation where observations are sparse, noisy, or low contrast.',
      highlights: [
        'I built and evaluated a Mamba-enhanced NeRF pipeline for reconstructing 3D bone structure from a single X-ray.',
        'For a fetal-ultrasound challenge, I tested Semi-Mamba and a mutual-learning VMUNet variant on noisy, low-contrast scans.',
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
        'The lab was developing Tamil speech systems and voice transcreation for educational material, where naturalness and usable inference mattered alongside model quality.',
      highlights: [
        'I built Tamil text-to-speech and voice-cloning experiments with encoder-decoder and Tacotron models.',
        'I contributed to voice transcreation for IIT online courses.',
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
        'The product work focused on making analytics workflows easier to author and share, from natural-language formula creation to collaborative configuration and Power BI utilities.',
      highlights: [
        'I built a TypeScript RAG assistant that translated natural-language requests into Inforiver Matrix formulas.',
        'I built a collaborative JSON editor with React, Node.js, and WebSockets, including real-time shared state and multi-user testing.',
        'I contributed Power BI utilities for parsing Microsoft Project data and generating reusable report themes.',
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
        'A five-person team developed a deepfake-detection pipeline designed to remain useful across compression, blur, color variation, and videos containing multiple identities.',
      highlights: [
        'I led the team’s implementation and evaluation of the PyTorch detector.',
        'I added blur, compression, and color-jitter augmentation and tested MINTIME on multi-identity videos.',
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
        'The product connected day-to-day student management with a gamified learning experience and in-product conversational assistance.',
      highlights: [
        'I built parts of the student-management portal in Next.js and Node.js, including class tracking and onboarding.',
        'I added GPT-based assistants to the learning product and worked on conversation flow and response latency.',
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
        'The internship spanned three applied-ML products: image generation for design workflows, GPT-assisted issue resolution, and edge vision for industrial monitoring.',
      highlights: [
        'I built a React and FastAPI image-generation application around Stable Diffusion and worked on model fine-tuning.',
        'I built a GPT-4 issue-resolution prototype and deployed a YOLOv8 soot detector on a Jetson Nano.',
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
      status: 'Private research repository',
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      kind: 'research',
      question:
        'When one RAG agent hands its KV cache to a downstream judge, does the judge inherit a decision bias along with the saved context?',
      approach:
        'This collaborative study follows context through a multi-agent RAG pipeline across three models and two datasets. It compares ordinary text re-prefill with FP16 cache transfer, INT4 round trips, and matched-noise controls to separate cache sharing from the perturbations introduced by compression.',
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
        'The project extends genlm/genlm-control with a hybrid decoder: grammar- and schema-aware MCTS searches the high-leverage SQL prefix, then greedy decoding completes the query. Oracle and deployable settings are evaluated separately.',
      contribution:
        'Working in a fork of the upstream project, I implemented the hybrid decoder, bounded its parser cache, and replaced memory-heavy rollouts with a heuristic for the current evaluation harness.',
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
      approach:
        'NotchNest is a native macOS 14+ accessory that turns the notch into compact and expanded surfaces for music, meetings, files, weather, timers, and a camera mirror. It is designed to feel like part of the system rather than another floating dashboard.',
      contribution:
        'I designed and built the app in Swift 6, AppKit, and SwiftUI, including its native integrations, permission flows, and event-driven state changes.',
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
        'I contributed across the ML and application stack as the team integrated the random-forest model, APIs, storage, and analyst-facing interface.',
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
