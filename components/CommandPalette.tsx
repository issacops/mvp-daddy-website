import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface SearchItem {
    id: string;
    title: string;
    subtitle: string;
    path: string;
    type: 'page' | 'project' | 'team';
}

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Build search index
    const searchItems: SearchItem[] = [
        { id: 'home', title: 'Home', subtitle: 'Main page', path: '/', type: 'page' },
        { id: 'initiate', title: 'Initiate Protocol', subtitle: 'Onboarding flow', path: '/initiate', type: 'page' },
        ...Object.values(projectData).map(p => ({
            id: p.id,
            title: p.name,
            subtitle: p.domain,
            path: `/project/${p.id}`,
            type: 'project' as const
        }))
    ];

    // Filter items based on query
    const filteredItems = query.trim() === ''
        ? searchItems
        : searchItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase())
        );

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with / or Cmd/Ctrl+K
            if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
                e.preventDefault();
                setIsOpen(true);
            }

            // Close with Escape
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
                setSelectedIndex(0);
            }

            // Navigate with arrow keys
            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredItems.length);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
                }
                if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                    e.preventDefault();
                    navigate(filteredItems[selectedIndex].path);
                    setIsOpen(false);
                    setQuery('');
                    setSelectedIndex(0);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, selectedIndex, navigate]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Reset selected index when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[15%] sm:top-[20%] left-1/2 -translate-x-1/2 w-[95%] sm:w-full max-w-2xl z-[101] px-2 sm:px-4"
                    >
                        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
                                <Search size={18} className="text-white/40 shrink-0 sm:w-5 sm:h-5" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search pages, projects..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base sm:text-lg"
                                />
                                <kbd className="hidden sm:block px-2 py-1 bg-white/10 rounded text-xs text-white/60 font-mono">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {filteredItems.length === 0 ? (
                                    <div className="px-6 py-8 text-center text-white/40">
                                        No results found
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {filteredItems.map((item, index) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    navigate(item.path);
                                                    setIsOpen(false);
                                                    setQuery('');
                                                    setSelectedIndex(0);
                                                }}
                                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${index === selectedIndex
                                                    ? 'bg-accent/20 border border-accent/40'
                                                    : 'hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                                                    <span className="text-accent font-bold text-sm">
                                                        {item.type === 'project' ? 'P' : item.type === 'team' ? 'T' : 'H'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="font-semibold text-white text-sm">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-white/40 text-xs font-mono">
                                                        {item.subtitle}
                                                    </div>
                                                </div>
                                                <ArrowRight size={16} className="text-white/40" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 sm:px-6 py-2 sm:py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                                <div className="hidden sm:flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">↓</kbd>
                                        <span className="ml-1">Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">↵</kbd>
                                        <span className="ml-1">Select</span>
                                    </div>
                                </div>
                                <div className="font-mono text-center sm:text-left w-full sm:w-auto">
                                    <span className="sm:hidden">Tap to select</span>
                                    <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">/</kbd> or{' '}
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded">⌘K</kbd> to open</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
