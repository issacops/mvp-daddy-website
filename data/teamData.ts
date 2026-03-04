// teamData.ts
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
        role: "Partner & Technical Director",
        name: "Issac Jacob",
        tagline: "Engineering elegant systems for complex technical challenges.",
        yearsActive: 4,
        projectsCompleted: 12,
        philosophy: "Great products emerge at the intersection of deep inquiry and precise execution. I architect digital and physical systems that scale gracefully, ensuring our partners launch resilient, beautifully crafted technology.",
        bio: [
            "Architected the streaming architecture for Deepgram Aura, delivering a highly scalable voice AI product utilized in thousands of concurrent sessions.",
            "Engineered the full-stack infrastructure for CheapETH, translating complex cryptographic mechanisms into an accessible, elegant user interface.",
            "Led intensive empirical research at Aviyel, resulting in a product refactor that increased engagement by over 30%.",
            "Directs the technology practice at MVP Daddy, ensuring every product is foundationally sound and beautifully executed."
        ],
        expertise: [
            { area: "Systems Architecture", level: 98 },
            { area: "Technical Strategy", level: 94 },
            { area: "Full-Stack Engineering", level: 92 },
            { area: "Empirical Research", level: 96 }
        ],
        approach: [
            { title: "Inquiry-Led Architecture", description: "Design decisions must be fundamentally grounded in research." },
            { title: "Elegant Scalability", description: "We build systems that are exceptionally resilient and seamlessly scalable." },
            { title: "Holistic Engineering", description: "The architecture is as important as the pixels on the screen." }
        ],
        timeline: [
            { year: 2024, project: "Deepgram Aura", impact: "Shipped a nuanced, real-time AI platform", tech: ["AI Systems", "Real-time Architecture"] },
            { year: 2023, project: "CheapETH Bridge", impact: "Delivered highly-secure Web3 infrastructure", tech: ["Full-Stack", "Cryptography"] }
        ]
    },
    ishwari_jadhav: {
        id: "ishwari_jadhav",
        image: "/assets/team/ishwari_jadhav.jpg",
        role: "Head of Enterprise Systems",
        name: "Ishwari Jadhav",
        tagline: "Designing resilient, enterprise-grade software capabilities.",
        yearsActive: 3,
        projectsCompleted: 8,
        philosophy: "Building for scale requires anticipating the future. I lead our enterprise and deep-tech initiatives, researching and building software products that protect and endure through technological paradigms.",
        bio: [
            "Pioneered post-quantum cryptographic software for global IBM enterprise systems, mapping readiness against strict NIST compliance.",
            "Conducted mathematical research to invent a risk-scoring algorithm—ultimately awarded a US Patent under IBM.",
            "Engineered sophisticated developer tools, coalescing complex corporate workflows into cohesive, beautiful software.",
            "Ensures MVP Daddy products meet the highest thresholds of enterprise software durability and security."
        ],
        expertise: [
            { area: "Security Architecture", level: 98 },
            { area: "Enterprise Software", level: 96 },
            { area: "Algorithm Research", level: 92 },
            { area: "System Durability", level: 95 }
        ],
        approach: [
            { title: "Future-Proof Design", description: "Building technology meant to endure long-term paradigm shifts." },
            { title: "Verifiable Security", description: "Security is an integral part of the product experience, not an afterthought." },
            { title: "Enterprise Craft", description: "Designing architectures that operate beautifully under institutional load." }
        ],
        timeline: [
            { year: 2024, project: "PQC Defense Modeling", impact: "US Patent granted for architectural model", tech: ["Cryptography", "Data Science"] }
        ]
    },
    ameya_ingale: {
        id: "ameya_ingale",
        image: "/assets/team/ameya_ingale.jpg",
        role: "Director of Applied Intelligence",
        name: "Ameya Ingale",
        tagline: "Fusing predictive data models with physical environments.",
        yearsActive: 3,
        projectsCompleted: 6,
        philosophy: "The most profound products bridge software intelligence with physical reality. I focus on deploying research-backed models into real-world environments, creating products that solve complex, tangible problems.",
        bio: [
            "Forged an AI-driven, hardware-integrated solar mapping engine, earning institutional backing from the Government of India.",
            "Architected critical software products for specialized firms, transforming chaotic workflows into elegant digital platforms.",
            "Commands the deployment of predictive modeling at MVP Daddy, ensuring our machine learning perfectly interfaces with the physical world."
        ],
        expertise: [
            { area: "Applied AI Models", level: 95 },
            { area: "Hardware Integration", level: 92 },
            { area: "Data Science", level: 94 },
            { area: "System Prototyping", level: 90 }
        ],
        approach: [
            { title: "Applied Reasoning", description: "Translating abstract data models into functional, elegant products." },
            { title: "Physical Execution", description: "Software intelligence acting seamlessly upon hardware endpoints." },
            { title: "Iterative Refinement", description: "Continuously polishing algorithms based on environmental feedback." }
        ],
        timeline: [
            { year: 2024, project: "Hardware-Synced Solar AI", impact: "Built a cohesive climate technology platform", tech: ["AI", "Hardware Interfaces"] }
        ]
    },
    derek_dsouza: {
        id: "derek_dsouza",
        image: "/assets/team/derek_dsouza.jpg",
        role: "Senior Production Engineer",
        name: "Derek Frederick Dsouza",
        tagline: "Translating abstract intelligence into profoundly stable software.",
        yearsActive: 3,
        projectsCompleted: 5,
        philosophy: "A product is only as good as its foundation. I specialize in taking deeply researched models and fragile prototypes, fortifying them into beautiful, highly-optimized production software.",
        bio: [
            "Co-architected the mathematical backend for Spatial Intelligence initiatives, translating physics models into actionable deployed code.",
            "Specializes in the sanitization of academic AI models, re-engineering them for high-reliability consumer applications.",
            "Ensures the structural integrity of the MVP Daddy stack, bridging the gap between cutting-edge research and stable software."
        ],
        expertise: [
            { area: "Production Deployment", level: 92 },
            { area: "Model Optimization", level: 94 },
            { area: "Backend Systems", level: 90 },
            { area: "Core Engineering", level: 95 }
        ],
        approach: [
            { title: "Structural Integrity", description: "Ensuring digital products rest on flawless server foundations." },
            { title: "Performance Craft", description: "Refining complex algorithms for speed and extreme efficiency." },
            { title: "Seamless Delivery", description: "Deployments should be silent, stable, and highly performant." }
        ],
        timeline: [
            { year: 2024, project: "Deployed Spatial Engine", impact: "Launched academic logic into a commercial environment", tech: ["Core Engineering", "AI"] }
        ]
    },
    dinesh_lade: {
        id: "dinesh_lade",
        image: "/assets/team/dinesh_lade.jpg",
        role: "Design Director",
        name: "Dinesh Lade",
        tagline: "Crafting intuitive, meticulously researched product experiences.",
        yearsActive: 2,
        projectsCompleted: 2,
        philosophy: "Design is problem-solving driven by deep empathy and rigorous inquiry. I strip away friction, focusing on creating beautiful, intuitive interfaces that feel inevitable and effortless to the user.",
        bio: [
            "Executed the complete UX research and interaction design for Deepgram's voice products, ensuring clarity in complex AI dialogues.",
            "Forged the distinct, sophisticated visual identity for MVP Daddy and our digital product portfolio.",
            "Operates at the intersection of aesthetic excellence and behavioral psychology, ensuring our products don't just work—they resonate."
        ],
        expertise: [
            { area: "UX Research", level: 96 },
            { area: "Interaction Design", level: 94 },
            { area: "Visual Identity", level: 92 },
            { area: "Behavioral Analysis", level: 95 }
        ],
        approach: [
            { title: "Research-Driven Design", description: "Inquiry and user psychology dictate the interface." },
            { title: "Zero Friction Craft", description: "The best interfaces disappear, leaving only the experience." },
            { title: "Harmonious Aesthetics", description: "Visual identity must perfectly echo the product's underlying intelligence." }
        ],
        timeline: [
            { year: 2024, project: "Voice Interface Overhaul", impact: "Elevated retention via rigorously tested UX", tech: ["Figma", "Interaction Design"] }
        ]
    }
};

export const getTeamMember = (id: string): TeamMember | undefined => {
    return teamMembers[id];
};

export const getAllTeamMembers = (): TeamMember[] => {
    return Object.values(teamMembers);
};
