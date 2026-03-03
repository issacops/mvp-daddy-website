import { motion } from 'framer-motion';
import { Crosshair, GitBranch, Terminal, Zap } from 'lucide-react';
import ScrambleText from './ScrambleText';

const phases = [
    {
        id: "01",
        name: "Diagnostic",
        sub: "Discovery",
        desc: "We dismantle assumptions. We use algorithmic stress-testing to find the structural flaws in your business model before we write code.",
        icon: Crosshair
    },
    {
        id: "02",
        name: "Synthesis",
        sub: "Design",
        desc: "Form is function. We engineer interfaces that operate on the subconscious level, reducing cognitive friction to zero.",
        icon: GitBranch
    },
    {
        id: "03",
        name: "Fabrication",
        sub: "Development",
        desc: "Infrastructure as code. We build decentralized, modular systems designed to survive extreme scaling events.",
        icon: Terminal
    },
    {
        id: "04",
        name: "Extraction",
        sub: "Launch",
        desc: "The severing of the cord. We deploy, monitor, and hand over the encryption keys. The entity is now self-sustaining.",
        icon: Zap
    }
];

const ProcessTimeline = () => {
    return (
        <section className="relative z-20 py-32 px-4 md:px-12 bg-void">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 sm:mb-16 md:mb-24 text-center">
                    <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-4 block">
                        <ScrambleText text="METHODOLOGY" />
                    </span>
                    <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.85]">
                        The Ignition <br /> <span className="font-serif italic font-light text-white/50 lowercase">protocol.</span>
                    </h2>
                </div>

                <div className="relative">
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

                    <div className="space-y-24">
                        {phases.map((phase, i) => (
                            <div key={phase.id} className={`flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0 relative group`}>

                                <div className="absolute left-[13px] md:left-1/2 top-0 -translate-x-1/2 w-[15px] h-[15px] bg-void border border-accent rounded-full z-10 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                    <div className="w-[5px] h-[5px] bg-accent rounded-full" />
                                </div>

                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        viewport={{ margin: "-10%" }}
                                        className="relative p-6 border border-white/5 rounded-sm hover:bg-white/5 transition-colors duration-500"
                                    >
                                        <div className="flex items-center gap-4 mb-4 opacity-50">
                                            <phase.icon size={16} />
                                            <span className="font-mono text-xs uppercase tracking-widest">
                                                <ScrambleText text={`PHASE ${phase.id} // ${phase.name}`} />
                                            </span>
                                        </div>
                                        <h3 className="font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-4 uppercase tracking-tight">{phase.sub}</h3>
                                        <p className="font-serif italic text-lg text-white/60 leading-relaxed">
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