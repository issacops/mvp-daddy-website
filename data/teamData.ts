// Team member data for MVP Daddy

export interface TeamMember {
    id: string;
    role: string;
    name: string;
    tagline: string;
    yearsActive: number;
    projectsCompleted: number;
    philosophy: string;
    bio: string[];
    expertise: Array<{ area: string; level: number }>;
    approach: Array<{ title: string; description: string }>;
    timeline: Array<{
        year: number;
        project: string;
        impact: string;
        tech: string[];
    }>;
    image?: string;
}

export const teamMembers: Record<string, TeamMember> = {
    issac_jacob: {
        id: "issac_jacob",
        image: "/assets/team/issac_jacob.jpg",
        role: "Co-founder & AI Engineer",
        name: "Issac Jacob",
        tagline: "Technically-driven product builder who turns bold ideas into robust, scalable products",
        yearsActive: 4,
        projectsCompleted: 12,
        philosophy: "Engineering isn't just about writing code—it's about architecting experiences that scale, perform, and delight. I build at the intersection of AI, product strategy, and user experience, bringing technical depth and a founder's mindset to every challenge.",
        bio: [
            "At Deepgram Aura, engineered real-time, production-grade voice agents by integrating Aura's TTS and STT pipelines with NLP systems. Built conversational flows handling thousands of concurrent sessions, leveraged Aura-2's sub-200ms latency for real-time responsiveness, and created brand-fit voice personas from 40+ professional voices.",
            "Architected cheapeth.org, a low-cost Ethereum bridge integrating smart contracts, real-time transaction verification, and analytics dashboards handling millions of micro-transactions.",
            "Led UX optimizations at Aviyel, designing onboarding flows and analytics dashboards that increased contributor engagement by 30%+.",
            "Built the AI habit recommendation engine for HabitX, ingesting behavioral data and generating personalized plans for 100+ students simultaneously with real-time teacher dashboards.",
            "Oversaw full-stack MVPs for multiple startups at MVP Foundry, from backend APIs and orchestration to frontend UX, ensuring products were fast, scalable, and technically sound."
        ],
        expertise: [
            { area: "AI & Voice Engineering", level: 94 },
            { area: "Full-Stack Development", level: 92 },
            { area: "Web3 & Blockchain", level: 88 },
            { area: "Product Architecture", level: 90 },
            { area: "UX Engineering", level: 85 }
        ],
        approach: [
            {
                title: "Technical Depth Meets Product Vision",
                description: "Build systems that don't just work—they scale gracefully and solve real problems elegantly."
            },
            {
                title: "Real-Time, Production-Grade",
                description: "Engineer for performance. Sub-200ms latency isn't a goal, it's a requirement."
            },
            {
                title: "Founder's Mindset",
                description: "Think like an owner. Every technical decision shapes the product's future and user experience."
            }
        ],
        timeline: [
            {
                year: 2024,
                project: "Deepgram Aura Voice Agents",
                impact: "Production-grade voice AI handling thousands of concurrent sessions",
                tech: ["Aura TTS/STT", "NLP", "Real-time Systems", "Voice Personas"]
            },
            {
                year: 2023,
                project: "cheapeth.org DeFi Bridge",
                impact: "Low-cost Ethereum bridge processing millions of micro-transactions",
                tech: ["Smart Contracts", "Solidity", "Web3", "Analytics Dashboards"]
            },
            {
                year: 2023,
                project: "HabitX AI Platform",
                impact: "AI recommendation engine for 100+ students with real-time dashboards",
                tech: ["Machine Learning", "Behavioral Analytics", "Real-time Data"]
            },
            {
                year: 2022,
                project: "Aviyel UX Optimization",
                impact: "30%+ increase in contributor engagement through UX redesign",
                tech: ["React", "Analytics", "Onboarding Flows", "Community Platforms"]
            }
        ]
    },

    ishwari_jadhav: {
        id: "ishwari_jadhav",
        image: "/assets/team/ishwari_jadhav.jpg",
        role: "Software Architect",
        name: "Ishwari Jadhav",
        tagline: "Designs systems that thrive today and survive tomorrow",
        yearsActive: 3,
        projectsCompleted: 8,
        philosophy: "True architecture isn't about today's requirements—it's about anticipating tomorrow's threats. I build systems that are resilient by design, secure by default, and ready for a post-quantum world.",
        bio: [
            "At IBM India Software Labs, built enterprise-grade solutions for global markets and pioneered post-quantum cryptography to secure them against tomorrow's threats.",
            "Researched and developed a mathematical model redefining cryptographic risk assessment—filed as a US patent under IBM.",
            "As Prime Owner of CSAR tool, led the team building an automation tool that slashes developer report annotation time from days to hours.",
            "Specializes in quantum-resistant cryptography, ensuring systems remain secure even as quantum computing advances threaten traditional encryption methods."
        ],
        expertise: [
            { area: "Post-Quantum Cryptography", level: 96 },
            { area: "Enterprise Architecture", level: 92 },
            { area: "Security Engineering", level: 94 },
            { area: "Mathematical Modeling", level: 90 },
            { area: "Developer Tools", level: 88 }
        ],
        approach: [
            {
                title: "Anticipate with Grace",
                description: "Design for threats that don't exist yet. Quantum computing is coming—build systems that survive it."
            },
            {
                title: "Build with Strength",
                description: "Enterprise-grade isn't a buzzword. It's a commitment to reliability, security, and scale."
            },
            {
                title: "Lead with Vision",
                description: "See beyond the immediate problem. Architect solutions that serve today and protect tomorrow."
            }
        ],
        timeline: [
            {
                year: 2024,
                project: "Post-Quantum Cryptography Research",
                impact: "US Patent filed for mathematical model redefining crypto risk assessment",
                tech: ["Quantum-Resistant Algorithms", "Mathematical Modeling", "Cryptography"]
            },
            {
                year: 2023,
                project: "CSAR Automation Tool (IBM)",
                impact: "Reduced developer annotation time from days to hours",
                tech: ["Automation", "Developer Tools", "Enterprise Software"]
            },
            {
                year: 2022,
                project: "Enterprise Security Solutions",
                impact: "Global deployment for IBM clients across multiple markets",
                tech: ["Security Architecture", "Enterprise Systems", "Cloud Security"]
            }
        ]
    },

    ameya_ingale: {
        id: "ameya_ingale",
        image: "/assets/team/ameya_ingale.jpg",
        role: "AI & Data Science Engineer",
        name: "Ameya Ingale",
        tagline: "Builds with accountability and clear impact",
        yearsActive: 3,
        projectsCompleted: 6,
        philosophy: "AI isn't magic—it's mathematics applied with purpose. I build systems grounded in research, validated by data, and measured by real-world impact. Research means nothing if it doesn't ship.",
        bio: [
            "Built solar intelligence systems that led to Smart India Hackathon college win and MNRE Solar Challenge pitch for Government of India.",
            "Co-built Tela at BVM Intsol—a live project-management platform for interior design firms, streamlining workflows and client collaboration.",
            "Specializes in translating cutting-edge research into production-ready AI systems that solve tangible problems.",
            "Combines deep technical research with rapid execution and strong product marketing instincts."
        ],
        expertise: [
            { area: "AI & Machine Learning", level: 91 },
            { area: "Solar Intelligence Systems", level: 89 },
            { area: "Data Science", level: 90 },
            { area: "Product Development", level: 86 },
            { area: "Research Translation", level: 88 }
        ],
        approach: [
            {
                title: "Research with Depth",
                description: "Ground every solution in solid research. Understand the fundamentals before building."
            },
            {
                title: "Execute with Speed",
                description: "Research without execution is academic. Ship fast, iterate faster, measure everything."
            },
            {
                title: "Market What You Build",
                description: "Great products need great storytelling. Build it, ship it, and make sure people know why it matters."
            }
        ],
        timeline: [
            {
                year: 2024,
                project: "Solar Intelligence Systems",
                impact: "Smart India Hackathon win + MNRE Solar Challenge pitch",
                tech: ["Machine Learning", "Solar Modeling", "Predictive Analytics", "IoT"]
            },
            {
                year: 2023,
                project: "Tela Project Management Platform",
                impact: "Live platform serving interior design firms",
                tech: ["Full-Stack Development", "Project Management", "Client Collaboration"]
            }
        ]
    },

    derek_dsouza: {
        id: "derek_dsouza",
        image: "/assets/team/derek_dsouza.jpg",
        role: "Computer Science & AI Engineer",
        name: "Derek Frederick Dsouza",
        tagline: "Executes technology where it matters",
        yearsActive: 3,
        projectsCompleted: 5,
        philosophy: "The gap between research and reality is where I operate. I take research-grade models and make them work in the real world—practical, deployable, and impactful.",
        bio: [
            "Built Solar Intelligence prototypes grounded in research and modeling, taking them to Smart India Hackathon and MNRE Solar Challenge for Government of India.",
            "Specializes in translating academic AI research into practical, production-ready solutions that solve real-world problems.",
            "Focuses on AI-assisted solutions that bridge the gap between theoretical models and deployed systems.",
            "Combines strong computer science fundamentals with hands-on AI engineering experience."
        ],
        expertise: [
            { area: "AI Engineering", level: 88 },
            { area: "Research Translation", level: 90 },
            { area: "Solar Intelligence", level: 87 },
            { area: "Model Deployment", level: 86 },
            { area: "Computer Science", level: 89 }
        ],
        approach: [
            {
                title: "Research-Grounded Solutions",
                description: "Start with solid research. Build on proven models. Deploy with confidence."
            },
            {
                title: "Practical AI",
                description: "AI that doesn't deploy is just math. Focus on solutions that work in production."
            },
            {
                title: "Real-World Impact",
                description: "Measure success by impact, not by papers published. Build things that matter."
            }
        ],
        timeline: [
            {
                year: 2024,
                project: "Solar Intelligence Prototypes",
                impact: "Smart India Hackathon + MNRE Solar Challenge presentations",
                tech: ["AI Modeling", "Solar Analytics", "Predictive Systems", "Research Translation"]
            }
        ]
    },

    dinesh_lade: {
        id: "dinesh_lade",
        image: "/assets/team/dinesh_lade.jpg",
        role: "Product Designer & Researcher",
        name: "Dinesh Lade",
        tagline: "Turns chaos into clarity and ideas into products people love",
        yearsActive: 2,
        projectsCompleted: 2,
        philosophy: "Design isn't decoration—it's decision-making made visible. I dig deep into user pain, validate ruthlessly, and craft interfaces that feel effortless yet drive real business results.",
        bio: [
            "Led UX design for Deepgram's voice AI products, creating intuitive interfaces for complex real-time voice technology.",
            "Designed the complete user experience for MVP Daddy's portfolio and client-facing platforms, establishing the visual identity and interaction patterns.",
            "Specializes in user research, rapid prototyping, and designing interfaces that balance aesthetic excellence with business impact.",
            "Ships products with conviction—designs that don't just look good, but measurably improve user experience and business metrics."
        ],
        expertise: [
            { area: "User Experience Design", level: 93 },
            { area: "User Research", level: 91 },
            { area: "Interface Design", level: 92 },
            { area: "Design Systems", level: 88 },
            { area: "Product Strategy", level: 87 }
        ],
        approach: [
            {
                title: "Design with Taste",
                description: "Aesthetics matter. Create interfaces that are beautiful, intuitive, and delightful to use."
            },
            {
                title: "Research with Rigor",
                description: "Validate every assumption. Talk to users. Test relentlessly. Let data inform intuition."
            },
            {
                title: "Ship with Conviction",
                description: "Perfect is the enemy of shipped. Launch, learn, iterate. Build momentum through action."
            }
        ],
        timeline: [
            {
                year: 2024,
                project: "Deepgram Voice AI UX",
                impact: "Designed intuitive interfaces for real-time voice AI products",
                tech: ["Figma", "User Research", "Voice UI", "Design Systems"]
            },
            {
                year: 2024,
                project: "MVP Daddy Platform Design",
                impact: "Complete UX design for portfolio and client platforms",
                tech: ["UI/UX Design", "Branding", "Prototyping", "User Testing"]
            }
        ]
    }
};

export const getTeamMember = (id: string): TeamMember | undefined => {
    return teamMembers[id];
};

export const getAllTeamMembers = (): TeamMember[] => {
    return Object.values(teamMembers);
};
