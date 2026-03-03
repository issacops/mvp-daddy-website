import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { 
    id: "001", 
    title: "Neuro_Link", 
    client: "Neuralink Corp",
    desc: "Brain-computer interface visualization dashboard.",
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop" 
  },
  { 
    id: "002", 
    title: "Vanta_Black", 
    client: "Acronym",
    desc: "E-commerce platform with 3D garment fitting.",
    src: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: "003", 
    title: "Echo_Chamber", 
    client: "Sony Music",
    desc: "Immersive audio-reactive generative art experience.",
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77ac618?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: "004", 
    title: "Apex_Form", 
    client: "Porsche",
    desc: "Configurator for the next generation of EV.",
    src: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop" 
  },
];

const WorkGrid: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-12 relative z-20">
      
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-8 backdrop-blur-sm bg-white/30 p-8 rounded-lg">
        <h2 className="font-sans font-bold text-6xl md:text-8xl tracking-tighter text-ink mix-blend-multiply">
            Selected Works
        </h2>
        <div className="font-mono text-sm mt-4 md:mt-0 flex gap-4">
            <span className="text-neon">●</span>
            <span>2023 — 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-24">
        {projects.map((project, index) => (
            <div key={project.id} className="group relative flex flex-col md:flex-row gap-8 md:gap-20 items-start p-8 rounded-xl transition-all duration-500 hover:bg-white/40 border border-transparent hover:border-white/50">
                
                {/* Image Container */}
                <div className="w-full md:w-2/5 aspect-[4/3] overflow-hidden bg-white/50 backdrop-blur-md relative shadow-lg">
                    <div className="absolute inset-0 bg-neon/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
                    <img 
                        src={project.src} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon z-20" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon z-20" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col pt-4">
                    <div className="flex justify-between items-start border-b border-black/10 pb-6 mb-6">
                        <span className="font-mono text-sm text-ink/50">{project.id}</span>
                        <ArrowUpRight className="text-ink group-hover:text-neon group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    
                    <h3 className="font-sans font-bold text-4xl md:text-6xl mb-4 group-hover:text-neon transition-colors duration-300">
                        {project.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                            <span className="font-mono text-xs uppercase w-24 text-ink/50">Client</span>
                            <span className="font-mono text-sm">{project.client}</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="font-mono text-xs uppercase w-24 text-ink/50">Task</span>
                            <span className="font-mono text-sm">{project.desc}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      <div className="mt-24 text-center">
        <button className="px-8 py-4 border border-black/10 hover:bg-black hover:text-white transition-colors font-mono text-sm uppercase tracking-widest bg-white/50 backdrop-blur-sm" data-hover="true">
            View Archive
        </button>
      </div>

    </section>
  );
};

export default WorkGrid;