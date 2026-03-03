import { motion } from 'framer-motion';

const Outro = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
       <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ duration: 2 }}
         className="text-center"
       >
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4 text-ink/50">
              The cycle continues
          </p>
          <a 
            href="mailto:hello@mvpdaddy.com" 
            className="font-sans font-bold text-4xl md:text-6xl text-ink hover:text-neon transition-colors duration-500 cursor-pointer mix-blend-multiply"
          >
              Start your journey
          </a>
       </motion.div>
    </div>
  );
};

export default Outro;