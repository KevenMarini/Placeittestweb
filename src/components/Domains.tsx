"use client";

import { motion } from "framer-motion";

const domains = [
  { 
    id: "iot-aiml", 
    name: "IOT / AI / ML", 
    desc: "Connect the physical and digital worlds. Train models to predict, automate, and optimize everyday systems.",
    color: "bg-neon-yellow"
  },
  { 
    id: "hardware", 
    name: "Hardware Innovation", 
    desc: "Build tangible prototypes. Re-think silicon, physical layers, and embedded systems to solve real-world bottlenecks.",
    color: "bg-neon-mint"
  },
  { 
    id: "cyber", 
    name: "Cyber Security & Blockchain", 
    desc: "Fortify systems against modern threats. Design decentralized, immutable, and cryptographically secure architectures.",
    color: "bg-neon-pink"
  },
  { 
    id: "health", 
    name: "HealthCare / MedTech", 
    desc: "Engineer the future of wellness. Create diagnostic tools, accessible care platforms, and biotech solutions.",
    color: "bg-neon-cyan"
  },
  { 
    id: "math", 
    name: "Mathematical Models & NLMs", 
    desc: "Leverage advanced mathematics and natural language models to process vast datasets into actionable intelligence.",
    color: "bg-neon-yellow"
  },
  { 
    id: "auto", 
    name: "Smart Automation", 
    desc: "Streamline workflows. Eliminate repetitive tasks through intelligent scheduling, robotics, and process automation.",
    color: "bg-neon-mint"
  },
  { 
    id: "open", 
    name: "Open Statements", 
    desc: "Got a wild idea that doesn't fit the mold? Pitch your own problem statement and blow our minds.",
    color: "bg-neon-pink"
  },
];

export default function Domains() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 relative">
          <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-1"></div>
          <h2 className="font-marker text-5xl text-ink inline-block bg-white px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] rotate-2">
            Hack Tracks
          </h2>
          <p className="font-sans text-xl text-ink-light mt-6 max-w-2xl mx-auto bg-kraft/30 p-4 wobbly-border-alt -rotate-1">
            Pick a domain, grab some sticky notes, and start brainstorming. Which problem will your team solve?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              className={`polaroid relative ${index % 2 === 0 ? '-rotate-1' : 'rotate-2'} hover:z-20 cursor-pointer`}
            >
              <div className="tape -top-2 right-4 -rotate-2"></div>
              
              <div className={`w-full h-16 ${domain.color} border-2 border-ink/20 mb-4 flex items-center justify-center p-2`}>
                <span className="font-marker text-ink text-2xl text-center leading-none">{domain.name}</span>
              </div>
              
              <p className="font-sans text-sm text-ink-light leading-relaxed pb-4 px-2">
                {domain.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
