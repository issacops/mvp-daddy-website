import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

import { projectData } from '../data/projectData';

const projects = Object.values(projectData).map(p => ({
    id: p.id,
    name: p.name,
    client: p.domain,
    hypothesis: p.brief,
    result: p.outcome[0],
    status: p.status.toUpperCase(),
    image: p.image,
    link: p.link,
    layers: p.layers
}));

interface CardProps {
    p: typeof projects[0];
    i: number;
}

const Card: React.FC<CardProps> = ({ p, i }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the background image
    const yParams = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col lg:flex-row border border-brand-red bg-brand-black mb-16 lg:mb-32 overflow-hidden min-h-[600px] bento-box shadow-[0_0_40px_rgba(214,40,40,0.05)] hover:shadow-[0_0_60px_rgba(214,40,40,0.15)] transition-shadow duration-700"
        >
            {/* Image Parallax Section (Left - 55%) */}
            <div className="w-full lg:w-[55%] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-brand-red bg-[#111]">
                {/* SVG Organic Noise Overlay (Sarvam AI Texture) */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-20 mix-blend-overlay">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
                        <filter id="noiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>

                {p.image ? (
                    <motion.div
                        className="absolute inset-[-20%] w-[140%] h-[140%]"
                        style={{ y: yParams }}
                    >
                        <div className="absolute inset-0 bg-brand-black/40 z-10 group-hover:bg-transparent transition-colors duration-700 mix-blend-multiply" />
                        {/* Grayscale to Color + Slow Zoom on Hover */}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover blur-[1px] group-hover:blur-none grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out opacity-70 group-hover:opacity-100 group-hover:scale-[1.03]" />
                    </motion.div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-brand-sand/20 overflow-hidden bg-brand-black">
                        <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-700"
                            style={{ backgroundImage: 'var(--pattern)' }}
                        />
                        [ NO_VISUAL_DATA ]
                    </div>
                )}

                {/* Huge Index Number (Studio Linear impact) */}
                <div className="absolute bottom-[-5%] left-[-2%] z-20 font-display text-[200px] leading-none text-brand-white/5 mix-blend-screen group-hover:text-brand-saffron/20 transition-colors duration-700 pointer-events-none select-none">
                    0{i + 1}
                </div>

                {/* Top Overlay UI Badge */}
                <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-brand-saffron tracking-widest border border-brand-saffron/30 px-3 py-1.5 bg-brand-black/80 backdrop-blur-md uppercase">
                    ID: {p.id} // RESEARCH_LOG
                </div>
            </div>

            {/* Content Section (Right - 45%) with Strict Sub-Grids */}
            <div className="w-full lg:w-[45%] flex flex-col relative bg-brand-black group-hover:bg-[#151311] transition-colors duration-700 z-10">

                {/* 1. Top Header Component */}
                <div className="p-8 md:p-12 border-b border-brand-red relative overflow-hidden">
                    {/* Hover: Cultural Texture (Jaali Pattern) Reveal */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700"
                        style={{ backgroundImage: 'var(--pattern)' }}
                    />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div className="font-mono text-[10px] uppercase text-brand-black bg-brand-saffron px-3 py-1 font-bold tracking-widest">
                                {p.status}
                            </div>
                            {p.link && (
                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-brand-sand/40 hover:text-brand-red flex items-center gap-2 text-xs font-mono transition-colors">
                                    [ DEPLOYED_URL ] <Globe size={14} />
                                </a>
                            )}
                        </div>

                        {/* Implemented Anton font for massive impact per Studio Linear */}
                        <h3 className="font-display uppercase tracking-wider text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.85] text-brand-white mb-4 group-hover:text-brand-red transition-colors duration-500">
                            {p.name}
                        </h3>
                        <p className="font-mono text-sm uppercase tracking-[0.3em] text-brand-sand/50">
                            Client: {p.client}
                        </p>
                    </div>
                </div>

                {/* 2. Middle Details Component */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="space-y-12">
                        <div className="relative pl-6 border-l-2 border-brand-sand/20 group-hover:border-brand-saffron transition-colors duration-500">
                            <span className="font-mono text-[10px] text-brand-terracotta uppercase block mb-3 tracking-[0.2em]">[ THE_INQUIRY ]</span>
                            <p className="font-sans text-sm md:text-base text-brand-white/80 leading-relaxed max-w-lg">
                                {p.hypothesis}
                            </p>
                        </div>
                        <div className="relative pl-6 border-l-2 border-brand-red/30 group-hover:border-brand-red transition-colors duration-500">
                            <span className="font-mono text-[10px] text-brand-red uppercase block mb-3 tracking-[0.2em]">[ FABRICATION_&_OUTCOME ]</span>
                            <p className="font-sans text-sm md:text-base text-brand-white leading-relaxed max-w-lg">
                                {p.result}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Footer/CTA Component */}
                <div className="border-t border-brand-red md:h-32 flex flex-col md:flex-row items-stretch group-hover:bg-brand-red/5 transition-colors duration-500">
                    <div className="flex-1 p-6 md:p-8 flex items-center gap-2 flex-wrap border-b md:border-b-0 md:border-r border-brand-red">
                        {p.layers.slice(0, 3).map((layer, idx) => (
                            <span key={idx} className="font-mono text-[10px] border border-brand-sand/30 px-3 py-1.5 text-brand-sand/60 uppercase bg-brand-black tracking-widest">
                                {layer}
                            </span>
                        ))}
                    </div>
                    {/* Brutalist Button Corner Component */}
                    <Link to={`/project/${p.id}`} className="group/btn relative w-full md:w-32 flex-shrink-0 flex items-center justify-center p-8 bg-brand-black hover:bg-brand-red transition-colors duration-300 overflow-hidden text-brand-red hover:text-brand-black">
                        <ArrowUpRight className="relative z-10 w-8 h-8 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-300" strokeWidth={1.5} />
                    </Link>
                </div>

            </div>
        </motion.div>
    );
};

const WorkGallery = () => {
    return (
        <section className="w-full relative z-20 py-24 md:py-32 bg-transparent">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">

                {/* Deepening the editorial / research motif at the gallery header */}
                <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-red/30 pb-8">
                    <div>
                        <div className="font-mono text-sm text-brand-saffron mb-4 tracking-widest">[ 03 ]</div>
                        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-brand-black leading-none">
                            Applied <br />
                            <span className="text-brand-red">Research</span>
                        </h2>
                    </div>
                    <div className="font-mono text-xs text-brand-black/60 mt-8 md:mt-0 uppercase tracking-widest max-w-[200px] text-right">
                        Empirical findings translated into market reality.
                    </div>
                </div>

                <div className="space-y-4">
                    {projects.map((p, i) => (
                        <Card key={p.id} p={p} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkGallery;