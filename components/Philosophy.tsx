import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-24 py-32 pointer-events-none">
      <div className="max-w-4xl ml-auto text-right mr-0 md:mr-24">
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ margin: "-20%" }}
          className="font-sans font-bold text-6xl md:text-9xl tracking-tighter text-ink mb-12 mix-blend-multiply leading-[0.9]"
        >
          We don't just <br/> write code.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ margin: "-20%" }}
          className="font-mono text-xl md:text-3xl leading-relaxed text-ink/80 ml-auto max-w-2xl"
        >
          We teach the machine to <span className="text-neon bg-black px-2 py-1 box-decoration-clone">feel</span>. 
          <br/><br/>
          In a world of static interfaces, we build living systems that react, adapt, and remember who you are.
        </motion.p>
      </div>
    </div>
  );
};

export default Philosophy;