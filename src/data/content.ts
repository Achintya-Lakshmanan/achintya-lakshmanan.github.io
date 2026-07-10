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

export type ExperienceCategory = 'research' | 'industry'

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
  description: string
  tags: string[]
  highlights?: string[]
  link?: string
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
  shortName: string
  email: string
  taglineRoles: string[]
  bio: string
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
  shortName: 'Achintya',
  email: 'aql6062@psu.edu',
  location: 'University Park, PA',
  photo: '/me.jpg',
  taglineRoles: [
    'LLM + RL Researcher',
    'ML Engineer',
    'Full-Stack Developer',
    'NLP Researcher',
  ],
  bio: 'Aspiring researcher at the intersection of LLMs and reinforcement learning. Focused on designing efficient, robust, scalable learning systems that improve reasoning, decision-making, and real-world adaptability while reducing computational cost. Interested in RL-based alignment and model/data efficiency.',
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
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
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
    },
  ],
  experience: [
    {
      id: 'psu-nlp',
      title: 'Graduate Researcher',
      organization: 'Penn State NLP Group',
      period: 'Apr 2026 – Present',
      category: 'research',
      logo: '/logos/psu.png',
      highlights: [
        'Building LLM-driven generative agent simulations of urban disaster behavior (heatwaves) on the AgentSociety platform, grounded in empirical activity data across demographic segments.',
        'Showed the "structure, not scale" thesis: an 8B model with a data-grounded world model, transition validators, and constrained plan edits closes the gap to 10× larger API models — a 4× larger planner gave no gain, while structural validation did.',
        'Diagnosed and eliminated prompt-salience failure modes (e.g. heat-warning framing flooding agents into unrealistic health behavior) via constrained edit vocabularies over normal-day schedule skeletons.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 – Present',
      category: 'research',
      logo: '/logos/psu.png',
      highlights: [
        'Mentoring students in secure coding practices.',
        'Secure Code Generation (arXiv): benchmarked DeepSeek and CodeLlama on 4,000 C/C++ prompts; RAG remediation pipeline reduced failures by 20% (compilation), 35% (security), and 55% (semantic).',
      ],
    },
    {
      id: 'snu-vip',
      title: 'Research Intern',
      organization: 'Vision and Image Processing Lab, SNU',
      period: 'Aug 2024 – Mar 2025',
      category: 'research',
      highlights: [
        'NeRF-based 3D reconstruction from single X-ray images with Mamba modules (PSNR 28.538, LPIPS 0.309), outperforming 3DGS and GAMBA.',
        'Fetal Ultrasound Grand Challenge: semi-supervised segmentation with Semi-Mamba (custom VMUNet + mutual learning), reaching 96% accuracy.',
      ],
    },
    {
      id: 'snu-speech',
      title: 'Speech Lab Research Intern',
      organization: 'Shiv Nadar University',
      period: 'Sep 2022 – Nov 2022',
      category: 'research',
      highlights: [
        'Built Tacotron-based Tamil TTS voice cloning with under 5s inference.',
        'Voice transcreation for IIT online courses with naturalness ~3.5.',
      ],
    },
    {
      id: 'lumel',
      title: 'Product Developer Intern',
      organization: 'Lumel Technologies',
      period: 'Mar 2025 – Jun 2025',
      category: 'industry',
      logo: '/logos/lumel.svg',
      highlights: [
        'Built an LLM-powered RAG system in TypeScript automating formula creation in Inforiver Matrix (−70% manual effort).',
        'Shipped a real-time collaborative JSON editor (React, Node.js, WebSockets) supporting 30+ concurrent users.',
        'MS Project → Power BI parser (+40% integration speed) and automated Power BI theme generator (−50% customization time).',
      ],
    },
    {
      id: 'phosphene',
      title: 'Deep Learning Intern',
      organization: 'Phosphene AI',
      period: 'May 2024 – Jul 2024',
      category: 'industry',
      logo: '/logos/phosphene.png',
      highlights: [
        'Led a 5-member team building deepfake detection in PyTorch (91% accuracy, 5s inference).',
        'MINTIME multi-identity detection; DeepFaceLab deepfakes (PSNR 34.5 dB); augmentation pipeline (+22% F1).',
      ],
    },
    {
      id: 'culvii',
      title: 'Software Engineering Intern',
      organization: 'Culvii',
      period: 'Feb 2024 – May 2024',
      category: 'industry',
      logo: '/logos/culvii.svg',
      highlights: [
        'Built a student management portal with Next.js and Node.js.',
        'Integrated GPT-based assistants into a gamified learning platform.',
      ],
    },
    {
      id: 'optisol',
      title: 'Machine Learning Intern',
      organization: 'Optisol Business Solutions',
      period: 'May 2023 – Jan 2024',
      category: 'industry',
      logo: '/logos/optisol.png',
      highlights: [
        'UI image generation app (React + Stable Diffusion + FastAPI) with fine-tuned diffusion models under 5s generation.',
        'GPT-4 resolution app; YOLOv8 soot detection (98% accuracy @ 25 FPS) on Jetson Nano.',
      ],
    },
  ],
  projects: [
    {
      id: 'activation-steering',
      title: 'LLM Activation Steering for Hallucination Mitigation',
      period: 'Jul 2026 – Present',
      description:
        'Research collaboration with a Penn State professor (author of FineSteer). Evaluating whether activation-steering methods (ODESteer, Spherical Steering) mitigate hallucination in modern thinking-mode LLMs (Qwen3.5-4B, Gemma-4-E4B-it), fitted from span-annotated hallucination data.',
      tags: ['Python', 'PyTorch', 'vLLM', 'Interpretability'],
      highlights: [
        "Reproduced the ODESteer paper's TruthfulQA benchmark within error bars across 3 seeds (Llama-3.1-8B, Qwen2.5-7B), and Spherical Steering's MC1/MC2/MC3 scores to ~0.1 of the published values.",
        'Found TQA-fit steering yields +22.6 True% on held-out questions for Qwen3.5-4B (+2% accuracy) — gains bound to their fitting domain, not memorization.',
        'Built steering inside vLLM via a worker-extension RPC hook with fail-fast application checks; showed steering strength is absolute and must be rescaled per model (~9× activation-norm differences).',
      ],
    },
    {
      id: 'kv-cache-rag',
      title: 'Quantized KV-Cache Transfer in Multi-Agent RAG',
      period: 'Feb 2026 – Present',
      description:
        'Studied "memory infection" in multi-agent RAG: how transferring a retriever\'s KV-cache biases the evaluator\'s judgments, and whether INT4 (NF4) cache perturbation can rescue those decisions across Llama-3-8B, Mistral-7B, and Qwen2-7B on HotpotQA and Natural Questions.',
      tags: ['Python', 'PyTorch', 'LLMs', 'RAG', 'Quantization'],
      highlights: [
        'Showed memory infection is real: KV-cache transfer biases evaluator judgments in 5/6 model×dataset cells (up to +0.38 approval shift on Natural Questions; n=500/cell, McNemar + bootstrap CIs).',
        'INT4 (NF4) cache perturbation robustly rescues biased decisions (net repair +0.09 to +0.41, significant in 6/6 cells) — matched-magnitude noise controls show the effect is driven by perturbation magnitude, not quantization specifically.',
        'Identified the mechanism: bias concentrates in fragile low-margin decisions that noise preferentially flips back (consistent in 6/6 cells).',
      ],
    },
    {
      id: 'mcts-llm',
      title: 'Monte Carlo Tree Search for Controlled LLM Text Generation',
      period: 'Feb – May 2026',
      description:
        'MCTS decoding for Text-to-SQL generation. Achieved 12.6% exact-match vs 6.4% SMC baseline (+97% relative), with 70.2% column and 79.8% table usage correctness.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'LLMs'],
      highlights: [
        '+97% relative exact-match gain',
        '70.2% column / 79.8% table correctness',
      ],
    },
    {
      id: 'haze-removal',
      title: 'Dense Non-Homogeneous Haze Removal',
      period: 'Jan – Apr 2024',
      description:
        'Lightweight ResNet U-Net for dense haze removal. PSNR 14.4 dB after 4h training with under 5s inference; +20% PSNR from histogram equalization post-processing. Ranked 16/128 worldwide.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      highlights: ['Ranked 16/128 worldwide', '+20% PSNR via post-processing'],
    },
    {
      id: 'krypton',
      title: 'Krypton — Financial Transaction Anomaly Detection',
      period: 'Jan – Mar 2024',
      description:
        'Real-time anomaly detection under 5s latency at 99% accuracy with random forests. Spam/phishing mobile app at 98% accuracy; IP tracking within 1s. Winner of Encryptcon Shaastra Hackathon (IIT Madras + Temenos).',
      tags: ['Python', 'React', 'Node.js', 'MongoDB', 'ML'],
      highlights: [
        'Winner — Encryptcon Shaastra',
        '99% anomaly detection accuracy',
      ],
    },
  ],
  skills: [
    {
      id: 'languages',
      category: 'Languages',
      skills: [
        'Java',
        'Python',
        'C/C++',
        'SQL',
        'JavaScript',
        'TypeScript',
        'Go',
        'R',
      ],
    },
    {
      id: 'tools',
      category: 'Tools',
      skills: ['Git', 'VS Code', 'Visual Studio', 'Tableau', 'Power BI'],
    },
    {
      id: 'libraries',
      category: 'Libraries',
      skills: [
        'PyTorch',
        'TensorFlow',
        'LangChain',
        'Scikit-Learn',
        'Pandas',
        'NumPy',
        'Matplotlib',
        'OpenCV',
        'MediaPipe',
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
      detail: 'Intro to Soft Computing — IIT Kharagpur',
      organization: 'IIT Kharagpur',
      logo: '/logos/iitkgp.png',
    },
    {
      id: 'accel-ai',
      title: 'Silver + Elite Top 5%',
      detail: 'Applied Accelerated AI — IIT Palakkad',
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
