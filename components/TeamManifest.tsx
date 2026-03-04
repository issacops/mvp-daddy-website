import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Brain, Cpu, Palette, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllTeamMembers } from '../data/teamData';

const iconMap: Record<string, any> = {
    'issac_jacob': Zap,
    'ishwari_jadhav': Shield,
    'ameya_ingale': Brain,
    'derek_dsouza': Cpu,
    'dinesh_lade': Palette
};

const operators = getAllTeamMembers().map(member => ({
    ...member,
    icon: iconMap[member.id] || Zap
}));

const TeamManifest = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default to first open

    return (
        <section className="relative z-20 py-16 sm:py-24 md:py-32 border-t-2 border-brand-red bg-brand-black overflow-hidden">
            <div className="max-w-[100rem] mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-24 border-b border-brand-red/30 pb-6 sm:pb-8">
                    <div>
                        <h2 className="font-serif italic text-3xl sm:text-5xl md:text-7xl text-brand-sand leading-none mb-4">
                            The <br /><span className="not-italic font-display uppercase tracking-tight text-brand-red">Architects</span>
                        </h2>
                    </div>
                    <div className="font-mono text-xs text-brand-saffron mt-4 md:mt-0 md:mb-2 md:text-right uppercase tracking-widest leading-relaxed">
                        [ CORE_STUDIO_OPERATIVES ]<br />
                        Empirical Research & Fabrication
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row min-h-[600px] sm:h-[1200px] lg:h-[700px] gap-2 border-l border-r border-t border-brand-red/20 p-2 relative bg-[#111]">
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(214,40,40,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(214,40,40,0.2) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {operators.map((op, i) => {
                        const isActive = hoveredIndex === i;
                        return (
                            <motion.div
                                key={op.id}
                                onMouseEnter={() => setHoveredIndex(i)}
                                layout
                                initial={false}
                                animate={{
                                    flex: isActive ? 6 : 1,
                                }}
                                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                                className={`relative min-h-[80px] sm:min-h-[100px] lg:min-h-0 h-auto lg:h-full overflow-hidden border ${isActive ? 'border-brand-red bg-brand-black' : 'border-brand-red/10 bg-[#0a0a0a] hover:bg-[#151515]'} cursor-none group flex flex-col lg:flex-row`}
                            >
                                {/* Background Image with zoom */}
                                {isActive && op.image && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 0.25, scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="absolute inset-0 bg-brand-black/60 mix-blend-multiply z-10" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/50 z-20" />
                                        <img src={op.image} alt={op.name} className="w-full h-full object-cover grayscale mix-blend-overlay blur-[1px]" />
                                    </motion.div>
                                )}

                                {/* Collapsed State */}
                                <div className={`absolute top-0 left-0 w-full h-full flex flex-row lg:flex-col items-center justify-between p-4 sm:p-6 transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="font-mono text-sm sm:text-xl tracking-widest text-brand-sand/50 lg:-rotate-90 origin-left whitespace-nowrap lg:mt-32">
                                        {op.name.toUpperCase()}
                                    </div>
                                    <op.icon size={24} className="text-brand-red/30 group-hover:text-brand-red/60 transition-colors" />
                                </div>

                                {/* Expanded State */}
                                <div className={`relative z-20 w-full h-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-between transition-opacity duration-300 delay-100 ${isActive ? 'opacity-100 min-h-[400px] sm:min-h-[500px]' : 'opacity-0 pointer-events-none h-0 lg:h-full'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-mono text-[9px] text-brand-saffron tracking-widest border border-brand-saffron/20 px-2 py-1 rounded inline-block mb-6 bg-brand-black/50 backdrop-blur-sm">
                                                ID: {op.id.toUpperCase()}
                                            </div>
                                            <motion.h3
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
                                                transition={{ delay: 0.1, duration: 0.4 }}
                                                className="font-display uppercase tracking-wider text-3xl sm:text-5xl md:text-7xl text-brand-white leading-none mb-4 drop-shadow-xl"
                                            >
                                                {op.name}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                                                transition={{ delay: 0.2, duration: 0.4 }}
                                                className="font-mono text-sm md:text-base text-brand-terracotta uppercase tracking-[0.2em]"
                                            >
                                                {op.role}
                                            </motion.div>
                                        </div>
                                        <op.icon size={64} strokeWidth={0.5} className="text-brand-red/20 hidden md:block" />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isActive ? 1 : 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="max-w-xl"
                                    >
                                        <p className="font-sans text-brand-sand/80 text-lg leading-relaxed border-l-2 border-brand-red pl-6 mb-12 bg-brand-black/20 backdrop-blur-sm py-2">
                                            {op.tagline}
                                        </p>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-10 border-t border-brand-red/20 pt-10">
                                            <div>
                                                <div className="font-mono text-[10px] uppercase tracking-widest text-brand-sand/40 mb-2">Focus</div>
                                                <div className="font-mono text-sm text-brand-white">{op.expertise?.[0]?.area || "Engineering"}</div>
                                            </div>
                                            <div>
                                                <div className="font-mono text-[10px] uppercase tracking-widest text-brand-sand/40 mb-2">Tenure</div>
                                                <div className="font-mono text-sm text-brand-white">{op.yearsActive}+ Yrs</div>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="font-mono text-[10px] uppercase tracking-widest text-brand-sand/40 mb-2">Projects</div>
                                                <div className="font-mono text-sm text-brand-white">{op.projectsCompleted} Shipped</div>
                                            </div>
                                        </div>

                                        <Link to={`/team/${op.id}`} className="inline-flex items-center gap-4 group/link">
                                            <div className="w-12 h-12 rounded-full border border-brand-red/50 flex items-center justify-center group-hover/link:bg-brand-red group-hover/link:border-brand-red transition-all duration-300">
                                                <ArrowUpRight className="w-5 h-5 text-brand-red group-hover/link:text-brand-black group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                                            </div>
                                            <span className="font-mono text-xs text-brand-sand uppercase tracking-widest group-hover/link:text-brand-white transition-colors">
                                                Access Profile
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TeamManifest;