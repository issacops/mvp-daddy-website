import { motion } from 'framer-motion';
import { Crosshair, GitBranch, Terminal, Zap } from 'lucide-react';
import ScrambleText from './ScrambleText';

const phases = [
    {
        id: "01",
        name: "Discovery",
        sub: "Tech Stack Audit",
        desc: "We evaluate your current codebase, GTM infrastructure, and revenue pipeline. We identify the critical gaps bleeding your runway before writing a single line of code.",
        icon: Crosshair
    },
    {
        id: "02",
        name: "Architecture",
        sub: "CTO Strategy",
        desc: "Senior-level architectural decisions that protect your runway. We roadmap the technology, evaluate vendors, and design the middleware layer connecting product to revenue.",
        icon: GitBranch
    },
    {
        id: "03",
        name: "Fabrication",
        sub: "MVP Engineering",
        desc: "Lean, fast, and beautiful. Built on modern frameworks so you never throw away our code. We aggressively challenge assumptions to prevent overbuilding before launch.",
        icon: Terminal
    },
    {
        id: "04",
        name: "Ignition",
        sub: "GTM Activation",
        desc: "Before you launch, your sales engine is already executing. We wire your product data into your CRM, set up automated outbound sequences, and activate signal-based selling.",
        icon: Zap
    }
];

const ProcessTimeline = () => {
    return (
        <section className="relative z-20 py-16 px-4 md:px-0">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 sm:mb-16 md:mb-24 text-center">
                    <span className="font-mono text-xs text-brand-saffron tracking-[0.3em] uppercase mb-4 block">
                        <ScrambleText text="THE DADDY STACK" />
                    </span>
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] text-brand-white uppercase leading-[0.85] tracking-normal relative z-10">
                        From Audit <br /> <span className="font-serif italic font-light text-brand-terracotta lowercase tracking-normal leading-[1.1] block mt-4">to revenue.</span>
                    </h2>
                </div>

                <div className="relative">
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-red/30" />

                    <div className="space-y-24">
                        {phases.map((phase, i) => (
                            <div key={phase.id} className={`flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0 relative group`}>

                                <div className="absolute left-[13px] md:left-1/2 top-0 -translate-x-1/2 w-[15px] h-[15px] bg-brand-black border border-brand-saffron rounded-full z-10 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                    <div className="w-[5px] h-[5px] bg-brand-saffron rounded-full" />
                                </div>

                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        viewport={{ margin: "-10%" }}
                                        className="relative p-8 border border-brand-red/30 bg-brand-black hover:bg-[#1C1A18] hover:border-brand-saffron transition-colors duration-500 bento-box"
                                    >
                                        <div className="flex items-center gap-4 mb-6 opacity-90">
                                            <phase.icon size={16} className="text-brand-saffron" />
                                            <span className="font-mono text-xs uppercase tracking-widest text-brand-saffron">
                                                <ScrambleText text={`PHASE ${phase.id} // ${phase.name}`} />
                                            </span>
                                        </div>
                                        <h3 className="font-display uppercase tracking-widest text-3xl sm:text-4xl md:text-5xl text-brand-white mb-6">{phase.sub}</h3>
                                        <p className="font-serif italic text-2xl text-brand-sand/80 leading-relaxed">
                                            "{phase.desc}"
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="hidden md:block w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;