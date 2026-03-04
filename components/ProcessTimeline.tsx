import { motion } from 'framer-motion';
import { Search, Beaker, Terminal, BarChart3 } from 'lucide-react';
import ScrambleText from './ScrambleText';

const phases = [
    {
        id: "01",
        name: "Research",
        sub: "Discovery",
        desc: "Every great product starts with a question worth answering. We conduct market research, behavioral analysis, and customer interviews to expose the real problem — not the assumed one.",
        icon: Search
    },
    {
        id: "02",
        name: "Validate",
        sub: "Consumer Signal",
        desc: "Before we write a single line of production code, we test your hypothesis against real consumers. Landing pages, prototypes, and pre-launch campaigns that gauge genuine market interest.",
        icon: Beaker
    },
    {
        id: "03",
        name: "Build",
        sub: "Wired-Up Engineering",
        desc: "Every feature ships with instrumentation baked in. Event tracking, behavioral analytics, and feedback loops — so consumer interest data flows directly into your next product decision.",
        icon: Terminal
    },
    {
        id: "04",
        name: "Measure",
        sub: "Continuous Validation",
        desc: "Post-launch is where it gets real. We track feature adoption, engagement depth, and retention signals — then feed that data back into the Research phase. The loop never stops.",
        icon: BarChart3
    }
];

const ProcessTimeline = () => {
    return (
        <section className="relative z-20 py-16 px-4 md:px-0">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 sm:mb-16 md:mb-24 text-center">
                    <span className="font-mono text-xs text-brand-saffron tracking-[0.3em] uppercase mb-4 block">
                        <ScrambleText text="THE VALIDATION LOOP" />
                    </span>
                    <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] text-brand-white uppercase leading-[0.85] tracking-normal relative z-10">
                        Research First. <br /> <span className="font-serif italic font-light text-brand-terracotta lowercase tracking-normal leading-[1.1] block mt-4">then build.</span>
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