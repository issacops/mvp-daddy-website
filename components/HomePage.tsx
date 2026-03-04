import React, { useState, Suspense, lazy } from 'react';
import CustomCursor from './CustomCursor';
import CommandPalette from './CommandPalette';
import { motion } from 'framer-motion';
import { ArrowRight, Star, AlertTriangle, Cpu, Zap, Code2, MessageSquare } from 'lucide-react';
import ScrambleText from './ScrambleText';

// Existing heavy components
const WorkGallery = lazy(() => import('./WorkGallery'));
const ProcessTimeline = lazy(() => import('./ProcessTimeline'));
const TeamManifest = lazy(() => import('./TeamManifest'));
import IgnitionHero from './Silhouettes';
import LifeJourney from './LifeJourney';

// Reusable Studio Linear Marquee Component
const Marquee: React.FC<{ text: string, className?: string }> = ({ text, className = "" }) => (
    <div className={`overflow-hidden whitespace-nowrap py-3 border-y border-brand-red ${className}`}>
        <div className="animate-marquee-fast inline-block">
            {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-4 font-mono text-xl uppercase tracking-widest flex items-center inline-block">
                    {text} <Star size={16} className="ml-8 inline-block text-brand-saffron" />
                </span>
            ))}
        </div>
    </div>
);

const BentoBox: React.FC<{ children: React.ReactNode, className?: string, dark?: boolean }> = ({ children, className = "", dark = false }) => (
    <div className={`bento-box${dark ? '-dark' : ''} p-8 md:p-12 relative group transition-all duration-300 ${className}`}>
        {children}
    </div>
);

const HomePage: React.FC = () => {
    const [isFlaring, setIsFlaring] = useState(false);

    return (
        <div
            className="relative font-sans text-brand-black bg-brand-white min-h-screen overflow-x-hidden"
            onMouseDown={() => setIsFlaring(true)}
            onMouseUp={() => setIsFlaring(false)}
        >
            <CustomCursor isFlaring={isFlaring} />
            <CommandPalette />

            {/* Solid Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 bg-brand-white/90 backdrop-blur-md border-b-2 border-brand-red px-6 py-4"
            >
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
                    <div className="font-display text-4xl md:text-5xl tracking-tight text-brand-red uppercase cursor-pointer hover:scale-105 transition-transform" onClick={() => window.location.href = '/'}>
                        MVP DADDY®
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex font-mono text-base uppercase tracking-widest gap-8">
                            <a href="#problem" className="hover:text-brand-red hover:underline decoration-2 underline-offset-4 transition-all">The Problem</a>
                            <a href="#stack" className="hover:text-brand-red hover:underline decoration-2 underline-offset-4 transition-all">The Daddy Stack</a>
                            <a href="#work" className="hover:text-brand-red hover:underline decoration-2 underline-offset-4 transition-all">Work</a>
                            <a href="#studio" className="hover:text-brand-red hover:underline decoration-2 underline-offset-4 transition-all">Studio</a>
                        </div>
                        <a
                            href="/initiate"
                            className="bg-brand-red text-brand-white px-6 py-2 font-mono text-base uppercase tracking-wider rounded-full hover:bg-brand-black transition-colors flex items-center gap-2 border-2 border-transparent hover:border-brand-red"
                        >
                            Stop Burning Runway <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </motion.header>

            <main className="relative z-20 w-full pt-32 pb-24 px-4 md:px-6 max-w-screen-2xl mx-auto flex flex-col gap-6">

                {/* ============================================ */}
                {/* SECTION 1: THE HERO */}
                {/* ============================================ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh]">
                    <BentoBox className="lg:col-span-8 bg-brand-red text-brand-white flex flex-col justify-end min-h-[50vh] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M29.5 0h1v29.5h29.5v1H30.5V60h-1V30.5H0v-1h29.5V0z\' fill=\'%23161412\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-multiply z-0 pointer-events-none" />
                        <div className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-2">
                            <span className="font-serif italic text-3xl md:text-5xl text-brand-sand/90 mb-6 block">Stop building naked MVPs.</span>
                            <h1 className="font-display text-5xl md:text-6xl lg:text-[7vw] leading-[0.85] uppercase tracking-normal mb-6 selection:bg-brand-black text-brand-white">
                                <ScrambleText text="WE ENGINEER" /> <br /> GTM-READY TECH STACKS.
                            </h1>
                            <p className="font-mono text-base md:text-lg max-w-2xl mt-2 bg-brand-black text-brand-sand inline-block px-4 py-3 uppercase tracking-widest shadow-[4px_4px_0px_#9D382A]">
                                FRACTIONAL CTO + SCALABLE MVP + AUTOMATED REVENUE ENGINE.
                            </p>
                        </div>
                    </BentoBox>

                    <BentoBox dark className="lg:col-span-4 flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute inset-0 opacity-50 pointer-events-none scale-150 origin-center">
                            <IgnitionHero />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="font-mono text-sm tracking-widest text-brand-red uppercase">
                                Tech Stack Audit
                            </div>
                            <div>
                                <h3 className="font-display text-5xl uppercase leading-none mb-4">Launch With <br /> A System.</h3>
                                <p className="font-sans text-xl leading-relaxed">
                                    Most agencies hand you code and wish you luck. We hardwire your MVP into an automated revenue engine.
                                </p>
                                <a href="/initiate" className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-brand-saffron uppercase tracking-widest hover:text-brand-red transition-colors">
                                    Book a Free Tech Stack Audit <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    </BentoBox>
                </div>

                <Marquee text="FRACTIONAL CTO LEADERSHIP // GTM AUTOMATION // MIDDLEWARE ARCHITECTURE // REVENUE ENGINEERING // " className="bg-brand-black text-brand-terracotta my-4" />

                {/* ============================================ */}
                {/* SECTION 2: THE PROBLEM (AGITATION) */}
                {/* ============================================ */}
                <div id="problem" className="mt-16 mb-8">
                    <BentoBox className="bg-brand-black text-brand-white min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'var(--pattern)' }} />
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <AlertTriangle size={18} className="text-brand-red" />
                                <span className="font-mono text-sm text-brand-red uppercase tracking-widest">The Broken Playbook</span>
                            </div>
                            <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5vw] uppercase tracking-tighter leading-[0.85] mb-10">
                                The Traditional Startup Playbook Is <span className="text-brand-red">Broken.</span>
                            </h2>
                            <div className="space-y-8 font-serif italic text-2xl md:text-3xl text-brand-sand/80 leading-relaxed">
                                <p>
                                    You have a brilliant idea. You hire a dev shop. Six months and $50,000 later, they deliver an application. The buttons click. The database hums.
                                </p>
                                <p className="text-brand-red not-italic font-display text-4xl md:text-5xl uppercase tracking-tighter">
                                    But nobody is buying it.
                                </p>
                                <p>
                                    Because traditional agencies are code factories. They leave you with a "naked" MVP—isolated software with zero connection to your sales infrastructure. You're left drowning in tech stack spaghetti, manually duct-taping your app to HubSpot while your runway evaporates.
                                </p>
                            </div>
                        </div>
                    </BentoBox>
                </div>

                {/* ============================================ */}
                {/* SECTION 3: THE SOLUTION (The Daddy Stack) */}
                {/* ============================================ */}
                <div id="stack" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3 mb-8">
                        <span className="font-mono text-sm text-brand-saffron tracking-widest uppercase block mb-4">The MVP Daddy Methodology</span>
                        <h2 className="font-display text-5xl md:text-7xl lg:text-[5vw] uppercase tracking-tighter leading-[0.85]">
                            Enter The Daddy. <br /><span className="text-brand-red">We Engineer Products That Sell.</span>
                        </h2>
                    </div>

                    <BentoBox className="bg-[#F4F0EB] min-h-[400px] flex flex-col justify-between group hover:bg-brand-terracotta hover:text-brand-white transition-colors duration-500">
                        <div className="font-mono text-3xl font-bold border-2 border-brand-black group-hover:border-brand-saffron rounded-full w-16 h-16 flex items-center justify-center">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <h3 className="font-serif italic text-5xl mb-3 group-hover:text-brand-saffron transition-colors">Fractional CTO.</h3>
                            <p className="font-sans text-lg opacity-80">
                                You don't need to burn $250K/yr on a full-time CTO to validate a prototype. We evaluate vendors, manage developers, and make data-driven decisions that protect your runway.
                            </p>
                        </div>
                    </BentoBox>

                    <BentoBox className="bg-brand-black text-brand-white min-h-[400px] flex flex-col justify-between">
                        <div className="font-mono text-3xl font-bold border-2 border-brand-red text-brand-red rounded-full w-16 h-16 flex items-center justify-center">
                            <Code2 size={24} />
                        </div>
                        <div>
                            <h3 className="font-display text-5xl uppercase mb-3">Scalable MVP.</h3>
                            <p className="font-sans text-lg opacity-80">
                                We build lean, fast, and beautiful. Modern frameworks so you never throw away our code. We aggressively challenge your assumptions to prevent overbuilding before launch.
                            </p>
                        </div>
                    </BentoBox>

                    <BentoBox className="bg-brand-red text-brand-white min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                        <div className="font-mono text-3xl font-bold border-2 border-brand-white rounded-full w-16 h-16 flex items-center justify-center">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h3 className="font-display text-5xl uppercase mb-3">GTM Engine.</h3>
                            <p className="font-sans text-lg opacity-90">
                                Our unfair advantage. Before you launch, we wire your MVP into a modern GTM stack—CRM, outbound, middleware. When your product goes live, your sales engine is already executing.
                            </p>
                        </div>
                    </BentoBox>
                </div>

                {/* ============================================ */}
                {/* SECTION 4: THE TECH STACK (Authority Grid) */}
                {/* ============================================ */}
                <div className="mt-16">
                    <div className="mb-12">
                        <span className="font-mono text-sm text-brand-saffron tracking-widest uppercase block mb-4">The Modern GTM Architecture (2026 Edition)</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.85]">
                            Signal-Based Selling <span className="text-brand-red">Replaces</span> Traditional Outbound.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: <Cpu size={20} />, title: "The Brains", sub: "CRM", desc: "HubSpot or Salesforce architectures tailored for early-stage agility and pristine data hygiene.", color: "bg-[#F4F0EB]" },
                            { icon: <Zap size={20} />, title: "The Nervous System", sub: "Middleware", desc: "Custom Clay workflows, Zapier/Make logic for waterfall data enrichment and real-time intent signals.", color: "bg-brand-black text-brand-white" },
                            { icon: <MessageSquare size={20} />, title: "The Mouth", sub: "Outbound", desc: "Instantly & Apollo infrastructure with secondary domains to protect your inbox while scaling outreach.", color: "bg-brand-black text-brand-white" },
                            { icon: <Code2 size={20} />, title: "The Hands", sub: "Product", desc: "React & Node.js frameworks for maximum performance, minimal tech debt, and premium user experience.", color: "bg-brand-red text-brand-white" }
                        ].map((item, idx) => (
                            <BentoBox key={idx} className={`${item.color} min-h-[280px] flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="p-2 border border-current rounded-full opacity-60">{item.icon}</span>
                                    <span className="font-mono text-xs uppercase tracking-widest opacity-60">{item.title}</span>
                                </div>
                                <div>
                                    <h4 className="font-display text-3xl uppercase mb-2">{item.sub}</h4>
                                    <p className="font-sans text-sm opacity-80 leading-relaxed">{item.desc}</p>
                                </div>
                            </BentoBox>
                        ))}
                    </div>
                </div>

                {/* ============================================ */}
                {/* SECTION 5: PORTFOLIO */}
                {/* ============================================ */}
                <div id="work" className="mt-24 space-y-6">
                    <h2 className="text-center mb-16 leading-none relative z-10">
                        <span className="font-serif italic text-5xl md:text-[5vw] text-brand-terracotta/80 block mb-6">Applied</span>
                        <span className="font-display text-6xl md:text-[9vw] uppercase tracking-normal text-brand-red decoration-4">Research</span>
                    </h2>

                    <BentoBox dark className="p-0 border-0 bg-transparent relative">
                        <div className="w-full relative py-12">
                            <Suspense fallback={<div className="font-mono text-center p-24 text-brand-red">LOADING WORK...</div>}>
                                <WorkGallery />
                            </Suspense>
                        </div>
                    </BentoBox>
                </div>

                {/* ============================================ */}
                {/* SECTION 6: METHODOLOGY TIMELINE */}
                {/* ============================================ */}
                <div className="mt-8 mb-32 w-full relative z-10">
                    <BentoBox className="p-8 md:p-16 border-x-0 border-t-0 border-b border-brand-red/30 rounded-none bg-brand-black">
                        <Suspense fallback={<div className="font-mono text-center p-24 text-brand-red">LOADING PROTOCOL...</div>}>
                            <ProcessTimeline />
                        </Suspense>
                    </BentoBox>
                </div>

                {/* ============================================ */}
                {/* SECTION 7: WHY "MVP DADDY?" (Team / Identity) */}
                {/* ============================================ */}
                <div id="studio" className="w-full relative z-20">
                    <div className="mb-16 max-w-4xl">
                        <span className="font-mono text-sm text-brand-saffron tracking-widest uppercase block mb-4">Founder Authenticity</span>
                        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.85] mb-8">
                            Why <span className="text-brand-red">"MVP Daddy"?</span>
                        </h2>
                        <p className="font-serif italic text-2xl md:text-3xl text-brand-black/70 leading-relaxed mb-6">
                            Because the tech ecosystem is drowning in sanitized corporate speak and faceless agencies. People follow people, not logos.
                        </p>
                        <p className="font-sans text-lg text-brand-black/60 leading-relaxed">
                            When you partner with us, you get direct access to the founders. We take a fiercely protective approach to your startup's technical architecture and budget. We will tell you directly when your feature idea is a waste of capital. We force you to focus on revenue-generating activities. We are the adults in the room when it comes to your code and your pipeline.
                        </p>
                    </div>
                    <Suspense fallback={<div className="font-mono text-center p-24 text-brand-red">LOADING STUDIO...</div>}>
                        <TeamManifest />
                    </Suspense>
                </div>

                {/* ============================================ */}
                {/* SECTION 8: GIANT FOOTER CTA */}
                {/* ============================================ */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-center">
                        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.8] mb-6">
                            Ready To <br /><span className="text-brand-red">Build A System?</span>
                        </h2>
                        <p className="font-serif italic text-2xl text-brand-black/60 leading-relaxed mb-8 max-w-lg">
                            Stop guessing. Stop piecing together fragmented tools. Let's architect a unified system that scales from Seed to Series B.
                        </p>
                        <a href="/initiate" className="inline-block w-fit bg-brand-black text-brand-white px-12 py-6 font-display text-3xl uppercase tracking-wide hover:bg-brand-red transition-all duration-300 rounded-2xl border-2 border-brand-black hover:border-brand-red shadow-[8px_8px_0px_#E70000]">
                            CLAIM YOUR BLUEPRINT
                        </a>
                        <p className="font-mono text-xs text-brand-black/40 uppercase tracking-widest mt-4 max-w-md">
                            On our 30-min intensive call, we map the exact GTM tech stack you need. The blueprint is yours to keep—whether you hire us or not.
                        </p>
                    </div>
                    <BentoBox className="bg-brand-red min-h-[40vh] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
                            <LifeJourney isFlaring={isFlaring} onFinale={() => { }} />
                        </div>
                        <div className="relative z-10 font-mono text-brand-white text-center text-xl uppercase tracking-widest max-w-sm">
                            <ScrambleText text="ENGINEERED EXCLUSIVELY FOR SEED & SERIES A NON-TECHNICAL FOUNDERS." />
                        </div>
                    </BentoBox>
                </div>

            </main>

            <footer className="border-t-2 border-brand-red bg-brand-white pt-12 pb-6 px-6">
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center font-mono uppercase text-sm font-bold tracking-widest gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-brand-red rounded-full animate-pulse"></span>
                        SYSTEM ONLINE
                    </div>
                    <div className="flex gap-8">
                        <a href="mailto:hello@mvpdaddy.com" className="hover:text-brand-red transition-colors">HELLO@MVPDADDY.COM</a>
                        <span>© 2026 MVP DADDY LABS®</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;