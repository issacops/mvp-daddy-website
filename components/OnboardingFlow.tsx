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
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onEnter && onEnter()}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="relative w-full bg-black/50 border-b-2 border-white/10 focus:border-accent text-2xl md:text-4xl py-4 px-2 text-white placeholder-white/20 outline-none transition-all duration-300 font-sans font-light"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Terminal size={20} className="text-accent/50" />
        </div>
    </div>
);

const ChoiceButton = ({
    label,
    selected,
    onClick
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={`group relative px-8 py-6 text-left transition-all duration-300 w-full md:w-auto min-w-[200px] overflow-hidden border ${selected ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
    >
        <div className={`absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out ${selected ? 'translate-y-0' : ''}`} />
        <span className={`relative font-mono text-sm uppercase tracking-widest ${selected ? 'text-accent' : 'text-white/60 group-hover:text-white'}`}>
            {label}
        </span>
        {selected && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent">
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('FORM SUBMISSION:', formData);
        localStorage.setItem('mvp_daddy_onboarding', JSON.stringify(formData));
        setIsSubmitting(false);
        setStep(6); // Success screen
    };

    const questions = [
        {
            id: 'identity',
            label: 'IDENTIFICATION',
            question: 'Who is initiating this protocol?',
            subtext: 'Enter your name or alias.',
            component: (
                <InputField
                    value={formData.name}
                    onChange={v => setFormData({ ...formData, name: v })}
                    placeholder="John Doe"
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'signal',
            label: 'SIGNAL FREQUENCY',
            question: 'Where should we transmit the blueprints?',
            subtext: 'Secure email address required.',
            component: (
                <InputField
                    value={formData.email}
                    onChange={v => setFormData({ ...formData, email: v })}
                    placeholder="name@company.com"
                    type="email"
                    autoFocus
                    onEnter={handleNext}
                />
            )
        },
        {
            id: 'vision',
            label: 'OBJECTIVE',
            question: 'What are we building?',
            subtext: 'Briefly describe your vision or problem statement.',
            component: (
                <div className="w-full max-w-2xl relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <textarea
                        value={formData.vision}
                        onChange={e => setFormData({ ...formData, vision: e.target.value })}
                        placeholder="I want to disrupt..."
                        className="relative w-full bg-black/50 border-b-2 border-white/10 focus:border-accent text-xl md:text-2xl py-4 px-2 text-white placeholder-white/20 outline-none transition-all duration-300 font-sans font-light min-h-[150px] resize-none"
                        autoFocus
                    />
                </div>
            )
        },
        {
            id: 'budget',
            label: 'RESOURCE ALLOCATION',
            question: 'What is the deployment budget?',
            subtext: 'Select the appropriate tier.',
            component: (
                <div className="flex flex-wrap gap-4">
                    {['< $5k', '$5k - $15k', '$15k - $50k', '$50k +'].map(opt => (
                        <ChoiceButton
                            key={opt}
                            label={opt}
                            selected={formData.budget === opt}
                            onClick={() => {
                                setFormData({ ...formData, budget: opt });
                                // Auto advance after selection for smoother flow
                                setTimeout(handleNext, 300);
                            }}
                        />
                    ))}
                </div>
            )
        },
        {
            id: 'timeline',
            label: 'VELOCITY',
            question: 'When do we launch?',
            subtext: 'Time-to-market requirements.',
            component: (
                <div className="flex flex-wrap gap-4">
                    {['Yesterday (ASAP)', '1 Month', '3 Months', 'Flexible'].map(opt => (
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
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden relative font-sans">
            {/* Background Ambience */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#000000_100%)] z-0" />
            <div className="fixed inset-0 opacity-20 pointer-events-none holo-grid z-0" />
            <div className="fixed inset-0 opacity-5 pointer-events-none film-grain z-0" />

            {/* Header / Progress */}
            <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-accent/50 font-mono text-xs tracking-widest uppercase">
                        <Cpu size={12} />
                        <span>Initiation Protocol v1.0</span>
                    </div>
                    {step > 0 && step < 6 && (
                        <div className="flex gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div
                                    key={i}
                                    className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= step ? 'bg-accent' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="pointer-events-auto text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
                >
                    [ Abort ]
                </button>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-6 md:p-24">
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
                                <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-ping" />
                                <div className="absolute inset-0 border border-accent rounded-full animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center text-accent">
                                    <Zap size={32} />
                                </div>
                            </div>

                            <div className="font-mono text-accent text-sm tracking-[0.5em] uppercase">
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
                            <div className="mb-8 flex items-center gap-3 text-accent/60 font-mono text-xs uppercase tracking-widest">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <ScrambleText text={questions[step - 1].label} />
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                                {questions[step - 1].question}
                            </h2>

                            <p className="text-white/40 text-lg mb-12 font-light">
                                {questions[step - 1].subtext}
                            </p>

                            <div className="mb-16">
                                {questions[step - 1].component}
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-8">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className={`text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    ← Back
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide hover:bg-accent hover:text-white transition-all duration-300"
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
                            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 text-accent border border-accent/20">
                                <Shield size={40} />
                            </div>

                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
                                Transmission Received.
                            </h2>

                            <p className="text-white/60 text-xl leading-relaxed mb-12">
                                Your coordinates have been logged. <br />
                                Our architects are analyzing your parameters. <br />
                                <span className="text-accent">Standby for contact.</span>
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 border border-white/10 hover:border-accent hover:text-accent text-white/60 font-mono text-xs uppercase tracking-widest transition-all duration-300"
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
