import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Brain, Cpu, Palette, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllTeamMembers } from '../data/teamData';

const iconMap: Record<string, any> = {
    'issac_jacob': Zap,
    'ishwari_jadhav': Shield,
    'ameya_ingale': Brain,
    'derek_dsouza': Cpu,
    'dinesh_lade': Palette
};

const colorMap: Record<string, string> = {
    'issac_jacob': 'text-accent',
    'ishwari_jadhav': 'text-blue-400',
    'ameya_ingale': 'text-purple-400',
    'derek_dsouza': 'text-cyan-400',
    'dinesh_lade': 'text-pink-400'
};

const operators = getAllTeamMembers().map(member => ({
    id: member.id,
    role: member.role,
    name: member.name,
    tagline: member.tagline,
    stats: [
        { label: "Projects", value: member.projectsCompleted.toString() },
        { label: "Years", value: `${member.yearsActive}+` }
    ],
    icon: iconMap[member.id] || Zap,
    color: colorMap[member.id] || 'text-accent'
}));

const TeamManifest = () => {
    const [activeOp, setActiveOp] = useState<number | null>(null);

    return (
        <section className="relative z-20 py-32 px-4 md:px-12 border-t border-white/5 bg-void/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="font-serif italic text-5xl md:text-7xl text-white leading-none mb-2">
                            Specialized <br /><span className="not-italic font-sans font-bold tracking-tight">Operators</span>
                        </h2>
                    </div>
                    <div className="font-mono text-xs text-white/40 mb-2 text-right">
                        [ UNIT_DEPLOYMENT ]<br />
                        NO_BLOAT_DETECTED
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[500px]">
                    {operators.map((op, i) => (
                        <Link
                            key={op.id}
                            to={`/team/${op.id}`}
                            className="block h-full cursor-none"
                        >
                            <motion.div
                                onMouseEnter={() => setActiveOp(i)}
                                onMouseLeave={() => setActiveOp(null)}
                                className={`relative h-full border border-white/10 p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden group ${activeOp === i ? 'bg-white/5 border-white/30' : 'bg-transparent'}`}
                            >
                                <div className="absolute right-[-20%] bottom-[-20%] opacity-[0.05] group-hover:opacity-10 transition-opacity duration-700">
                                    <op.icon size={300} strokeWidth={0.5} />
                                </div>

                                <div className="flex justify-between items-start">
                                    <div className="font-mono text-[9px] text-accent tracking-widest border border-accent/20 px-2 py-1 rounded">
                                        {op.id}
                                    </div>
                                    <Activity size={14} className="text-white/20 group-hover:text-accent transition-colors" />
                                </div>

                                <div className="relative z-10">
                                    <h3 className={`font-sans font-bold text-2xl md:text-3xl mb-2 transition-colors duration-300 ${activeOp === i ? 'text-white' : 'text-white/70'}`}>
                                        {op.name}
                                    </h3>
                                    <div className="font-mono text-xs text-accent mb-4 uppercase tracking-wider">
                                        {op.role}
                                    </div>
                                    <p className="font-sans text-sm text-white/60 leading-relaxed border-l-2 border-white/10 pl-4">
                                        {op.tagline}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-8">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        {op.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                <div className="font-mono text-[9px] uppercase text-white/30 mb-1">{stat.label}</div>
                                                <div className={`font-mono text-sm ${op.color}`}>{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* View Profile Indicator */}
                                    <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="font-mono text-xs uppercase tracking-wider">View Profile</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                <motion.div
                                    className="absolute inset-0 border-2 border-accent/50 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: activeOp === i ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamManifest;