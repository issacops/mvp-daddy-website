import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, Code, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getTeamMember } from '../data/teamData';
import CommandPalette from './CommandPalette';
import CustomCursor from './CustomCursor';

const TeamProfile: React.FC = () => {
    const { operatorId } = useParams<{ operatorId: string }>();
    const member = operatorId ? getTeamMember(operatorId) : undefined;
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (!member) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-serif text-4xl text-white mb-4">Operator Not Found</h1>
                    <Link to="/" className="text-accent hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-void text-white overflow-x-hidden">
            <CustomCursor isFlaring={false} />
            <CommandPalette />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="fixed inset-0 pointer-events-none holo-grid opacity-10" />

            {/* Minimal Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link to="/" className="pointer-events-auto p-3 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group">
                        <ArrowLeft size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </Link>
                    <button
                        onClick={() => {
                            const event = new KeyboardEvent('keydown', { key: '/' });
                            window.dispatchEvent(event);
                        }}
                        className="pointer-events-auto px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-mono text-xs text-white/60 hover:text-white hidden md:block"
                    >
                        Press <span className="text-accent">/</span> to navigate
                    </button>
                </div>
            </motion.div>

            {/* Hero Section */}
            <motion.section
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24"
            >
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Operator ID */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-mono text-xs text-accent uppercase tracking-widest mb-6"
                    >
                        {member.id.toUpperCase().replace('_', ' ')} / OPERATOR PROFILE
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-sans font-bold text-5xl md:text-7xl text-white mb-4 leading-tight"
                    >
                        {member.name}
                    </motion.h1>

                    {/* Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-mono text-sm md:text-base text-accent uppercase tracking-wider mb-8"
                    >
                        {member.role}
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="font-sans text-lg md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 leading-relaxed"
                    >
                        {member.tagline}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-12"
                    >
                        <div className="text-center">
                            <div className="font-mono text-5xl md:text-6xl text-accent mb-2">{member.yearsActive}+</div>
                            <div className="font-sans text-sm text-white/40 uppercase tracking-wider">Years Active</div>
                        </div>
                        <div className="text-center">
                            <div className="font-mono text-5xl md:text-6xl text-accent mb-2">{member.projectsCompleted}</div>
                            <div className="font-sans text-sm text-white/40 uppercase tracking-wider">Projects Shipped</div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Philosophy Section */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-8">Philosophy</h2>
                        <p className="font-sans text-xl md:text-2xl text-white/80 leading-relaxed border-l-4 border-accent pl-8">
                            {member.philosophy}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bio Section */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-12">Background</h2>
                        <div className="space-y-6">
                            {member.bio.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="font-sans text-base md:text-lg text-white/70 leading-relaxed"
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-12">Expertise</h2>
                        <div className="space-y-6">
                            {member.expertise.map((skill, index) => (
                                <motion.div
                                    key={skill.area}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-sans text-white/80">{skill.area}</span>
                                        <span className="font-mono text-sm text-accent">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.05 }}
                                            className="h-full bg-gradient-to-r from-accent to-orange-500"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-12">Approach</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {member.approach.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 border border-white/10 p-6 rounded-lg hover:bg-white/10 hover:border-accent/50 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <Zap size={16} className="text-accent" />
                                        <h3 className="font-sans font-bold text-white">{item.title}</h3>
                                    </div>
                                    <p className="font-sans text-sm text-white/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-xs text-accent uppercase tracking-widest mb-12">Project Timeline</h2>
                        <div className="space-y-12">
                            {member.timeline.map((project, index) => (
                                <motion.div
                                    key={`${project.year}-${project.project}`}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex flex-col md:flex-row gap-8 md:gap-12"
                                >
                                    {/* Year */}
                                    <div className="flex-shrink-0 md:w-24">
                                        <div className="inline-flex items-center gap-2 font-mono text-2xl text-accent">
                                            <Calendar className="w-5 h-5" />
                                            {project.year}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow border-l-2 border-white/10 group-hover:border-accent/50 pl-8 transition-colors">
                                        <h3 className="font-sans font-bold text-2xl text-white mb-3">{project.project}</h3>

                                        <div className="flex items-center gap-2 text-accent mb-4">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="font-sans text-sm">{project.impact}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-white/60"
                                                >
                                                    <Code className="w-3 h-3" />
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-sans font-bold text-4xl md:text-6xl text-white mb-8">
                            Ready to build something extraordinary?
                        </h2>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/80 text-black font-sans font-bold rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Explore Our Work
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TeamProfile;
