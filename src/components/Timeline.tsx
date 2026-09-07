"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    phase: "PHASE_01",
    title: "Launch & Keynote",
    time: "09:00 AM — 10:00 AM",
    desc: "Event kickoff, opening remarks, and the official release of the problem statements.",
    day: 1,
  },
  {
    phase: "PHASE_02",
    title: "Masterclass: Ideation to MVP",
    time: "10:00 AM — 11:30 AM",
    desc: "Expert-led session on design thinking, scoping down features, and building a project framework.",
    day: 1,
  },
  {
    phase: "PHASE_03",
    title: "Hacking Kickoff & Team Sync",
    time: "11:30 AM — 12:30 PM",
    desc: "Teams form, brainstorm, and begin their initial build.",
    day: 1,
  },
  {
    phase: "SYS_PAUSE",
    title: "Lunch Break",
    time: "12:30 PM — 02:00 PM",
    desc: "System cooling & refueling.",
    day: 1,
    isBreak: true,
  },
  {
    phase: "PHASE_04",
    title: "Deep Dive Hacking & Mentorship",
    time: "02:00 PM — 04:00 PM",
    desc: "Core development block. Mentors circulate for active checkpoints.",
    day: 1,
  },
  {
    phase: "PHASE_05",
    title: "Pitch Prep & Day 1 Wrap-up",
    time: "04:00 PM — 05:00 PM",
    desc: "Teams pivot from coding to storytelling, drafting slide decks.",
    day: 1,
  },
  {
    phase: "PHASE_06",
    title: "Final Sprint & Submission",
    time: "09:00 AM — 10:00 AM",
    desc: "One final hour to squash bugs, polish slides, and submit.",
    day: 2,
  },
  {
    phase: "PHASE_07",
    title: "Round 1: Preliminary Pitches",
    time: "10:00 AM — 11:30 AM",
    desc: "Parallel judging tracks. Strict 4-minute pitch + 2-minute Q&A.",
    day: 2,
  },
  {
    phase: "SYS_PAUSE",
    title: "Deliberation & Networking",
    time: "11:30 AM — 12:00 PM",
    desc: "Judges tally scores to select finalists.",
    day: 2,
    isBreak: true,
  },
  {
    phase: "PHASE_08",
    title: "Grand Finale: Top Finalists Pitch",
    time: "12:00 PM — 01:30 PM",
    desc: "Finalists take the main stage to pitch directly to the entire jury.",
    day: 2,
  },
  {
    phase: "PHASE_END",
    title: "Closing Ceremony & Awards",
    time: "01:30 PM — 02:00 PM",
    desc: "Final remarks, judge feedback, and winner announcements.",
    day: 2,
  },
];

export default function Timeline() {
  return (
    <section className="py-24 relative border-b border-cyan/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end gap-4 border-b border-cyan/30 pb-4">
          <h2 className="font-heading text-3xl font-bold text-off-white">
            ASSEMBLY_SEQUENCE
          </h2>
          <span className="font-mono text-xs text-cyan mb-1">
            // EVENT_TIMELINE
          </span>
        </div>

        <div className="relative">
          {/* Main Circuit Line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-px bg-cyan/30"></div>

          <div className="flex flex-col gap-8">
            {timelineData.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index}
                className={`relative pl-16 ${item.isBreak ? 'opacity-60' : ''}`}
              >
                {/* Node */}
                <div className="absolute left-[24px] top-1.5 w-[9px] h-[9px] bg-navy border border-cyan rounded-full z-10 flex items-center justify-center">
                  <div className={`w-[3px] h-[3px] rounded-full ${item.isBreak ? 'bg-amber text-glow-amber' : 'bg-cyan text-glow'}`}></div>
                </div>

                {/* Connecting trace */}
                <div className="absolute left-[33px] top-2.5 w-6 h-px bg-cyan/30"></div>

                <motion.div 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`p-4 border cad-chamfer transition-colors ${item.isBreak ? 'border-amber/20 bg-amber/5' : 'border-cyan/20 bg-navy-dark/50 hover:border-cyan/50'}`}
                >
                  <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <div className="font-mono text-[10px] text-cyan uppercase tracking-wider bg-cyan/10 px-2 py-0.5 border border-cyan/20">
                      DAY 0{item.day} | {item.phase}
                    </div>
                    <div className="font-mono text-xs text-amber">
                      {item.time}
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-off-white mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-off-white/70">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
