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
}

export type ExperienceCategory = 'research' | 'industry'

export interface Experience {
  id: string
  title: string
  organization: string
  period: string
  category: ExperienceCategory
  highlights: string[]
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
}

export interface SiteContent {
  name: string
  shortName: string
  email: string
  taglineRoles: string[]
  bio: string
  location: string
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
      highlights: [
        'Designing RL-based agent behaviors for urban disaster simulations — reward functions for evacuation, information seeking, and resource allocation under uncertainty.',
        'Integrating real-world urban data, behavioral priors, and psychological theory into interpretable agent simulations.',
      ],
    },
    {
      id: 'psu-la',
      title: 'Learning Assistant',
      organization: 'Pennsylvania State University',
      period: 'Sep 2025 – Present',
      category: 'research',
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
      highlights: [
        'UI image generation app (React + Stable Diffusion + FastAPI) with fine-tuned diffusion models under 5s generation.',
        'GPT-4 resolution app; YOLOv8 soot detection (98% accuracy @ 25 FPS) on Jetson Nano.',
      ],
    },
  ],
  projects: [
    {
      id: 'kv-cache-rag',
      title:
        'Mitigating Inherited Attention Bias in Multi-Agent RAG via Quantized KV Cache Transfer',
      period: 'Feb 2026 – Present',
      description:
        'INT4 quantization during KV-cache transfer between agents as a regularizer. Benchmarked Llama 3 8B, Qwen2 7B, and Mistral 7B — +15% accuracy and +8% JCR on Natural Questions.',
      tags: ['Python', 'PyTorch', 'LLMs', 'RAG', 'Quantization'],
      highlights: [
        '+15% accuracy on Natural Questions',
        '+8% JCR improvement',
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
    },
    {
      id: 'soft-computing',
      title: 'Gold + Elite Top 2%',
      detail: 'Intro to Soft Computing — IIT Kharagpur',
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
