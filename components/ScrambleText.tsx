import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  autoStart?: boolean;
  speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const ScrambleText = ({ 
  text, 
  className = "", 
  autoStart = true,
  speed = 40 
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          if (letter === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) { 
        clearInterval(interval);
      }
      
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (autoStart && isInView && !hasAnimated) {
      animate();
      setHasAnimated(true);
    }
  }, [isInView, autoStart, hasAnimated]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    animate();
  };

  return (
    <span 
      ref={ref}
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;