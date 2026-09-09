"use client";

import { motion } from "framer-motion";

const day1 = [
  {
    time: "09:00 AM - 10:00 AM",
    title: "The Convergence: Team Formation & Keynote",
    desc: "Participants arrive, register, and sync up. Opening remarks kick off the event, setting the stage for the challenge ahead as participants finalize their teams.",
    highlight: false,
  },
  {
    time: "10:00 AM - 10:45 AM",
    title: "Domain Reveal & Ideation Masterclass",
    desc: "Official release of the overarching domains (e.g., Industrial Digital Twins, Autonomous Navigation, Smart Healthcare). An expert-led masterclass on scoping features and building a resilient project framework.",
    highlight: false,
  },
  {
    time: "10:45 AM - 11:45 AM",
    title: "The Auction Block: Problem Statement Bidding",
    desc: "A high-energy session where teams use virtual points to bid on specific, high-value problem statements. Strategic resource allocation begins here—do you secure the easiest problem or risk it for the highest multiplier?",
    highlight: "cyan",
  },
  {
    time: "11:45 AM - 01:00 PM",
    title: "Hacking Kickoff & Initial Build",
    desc: "Teams transition into their designated zones, brainstorm solutions tailored to their acquired problem statements, and begin setting up their initial tech stack and environments.",
    highlight: false,
  },
  {
    time: "01:00 PM - 02:00 PM",
    title: "Lunch & Strategy Sync",
    desc: "A brief interlude to refuel and align on the afternoon development sprint.",
    highlight: false,
  },
  {
    time: "02:00 PM - 03:30 PM",
    title: "Deep Dive Hacking & Mentorship",
    desc: "The core development block. Mentors circulate the room for active checkpoints, architectural guidance, and rapid technical troubleshooting.",
    highlight: false,
  },
  {
    time: "03:30 PM - 04:30 PM",
    title: "The Power-Up Hour!",
    desc: 'A disruptive, fun mid-day challenge. Teams compete in rapid-fire trivia or mini-games to win Power-ups. Perks include "Skip the Mentorship Queue", "5 Extra Minutes for Pitch Prep", or "Minor Constraint Veto".',
    highlight: "yellow",
  },
  {
    time: "04:30 PM - 05:30 PM",
    title: "Pitch Prep & Day 1 Wrap-up",
    desc: "Teams pivot from raw coding to storytelling. They begin drafting their slide decks and core narrative so they aren't starting from scratch the next morning.",
    highlight: false,
  },
];

const day2 = [
  {
    time: "09:00 AM - 10:00 AM",
    title: "Final Sprint & Submission",
    desc: "One final hour to squash bugs, polish presentation slides, and officially submit project links and decks to the portal.",
    highlight: false,
  },
  {
    time: "10:00 AM - 11:30 AM",
    title: "Round 1: Preliminary Pitches",
    desc: "Parallel judging tracks operate simultaneously. Each team gets a strict 4-minute pitch + 2-minute Q&A to lock in a spot for the finals. Prototype demonstrations are highly encouraged.",
    highlight: false,
  },
  {
    time: "11:30 AM - 12:00 PM",
    title: "Deliberation & Networking Break",
    desc: "Judges tally scores to select the top finalists while participants take a breather and network. Finalists are announced promptly at 12:00 PM.",
    highlight: false,
  },
  {
    time: "12:00 PM - 01:30 PM",
    title: "Grand Finale: Top Finalists Pitch",
    desc: "The chosen finalists take the main stage to pitch directly to the entire main jury panel and all attendees. High stakes, maximum visibility.",
    highlight: "pink",
  },
  {
    time: "01:30 PM - 02:00 PM",
    title: "The Verdict: Closing Ceremony & Awards",
    desc: "Final remarks, overall judge feedback, and the highly anticipated announcement of the winners.",
    highlight: false,
  },
];

const dotColor: Record<string, string> = {
  cyan: "bg-neon-cyan",
  yellow: "bg-neon-yellow",
  pink: "bg-neon-pink",
  false: "bg-neon-mint",
};

const accentColor: Record<string, string> = {
  cyan: "border-l-neon-cyan bg-neon-cyan/10",
  yellow: "border-l-neon-yellow bg-neon-yellow/10",
  pink: "border-l-neon-pink bg-neon-pink/10",
  false: "border-l-kraft-dark",
};

const timeColor: Record<string, string> = {
  cyan: "text-neon-cyan",
  yellow: "text-neon-yellow",
  pink: "text-neon-pink",
  false: "text-ink-light",
};

function TimelineItem({ item, index }: { item: any; index: number }) {
  const h = item.highlight ? String(item.highlight) : "false";
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="relative flex gap-5 group"
    >
      {/* Left dot + line */}
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 border-ink flex-shrink-0 mt-1 z-10 ${dotColor[h]} shadow-[2px_2px_0px_rgba(26,26,26,0.4)]`} />
        <div className="w-0.5 flex-1 bg-ink/20 mt-1" />
      </div>

      {/* Card */}
      <div className={`mb-6 flex-1 border-l-4 pl-4 pb-4 ${accentColor[h]}`}>
        <p className={`font-mono text-xs font-bold mb-1 ${timeColor[h]}`}>{item.time}</p>
        <h4 className="font-marker text-xl text-ink leading-tight mb-1">{item.title}</h4>
        <p className="font-sans text-sm text-ink-light leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-2" />
          <h2 className="font-marker text-5xl text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-1">
            Timeline Map
          </h2>
          <p className="font-sans text-ink-light mt-6 text-lg">September 12th, 2026 · 9:00 AM Onwards</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-paper border-4 border-ink p-6 shadow-[6px_6px_0px_rgba(26,26,26,1)] wobbly-border-alt relative"
          >
            <div className="tape -top-3 left-8 rotate-3" />
            <div className="inline-block bg-ink text-neon-cyan font-marker text-2xl px-4 py-2 mb-6 -rotate-1 shadow-[4px_4px_0px_rgba(78,205,196,0.4)]">
              DAY 1: STRATEGY, BIDDING & BUILDING
            </div>
            <div>
              {day1.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Day 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-paper border-4 border-ink p-6 shadow-[6px_6px_0px_rgba(26,26,26,1)] wobbly-border relative"
          >
            <div className="tape -top-3 right-8 -rotate-2" />
            <div className="inline-block bg-ink text-neon-pink font-marker text-2xl px-4 py-2 mb-6 rotate-1 shadow-[4px_4px_0px_rgba(255,107,107,0.4)]">
              DAY 2: REFINEMENT, PITCHES & GRAND FINALE
            </div>
            <div>
              {day2.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
