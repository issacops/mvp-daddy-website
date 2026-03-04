import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, FileText, Globe } from 'lucide-react';
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

    const yParams = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col lg:flex-row border border-brand-red/30 bg-brand-black mb-16 lg:mb-32 overflow-hidden min-h-[500px]"
        >
            {/* Image Section with Parallax */}
            <div className="w-full lg:w-1/2 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-brand-red/30 min-h-[300px] lg:min-h-full bg-[#111]">
                {p.image ? (
                    <motion.div
                        className="absolute inset-[-20%] w-[140%] h-[140%]"
                        style={{ y: yParams }}
                    >
                        <div className="absolute inset-0 bg-brand-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover blur-[2px] group-hover:blur-none grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                    </motion.div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-brand-sand/20 overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-700"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(214,40,40,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(214,40,40,0.5) 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }}
                        />
                        [ NO_VISUAL_DATA ]
                    </div>
                )}

                {/* Overlay UI */}
                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-brand-saffron tracking-widest border border-brand-saffron/20 px-2 py-1 bg-brand-black/50 backdrop-blur-sm">
                    {p.id.toUpperCase()} // DIAGNOSTIC_RECORD
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative bg-brand-black group-hover:bg-[#0f0e0d] transition-colors duration-700">
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(214,40,40,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(214,40,40,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="font-mono text-[10px] text-brand-sand/60 border border-brand-sand/20 px-2 py-0.5 rounded group-hover:border-brand-red group-hover:text-brand-red transition-colors">
                            [{p.status}]
                        </div>
                        {p.link && (
                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-brand-saffron/50 hover:text-brand-saffron flex items-center gap-2 text-[10px] font-mono z-10 relative">
                                VIEW_LIVE <Globe size={12} />
                            </a>
                        )}
                    </div>

                    <h3 className="font-serif italic text-5xl md:text-6xl text-brand-sand mb-2 group-hover:text-brand-saffron transition-all duration-300">{p.name}</h3>
                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-brand-sand/40 mb-10">{p.client}</p>

                    <div className="space-y-8 z-10 relative">
                        <div className="relative pl-6 border-l-2 border-brand-sand/20 group-hover:border-brand-saffron transition-colors">
                            <span className="font-mono text-[10px] text-brand-terracotta uppercase block mb-2 tracking-widest">The Inquiry</span>
                            <p className="font-sans text-sm md:text-base text-brand-white/80 leading-relaxed max-w-lg">{p.hypothesis}</p>
                        </div>
                        <div className="relative pl-6 border-l w-2 border-brand-red/50 group-hover:border-brand-red transition-colors w-full">
                            <span className="font-mono text-[10px] text-brand-red uppercase block mb-2 tracking-widest">Fabrication & Outcome</span>
                            <p className="font-sans text-sm md:text-base text-brand-white leading-relaxed max-w-lg">{p.result}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-brand-red/20 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center z-10 relative">
                    <div className="flex gap-2 flex-wrap">
                        {p.layers.slice(0, 3).map((layer, idx) => (
                            <span key={idx} className="font-mono text-[9px] border border-brand-sand/10 px-2 py-1 text-brand-sand/40 uppercase">
                                {layer}
                            </span>
                        ))}
                    </div>
                    <Link to={`/project/${p.id}`} className="group/btn flex items-center justify-center min-w-[3rem] min-h-[3rem] w-12 h-12 rounded-full border border-brand-red/30 hover:bg-brand-red hover:border-brand-red transition-all duration-300 shrink-0">
                        <ArrowUpRight className="text-brand-sand group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform w-5 h-5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const WorkGallery = () => {
    return (
        <div className="w-full relative z-20 mt-16 md:mt-24">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
                {projects.map((p, i) => (
                    <Card key={p.id} p={p} i={i} />
                ))}
            </div>
        </div>
    );
};

export default WorkGallery;