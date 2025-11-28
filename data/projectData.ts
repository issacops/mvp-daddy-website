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
    domain: string; // Was Location
    status: string; // Was Elevation
    date: string;
    brief: string;
    fullStory: string;
    research: string[]; // Research foundations and techniques
    role: string[];
    outcome: string[];
    metrics: {
        primary: ProjectMetrics; // Big number
        secondary: ProjectMetrics; // Top right
        tertiary: ProjectMetrics; // Graph
        quaternary: ProjectMetrics; // Heart rate equiv
    };
    team: ProjectTeamMember[];
    layers: string[]; // For 3D Architecture
}

export const projectData: Record<string, ProjectData> = {
    "cheapeth": {
        id: "cheapeth",
        name: "CheapETH Bridge",
        domain: "Blockchain / Infrastructure",
        status: "Deployed",
        date: "2021",
        brief: "We partnered on CheapETH, a low-cost Ethereum fork, to design and engineer a secure, lightweight bridge connecting it to Ethereum. Our team translated cross-chain research into a deterministic, verifiable, user-friendly system.",
        fullStory: "CheapETH was a community-first experimental EVM chain. MVP Daddy was instrumental in bridging it to Ethereum, focusing on research-backed simplicity and safety. We analyzed cross-chain exploits (Ronin, Harmony, Polygon) and designed a minimal, deterministic validator and relayer system. We engineered lock → mint / burn → release flows, with nonce- and event-based protection against double-spends. The system was built as an end-to-end on-chain pipeline ensuring verifiable transactions, low-latency, and full audit trails.",
        research: [
            "Cross-chain bridge security analysis (Ronin Bridge exploit, $625M)",
            "Harmony Horizon Bridge attack vectors (2022)",
            "Polygon PoS Bridge vulnerability research",
            "Deterministic consensus mechanisms (Stanford Blockchain Research)",
            "Byzantine fault tolerance in validator systems (MIT CSAIL)",
            "Nonce-based replay attack prevention (Ethereum Foundation)"
        ],
        role: [
            "Security Research & Architecture: Analyzed cross-chain exploits and designed a minimal, deterministic validator and relayer system.",
            "Consensus & Token Flow Implementation: Engineered lock → mint / burn → release flows, with nonce- and event-based protection against double-spends.",
            "Event Listener & Mint/Burn Engine: Built end-to-end on-chain pipeline ensuring verifiable transactions, low-latency, and full audit trails.",
            "UX Guidance: Developed guardrails and interface cues so users could safely move assets without confusion."
        ],
        outcome: [
            "Fast, secure, and deterministic bridging.",
            "Minimal trust assumptions, full auditability.",
            "Research-informed engineering ensures usability, reliability, and security."
        ],
        metrics: {
            primary: { label: "Transactions", value: "1.2M+", unit: "TXs" },
            secondary: { label: "Uptime", value: "99.9%", unit: "SLA" },
            tertiary: { label: "Latency", value: "12s", unit: "Avg" },
            quaternary: { label: "Security", value: "Audited", unit: "100%" }
        },
        team: [
            { name: "MVP Daddy Team", role: "Core Eng" },
            { name: "CheapETH DAO", role: "Partner" }
        ],
        layers: ["User Interface", "Relayer Node", "Smart Contracts", "EVM Consensus"]
    },
    "aura": {
        id: "aura",
        name: "Deepgram Aura",
        domain: "Voice AI / Real-time",
        status: "Live",
        date: "2023",
        brief: "We partnered with Deepgram to build Aura, a real-time voice AI agent that understands intent, emotion, and conversational friction. Our team translated behavioral and linguistic research into actionable AI intelligence.",
        fullStory: "Aura was designed to understand humans, not just speech. MVP Daddy was instrumental in turning research insights into real-time AI behaviors. We applied studies on prosody, emotion transitions, conversational repair, and cross-linguistic patterns to create a system that feels truly alive. The engineering focused on low-latency pipelines for real-time emotion, intent, and friction detection, integrating these signals to guide live agent responses.",
        research: [
            "Prosodic feature analysis (MIT Speech Communication Group)",
            "Emotion transition modeling (Stanford HAI - Human-Centered AI)",
            "Conversational repair mechanisms (UC Berkeley Linguistics)",
            "Cross-linguistic phonetic patterns (Max Planck Institute)",
            "Real-time speech emotion recognition (CMU Language Technologies)",
            "Multilingual acoustic modeling (Google Research)"
        ],
        role: [
            "Research Translation: Applied studies on prosody, emotion transitions, conversational repair, and cross-linguistic patterns.",
            "Engineering Streaming Inference: Developed low-latency pipelines for real-time emotion, intent, and friction detection.",
            "Adaptive Agent Logic: Integrated signals to guide live agent responses, improving user experience.",
            "Multilingual Calibration: Built adaptive thresholds for multiple languages, reducing false positives."
        ],
        outcome: [
            "Human-aware, proactive, and multilingual voice intelligence.",
            "Detects friction early and guides conversational flow.",
            "Research-driven and interpretable AI for real-world deployment."
        ],
        metrics: {
            primary: { label: "Latency", value: "<200", unit: "ms" },
            secondary: { label: "Accuracy", value: "96%", unit: "WER" },
            tertiary: { label: "Languages", value: "30+", unit: "Supported" },
            quaternary: { label: "Emotion", value: "Real-time", unit: "Detected" }
        },
        team: [
            { name: "MVP Daddy Team", role: "AI Research" },
            { name: "Deepgram", role: "Core Model" }
        ],
        layers: ["Voice Interface", "Emotion Engine", "LLM Logic", "Audio Stream"]
    },
    "solar": {
        id: "solar",
        name: "Solar-Base Builder",
        domain: "Renewable Energy / AI",
        status: "Field Ready",
        date: "2024",
        brief: "Solar-Base Builder is an AI-assisted system enabling teams to design, simulate, and deploy modular solar infrastructure autonomously. MVP Daddy’s team engineered the intelligence layer that powers predictive, planning, and operational decisions.",
        fullStory: "Deploying solar infrastructure is complex. MVP Daddy designed and implemented the adaptive intelligence layer that translates environmental and geospatial research into actionable solar deployment guidance. We engineered terrain, shading, light, and orientation detection for accurate solar potential prediction and built natural language requirement interpretation into the AI system.",
        research: [
            "Solar irradiance modeling (NREL - National Renewable Energy Lab)",
            "Terrain shading algorithms (Stanford Geospatial Lab)",
            "LLM-guided spatial reasoning (OpenAI Research)",
            "Geospatial drift detection (NASA Earth Observing System)",
            "Multi-regional climate adaptation (IPCC Climate Models)",
            "Predictive maintenance for solar systems (MIT Energy Initiative)"
        ],
        role: [
            "Environmental Signal Modelling: Engineered terrain, shading, light, and orientation detection for accurate solar potential prediction.",
            "LLM-Guided Design: Built natural language requirement interpretation and layout reasoning into the AI system.",
            "Deployment Drift Detection: Developed monitoring systems for misalignment, recalculation loops, and environmental inconsistencies.",
            "Multiregional Calibration: Implemented adaptive solar behavior profiles for diverse climates.",
            "Predictive Issue Modelling: Created algorithms to forecast efficiency drops and operational risks proactively."
        ],
        outcome: [
            "Adaptive, intelligent, reliable deployment.",
            "Globally calibrated solar profiles.",
            "Translates research into field-ready intelligence."
        ],
        metrics: {
            primary: { label: "Efficiency", value: "+40%", unit: "Gain" },
            secondary: { label: "Planning", value: "-75%", unit: "Time" },
            tertiary: { label: "Accuracy", value: "98%", unit: "Geospatial" },
            quaternary: { label: "Drift", value: "Auto", unit: "Corrected" }
        },
        team: [
            { name: "MVP Daddy Team", role: "Sys Arch" },
            { name: "Solar Ops", role: "Field Team" }
        ],
        layers: ["Planning UI", "Geospatial AI", "Simulation Engine", "Hardware I/O"]
    },
    "cyber": {
        id: "cyber",
        name: "Cyber Risk Score",
        domain: "Cybersecurity / Fintech",
        status: "Patented",
        date: "2022",
        brief: "We developed a mathematical model to quantify cybersecurity risk, translating complex vulnerability dependencies into a single, interpretable score (0–10). Filed a US patent under IBM.",
        fullStory: "Manual assessment of vulnerability impact is slow. MVP Daddy engineered a scoring system that converts asset dependencies and vulnerabilities into a quantitative, actionable metric. This involved mathematical modeling of asset dependencies and vulnerability relationships, converting qualitative network impact into quantitative, interpretable scores.",
        research: [
            "Graph theory for dependency modeling (Princeton CS)",
            "Vulnerability scoring frameworks (NIST CVSS)",
            "Quantitative risk assessment (IBM Research)",
            "Network topology analysis (Stanford Network Analysis)",
            "Attack graph generation (Carnegie Mellon CyLab)",
            "Bayesian risk modeling (MIT CSAIL)"
        ],
        role: [
            "Mathematical Modeling: Modeling of asset dependencies and vulnerability relationships.",
            "Dependency Graph Analysis: Converts qualitative network impact into quantitative, interpretable scores.",
            "Quantitative Scoring Engine: Engineered the core logic for the 0-10 score generation.",
            "Patent Development: Filed a US patent under IBM."
        ],
        outcome: [
            "Reduces assessment time by 75%.",
            "Enables faster decisions.",
            "Standardized metric across assets."
        ],
        metrics: {
            primary: { label: "Speedup", value: "4x", unit: "Faster" },
            secondary: { label: "Score", value: "0-10", unit: "Range" },
            tertiary: { label: "Assets", value: "∞", unit: "Scalable" },
            quaternary: { label: "Patent", value: "US", unit: "Granted" }
        },
        team: [
            { name: "MVP Daddy Team", role: "Algorithm" },
            { name: "IBM Security", role: "Partner" }
        ],
        layers: ["Risk Dashboard", "Scoring Algo", "Dependency Graph", "Asset Database"]
    },
    "quantum": {
        id: "quantum",
        name: "Quantum-Safety",
        domain: "Cryptography / Enterprise",
        status: "Production",
        date: "2023",
        brief: "Our system allows enterprises to evaluate quantum-safety of cryptography, scanning TLS and X.509 certificates, highlighting vulnerable keys, and guiding post-quantum migration.",
        fullStory: "Quantum computers threaten traditional public-key cryptography. MVP Daddy built a detection system for proactive enterprise defense based on NIST post-quantum standards. The system scans enterprise networks, extracts key certificate details (public key, algorithm, issuer, expiry), and classifies each certificate as Classical, Hybrid, or Post-Quantum.",
        research: [
            "NIST Post-Quantum Cryptography Standardization",
            "Lattice-based cryptography (IBM Quantum Research)",
            "Quantum threat timeline modeling (Microsoft Quantum)",
            "Certificate lifecycle analysis (Let's Encrypt Research)",
            "Hybrid cryptographic schemes (Google Quantum AI)",
            "Enterprise crypto migration strategies (CISA Guidance)"
        ],
        role: [
            "PQC Research Implementation: Based on PQC research, IBM Guardium Cryptography Manager, and NIST post-quantum standards.",
            "Certificate Scanning Engine: Scans enterprise networks, extracts key certificate details.",
            "Risk Classification: Classifies each certificate as Classical / Hybrid / Post-Quantum.",
            "Migration Guidance Logic: Evaluates quantum safety and highlights migration priorities."
        ],
        outcome: [
            "Enterprises gain visibility into cryptographic risk.",
            "Proactive readiness ensures protection before quantum threats materialize.",
            "Automated, research-driven solution."
        ],
        metrics: {
            primary: { label: "Scanned", value: "10k+", unit: "Certs" },
            secondary: { label: "Safety", value: "PQC", unit: "Ready" },
            tertiary: { label: "Algorithms", value: "NIST", unit: "Std" },
            quaternary: { label: "Risk", value: "High", unit: "Detected" }
        },
        team: [
            { name: "MVP Daddy Team", role: "Crypto Eng" },
            { name: "Enterprise", role: "Client" }
        ],
        layers: ["Audit UI", "Analysis Engine", "Crypto Scanner", "Network Layer"]
    }
};
