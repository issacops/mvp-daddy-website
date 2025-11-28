import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../utils/useMousePosition';

interface CustomCursorProps {
    isFlaring: boolean;
}

const CustomCursor = ({ isFlaring }: CustomCursorProps) => {
    const { x, y } = useMousePosition();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleEnter = () => setIsVisible(true);
        const handleLeave = () => setIsVisible(false);
        document.body.addEventListener('mouseenter', handleEnter);
        document.body.addEventListener('mouseleave', handleLeave);
        setIsVisible(true); 
        return () => {
            document.body.removeEventListener('mouseenter', handleEnter);
            document.body.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <motion.div 
            className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
            animate={{ x: x, y: y, opacity: isVisible ? 1 : 0 }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
        >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
                {/* Tech Reticle */}
                <motion.div 
                    className="w-[30px] h-[30px] border border-white flex items-center justify-center rounded-full"
                    animate={{ scale: isFlaring ? 0.8 : 1 }}
                >
                    <div className="w-[1px] h-[6px] bg-white absolute top-[-6px]" />
                    <div className="w-[1px] h-[6px] bg-white absolute bottom-[-6px]" />
                    <div className="w-[6px] h-[1px] bg-white absolute left-[-6px]" />
                    <div className="w-[6px] h-[1px] bg-white absolute right-[-6px]" />
                </motion.div>
                
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
            </div>
        </motion.div>
    );
};

export default CustomCursor;