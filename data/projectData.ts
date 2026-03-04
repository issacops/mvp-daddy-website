// projectData.ts
export interface ProjectMetrics {
    label: string;
    value: string;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
}

export interface ProjectTeamMember {
    name: string;
    role: string;
}

export interface ProjectData {
    id: string;
    name: string;
    domain: string;
    status: string;
    date: string;
    brief: string;
    fullStory: string;
    research: string[];
    role: string[];
    outcome: string[];
    metrics: {
        primary: ProjectMetrics;
        secondary: ProjectMetrics;
        tertiary: ProjectMetrics;
        quaternary: ProjectMetrics;
    };
    team: ProjectTeamMember[];
    layers: string[];
    image?: string;
    link?: string;
}

export const projectData: Record<string, ProjectData> = {
    "cheapeth": {
        id: "cheapeth",
        name: "CheapETH Bridge",
        domain: "Web3 Infrastructure",
        status: "Mainnet",
        date: "2021",
        brief: "Architecting a deterministic bridge for the decentralized web. We engineered a secure, low-latency transit layer connecting Ethereum to a massive community-driven fork.",
        fullStory: "Cross-chain architecture demands absolute precision. Partnering with the CheapETH community, we set out to resolve the critical vulnerabilities inherent in asset transit. Grounded in rigorous security research, we designed a zero-trust consensus framework. Our engineering team built deterministic relayer nodes and audited smart contracts, delivering a seamless, highly secure protocol that handled massive launch-day volume flawlessly.",
        research: [
            "Analysis of historical cross-chain vulnerability vectors.",
            "Deterministic state-synchronization modeling.",
            "User-centric security design for decentralized finance."
        ],
        role: [
            "Protocol Architecture: Designed a zero-trust consensus model.",
            "Smart Contract Engineering: Fabricated secure lock/release handlers.",
            "Infrastructure: Deployed a high-availability relayer network."
        ],
        outcome: [
            "Flawless mainnet deployment.",
            "Absolute deterministic security.",
            "Seamless user experience under extreme transactional volume."
        ],
        metrics: {
            primary: { label: "Volume", value: "1.2M+", unit: "TXs" },
            secondary: { label: "Uptime", value: "99.9%", unit: "SLA" },
            tertiary: { label: "Latency", value: "12s", unit: "Avg" },
            quaternary: { label: "Audit", value: "Passed", unit: "100%" }
        },
        team: [
            { name: "MVP Daddy", role: "Product Studio" },
            { name: "CheapETH", role: "Founding Team" }
        ],
        layers: ["Interface Design", "Relayer Network", "Smart Contracts", "Consensus Rules"],
        image: "/assets/projects/cheapeth.png",
        link: "https://cheapeth.org"
    },
    "aura": {
        id: "aura",
        name: "Deepgram Aura",
        domain: "Voice Intelligence",
        status: "Live",
        date: "2023",
        brief: "Engineering empathy in real-time. We designed the conversational logic layer for a voice AI agent capable of nuanced, natural human interaction.",
        fullStory: "Human conversation is beautifully imperfect—filled with pauses, interruptions, and emotional shifts. Deepgram engaged us to build a conversational engine that understands this friction. Beginning with deep behavioral analysis of human repair mechanisms, we engineered a sub-200 millisecond inference pipeline. The result is an AI that transcends robotic call-and-response, reacting to phonetic cues organically.",
        research: [
            "Acoustic analysis of human conversational repair.",
            "Behavioral modeling of natural hesitation and intent.",
            "Latency benchmarks for seamless real-time communication."
        ],
        role: [
            "Behavioral Logic: Translated human phonetic cues into software architecture.",
            "Systems Engineering: Built a highly-optimized streaming pipeline.",
            "Interaction Design: Sculpted the natural conversational flows."
        ],
        outcome: [
            "An agent with unprecedented contextual awareness.",
            "Real-time conversational speeds with zero artificial delay.",
            "A paradigm shift in human-computer voice interaction."
        ],
        metrics: {
            primary: { label: "Latency", value: "<200", unit: "ms" },
            secondary: { label: "Precision", value: "96%", unit: "WER" },
            tertiary: { label: "Languages", value: "30+", unit: "Audio" },
            quaternary: { label: "Interaction", value: "Organic", unit: "Flow" }
        },
        team: [
            { name: "MVP Daddy", role: "Product Studio" },
            { name: "Deepgram", role: "AI Infrastructure" }
        ],
        layers: ["Conversational UX", "Emotion Heuristics", "LLM Integration", "Audio Stream"],
        image: "/assets/projects/aura.png",
        link: "https://deepgram.com/aura"
    },
    "solar": {
        id: "solar",
        name: "Solar-Base Builder",
        domain: "Spatial Intelligence",
        status: "Deployed",
        date: "2024",
        brief: "Translating geospatial data into physical infrastructure. We built an intelligence platform that automates the simulation and deployment of macro-scale solar arrays.",
        fullStory: "Deploying physical infrastructure involves immense logistical complexities. We engineered a spatial-intelligence system that directly interfaces with field hardware. Recognizing that engineers spent weeks on terrain topology, we built a mathematical engine that ingests geographical data and autonomously maps the optimal hardware array. It is a seamless fusion of advanced software logic and physical world execution.",
        research: [
            "Field topology and hardware integration studies.",
            "Algorithmic modeling of solar degradation and drift.",
            "Systematic reduction of deployment bottlenecks."
        ],
        role: [
            "Spatial Software: Engineered the algorithms translating topography to hardware specs.",
            "User Interface: Designed an elegant, command-driven tool for engineers.",
            "Systems Integration: Bridged the software intelligence layer with field hardware."
        ],
        outcome: [
            "Eliminated weeks of manual topological forecasting.",
            "Maximized energy yield via precise hardware alignment.",
            "Delivered a beautifully cohesive enterprise tool."
        ],
        metrics: {
            primary: { label: "Yield", value: "+40%", unit: "Gain" },
            secondary: { label: "Planning", value: "-75%", unit: "Time" },
            tertiary: { label: "Hardware", value: "Synced", unit: "100%" },
            quaternary: { label: "Deployment", value: "Automated", unit: "Scale" }
        },
        team: [
            { name: "MVP Daddy", role: "Product Studio" },
            { name: "Solar Ops", role: "Field Engineering" }
        ],
        layers: ["Command UI", "Spatial Engine", "Hardware Logic", "Geospatial Data"],
        image: "/assets/projects/solar.png"
    },
    "cyber": {
        id: "cyber",
        name: "Cyber Risk Score",
        domain: "Enterprise Security",
        status: "Patented",
        date: "2022",
        brief: "Demystifying complex threat topologies. We engineered an algorithmic risk matrix that distills massive vulnerability datasets into a clear, actionable metric.",
        fullStory: "Enterprise security teams suffer from profound data fatigue. Through extensive discovery with Chief Information Security Officers, we identified the need for singular clarity. We modeled a proprietary algorithm that digests thousands of network dependencies and outputs a definitive 0-10 risk score. We wrapped this mathematics in a meticulously designed analytics dashboard, which was subsequently patented by IBM.",
        research: [
            "Cognitive load analysis of enterprise security dashboards.",
            "Mathematical modeling of qualitative network degradation.",
            "Graph theory application for cascading vulnerability dependencies."
        ],
        role: [
            "Algorithm Design: Formulated the core risk-scoring mathematics.",
            "Data Engineering: Built pipelines capable of processing infinite nodes.",
            "Interface Design: Crafted a high-clarity dashboard for executive decision-making."
        ],
        outcome: [
            "Accelerated threat triage significantly across global networks.",
            "Delivered an elegant interface for impossibly complex data.",
            "Algorithm ultimately awarded a US Patent."
        ],
        metrics: {
            primary: { label: "Velocity", value: "4x", unit: "Faster" },
            secondary: { label: "Clarity", value: "0-10", unit: "Index" },
            tertiary: { label: "Topology", value: "Global", unit: "Scale" },
            quaternary: { label: "IP", value: "US", unit: "Patented" }
        },
        team: [
            { name: "MVP Daddy", role: "Product Studio" },
            { name: "IBM Security", role: "Enterprise Client" }
        ],
        layers: ["Executive Dashboard", "Scoring Algorithm", "Threat Graph", "Node Sync"]
    },
    "quantum": {
        id: "quantum",
        name: "Quantum-Safety",
        domain: "Post-Quantum Cryptography",
        status: "Production",
        date: "2023",
        brief: "Preparing enterprise infrastructure for the post-quantum era. We designed a cryptographic surveillance engine that audits thousands of existing certificates against NIST standards.",
        fullStory: "Cryptographic standards are undergoing a foundational shift. We initiated deep research into NIST's post-quantum frameworks, translating abstract mathematical theory into an elegant software product. Our platform scans enterprise networks, analyzes encryption certificates, and orchestrates clear, automated mitigation strategies—future-proofing legacy architecture against impending decryption capabilities.",
        research: [
            "Deep implementation research on lattice-based cryptography.",
            "Enterprise compliance and migration strategy analysis.",
            "Real-world testing of non-intrusive network scanning."
        ],
        role: [
            "Security Architecture: Designed the network auditing pipelines.",
            "Product Design: Crafted the compliance and mitigation dashboards.",
            "Strategic Engineering: Built logic to evaluate algorithms against quantum timelines."
        ],
        outcome: [
            "Provided organizations with immediate cryptographic visibility.",
            "Delivered a beautifully considered enterprise security product.",
            "Ensured clients remain ahead of global compliance curves."
        ],
        metrics: {
            primary: { label: "Audited", value: "10k+", unit: "Certs" },
            secondary: { label: "Defense", value: "PQC", unit: "Standard" },
            tertiary: { label: "Framework", value: "NIST", unit: "Compliant" },
            quaternary: { label: "Visibility", value: "Absolute", unit: "Clarity" }
        },
        team: [
            { name: "MVP Daddy", role: "Product Studio" },
            { name: "Enterprise", role: "Client Infrastructure" }
        ],
        layers: ["Insight UI", "Audit Engine", "Network Scanner", "Protocol Rules"]
    }
};
