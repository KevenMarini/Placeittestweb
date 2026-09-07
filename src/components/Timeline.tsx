"use client";

import { motion } from "framer-motion";

const timelineData = [
  { phase: "Day 1", title: "Launch & Keynote", time: "09:00 AM", desc: "Event kickoff & problem statements." },
  { phase: "Day 1", title: "Masterclass", time: "10:00 AM", desc: "Ideation to MVP." },
  { phase: "Day 1", title: "Ideation Kickoff", time: "11:30 AM", desc: "Teams form & build." },
  { phase: "Break", title: "Lunch", time: "12:30 PM", desc: "Refuel.", isBreak: true },
  { phase: "Day 1", title: "Deep Dive", time: "02:00 PM", desc: "Core development." },
  { phase: "Day 2", title: "Final Sprint", time: "09:00 AM", desc: "Bug squashing & polish." },
  { phase: "Day 2", title: "Pitches", time: "10:00 AM", desc: "Preliminary pitches." },
  { phase: "Break", title: "Deliberation", time: "11:30 AM", desc: "Judges score.", isBreak: true },
  { phase: "Day 2", title: "Finale & Awards", time: "12:00 PM", desc: "Top finalists & winners." },
];

export default function Timeline() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-16 relative">
          <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-2"></div>
          <h2 className="font-marker text-5xl text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-1">
            Timeline Map
          </h2>
        </div>

        <div className="relative border-4 border-kraft-dark bg-canvas p-8 md:p-16 rounded-md shadow-xl wobbly-border">
          {/* SVG String connecting pins */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
              d="M 100 100 Q 200 50 300 150 T 500 100 T 700 200 T 800 100 T 900 300" 
              fill="transparent" 
              stroke="var(--color-neon-pink)" 
              strokeWidth="3" 
              strokeDasharray="10 10" 
              className="hidden md:block"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className={`polaroid relative ${item.isBreak ? 'rotate-3' : (index % 2 === 0 ? '-rotate-2' : 'rotate-1')} hover:z-20`}
              >
                {/* Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-sm border border-ink/50 z-10">
                  <div className="absolute inset-1 rounded-full bg-white/40"></div>
                </div>

                <div className={`font-mono text-xs mb-2 px-2 py-1 inline-block border-2 border-ink ${item.isBreak ? 'bg-neon-yellow' : 'bg-neon-mint'}`}>
                  {item.time} | {item.phase}
                </div>
                <h3 className="font-marker text-2xl text-ink leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-ink-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
