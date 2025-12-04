import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { projectData } from '../data/projectData';

const GlobalNav: React.FC = () => {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 md:py-3">
                    <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl pointer-events-auto">
                        <div className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
                            {/* Logo */}
                            <Link to="/" className="flex items-center group shrink-0">
                                <img
                                    src="/assets/mvp-daddy-logo.svg"
                                    alt="MVP Daddy"
                                    className="h-10 sm:h-14 md:h-20 lg:h-24 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                                />
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden md:flex items-center gap-3 md:gap-6">
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
                                    className="text-white/70 hover:text-white transition-colors font-medium text-xs md:text-sm px-3 py-2 rounded-full hover:bg-white/5"
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

                            {/* Mobile Menu Button */}
                            <div className="flex md:hidden items-center gap-2">
                                <Link
                                    to="/initiate"
                                    className="px-3 py-1.5 bg-gradient-to-r from-accent to-orange-500 text-black font-bold text-xs rounded-full"
                                >
                                    Initiate
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 text-white/70 hover:text-white transition-colors"
                                >
                                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[280px] bg-void border-l border-white/10 p-6 pt-20"
                        >
                            <div className="space-y-4">
                                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">Navigation</div>

                                <Link
                                    to="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-3 text-white/70 hover:text-white border-b border-white/5 font-medium"
                                >
                                    Home
                                </Link>

                                <div className="py-3 border-b border-white/5">
                                    <div className="text-white/70 font-medium mb-3">Projects</div>
                                    <div className="space-y-2 pl-4">
                                        {projects.map((project) => (
                                            <Link
                                                key={project.id}
                                                to={`/project/${project.id}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-2 text-sm text-white/50 hover:text-accent transition-colors"
                                            >
                                                {project.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to="/#team"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-3 text-white/70 hover:text-white border-b border-white/5 font-medium"
                                >
                                    Team
                                </Link>

                                <Link
                                    to="/initiate"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block mt-6 w-full py-3 bg-accent text-black font-bold text-center rounded-full"
                                >
                                    Initiate Protocol
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content from going under nav */}
            <div className="h-16 sm:h-20 md:h-28 lg:h-32" />
        </>
    );
};

export default GlobalNav;
