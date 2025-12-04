import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IgnitionHero = () => {
    const [stage, setStage] = useState<'void' | 'memory' | 'flash' | 'epiphany' | 'reveal'>('void');

    useEffect(() => {
        const t1 = setTimeout(() => setStage('memory'), 500);
        // Give memory time to exit (it has 1s exit duration)
        // Start flash after memory exit begins, but ensure it has time to play
        const t2 = setTimeout(() => setStage('flash'), 3500);
        // Extend flash duration to ensure it registers and exits cleanly
        const t3 = setTimeout(() => setStage('epiphany'), 4000);
        const t4 = setTimeout(() => setStage('reveal'), 6500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []);

    return (
        <div className="relative h-full w-full flex flex-col justify-center items-center px-6 pointer-events-none z-50 select-none">

            <AnimatePresence>
                {stage === 'memory' && (
                    <motion.div
                        key="memory"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-void z-50"
                    >
                        <p className="font-serif italic text-lg md:text-xl text-white/60 tracking-wider">
                            Every founder remembers...
                        </p>
                    </motion.div>
                )}

                {stage === 'flash' && (
                    <motion.div
                        key="flash"
                        className="fixed inset-0 bg-white z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: "circOut" }}
                    />
                )}
            </AnimatePresence>

            {(stage === 'epiphany' || stage === 'reveal') && (
                <div className="z-10 flex flex-col items-center text-center max-w-7xl px-4 mix-blend-difference">

                    <motion.div className="mb-8 relative">
                        {stage === 'epiphany' && (
                            <motion.div
                                initial={{ scale: 1.2, filter: "blur(0px)" }}
                                animate={{ scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            >
                                <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[7vw] leading-[0.9] tracking-tight text-white uppercase">
                                    The Moment<br />
                                    <span className="font-serif italic font-light text-accent lowercase">they knew.</span>
                                </h1>
                            </motion.div>
                        )}

                        {stage === 'reveal' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <h1 className="font-serif italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-[8vw] leading-[0.9] text-white">
                                    We Engineer<br />
                                    <span className="font-sans font-bold not-italic tracking-tighter text-white">Digital Autonomy.</span>
                                </h1>
                            </motion.div>
                        )}
                    </motion.div>

                    {stage === 'reveal' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

                            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-12 items-center">
                                <span className="hidden md:block h-[1px] w-full bg-white/10"></span>
                                <p className="font-sans font-light text-sm md:text-lg text-white/80 max-w-lg leading-relaxed">
                                    Not when the idea came, but when it refused to leave.<br />
                                    We turn that spark into <span className="text-accent border-b border-accent/30">systemic reality.</span>
                                </p>
                                <span className="hidden md:block h-[1px] w-full bg-white/10"></span>
                            </div>

                            <div className="flex gap-8 mt-4 opacity-40">
                                <span className="font-mono text-[9px] uppercase tracking-widest">[ FIG.01: ORIGIN ]</span>
                                <span className="font-mono text-[9px] uppercase tracking-widest text-accent">[ REF: OBSESSION ]</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IgnitionHero;