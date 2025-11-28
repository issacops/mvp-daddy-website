import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Wind, Mountain, Share2, MoreHorizontal, Radio, Map as MapIcon, Calendar, Layers, Cpu, Shield, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ScrambleText from './ScrambleText';
import CustomCursor from './CustomCursor';
import { projectData } from '../data/projectData';
import CommandPalette from './CommandPalette';

const Waveform = () => {
    return (
        <div className="flex items-end justify-between h-12 gap-1">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-accent/50 rounded-t-sm"
                    animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                />
            ))}
        </div>
    )
}

const BarChart = () => {
    return (
        <div className="flex items-end justify-between h-32 w-full gap-2 mt-4">
            {[...Array(12)].map((_, i) => {
                const h = Math.random() * 80 + 20;
                return (
                    <div key={i} className="flex flex-col items-center gap-2 w-full">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className={`w-full rounded-t-sm ${i === 8 ? 'bg-white' : 'bg-white/10'}`}
                        />
                        <span className="text-[9px] font-mono text-white/20">{(i + 8) % 12 || 12}p</span>
                    </div>
                )
            })}
        </div>
    )
}

const HolographicArchitecture = ({ layers }: { layers: string[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width * 2;
        canvas.height = height * 2;
        ctx.scale(2, 2);

        let time = 0;
        let animationFrameId: number;

        // Particles for data flow
        const particles = Array(15).fill(0).map(() => ({
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 300,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 2 + 1
        }));

        const drawLayer = (yOffset: number, label: string, color: string, index: number, total: number) => {
            const size = 140;
            const centerX = width / 2;
            const centerY = height / 2 + 80 - yOffset;

            // Isometric rotation
            const rot = time * 0.2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(1, 0.5); // Isometric squash
            ctx.rotate(rot);

            // 1. Glass Plate Background
            ctx.beginPath();
            ctx.rect(-size / 2, -size / 2, size, size);
            ctx.fillStyle = color.replace('1)', '0.05)'); // Very transparent
            ctx.fill();

            // 2. Grid Pattern on Plate
            ctx.strokeStyle = color.replace('1)', '0.1)');
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = -size / 2; i <= size / 2; i += 20) {
                ctx.moveTo(i, -size / 2);
                ctx.lineTo(i, size / 2);
                ctx.moveTo(-size / 2, i);
                ctx.lineTo(size / 2, i);
            }
            ctx.stroke();

            // 3. Glowing Edges
            ctx.strokeStyle = color.replace('1)', '0.6)');
            ctx.lineWidth = 2;
            ctx.strokeRect(-size / 2, -size / 2, size, size);

            // 4. Corner Accents (Tech look)
            ctx.fillStyle = color;
            const cornerSize = 6;
            const cornerOffset = 2;
            ctx.fillRect(-size / 2 - cornerOffset, -size / 2 - cornerOffset, cornerSize, 1);
            ctx.fillRect(-size / 2 - cornerOffset, -size / 2 - cornerOffset, 1, cornerSize);

            ctx.fillRect(size / 2 + cornerOffset - cornerSize, -size / 2 - cornerOffset, cornerSize, 1);
            ctx.fillRect(size / 2 + cornerOffset, -size / 2 - cornerOffset, 1, cornerSize);

            ctx.fillRect(size / 2 + cornerOffset - cornerSize, size / 2 + cornerOffset, cornerSize, 1);
            ctx.fillRect(size / 2 + cornerOffset, size / 2 + cornerOffset - cornerSize, 1, cornerSize);

            ctx.fillRect(-size / 2 - cornerOffset, size / 2 + cornerOffset, cornerSize, 1);
            ctx.fillRect(-size / 2 - cornerOffset, size / 2 + cornerOffset - cornerSize, 1, cornerSize);

            ctx.restore();

            // 5. Connecting Beams (Vertical)
            if (index < total - 1) {
                const nextY = height / 2 + 80 - (index + 1) * 60;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX, nextY);
                ctx.strokeStyle = color.replace('1)', '0.2)');
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // 6. Label (Floating with leader line)
            // Calculate 2D position of a corner for the label
            // Corner is at (size/2, -size/2) in rotated space
            const rad = rot;
            const cornerX_rot = (size / 2) * Math.cos(rad) - (-size / 2) * Math.sin(rad);
            const cornerY_rot = ((size / 2) * Math.sin(rad) + (-size / 2) * Math.cos(rad)) * 0.5; // Squash

            const labelX = centerX + cornerX_rot + 40;
            const labelY = centerY + cornerY_rot - 10;

            ctx.beginPath();
            ctx.moveTo(centerX + cornerX_rot, centerY + cornerY_rot);
            ctx.lineTo(labelX, labelY);
            ctx.lineTo(labelX + 20, labelY);
            ctx.strokeStyle = color.replace('1)', '0.4)');
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.font = '10px monospace';
            ctx.fillText(label.toUpperCase(), labelX + 25, labelY + 4);
        };

        const drawOrbitalRing = (radius: number, speed: number, color: string) => {
            const centerX = width / 2;
            const centerY = height / 2; // Center of the stack roughly

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(1, 0.3); // Heavy squash for perspective
            ctx.rotate(time * speed);

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = color.replace('1)', '0.1)');
            ctx.lineWidth = 1;
            ctx.stroke();

            // Add a "satellite"
            const satAngle = time * speed * 2;
            const satX = Math.cos(satAngle) * radius;
            const satY = Math.sin(satAngle) * radius;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(satX, satY, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Orbital Rings (Background)
            drawOrbitalRing(180, 0.1, 'rgba(255,255,255,1)');
            drawOrbitalRing(220, -0.15, 'rgba(59, 130, 246, 1)'); // Blue

            // Draw Data Flow Particles
            ctx.fillStyle = 'rgba(255, 153, 51, 0.6)'; // Accent color
            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) p.y = 300; // Reset

                const centerX = width / 2;
                const bottomY = height / 2 + 80;
                const pY = bottomY - p.y;

                ctx.beginPath();
                ctx.arc(centerX + p.x, pY, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw layers from bottom to top
            layers.forEach((layer, i) => {
                const yPos = i * 60; // Spacing
                const color = i === layers.length - 1 ? 'rgba(255, 153, 51, 1)' : 'rgba(255,255,255,0.8)';
                drawLayer(yPos, layer, color, i, layers.length);
            });

            // Scanning Laser Effect
            const scanHeight = (Math.sin(time * 2) * 0.5 + 0.5) * (layers.length * 60 + 50);
            const scanY = height / 2 + 80 - scanHeight;

            ctx.beginPath();
            ctx.moveTo(width / 2 - 100, scanY);
            ctx.lineTo(width / 2 + 100, scanY);
            ctx.strokeStyle = 'rgba(255, 153, 51, 0.5)';
            ctx.lineWidth = 2;
            // ctx.stroke(); // Optional: Disable line, just use glow

            // Laser Glow
            const gradient = ctx.createRadialGradient(width / 2, scanY, 0, width / 2, scanY, 100);
            gradient.addColorStop(0, 'rgba(255, 153, 51, 0.2)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            time += 0.01;
            animationFrameId = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, [layers]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}

const ProjectDashboard = () => {
    const { id } = useParams();
    // Default to 'cheapeth' if id not found or invalid
    const data = projectData[id || "cheapeth"] || projectData["cheapeth"];
    const [isFlaring, setIsFlaring] = useState(false);

    return (
        <div
            className="min-h-screen bg-void text-white font-sans selection:bg-accent selection:text-white cursor-none overflow-hidden"
            onMouseDown={() => setIsFlaring(true)}
            onMouseUp={() => setIsFlaring(false)}
        >
            <CustomCursor isFlaring={isFlaring} />
            <CommandPalette />

            <div className="fixed inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="fixed inset-0 pointer-events-none holo-grid opacity-10" />

            {/* Top Navigation Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none"
            >
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    {/* Left: Back Button */}
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <Link to="/" className="p-3 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 group">
                            <ArrowLeft size={20} className="text-white/60 group-hover:text-white transition-colors" />
                        </Link>
                    </div>

                    {/* Center: Project Name */}
                    <div className="pointer-events-auto flex items-center gap-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3">
                        <div className="flex flex-col items-center">
                            <h1 className="font-sans font-bold text-lg md:text-xl text-white tracking-tight">
                                {data.name}
                            </h1>
                            <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-mono uppercase text-white/40 tracking-widest mt-1">
                                <span className="flex items-center gap-1">
                                    <MapIcon size={10} /> {data.domain}
                                </span>
                                <span className="text-white/20">|</span>
                                <span className="flex items-center gap-1">
                                    <Activity size={10} /> {data.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Quick Nav */}
                    <div className="pointer-events-auto">
                        <button
                            onClick={() => {
                                const event = new KeyboardEvent('keydown', { key: '/' });
                                window.dispatchEvent(event);
                            }}
                            className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-mono text-xs text-white/60 hover:text-white hidden md:block"
                        >
                            Press <span className="text-accent">/</span> to navigate
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="pt-32 px-6 pb-12 max-w-[1600px] mx-auto grid grid-cols-12 gap-6 h-[calc(100vh-2rem)]">

                {/* LEFT COLUMN: METRICS */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-2 text-white/60">
                                <Activity size={16} />
                                <span className="font-sans font-medium text-sm">Primary Metric</span>
                            </div>
                            <MoreHorizontal size={16} className="text-white/20" />
                        </div>

                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <div className="text-[10px] font-mono text-white/40 uppercase mb-1">{data.metrics.primary.label}</div>
                                <div className="text-3xl font-mono text-white">{data.metrics.primary.value}</div>
                            </div>
                            <div className="text-[10px] font-mono text-accent">{data.metrics.primary.unit}</div>
                        </div>
                        <BarChart />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex-1 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 text-white/60">
                                <Wind size={16} />
                                <span className="font-sans font-medium text-sm">{data.metrics.secondary.label}</span>
                            </div>
                            <div className="font-mono text-xs text-accent">{data.metrics.secondary.value}</div>
                        </div>
                        <div className="py-8">
                            <div className="flex gap-1 mb-2">
                                <div className="w-1 h-8 bg-accent rounded-full animate-pulse" />
                                <div className="w-1 h-4 bg-white/20 rounded-full" />
                                <div className="w-1 h-6 bg-white/20 rounded-full" />
                            </div>
                            <div className="font-mono text-4xl">{data.metrics.tertiary.value}</div>
                            <div className="font-mono text-[10px] text-white/40 mt-1">{data.metrics.tertiary.label} ({data.metrics.tertiary.unit})</div>
                        </div>
                        <Waveform />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        </div>
                        <div className="font-sans font-medium text-sm text-white/60 mb-8">{data.metrics.quaternary.label}</div>
                        <div className="flex justify-between items-end">
                            <div className="font-mono text-2xl">{data.metrics.quaternary.value}</div>
                            <div className="font-mono text-xs text-white/40">{data.metrics.quaternary.unit}</div>
                        </div>
                        <div className="mt-4 h-16 w-full border-t border-white/10 relative">
                            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                <path d="M0,30 Q20,10 40,30 T80,30 T120,10 T160,50 T200,30" fill="none" stroke="#EF4444" strokeWidth="2" />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                {/* CENTER COLUMN: 3D ARCHITECTURE */}
                <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 h-full relative overflow-hidden"
                    >
                        <div className="absolute top-6 left-6 z-10 flex gap-4">
                            <span className="font-mono text-xs text-white/60">System Architecture</span>
                            <span className="font-mono text-xs text-white/20">|</span>
                            <span className="font-mono text-xs text-white">Layer Analysis</span>
                        </div>
                        <div className="absolute top-6 right-6 z-10 flex gap-2">
                            <div className="p-2 rounded-full bg-white/5 cursor-default"><Layers size={14} /></div>
                        </div>

                        <div className="absolute inset-0 top-16 bottom-16">
                            <HolographicArchitecture layers={data.layers} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void to-transparent">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-1">Architecture Stack</div>
                                    <div className="font-sans text-xl font-bold">{data.layers.length} Active Layers</div>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(40)].map((_, i) => (
                                        <div key={i} className={`w-[2px] h-2 ${i > 25 ? 'bg-white/10' : 'bg-accent'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: BRIEF & TEAM */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-6 overflow-hidden">

                    <div className="flex gap-4 items-center">
                        <div className="bg-white/10 text-white px-4 py-2 rounded-full text-xs font-mono uppercase border border-white/20 cursor-default">Case Study</div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">B</div>
                            <div>
                                <div className="font-sans font-bold text-sm">Project Brief</div>
                                <div className="font-mono text-[10px] text-white/40">{data.date}</div>
                            </div>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">
                            {data.brief}
                        </p>
                        <div className="flex -space-x-2 mb-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border border-void bg-white/10 backdrop-blur flex items-center justify-center text-[10px]">
                                    T{i}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex-1 text-xs overflow-y-auto min-h-0 scrollbar-hide"
                    >
                        <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4">Technical Analysis</h3>
                        <p className="text-white/60 leading-relaxed mb-6">
                            {data.fullStory}
                        </p>

                        <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4">Research Foundation</h3>
                        <ul className="space-y-2 mb-6">
                            {data.research.map((r, i) => (
                                <li key={i} className="flex gap-2 text-white/60 text-[11px]">
                                    <span className="text-accent shrink-0">◆</span>
                                    <span>{r}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4">Role & Contributions</h3>
                        <ul className="space-y-3">
                            {data.role.map((r, i) => {
                                const [title, desc] = r.includes(':') ? r.split(':') : [r, ''];
                                return (
                                    <li key={i} className="flex gap-2 text-white/60">
                                        <span className="text-accent shrink-0">▹</span>
                                        <span>
                                            {desc ? (
                                                <>
                                                    <strong className="text-white block mb-1">{title}</strong>
                                                    {desc}
                                                </>
                                            ) : (
                                                title
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mt-6 mb-4">Outcome</h3>
                        <ul className="space-y-3">
                            {data.outcome.map((o, i) => (
                                <li key={i} className="flex gap-2 text-white/60">
                                    <span className="text-white/20 shrink-0">●</span> {o}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                        className="bg-accent text-white rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1 bg-white/20 rounded-full"><Shield size={12} /></div>
                            <span className="font-mono text-[10px] uppercase">Status</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="font-sans font-bold text-lg">{data.status}</div>
                                <div className="text-[10px] opacity-80">Verified</div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-[10px]">Domain</div>
                                <div className="font-sans font-bold">{data.domain.split('/')[0]}</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDashboard;