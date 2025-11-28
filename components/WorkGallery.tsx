import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from './ScrambleText';

import { projectData } from '../data/projectData';

const projects = Object.values(projectData).map(p => ({
    id: p.id,
    name: p.name,
    client: p.domain,
    hypothesis: p.brief,
    result: p.outcome[0], // Use the first outcome bullet
    status: p.status.toUpperCase()
}));

interface CardProps {
    p: typeof projects[0];
    i: number;
}

const Card: React.FC<CardProps> = ({ p, i }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <Link to={`/project/${p.id}`}>
            <motion.div
                ref={divRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative border border-white/5 bg-subtle/10 backdrop-blur-md rounded-sm p-8 overflow-hidden hover:bg-subtle/20 transition-colors duration-500 min-h-[400px] flex flex-col cursor-none"
            >
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                <div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
                    style={{
                        opacity,
                        background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`
                    }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                        <div className="font-mono text-[9px] text-accent flex items-center gap-2">
                            <FileText size={12} />
                            {p.id.toUpperCase()}
                        </div>
                        <div className="font-mono text-[9px] text-white/40 border border-white/10 px-2 py-0.5 rounded group-hover:border-accent/50 group-hover:text-accent transition-colors">
                            [{p.status}]
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h3 className="font-serif italic text-3xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">{p.name}</h3>
                        <p className="font-mono text-[10px] uppercase text-white/30 mb-6">{p.client}</p>

                        <div className="space-y-6">
                            <div className="relative pl-4 border-l border-white/10 group-hover:border-white/30 transition-colors">
                                <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">Brief</span>
                                <p className="font-sans text-sm text-white/70 leading-relaxed line-clamp-3">{p.hypothesis}</p>
                            </div>
                            <div className="relative pl-4 border-l border-accent/30">
                                <span className="font-mono text-[9px] text-accent uppercase block mb-1">Outcome</span>
                                <p className="font-sans text-sm text-white leading-relaxed">{p.result}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end">
                        <ArrowUpRight className="text-white/20 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 w-5 h-5" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

const WorkGallery = () => {
    return (
        <div className="w-full py-32 px-4 md:px-12 relative z-20 bg-void/50 backdrop-blur-sm border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="font-serif italic text-6xl md:text-8xl text-white leading-none">
                            Evidence <br /><span className="not-italic font-sans font-bold tracking-tight">Log</span>
                        </h2>
                    </div>
                    <div className="font-mono text-xs text-white/40 mb-2">
                        <ScrambleText text="[ ARCHIVE_ACCESS_GRANTED ]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((p, i) => (
                        <Card key={p.id} p={p} i={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkGallery;