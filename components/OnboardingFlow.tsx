/// <reference types="vite/client" />
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Terminal, Cpu, Shield, Zap } from 'lucide-react';
import ScrambleText from './ScrambleText';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface FormData {
    name: string;
    email: string;
    vision: string;
    budget: string;
    timeline: string;
}

const INITIAL_DATA: FormData = {
    name: '',
    email: '',
    vision: '',
    budget: '',
    timeline: ''
};

// --- Components ---

const InputField = ({
    value,
    onChange,
    placeholder,
    type = "text",
    autoFocus = false,
    onEnter
}: {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: string;
    autoFocus?: boolean;
    onEnter?: () => void;
}) => (
    <div className="relative group w-full max-w-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="relative w-full bg-transparent border-b-2 border-brand-sand/30 focus:border-brand-red text-3xl sm:text-4xl md:text-5xl py-3 sm:py-4 px-2 text-brand-white placeholder-brand-sand/30 outline-none transition-all duration-300 font-serif italic"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Terminal size={20} className="text-brand-red/50" />
        </div>
    </div>
);

const ChoiceButton: React.FC<{
    label: string;
    selected: boolean;
    onClick: () => void;
}> = ({ label, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`group relative px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] overflow-hidden border ${selected ? 'border-brand-red bg-brand-red/10' : 'border-brand-sand/20 hover:border-brand-saffron bg-brand-white/5'}`}
    >
        <div className={`absolute inset-0 bg-brand-red/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${selected ? 'translate-y-0' : ''}`} />
        <span className={`relative font-mono text-lg uppercase tracking-widest ${selected ? 'text-brand-red' : 'text-brand-sand/60 group-hover:text-brand-sand'}`}>
            {label}
        </span>
        {selected && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-red">
                <Check size={16} />
            </div>
        )}
    </button>
);

// --- Main Component ---

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0); // 0: Intro, 1-5: Questions, 6: Outro
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Intro State
    const [introPhase, setIntroPhase] = useState(0);

    useEffect(() => {
        // Intro Sequence
        if (step === 0) {
            const t1 = setTimeout(() => setIntroPhase(1), 1000); // Establishing Uplink
            const t2 = setTimeout(() => setIntroPhase(2), 2500); // Secure Connection
            const t3 = setTimeout(() => setStep(1), 4000); // Start Questions
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        }
    }, [step]);

    const handleNext = () => {
        if (step < 5) {
            setStep(s => s + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

        if (!scriptUrl) {
            console.warn('VITE_GOOGLE_SHEET_URL is not defined in environment variables.');
            // Fallback for development/preview
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('FORM DATA (NO WEBHOOK):', formData);
            setStep(6);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Essential for Google Apps Script webhooks
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    ...formData
                })
            });

            console.log('Submission transmitted');
            localStorage.setItem('mvp_daddy_onboarding', JSON.stringify(formData));
            setStep(6);
        } catch (error) {
            console.error('TRANSMISSION ERROR:', error);
            alert('System signal lost. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const questions = [
        {
            id: 'identity',
            label: 'INTRODUCTION',
            question: 'Who is initiating the inquiry?',
            subtext: 'Enter your name or the name of your organization.',
            component: (
                <InputField
                    value={formData.name}
                    onChange={v => setFormData({ ...formData, name: v })}
                    placeholder="Enter Name..."
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'signal',
            label: 'CORRESPONDENCE',
            question: 'Where should we direct our response?',
            subtext: 'Provide an email address for direct communication.',
            component: (
                <InputField
                    value={formData.email}
                    onChange={v => setFormData({ ...formData, email: v })}
                    placeholder="Email address..."
                    type="email"
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'vision',
            label: 'OBJECTIVE',
            question: 'What reality are you trying to build?',
            subtext: 'Briefly describe the digital or physical ecosystem you envision.',
            component: (
                <div className="w-full max-w-2xl relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <textarea
                        value={formData.vision}
                        onChange={e => setFormData({ ...formData, vision: e.target.value })}
                        placeholder="We envision a platform that..."
                        className="relative w-full bg-transparent border-b-2 border-brand-sand/30 focus:border-brand-red text-2xl sm:text-3xl md:text-4xl py-3 sm:py-4 px-2 text-brand-white placeholder-brand-sand/30 outline-none transition-all duration-300 font-serif italic min-h-[120px] sm:min-h-[150px] resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            id: 'budget',
            label: 'CAPITAL',
            question: 'What is the allocated investment?',
            subtext: 'This allows us to calibrate the depth of our architectural commitment.',
            component: (
                <div className="flex flex-wrap gap-4">
                    {['Seed ($20k - $50k)', 'Venture ($50k - $150k)', 'Enterprise ($150k+)', 'To Be Determined'].map(opt => (
                        <ChoiceButton
                            key={opt}
                            label={opt}
                            selected={formData.budget === opt}
                            onClick={() => {
                                setFormData({ ...formData, budget: opt });
                                setTimeout(handleNext, 300);
                            }}
                        />
                    ))}
                </div>
            )
        },
        {
            id: 'timeline',
            label: 'HORIZON',
            question: 'When must this materialize?',
            subtext: 'Specify your anticipated timeline for a market debut.',
            component: (
                <div className="flex flex-wrap gap-4">
                    {['Immediate', '1 - 3 Months', '3 - 6 Months', 'Long Range'].map(opt => (
                        <ChoiceButton
                            key={opt}
                            label={opt}
                            selected={formData.timeline === opt}
                            onClick={() => {
                                setFormData({ ...formData, timeline: opt });
                                setTimeout(handleNext, 300);
                            }}
                        />
                    ))}
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen w-full bg-brand-black text-brand-white overflow-hidden relative font-sans">
            {/* Background Ambience (Globals handle SVG noise) */}

            {/* Header / Progress */}
            <div className="fixed top-0 left-0 w-full p-4 sm:p-6 md:p-8 z-50 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-brand-red font-mono text-xs tracking-widest uppercase">
                        <Cpu size={12} />
                        <span>Initiation Protocol v1.0</span>
                    </div>
                    {step > 0 && step < 6 && (
                        <>
                            {/* Step Counter */}
                            <div className="font-mono text-sm text-brand-sand/60 mt-1">
                                Step <span className="text-brand-saffron font-bold">{step}</span> of <span className="text-brand-white">5</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-32 sm:w-48 h-1.5 bg-brand-sand/10 rounded-none mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-brand-terracotta to-brand-red rounded-none transition-all duration-500 ease-out"
                                    style={{ width: `${(step / 5) * 100}%` }}
                                />
                            </div>
                            <div className="font-mono text-[10px] text-brand-sand/40 mt-1">
                                {Math.round((step / 5) * 100)}% complete
                            </div>
                        </>
                    )}
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto text-brand-sand/60 hover:text-brand-red font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                    <span>Exit</span>
                    <span className="text-brand-sand/40">×</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24">
                <AnimatePresence mode="wait">

                    {/* STEP 0: INTRO */}
                    {step === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            className="text-center space-y-8"
                        >
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 border-2 border-brand-red/30 rounded-full animate-ping" />
                                <div className="absolute inset-0 border border-brand-red rounded-full animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center text-brand-red">
                                    <Zap size={32} />
                                </div>
                            </div>

                            <div className="font-mono text-brand-saffron text-lg tracking-[0.5em] uppercase">
                                <ScrambleText text={
                                    introPhase === 0 ? "Initializing..." :
                                        introPhase === 1 ? "Establishing Uplink..." :
                                            "Connection Secure"
                                } />
                            </div>
                        </motion.div>
                    )}

                    {/* STEPS 1-5: QUESTIONS */}
                    {step > 0 && step < 6 && (
                        <motion.div
                            key={`step-${step}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50, filter: 'blur(5px)' }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="w-full max-w-4xl"
                        >
                            <div className="mb-8 flex items-center gap-3 text-brand-saffron font-mono text-sm uppercase tracking-widest">
                                <span className="w-2 h-2 bg-brand-red rounded-none animate-pulse" />
                                <ScrambleText text={questions[step - 1].label} />
                            </div>

                            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter text-brand-white mb-3 sm:mb-6 leading-none">
                                {questions[step - 1].question}
                            </h2>

                            <p className="font-serif italic text-brand-sand/80 text-2xl md:text-3xl mb-12 font-light">
                                {questions[step - 1].subtext}
                            </p>

                            <div className="mb-16">
                                {questions[step - 1].component}
                            </div>

                            <div className="flex items-center justify-between border-t border-brand-red/30 pt-8">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className={`text-brand-sand/60 hover:text-brand-saffron font-mono text-sm uppercase tracking-widest transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    ← Back
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="group flex items-center gap-3 sm:gap-4 bg-transparent border-2 border-brand-red text-brand-red px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-mono text-lg uppercase tracking-widest hover:bg-brand-red hover:text-brand-white transition-all duration-300"
                                >
                                    <span>{step === 5 ? 'TRANSMIT' : 'CONTINUE'}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: OUTRO */}
                    {step === 6 && (
                        <motion.div
                            key="outro"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center max-w-2xl"
                        >
                            <div className="w-20 h-20 bg-brand-red/10 flex items-center justify-center mx-auto mb-8 text-brand-red border border-brand-red/30">
                                <Shield size={40} />
                            </div>

                            <h2 className="font-display uppercase tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-white mb-4 sm:mb-6 leading-none">
                                Transmission Received.
                            </h2>

                            <p className="font-serif italic text-brand-sand/80 text-2xl md:text-3xl leading-relaxed mb-12">
                                Your coordinates have been logged. <br />
                                Our architects are analyzing your parameters. <br />
                                <span className="text-brand-saffron block mt-4 font-mono not-italic text-sm tracking-widest uppercase">Standby for contact.</span>
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 border-2 border-brand-red hover:bg-brand-red hover:text-brand-white text-brand-red font-mono text-sm uppercase tracking-widest transition-all duration-300"
                            >
                                Return to Base
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OnboardingFlow;
