"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timelineData = [
  {
    phase: "Day 1",
    time: "09:00 AM – 10:00 AM",
    title: "The Convergence",
    subtitle: "Team Formation & Keynote",
    desc: "Participants arrive, register, and sync up. Opening remarks kick off the event, setting the stage for the challenge ahead as participants finalize their teams.",
    color: "bg-neon-mint",
    rotate: "-rotate-2",
  },
  {
    phase: "Day 1",
    time: "10:00 AM – 11:45 AM",
    title: "Domain Reveal & Auction Block",
    subtitle: "Ideation Masterclass + Bidding",
    desc: "Domain Reveal (10:00–10:45 AM): Official release of the overarching domains. An expert-led masterclass on scoping features and building a resilient project framework.\n\nAuction Block (10:45–11:45 AM): A high-energy session where teams use virtual points to bid on specific, high-value problem statements. Strategic resource allocation begins here—do you secure the easiest problem or risk it for the highest multiplier?",
    color: "bg-neon-cyan",
    highlight: true,
    rotate: "rotate-1",
  },
  {
    phase: "Day 1",
    time: "11:45 AM – 01:00 PM",
    title: "Hacking Kickoff",
    subtitle: "Initial Build",
    desc: "Teams transition into their designated zones, brainstorm solutions tailored to their acquired problem statements, and begin setting up their initial tech stack and environments.",
    color: "bg-neon-yellow",
    rotate: "-rotate-1",
  },
  {
    phase: "Day 1",
    time: "01:00 PM – 02:00 PM",
    title: "Lunch & Strategy Sync",
    subtitle: "Refuel & Align",
    desc: "A brief interlude to refuel and align on the afternoon development sprint. Teams regroup, share early insights, and plan the afternoon push.",
    color: "bg-neon-mint",
    rotate: "rotate-3",
    isBreak: true,
  },
  {
    phase: "Day 1",
    time: "02:00 PM – 03:30 PM",
    title: "Deep Dive Hacking",
    subtitle: "& Mentorship",
    desc: "The core development block. Mentors circulate the room for active checkpoints, architectural guidance, and rapid technical troubleshooting.",
    color: "bg-neon-yellow",
    rotate: "-rotate-2",
  },
  {
    phase: "Day 1",
    time: "03:30 PM – 04:30 PM",
    title: "The Power-Up Hour!",
    subtitle: "Mini-Challenges & Perks",
    desc: 'A disruptive, fun mid-day challenge. Teams compete in rapid-fire trivia or mini-games to win Power-ups. Perks include "Skip the Mentorship Queue", "5 Extra Minutes for Pitch Prep", or "Minor Constraint Veto".',
    color: "bg-neon-pink",
    highlight: true,
    rotate: "rotate-1",
  },
  {
    phase: "Day 1",
    time: "04:30 PM – 05:30 PM",
    title: "Pitch Prep",
    subtitle: "Day 1 Wrap-up",
    desc: "Teams pivot from raw coding to storytelling. They begin drafting their slide decks and core narrative so they aren't starting from scratch the next morning.",
    color: "bg-neon-mint",
    rotate: "-rotate-1",
  },
  {
    phase: "Day 2",
    time: "09:00 AM – 11:30 AM",
    title: "Final Sprint & Round 1 Pitches",
    subtitle: "Submission + Preliminary Judging",
    desc: "Final Sprint (9:00–10:00 AM): One final hour to squash bugs, polish presentation slides, and officially submit project links and decks to the portal.\n\nRound 1 Pitches (10:00–11:30 AM): Parallel judging tracks operate simultaneously. Each team gets a strict 4-minute pitch + 2-minute Q&A to lock in a spot for the finals. Prototype demonstrations are highly encouraged.",
    color: "bg-neon-cyan",
    rotate: "rotate-2",
  },
  {
    phase: "Day 2",
    time: "11:30 AM – 12:00 PM",
    title: "Deliberation",
    subtitle: "& Networking Break",
    desc: "Judges tally scores to select the top finalists while participants take a breather and network. Finalists are announced promptly at 12:00 PM.",
    color: "bg-neon-mint",
    rotate: "rotate-1",
    isBreak: true,
  },
  {
    phase: "Day 2",
    time: "12:00 PM – 01:30 PM",
    title: "Grand Finale",
    subtitle: "Top Finalists Pitch",
    desc: "The chosen finalists take the main stage to pitch directly to the entire main jury panel and all attendees. High stakes, maximum visibility.",
    color: "bg-neon-pink",
    highlight: true,
    rotate: "-rotate-1",
  },
  {
    phase: "Day 2",
    time: "01:30 PM – 02:00 PM",
    title: "The Verdict",
    subtitle: "Closing Ceremony & Awards",
    desc: "Final remarks, overall judge feedback, and the highly anticipated announcement of the winners. Prizes, glory, and a lot of applause.",
    color: "bg-neon-yellow",
    rotate: "rotate-2",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgPath, setSvgPath] = useState("");
  const [selected, setSelected] = useState<typeof timelineData[0] | null>(null);

  const calculatePath = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    if (window.innerWidth < 768) {
      setSvgPath("");
      return;
    }

    let path = "";
    for (let i = 0; i < timelineData.length; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const rect = card.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top;

      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        const prevCard = cardRefs.current[i - 1];
        if (!prevCard) continue;
        const prevRect = prevCard.getBoundingClientRect();
        const prevX = prevRect.left - containerRect.left + prevRect.width / 2;
        const prevY = prevRect.top - containerRect.top;
        const cp1X = prevX + (x - prevX) / 2;
        const cp1Y = prevY - 30;
        const cp2X = prevX + (x - prevX) / 2;
        const cp2Y = y - 30;
        path += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y} `;
      }
    }
    setSvgPath(path);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(calculatePath, 100);
    window.addEventListener("resize", calculatePath);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculatePath);
    };
  }, [calculatePath]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-16 relative">
          <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-2"></div>
          <h2 className="font-marker text-5xl text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-1">
            Timeline Map
          </h2>
          <p className="font-sans text-ink-light mt-4 text-base">Click any note to see full details ↓</p>
        </div>

        <div ref={containerRef} className="relative border-4 border-kraft-dark bg-canvas p-8 md:p-16 rounded-md shadow-xl wobbly-border">
          {svgPath && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                d={svgPath}
                fill="transparent"
                stroke="var(--color-neon-pink)"
                strokeWidth="3"
                strokeDasharray="8 8"
                strokeLinecap="round"
                className="hidden md:block"
              />
            </svg>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
                onClick={() => setSelected(item)}
                className={`polaroid relative cursor-pointer ${item.rotate} hover:z-20 select-none`}
              >
                {/* Pin */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-ink/50 z-10 shadow-sm ${item.highlight ? "bg-neon-pink" : "bg-neon-cyan"}`}>
                  <div className="absolute inset-1 rounded-full bg-paper/40"></div>
                </div>

                <div className={`font-mono text-xs mb-2 px-2 py-1 inline-block border-2 border-ink ${item.isBreak ? "bg-neon-yellow" : item.color}`}>
                  {item.time}
                </div>
                <p className="font-sans text-xs text-ink-light font-bold uppercase mb-1">{item.phase}</p>
                <h3 className={`font-marker text-2xl text-ink leading-tight ${item.highlight ? "text-neon-pink" : ""}`}>
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-ink-light mt-1">{item.subtitle}</p>
                <p className="font-mono text-xs text-ink-light mt-2 opacity-60">Click to read more →</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 bg-ink/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-5 -right-2 md:-right-5 z-50 w-12 h-12 flex items-center justify-center bg-neon-pink text-white font-marker text-2xl wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-yellow hover:text-ink transition-colors"
              >
                X
              </button>

              {/* Card styled as a big polaroid */}
              <div className={`polaroid ${selected.rotate} shadow-[12px_12px_0px_rgba(26,26,26,1)] relative`}>
                <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2"></div>

                <div className={`w-full px-4 py-3 mb-4 border-2 border-ink/20 ${selected.color} flex items-center justify-between`}>
                  <span className="font-mono text-xs font-bold text-ink">{selected.time}</span>
                  <span className={`font-marker text-sm px-2 py-0.5 bg-ink text-white`}>{selected.phase}</span>
                </div>

                <h3 className={`font-marker text-3xl text-ink mb-1 leading-tight px-2 ${selected.highlight ? "text-neon-pink" : ""}`}>
                  {selected.title}
                </h3>
                <p className="font-sans text-sm font-bold text-ink-light mb-4 px-2">{selected.subtitle}</p>
                <p className="font-sans text-base text-ink leading-relaxed px-2 pb-4">
                  {selected.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
