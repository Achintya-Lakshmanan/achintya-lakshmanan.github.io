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
  /** Optional external link (e.g. arXiv paper, GitHub). */
  link?: string
  linkLabel?: string
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
  aboutResearch: string
  aboutSoftware: string
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
  taglineRoles: ['Full-Stack Developer', 'LLM Researcher'],
  bio: 'MS student at Penn State interested in LLM and reinforcement learning research. I like building efficient learning systems that improve reasoning and decision-making, and I also ship full-stack software across research and industry.',
  aboutResearch:
    'I want to work on problems at the intersection of large language models and reinforcement learning: better reasoning, alignment, and agents that can plan and adapt in the real world. My recent research spans multi-agent RAG, LLM-driven behavioral simulation, and inference-time search, but I am not locked into one niche. I follow interesting problems wherever they lead.',
  aboutSoftware:
    'Alongside research, I have spent a lot of time building production software. At Lumel I shipped an LLM-powered RAG system in TypeScript, a real-time collaborative JSON editor with React, Node.js, and WebSockets, and Power BI tooling used by enterprise customers. Earlier roles covered Next.js portals, FastAPI backends, and ML apps from prototype to deployment. I am comfortable owning features end to end.',
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
        'Building LLM agents that simulate urban heatwave behavior on AgentSociety, grounded in demographic activity data.',
        'Working on LLM activation steering for hallucination mitigation, evaluating methods like ODESteer and Spherical Steering on thinking-mode models.',
        'Studying attention bias from KV-cache transfer in multi-agent RAG.',
        'Developing MCTS-based decoding for controlled Text-to-SQL generation.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 to Present',
      category: 'research',
      logo: '/logos/psu.png',
      link: 'https://arxiv.org/abs/2601.00509',
      linkLabel: 'arXiv:2601.00509',
      highlights: [
        'Mentor students in secure coding through question preparation, office hours, and project help sessions, supporting implementation, evaluation design, and experimental analysis.',
        '[Secure Code Generation](https://arxiv.org/abs/2601.00509): Benchmarked DeepSeek and CodeLlama on 4,000 C/C++ prompts; tracked compilation failures, CWE-based security vulnerabilities, and semantic correctness. Implemented a RAG remediation pipeline that reduced failures by 20% (compilation), 35% (security), and 55% (semantic).',
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
        '3D Reconstruction from Single X-Ray Images: Developed a novel NeRF-based 3D reconstruction pipeline enhanced with Mamba modules, significantly improving reconstruction fidelity and efficiency over state-of-the-art methods such as 3DGS and GAMBA. Achieved PSNR of 28.538 and LPIPS of 0.309 on clinically relevant datasets, enabling accurate 3D bone structure recovery from single X-rays.',
        'Fetal Ultrasound Grand Challenge (FUGC): Experimented with semi-supervised segmentation models, including Semi-Mamba and a custom designed VMUNet variant with mutual learning, to address the challenges of noisy and low-contrast fetal ultrasound images. Incorporated attention mechanisms and multi-scale supervision to enhance feature learning. Achieved PSNR of 14.3 and accuracy of 96%.',
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
        'Investigated and deployed Encoder-Decoder Architectures for Text-To-Speech Systems for Tamil Language.',
        'Deployed a Tacotron-based voice cloning architecture for Tamil text-to-speech, optimizing inference latency to deliver natural voice generation within a <5-second threshold.',
        'Researched Voice Transcreation for IIT Online Courses, obtained a naturalness score of about 3.5.',
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
        'Built LLM-powered RAG system in TypeScript automating formula creation in Inforiver Matrix, reducing manual effort by 70%.',
        'Developed real-time collaborative JSON editor with React, Node.js, WebSockets, enabling 30+ concurrent users.',
        'Optimized MS Project to Power BI parser in TypeScript, accelerating enterprise data integration by 40%.',
        'Engineered automated Power BI theme generator using TypeScript, reducing report customization time by 50%.',
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
        'Led a 5-member team to deliver deepfake detection in Python + PyTorch with 91% accuracy and 5s inference time.',
        'Applied MINTIME framework for multi-identity detection and generated high-fidelity deepfakes using DeepFaceLab (PSNR 34.5 dB).',
        'Implemented data augmentation pipeline (blurring, compression, color jitter) in PyTorch, boosting F1 score by 22%.',
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
        'Developed student management portal in Next.js + Node.js, enabling seamless class tracking and user onboarding.',
        'Integrated GPT-based assistants into a gamified learning platform, optimizing conversational responsiveness and enhancing student engagement.',
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
        'Developed UI image generation app with React + Stable Diffusion and FastAPI, improving design quality by 40%.',
        'Fine-tuned diffusion models in PyTorch using HuggingFace to generate images in <5s.',
        'Built GPT-4 powered resolution app with React + FastAPI, improving employee issue turnaround efficiency by 20%.',
        'Deployed YOLOv8 soot detection model (98% accuracy @25 FPS) on NVIDIA Jetson Nano for real-time monitoring.',
      ],
    },
  ],
  projects: [
    {
      id: 'aura',
      title: 'AURA: LLM Agents for Urban Disaster Simulation',
      period: 'Apr 2026 to Present',
      description:
        'Simulating how people behave during urban heatwaves with LLM agents on AgentSociety. Instead of asking the model what to do at every timestep, we treat behavior as planning: the LLM proposes, and data-grounded world models plus validators keep day-long schedules coherent.',
      tags: ['Python', 'LLMs', 'Agents', 'Planning', 'Simulation'],
      highlights: [
        'Plan-as-edit: revise normal-day ATUS skeletons with constrained edits under disaster context',
        'Planning loops with transition validators and empirical activity priors across demographic segments',
        'Structure over scale: small local models with external validation close the gap to larger API agents',
      ],
    },
    {
      id: 'attention-bias-rag',
      title: 'Attention Bias in Multi-Agent RAG',
      period: 'Feb 2026 to Present',
      description:
        'In multi-agent RAG, agents can share KV-cache instead of re-encoding text. We studied whether that transfer biases the downstream judge ("memory infection"), and whether perturbing the cache can undo the bias across Llama-3, Mistral, and Qwen2 on HotpotQA and Natural Questions.',
      tags: ['Python', 'PyTorch', 'LLMs', 'RAG', 'Quantization'],
      highlights: [
        'Memory infection in 5/6 model x dataset settings (up to +0.38 approval shift on NQ)',
        'INT4 cache noise rescues biased decisions (net repair +0.09 to +0.41 across all 6 cells)',
        'Matched-magnitude noise works too: the rescue is about noise strength, not INT4 itself',
      ],
      link: 'https://github.com/vivek032001/Quantized-KV-Cache-Transfer-for-Multi-Agent-RAG',
    },
    {
      id: 'mcts-llm',
      title: 'Monte Carlo Tree Search for Controlled LLM Text Generation',
      period: 'Feb to May 2026',
      description:
        'Text-to-SQL needs globally valid queries, but standard decoding is myopic. We treat generation as search: MCTS plans the high-leverage SQL prefix under grammar and schema constraints, then greedy decoding finishes the rest.',
      tags: ['Python', 'PyTorch', 'MCTS', 'Text-to-SQL', 'LLMs'],
      highlights: [
        '12.6% exact-match vs 6.4% SMC baseline on 500 SPIDER prompts (+97% relative)',
        '70.2% correct column usage and 79.8% correct table usage',
        'AWRS-constrained rollouts keep simulations syntactically valid during search',
      ],
    },
    {
      id: 'haze-removal',
      title: 'Dense Non-Homogeneous Haze Removal',
      period: 'Jan to Apr 2024',
      description:
        'Computer vision challenge entry for removing dense, non-homogeneous haze from images. Built a lightweight ResNet-based U-Net aimed at strong reconstruction quality without a heavy training or inference budget.',
      tags: ['Python', 'PyTorch', 'Computer Vision', 'U-Net'],
      highlights: [
        'Ranked 16 out of 128 submissions worldwide',
        'PSNR of 14.4 dB after about 4 hours of training',
        'Inference under 5 seconds on the lightweight ResNet U-Net',
      ],
    },
    {
      id: 'krypton',
      title: 'Krypton: Financial Transaction Anomaly Detection',
      period: 'Jan to Mar 2024',
      description:
        'End-to-end fraud system for Encryptcon Shaastra (IIT Madras + Temenos): real-time transaction scoring, spam/phishing protection, and IP geolocation for investigation.',
      tags: ['Python', 'React', 'Node.js', 'MongoDB', 'ML'],
      highlights: [
        'Winner of Encryptcon Shaastra, outperforming 400+ teams',
        'Random-forest anomaly detection at 99% accuracy with under 5s latency',
        'Spam and phishing mobile app at 98% accuracy',
        'IP geolocation tracker localizing anomalous transactions within 1s',
      ],
      link: 'https://github.com/Achintya-Lakshmanan/Technica_LAVA',
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
