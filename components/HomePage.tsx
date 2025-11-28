import React, { useState, useRef, useEffect, ReactNode, lazy, Suspense } from 'react';
import LifeJourney from './LifeJourney';
import IgnitionHero from './Silhouettes';
// Lazy load heavy components below the fold
const WorkGallery = lazy(() => import('./WorkGallery'));
const ProcessTimeline = lazy(() => import('./ProcessTimeline'));
const TeamManifest = lazy(() => import('./TeamManifest'));
import ScrambleText from './ScrambleText';
import { useMousePosition } from '../utils/useMousePosition';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Fingerprint, Layers, ShieldCheck, AlertTriangle, Anchor } from 'lucide-react';
import CustomCursor from './CustomCursor';
import CommandPalette from './CommandPalette';

interface ParallaxTextProps {
    children: ReactNode;
    className?: string;
    offset?: number;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ children, className = "", offset = 50 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

    return (
        <div ref={ref} className={`absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0 ${className}`}>
            <motion.div style={{ y }} className="opacity-[0.04] w-full text-center whitespace-nowrap">
                {children}
            </motion.div>
        </div>
    );
};

interface RevealTextProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={`${className} relative overflow-hidden`}>
            <motion.div
                initial={{ y: "105%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const ScrollHint: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 6500);
        return () => clearTimeout(t);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center gap-4 z-40 pointer-events-none mix-blend-difference"
        >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">
                <ScrambleText text="INITIATE SEQUENCE" />
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown size={14} className="text-white/40" />
            </motion.div>
        </motion.div>
    );
};

interface ParallaxElementProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({ children, speed = 1, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Calculate parallax offset based on speed (1 = normal, >1 = fast, <1 = slow)
    // We want a subtle shift, so we map 0-1 scroll to a small pixel range
    const y = useTransform(scrollYProgress, [0, 1], [0, -50 * (speed - 1)]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
};

interface StoryFrameProps {
    children: ReactNode;
    id: string;
    align?: 'left' | 'right' | 'center';
    citation?: string;
    chapter?: string;
    subconscious?: string;
}

const StoryFrame: React.FC<StoryFrameProps> = ({
    children,
    id,
    align = 'center',
    citation,
    chapter,
    subconscious
}) => (
    <div className="min-h-[130vh] w-full relative flex items-center justify-center pointer-events-none py-24">

        {subconscious && (
            <ParallaxText className="mix-blend-overlay" offset={30}>
                <h2 className="font-sans font-bold text-[20vw] leading-none text-white tracking-tighter uppercase opacity-10">
                    {subconscious}
                </h2>
            </ParallaxText>
        )}

        <div className="sticky top-0 h-screen w-full flex items-center p-6 md:p-12 z-10 max-w-7xl mx-auto">
            <div className={`w-full ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
                <div className={`inline-block ${align === 'left' ? 'ml-0' : align === 'right' ? 'ml-auto' : 'mx-auto'}`}>
                    {children}
                </div>
            </div>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 items-center opacity-30 mix-blend-overlay">
            <div className="w-[1px] h-12 bg-white" />
            <div className="font-mono text-[9px] text-white uppercase [writing-mode:vertical-rl] tracking-widest">
                <ScrambleText text={`DIAGNOSTIC_0${id}`} /> // {citation}
            </div>
            <div className="w-[1px] h-12 bg-white" />
        </div>
    </div>
);


const LogoOverlay: React.FC<{ visible: boolean }> = ({ visible }) => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-2000 pointer-events-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative flex flex-col items-center">
            {/* Logo removed - GlobalNav provides persistent logo */}
            <div className={`font-mono text-xs text-accent tracking-[0.5em] uppercase transition-opacity duration-2000 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <ScrambleText text="SYSTEM HANDOVER COMPLETE" />
            </div>
            <a
                href="/initiate"
                className={`mt-12 px-8 py-4 bg-accent text-black font-bold text-sm tracking-widest uppercase hover:bg-white transition-all duration-300 rounded-sm pointer-events-auto transform hover:scale-105 ${visible ? 'opacity-100' : 'opacity-0'}`}
            >
                <ScrambleText text="INITIATE" />
            </a>
        </div>
    </div>
);



const HomePage: React.FC = () => {
    const [isFlaring, setIsFlaring] = useState(false);
    const [showFinaleLogo, setShowFinaleLogo] = useState(false);

    return (
        <div
            className="relative bg-void text-paper selection:bg-accent selection:text-white cursor-none font-sans w-full min-h-screen overflow-x-hidden"
            onMouseDown={() => setIsFlaring(true)}
            onMouseUp={() => setIsFlaring(false)}
        >
            <CustomCursor isFlaring={isFlaring} />
            <CommandPalette />
            {/* LogoOverlay removed - integrated into finale */}
            <div className="technical-jaali fixed inset-0 z-0 pointer-events-none" />
            <div className="technical-jaali fixed inset-0 z-0 pointer-events-none" />
            <div className="shimmer-overlay" />

            <div className="fixed inset-0 z-30 pointer-events-none mix-blend-screen overflow-hidden">
                <LifeJourney isFlaring={isFlaring} onFinale={() => setShowFinaleLogo(true)} />
            </div>

            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none holo-grid" />
            <div className="fixed inset-0 z-40 pointer-events-none scanlines opacity-30" />
            <div className="fixed inset-0 z-40 pointer-events-none vignette" />
            <div className="film-grain mix-blend-overlay" /> {/* New Film Grain */}

            <main className="relative z-20 w-full">

                {/* Navigation Header with Logo */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 pointer-events-none"
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="pointer-events-auto">
                            <img
                                src="/assets/mvp-daddy-logo.svg"
                                alt="MVP Daddy"
                                className="h-20 md:h-28 w-auto cursor-pointer transition-transform duration-300 hover:scale-105"
                                onClick={() => window.location.href = '/'}
                            />
                        </div>
                        <div className="pointer-events-auto flex items-center gap-4">
                            <button
                                onClick={() => {
                                    const event = new KeyboardEvent('keydown', { key: '/' });
                                    window.dispatchEvent(event);
                                }}
                                className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/50 rounded-full transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest group-hover:text-white transition-colors">Quick Nav</span>
                                    <span className="font-sans font-bold text-sm text-white tracking-wide">Press /</span>
                                </div>
                            </button>
                            <a
                                href="/initiate"
                                className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/50 rounded-full transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest group-hover:text-white transition-colors">System Ready</span>
                                    <span className="font-sans font-bold text-sm text-white tracking-wide">INITIATE PROTOCOL</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                                    <ArrowRight size={14} />
                                </div>
                            </a>
                        </div>
                    </div>
                </motion.header>

                {/* Hero Section with Silhouettes */}
                <div className="h-[100vh] w-full relative z-30">
                    <IgnitionHero />
                    <ScrollHint />
                </div>

                <div className="h-[20vh]" />

                <StoryFrame id="01" align="left" citation="VALIDATION" subconscious="Delusion">
                    <div className="relative pl-8 border-l border-accent/30 py-4 max-w-2xl pr-12 rounded-r-lg pointer-events-auto">
                        <RevealText>
                            <div className="font-mono text-[10px] text-accent mb-6 tracking-widest flex items-center gap-3">
                                <AlertTriangle size={12} />
                                DIAGNOSTIC REPORT: 001
                            </div>
                        </RevealText>

                        <div className="mb-8 relative">
                            <ParallaxElement speed={0.8} className="absolute -top-12 -left-8 text-[120px] font-indic text-white/[0.03] pointer-events-none select-none">
                                उत्पत्ति
                            </ParallaxElement>
                            <RevealText delay={0.1}>
                                <ParallaxElement speed={1.0}>
                                    <h2 className="font-sans font-extrabold text-6xl md:text-8xl leading-none text-white tracking-tighter uppercase">
                                        Architecting <br />
                                        <span className="text-accent">The Impossible.</span>
                                    </h2>
                                </ParallaxElement>
                            </RevealText>
                            <RevealText delay={0.2}>
                                <ParallaxElement speed={1.1}>
                                    <h2 className="font-sans font-extrabold text-6xl md:text-8xl leading-[0.85] text-accent tracking-tighter uppercase">
                                        Value.
                                    </h2>
                                </ParallaxElement>
                            </RevealText>
                        </div>

                        <RevealText delay={0.3}>
                            <ParallaxElement speed={1.2}>
                                <p className="font-sans font-light text-lg md:text-xl text-white/95 leading-relaxed max-w-xl">
                                    <span className="font-mono text-xs text-accent/90 block mb-2 tracking-widest uppercase">The Foundation / आधार</span>
                                    We don't just build products. We engineer <span className="text-white font-bold">market dominance</span>.
                                    <br /><br />
                                    Ideas are cheap. Execution is everything. We inject the <span className="bg-accent text-black px-1 font-bold">physics of the market</span> into your vision before a single line of code is written.
                                </p>
                            </ParallaxElement>
                        </RevealText>
                    </div>
                </StoryFrame>

                <StoryFrame id="02" align="right" citation="RESILIENCE" subconscious="Fragility">
                    <div className="relative pr-8 border-r border-white/10 py-4 max-w-xl ml-auto pl-12 rounded-l-lg pointer-events-auto">
                        <RevealText>
                            <div className="inline-flex items-center gap-3 px-4 py-1 mb-8 rounded-full border border-white/10 bg-white/5">
                                <Anchor size={12} className="text-accent" />
                                <span className="font-mono text-[9px] tracking-widest text-white/70 uppercase">
                                    <ScrambleText text="Architecture Check" />
                                </span>
                            </div>
                        </RevealText>

                        <div className="mb-6 text-right relative">
                            <ParallaxElement speed={0.8} className="absolute -top-12 -right-8 text-[120px] font-tamil text-white/[0.03] pointer-events-none select-none">
                                கட்டமைப்பு
                            </ParallaxElement>
                            <RevealText delay={0.1}>
                                <ParallaxElement speed={1.0}>
                                    <h2 className="font-sans font-extrabold text-5xl md:text-7xl leading-[0.9] text-white tracking-tighter uppercase">
                                        Precision<br />Scale
                                    </h2>
                                </ParallaxElement>
                            </RevealText>
                            <RevealText delay={0.2}>
                                <ParallaxElement speed={1.1}>
                                    <h2 className="font-mono text-sm md:text-base text-accent mt-4 tracking-widest uppercase border-t border-accent/20 pt-4 inline-block">
                                        Requires a Fortress
                                    </h2>
                                </ParallaxElement>
                            </RevealText>
                        </div>

                        <RevealText delay={0.3}>
                            <ParallaxElement speed={1.2}>
                                <p className="font-sans font-light text-sm md:text-base text-white/90 leading-loose text-right">
                                    Fragility is the enemy. <br />
                                    We don't build MVPs to be thrown away.<br />
                                    We engineer <span className="text-accent border-b border-accent/30">foundations capable of bearing 100x load.</span>
                                </p>
                            </ParallaxElement>
                        </RevealText>
                    </div>
                </StoryFrame>

                <StoryFrame id="03" align="center" citation="SURVIVAL" subconscious="Hemorrhage">
                    <div className="relative max-w-5xl mx-auto pointer-events-auto">
                        <div className="absolute inset-0 border-x border-white/5 skew-x-12 opacity-50 pointer-events-none" />

                        <div className="p-12 md:p-24 relative z-10">
                            <RevealText>
                                <h2 className="font-mono text-xs text-accent mb-4 text-center tracking-[0.3em] uppercase">
                                    System Velocity / वेग
                                </h2>
                            </RevealText>
                            <RevealText delay={0.1}>
                                <h2 className="font-sans font-extrabold text-5xl md:text-9xl mb-16 leading-[0.8] text-white text-center tracking-tighter uppercase">
                                    Hyperspeed.
                                </h2>
                            </RevealText>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-white/10 pt-8">
                                {['Feature Creep', 'Market Drift', 'Bloated Teams', 'Latency'].map((t, i) => (
                                    <RevealText key={t} delay={0.3 + (i * 0.1)}>
                                        <div className="group cursor-default p-4 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-500">
                                            <div className="font-mono text-[9px] uppercase text-red-500/50 mb-2 tracking-widest group-hover:text-red-400 transition-colors">
                                                <ScrambleText text={`THREAT_0${i + 1}`} />
                                            </div>
                                            <div className="font-sans text-sm text-white/90 group-hover:text-white transition-colors">
                                                {t}
                                            </div>
                                        </div>
                                    </RevealText>
                                ))}
                            </div>
                        </div>
                    </div>
                </StoryFrame>

                <StoryFrame id="04" align="left" citation="VECTOR" subconscious="Velocity">
                    <div className="w-full flex flex-col md:flex-row items-end gap-12 max-w-6xl mx-auto pointer-events-auto">
                        <div className="w-full md:w-1/3 border-t border-white/10 pt-4">
                            <div className="space-y-4 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                                {[
                                    { n: '01', t: 'Hypothesis Validation' },
                                    { n: '02', t: 'Systematic Execution' },
                                    { n: '03', t: 'Market Penetration' }
                                ].map((item, i) => (
                                    <RevealText key={i} delay={0.2 + (i * 0.1)}>
                                        <div className="flex items-center gap-4 py-4 border-b border-white/5 hover:pl-4 transition-all duration-300 hover:border-accent/30 cursor-default">
                                            <span className="text-accent">{item.n}</span>
                                            <ScrambleText text={item.t} autoStart={false} />
                                        </div>
                                    </RevealText>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 pl-12">
                            <RevealText delay={0.4}>
                                <div className="flex items-center gap-3 mb-6 text-accent font-mono text-[10px] uppercase tracking-widest bg-accent/10 w-fit px-3 py-1 rounded">
                                    <ShieldCheck size={12} />
                                    Operational Stability Achieved
                                </div>
                            </RevealText>
                            <RevealText delay={0.5}>
                                <h2 className="font-sans font-extrabold text-7xl md:text-[9vw] text-white mb-2 tracking-tighter leading-[0.8] uppercase">
                                    Legacy <br />Defined.
                                </h2>
                            </RevealText>
                            <RevealText delay={0.6}>
                                <p className="font-mono text-sm md:text-base text-white/60 mt-8 max-w-xl border-l-2 border-accent pl-6">
                                    <span className="block text-accent text-xs mb-2">THE OUTCOME / परिणाम</span>
                                    From the first line of code to the final exit. <br />
                                    <span className="text-white">We build the future you promised.</span>
                                </p>
                            </RevealText>
                        </div>
                    </div>
                </StoryFrame>

                <div className="pointer-events-auto">
                    <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-white/20">Loading Timeline...</div>}>
                        <ProcessTimeline />
                    </Suspense>

                    {/* Watermark removed - GlobalNav provides logo */}

                    <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-white/20">Loading Team...</div>}>
                        <TeamManifest />
                    </Suspense>
                </div>

                <StoryFrame id="05" align="center" citation="SEVERANCE" subconscious="Autonomy">
                    <div className="relative max-w-4xl mx-auto text-center pointer-events-auto">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="w-24 h-[2px] bg-accent mx-auto mb-12"
                        />
                        <RevealText>
                            <h2 className="font-serif italic text-5xl md:text-8xl mb-6 text-white/90">
                                Severance <span className="not-italic font-sans font-bold text-white">& Scale.</span>
                            </h2>
                        </RevealText>
                        <RevealText delay={0.2}>
                            <div className="font-sans font-light text-lg md:text-xl text-white/80 mx-auto leading-relaxed max-w-xl">
                                We don't hold the keys. We build the engine, teach you to drive, and step out of the vehicle.
                            </div>
                        </RevealText>
                        <RevealText delay={0.4}>
                            <div className="font-mono text-xs text-accent mt-8 border border-accent/20 inline-block px-4 py-2 rounded bg-accent/5 backdrop-blur-md">
                                <ScrambleText text="STATUS: INDEPENDENT" />
                            </div>
                        </RevealText>
                    </div>
                </StoryFrame>

                <div className="pointer-events-auto">
                    <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-white/20">Loading Work...</div>}>
                        <WorkGallery />
                    </Suspense>
                </div>

                <div className="h-[100vh] flex flex-col items-center justify-center text-center px-6 relative z-30 overflow-hidden">
                    <ParallaxText className="mix-blend-overlay" offset={20}>
                        <h2 className="font-sans font-bold text-[25vw] leading-none text-white tracking-tighter uppercase opacity-5">
                            LEGACY
                        </h2>
                    </ParallaxText>

                    <div className="w-full max-w-5xl mx-auto p-12 relative z-20 pointer-events-auto">
                        <RevealText>
                            <h2 className="font-sans font-bold text-6xl md:text-[8vw] mb-4 text-white tracking-tighter leading-[0.9] uppercase">
                                We Build <br />
                                <span className="font-serif italic font-light text-white/40 lowercase">To Leave.</span>
                            </h2>
                        </RevealText>

                        <RevealText delay={0.3}>
                            <div className="flex justify-center items-center gap-12 mb-16 opacity-50">
                                <span className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
                                    <Fingerprint size={12} /> Access Granted
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={12} /> Queue Empty
                                </span>
                            </div>
                        </RevealText>

                        <RevealText delay={0.6}>
                            <button
                                className="group relative overflow-hidden border border-white/20 bg-transparent text-white px-12 py-6 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm backdrop-blur-sm"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    <ScrambleText text="INITIATE PROTOCOL" /> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </RevealText>
                    </div>
                </div>
            </main >

            {/* Footer with logo */}
            {/* Integrated Finale Section - Seamless Flow */}
            <div className={`relative min-h-[60vh] flex flex-col items-center justify-center z-20 pointer-events-auto pb-24 transition-opacity duration-1000 ${showFinaleLogo ? 'opacity-100' : 'opacity-0'}`}>
                {showFinaleLogo && (
                    <RevealText>
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Logo removed - GlobalNav provides persistent logo */}

                            <div className="mt-12 flex flex-col items-center gap-8">
                                <div className="font-mono text-xs text-accent tracking-[0.5em] uppercase">
                                    <ScrambleText text="SYSTEM HANDOVER COMPLETE" />
                                </div>

                                <a
                                    href="/initiate"
                                    className="group relative px-12 py-5 bg-white text-black font-bold text-lg tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-500 overflow-hidden rounded-sm"
                                >
                                    <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative flex items-center gap-4">
                                        Initiate Protocol
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </RevealText>
                )}
            </div>

            <footer className="relative py-12 border-t border-white/5 bg-black/40 backdrop-blur-sm z-20 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo removed from footer - GlobalNav provides persistent logo */}

                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
                                Building MVPs That Scale
                            </div>
                            <div className="font-mono text-xs text-white/30">
                                © 2024 MVP Daddy. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default HomePage;