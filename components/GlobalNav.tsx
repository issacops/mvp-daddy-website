import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';
import { projectData } from '../data/projectData';

const GlobalNav: React.FC = () => {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const location = useLocation();

    const projects = Object.values(projectData);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3">
                    <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl pointer-events-auto">
                        <div className="px-4 md:px-6 py-2 md:py-2.5 flex items-center justify-between gap-4">
                            {/* Logo */}
                            <Link to="/" className="flex items-center group shrink-0">
                                <img
                                    src="/assets/mvp-daddy-logo.svg"
                                    alt="MVP Daddy"
                                    className="h-20 md:h-28 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                                />
                            </Link>

                            {/* Navigation Links */}
                            <div className="flex items-center gap-3 md:gap-6">
                                {/* Projects Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsProjectsOpen(true)}
                                    onMouseLeave={() => setIsProjectsOpen(false)}
                                >
                                    <button className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors font-medium text-xs md:text-sm px-3 py-2 rounded-full hover:bg-white/5">
                                        Projects
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isProjectsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full right-0 mt-2 w-80 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                                            >
                                                <div className="p-2">
                                                    {projects.map((project, i) => (
                                                        <Link
                                                            key={project.id}
                                                            to={`/project/${project.id}`}
                                                            className="block p-4 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/40 transition-colors">
                                                                    <span className="text-accent font-bold text-xs">
                                                                        {String(i + 1).padStart(2, '0')}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-semibold text-white text-sm mb-1 group-hover:text-accent transition-colors">
                                                                        {project.name}
                                                                    </div>
                                                                    <div className="text-white/50 text-xs font-mono">
                                                                        {project.domain}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Team Link */}
                                <Link
                                    to="/#team"
                                    className="text-white/70 hover:text-white transition-colors font-medium text-xs md:text-sm px-3 py-2 rounded-full hover:bg-white/5 hidden sm:block"
                                >
                                    Team
                                </Link>

                                {/* Initiate Protocol CTA */}
                                <Link
                                    to="/initiate"
                                    className="px-4 md:px-6 py-2 bg-gradient-to-r from-accent to-orange-500 text-black font-bold text-xs md:text-sm rounded-full hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:scale-105 transform"
                                >
                                    Initiate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Spacer to prevent content from going under nav */}
            <div className="h-28 md:h-36" />
        </>
    );
};

export default GlobalNav;
