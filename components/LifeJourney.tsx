import React, { useEffect, useRef } from 'react';

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

// Elegant silhouette figure class
class SilhouetteFigure {
    x: number;
    y: number;
    scale: number;
    opacity: number;
    walkPhase: number;

    constructor(x: number, y: number, scale: number) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.opacity = 1;
        this.walkPhase = 0;
    }

    update(targetY: number, walkSpeed: number) {
        this.y = lerp(this.y, targetY, 0.1);
        this.walkPhase += walkSpeed * 0.15;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0.01) return;

        const s = this.scale;
        const color = `rgba(255, 255, 255, ${this.opacity * 0.9})`;

        // Walking bob
        const bob = Math.abs(Math.sin(this.walkPhase)) * (3 * s);
        const baseY = this.y - bob;

        ctx.fillStyle = color;
        ctx.strokeStyle = color;

        // Head (circle)
        const headRadius = 12 * s;
        const headY = baseY - (80 * s);
        ctx.beginPath();
        ctx.arc(this.x, headY, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Torso (rounded rectangle)
        const torsoWidth = 20 * s;
        const torsoHeight = 40 * s;
        const torsoY = headY + headRadius + 5;
        ctx.beginPath();
        ctx.roundRect(this.x - torsoWidth / 2, torsoY, torsoWidth, torsoHeight, 8 * s);
        ctx.fill();

        // Legs (simple animated lines)
        const legStartY = torsoY + torsoHeight;
        const legLength = 35 * s;

        [-1, 1].forEach((dir, i) => {
            const offset = i === 0 ? 0 : Math.PI;
            const swing = Math.sin(this.walkPhase + offset) * (15 * s);
            const legEndX = this.x + swing;
            const legEndY = legStartY + legLength;

            ctx.lineWidth = 6 * s;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.x, legStartY);
            ctx.lineTo(legEndX, legEndY);
            ctx.stroke();
        });

        return { x: this.x, y: headY - headRadius - 10 };
    }
}

// Fire particle for torch
class FireParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -Math.random() * 0.4 - 0.2;
        this.maxLife = Math.random() * 6 + 4;
        this.life = this.maxLife;
        this.size = Math.random() * 3 + 1.5;
        this.hue = Math.random() * 40 + 15;
    }

    update(torchY: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // Gravity

        // Height limit
        if (this.y < torchY - 30) {
            this.y = torchY - 30;
            this.vy = Math.abs(this.vy) * 0.6;
        }

        this.life--;
        this.size *= 0.93;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.life / this.maxLife;
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

interface LifeJourneyProps {
    isFlaring: boolean;
    onFinale?: () => void;
}

const LifeJourney = ({ isFlaring, onFinale }: LifeJourneyProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fatherRef = useRef(new SilhouetteFigure(0, 0, 1.0));
    const childRef = useRef(new SilhouetteFigure(0, 0, 0.5));
    const particlesRef = useRef<FireParticle[]>([]);
    const handoverStateRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        let animationFrame: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Get scroll progress
            const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            let pct = window.scrollY / docH;
            if (isNaN(pct) || !isFinite(pct)) pct = 0;
            pct = Math.max(0, Math.min(1, pct));

            // Position figures
            // Default: Left side (20%)
            // Finale: Move to Center (50%)
            const leftX = width * 0.20;
            const centerX = width * 0.50;

            // Calculate target X based on scroll
            // Start moving to center after 85% scroll
            let targetX = leftX;
            if (pct > 0.85) {
                const moveProgress = Math.min(1, (pct - 0.85) / 0.10); // 0.85 to 0.95
                targetX = lerp(leftX, centerX, moveProgress);
            }

            const groundY = height * 0.75;
            const isHandover = pct > 0.95;

            if (isHandover) {
                handoverStateRef.current = Math.min(1, handoverStateRef.current + 0.005);

                // Sequence:
                // 1. Handover (0.0 - 0.3)
                // 2. Father fades (0.3 - 0.6)
                // 3. Son fades (0.6 - 0.9)
                // 4. Logo Reveal (0.9+)

                if (handoverStateRef.current > 0.3) {
                    // Father fades out
                    fatherRef.current.opacity = Math.max(0, 1 - (handoverStateRef.current - 0.3) * 3.3);
                }

                if (handoverStateRef.current > 0.6) {
                    // Son fades out
                    childRef.current.opacity = Math.max(0, 1 - (handoverStateRef.current - 0.6) * 3.3);
                }

                if (handoverStateRef.current > 0.9 && onFinale) {
                    onFinale();
                }
            } else {
                handoverStateRef.current = Math.max(0, handoverStateRef.current - 0.05);
                fatherRef.current.opacity = 1;
                childRef.current.opacity = 1;
            }

            // Son grows from 0.5 to 1.0 scale
            const growthPhase = Math.min(1, pct / 0.85);
            const targetScale = 0.5 + (growthPhase * 0.5);
            childRef.current.scale = lerp(childRef.current.scale, targetScale, 0.05);

            // Update positions
            // Stop walking during handover
            const walkSpeed = isHandover ? 0 : 0.5;

            fatherRef.current.update(groundY, walkSpeed);
            childRef.current.update(groundY, walkSpeed);

            // Interpolate X position
            fatherRef.current.x = lerp(fatherRef.current.x, targetX, 0.1);
            childRef.current.x = lerp(childRef.current.x, targetX + (40 * childRef.current.scale), 0.1);

            // Draw figures
            const fatherTop = fatherRef.current.draw(ctx);
            childRef.current.draw(ctx);

            // Torch position
            // If handover started (state > 0.1), torch moves to son
            let torchX = fatherRef.current.x + 15;
            let torchY = fatherRef.current.y - 50;

            if (handoverStateRef.current > 0.1) {
                // Move torch to son's hand position (approx)
                const sonHandX = childRef.current.x - 10;
                const sonHandY = childRef.current.y - 40;

                const passProgress = Math.min(1, (handoverStateRef.current - 0.1) * 5); // Fast pass
                torchX = lerp(torchX, sonHandX, passProgress);
                torchY = lerp(torchY, sonHandY, passProgress);
            }

            // Spawn particles
            const spawnCount = isFlaring ? 4 : 2;
            for (let i = 0; i < spawnCount; i++) {
                particlesRef.current.push(new FireParticle(torchX, torchY));
            }

            // Update and draw particles
            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                p.update(torchY);
                // Fade particles with father/son if they are holding it? 
                // Actually keep flame alive until the very end, then fade it too
                if (handoverStateRef.current > 0.8) {
                    // Fade flame at the very end
                    ctx.globalAlpha = Math.max(0, 1 - (handoverStateRef.current - 0.8) * 5);
                }
                p.draw(ctx);
                ctx.globalAlpha = 1;

                if (p.life <= 0) particlesRef.current.splice(i, 1);
            }

            // Torch glow
            if (handoverStateRef.current < 0.95) {
                ctx.globalCompositeOperation = 'screen';
                const gradient = ctx.createRadialGradient(torchX, torchY, 0, torchX, torchY, 80);
                gradient.addColorStop(0, `rgba(255,180,50,${0.4 * (1 - handoverStateRef.current)})`); // Dim glow at end
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
            }

            animationFrame = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, [isFlaring, onFinale]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default LifeJourney;