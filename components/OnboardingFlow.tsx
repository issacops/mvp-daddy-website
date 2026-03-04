/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
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

// --- Custom Scramble Component for Editorial Feel ---
const EditorialScramble = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text.replace(/[a-zA-Z]/g, '█'));

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(text.split('').map((char, index) => {
                if (index < iterations) return char;
                return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)] || '█';
            }).join(''));

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span>{display}</span>;
}

// --- High-Impact Components ---

const EditorialInput = ({
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
    <div className="relative w-full border-b-2 border-brand-red">
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full bg-transparent text-5xl sm:text-7xl lg:text-8xl py-6 font-serif italic text-brand-black placeholder-brand-black/20 outline-none transition-all duration-300"
        />
        <div className="absolute left-0 bottom-0 w-full h-1 bg-brand-red origin-left transform scale-x-0 transition-transform duration-500 will-change-transform group-focus-within:scale-x-100" />
    </div>
);

const BrutalistChoice: React.FC<{
    label: string;
    selected: boolean;
    onClick: () => void;
}> = ({ label, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`group relative p-8 text-left transition-all duration-300 w-full sm:w-[calc(50%-1rem)] border-2 ${selected ? 'border-brand-red bg-brand-red text-brand-white' : 'border-brand-black/20 bg-transparent text-brand-black hover:border-brand-red hover:bg-brand-red/5'}`}
    >
        <span className={`block font-display text-4xl uppercase tracking-tighter ${selected ? 'text-brand-white' : 'group-hover:text-brand-red'} transition-colors duration-300`}>
            {label}
        </span>
        {selected && (
            <div className="absolute top-4 right-4 text-brand-white">
                <Check size={32} strokeWidth={3} />
            </div>
        )}
    </button>
);

// --- Main Flow ---

const OnboardingFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [introPhase, setIntroPhase] = useState(0);

    useEffect(() => {
        // Dramatic Intro Sequence
        if (step === 0) {
            const t1 = setTimeout(() => setIntroPhase(1), 1200);
            const t2 = setTimeout(() => setStep(1), 3000);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [step]);

    const handleNext = () => {
        if (step < 5) setStep(s => s + 1);
        else handleSubmit();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

        if (!scriptUrl) {
            console.warn('VITE_GOOGLE_SHEET_URL not defined.');
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStep(6);
            setIsSubmitting(false);
            return;
        }

        try {
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    ...formData
                })
            });
            localStorage.setItem('mvp_daddy_onboarding', JSON.stringify(formData));
            setStep(6);
        } catch (error) {
            console.error('TRANSMISSION ERROR:', error);
            alert('Signal lost. Ensure connection and retry.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const questions = [
        {
            id: 'identity',
            label: '01 // Identity',
            question: 'Who is initiating the inquiry?',
            subtext: 'Your name or organization.',
            component: (
                <EditorialInput
                    value={formData.name}
                    onChange={v => setFormData({ ...formData, name: v })}
                    placeholder="Jane Doe"
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'signal',
            label: '02 // Coordinates',
            question: 'Where do we send the blueprint?',
            subtext: 'Primary email address.',
            component: (
                <EditorialInput
                    value={formData.email}
                    onChange={v => setFormData({ ...formData, email: v })}
                    placeholder="hello@startup.com"
                    type="email"
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'vision',
            label: '03 // The Problem',
            question: 'What product do you need engineered?',
            subtext: 'Describe the MVP and the market it serves.',
            component: (
                <div className="relative w-full">
                    <textarea
                        value={formData.vision}
                        onChange={e => setFormData({ ...formData, vision: e.target.value })}
                        placeholder="We need a platform that..."
                        className="w-full bg-transparent border-b-2 border-brand-red text-4xl sm:text-5xl lg:text-6xl py-6 font-serif italic text-brand-black placeholder-brand-black/20 outline-none transition-all duration-300 min-h-[200px] resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            id: 'budget',
            label: '04 // Investment',
            question: 'What is the allocated runway?',
            subtext: 'Calibrating architectural depth.',
            component: (
                <div className="flex flex-wrap gap-4 mt-8">
                    {['Seed ($20k+)', 'Venture ($50k+)', 'Enterprise ($150k+)', 'To Be Determined'].map(opt => (
                        <BrutalistChoice
                            key={opt}
                            label={opt}
                            selected={formData.budget === opt}
                            onClick={() => {
                                setFormData({ ...formData, budget: opt });
                                setTimeout(handleNext, 400);
                            }}
                        />
                    ))}
                </div>
            )
        },
        {
            id: 'timeline',
            label: '05 // Horizon',
            question: 'When must this go to market?',
            subtext: 'Anticipated launch timeline.',
            component: (
                <div className="flex flex-wrap gap-4 mt-8">
                    {['Immediate', 'Q1 (1-3 Mo)', 'Q2 (3-6 Mo)', 'Long Range'].map(opt => (
                        <BrutalistChoice
                            key={opt}
                            label={opt}
                            selected={formData.timeline === opt}
                            onClick={() => {
                                setFormData({ ...formData, timeline: opt });
                                setTimeout(handleNext, 400);
                            }}
                        />
                    ))}
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen w-full relative font-sans selection:bg-brand-red selection:text-white flex flex-col items-center justify-center pt-24 pb-12 lg:pt-0">
            {/* Global Background Overrides for this specific page component */}
            <div className="fixed inset-0 bg-[#F4F0EB] z-[-2]" />
            <div className="fixed inset-0 opacity-20 z-[-1] pointer-events-none" style={{ backgroundImage: 'var(--pattern)' }}></div>

            {/* Massive Header Nav */}
            <div className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-start">
                {step > 0 && step < 6 && (
                    <div className="flex flex-col gap-2">
                        <div className="font-mono text-sm tracking-widest uppercase text-brand-red font-bold">
                            Ignition Protocol [v2.0]
                        </div>
                        <div className="font-display text-4xl uppercase tracking-tighter text-brand-black mt-2">
                            {step} / 5
                        </div>
                    </div>
                )}
                {step === 0 && <div />}

                <button onClick={() => navigate('/')} className="group flex items-center justify-center w-16 h-16 border-2 border-brand-black hover:bg-brand-red hover:border-brand-red transition-all duration-300 rounded-full">
                    <X size={24} className="text-brand-black group-hover:text-white transition-colors" />
                </button>
            </div>

            <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 relative z-10 lg:pl-[10%]">
                <AnimatePresence mode="wait">

                    {/* STEP 0: THE AWWWARDS SPLASH */}
                    {step === 0 && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                            className="flex flex-col items-start"
                        >
                            <h1 className="font-display text-[15vw] leading-[0.85] uppercase tracking-tighter text-brand-red mix-blend-multiply">
                                <EditorialScramble text="IGNITION" />
                                <br />
                                <span className="text-brand-black">PROTOCOL</span>
                            </h1>
                            <div className="mt-12 font-mono text-xl tracking-widest uppercase text-brand-black/60 border-l-4 border-brand-red pl-6">
                                {introPhase === 0 ? "Establishing parameters..." : "Initiating sequence..."}
                            </div>
                        </motion.div>
                    )}

                    {/* STEPS 1-5: THE QUESTIONNAIRE */}
                    {step > 0 && step < 6 && (
                        <motion.div
                            key={`step-${step}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                            className="w-full max-w-5xl"
                        >
                            <div className="mb-4 font-mono text-sm uppercase tracking-widest text-brand-red font-bold">
                                {questions[step - 1].label}
                            </div>

                            <h2 className="font-display text-[8vw] lg:text-[6rem] uppercase tracking-tighter text-brand-black mb-6 leading-[0.9]">
                                {questions[step - 1].question}
                            </h2>

                            <p className="font-mono text-lg lg:text-xl text-brand-black/50 mb-16 uppercase tracking-widest">
                                [ {questions[step - 1].subtext} ]
                            </p>

                            <div className="mb-16">
                                {questions[step - 1].component}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t-2 border-brand-black/10">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className={`font-mono text-sm uppercase tracking-widest hover:text-brand-red transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-brand-black/40'}`}
                                >
                                    [ Return ]
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                    className="group flexitems-center gap-6 bg-brand-red text-white p-6 lg:p-8 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-between sm:justify-center relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-brand-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 font-display text-3xl uppercase tracking-tighter mt-1">
                                        {step === 5 ? (isSubmitting ? 'Transmitting...' : 'Initiate') : 'Next Vector'}
                                    </span>
                                    <ArrowRight size={32} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: THE OUTRO */}
                    {step === 6 && (
                        <motion.div
                            key="outro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-start"
                        >
                            <div className="font-mono text-brand-red mb-8 tracking-widest uppercase text-xl animate-pulse">
                                [ Transmission Received ]
                            </div>

                            <h2 className="font-display text-[12vw] leading-[0.85] uppercase tracking-tighter text-brand-black mb-12">
                                YOUR <br />
                                <span className="text-brand-red">COORDINATES</span> <br />
                                ARE SET.
                            </h2>

                            <p className="font-serif italic text-3xl lg:text-5xl text-brand-black/70 mb-16">
                                Our architects will map the next trajectory. Standby.
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                className="group relative overflow-hidden border-2 border-brand-black bg-transparent text-brand-black px-12 py-6 font-display text-3xl uppercase tracking-tighter transition-colors hover:text-white"
                            >
                                <div className="absolute inset-0 bg-brand-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-[-1]" />
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
