"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";

export default function Hero() {
  const constraintsRef = useRef(null);
  
  // Custom sticky notes state
  const [stickies, setStickies] = useState([
    { id: 1, text: "Build an AI that codes!", color: "bg-neon-yellow", x: 100, y: 50, rotate: -5 },
    { id: 2, text: "Smart City IoT platform", color: "bg-neon-mint", x: 300, y: -20, rotate: 3 },
    { id: 3, text: "Blockchain Medical Vault", color: "bg-neon-pink", x: 50, y: 150, rotate: -2 },
  ]);

  const [newStickyText, setNewStickyText] = useState("");
  const [newStickyColor, setNewStickyColor] = useState("bg-neon-yellow");

  // Countdown Timer State
  const targetDate = new Date("2026-09-12T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const addSticky = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;
    setStickies([
      ...stickies,
      {
        id: Date.now(),
        text: newStickyText,
        color: newStickyColor,
        x: Math.random() * 200,
        y: Math.random() * 200,
        rotate: Math.random() * 20 - 10,
      }
    ]);
    setNewStickyText("");
  };

  const colors = ["bg-neon-yellow", "bg-neon-pink", "bg-neon-mint", "bg-neon-cyan"];

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden flex items-center justify-center">
      
      {/* Hand-drawn SVG Doodles Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 200 Q 300 50 500 300 T 900 100" fill="transparent" stroke="var(--color-ink)" strokeWidth="3" className="drawn-arrow" strokeLinecap="round" />
        <path d="M 800 500 C 900 600, 1000 400, 1100 550" fill="transparent" stroke="var(--color-neon-pink)" strokeWidth="4" className="drawn-arrow" strokeLinecap="round" />
        <circle cx="150" cy="500" r="40" fill="none" stroke="var(--color-neon-mint)" strokeWidth="4" strokeDasharray="10 5" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10" ref={constraintsRef}>
        
        {/* Left: Content */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="inline-block px-4 py-1 bg-ink text-canvas font-marker text-xl w-fit -rotate-2 wobbly-border shadow-[4px_4px_0px_rgba(255,107,107,1)]">
            IEEE PCS PRESENTS
          </div>
          
          <h1 className="font-marker text-7xl md:text-9xl text-ink leading-none">
            PlaceIT <span className="text-5xl md:text-7xl text-ink-light ml-2">5.0</span>
          </h1>

          {/* Countdown Timer */}
          <div className="flex gap-4 font-mono font-bold text-2xl text-ink mt-2">
            <div className="flex flex-col items-center bg-white p-3 wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] rotate-1">
              <span className="text-neon-pink text-4xl">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-ink-light tracking-widest mt-1">Days</span>
            </div>
            <span className="self-center text-4xl">:</span>
            <div className="flex flex-col items-center bg-white p-3 wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-2">
              <span className="text-neon-cyan text-4xl">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-ink-light tracking-widest mt-1">Hrs</span>
            </div>
            <span className="self-center text-4xl">:</span>
            <div className="flex flex-col items-center bg-white p-3 wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] rotate-3">
              <span className="text-neon-mint text-4xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-ink-light tracking-widest mt-1">Mins</span>
            </div>
            <span className="self-center text-4xl">:</span>
            <div className="flex flex-col items-center bg-white p-3 wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-1">
              <span className="text-neon-yellow text-4xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs uppercase text-ink-light tracking-widest mt-1">Secs</span>
            </div>
          </div>
          
          <p className="font-sans text-xl text-ink-light max-w-lg font-medium bg-white/50 p-4 wobbly-border-alt mt-2">
            Grab a marker. Join a team. Build tangible prototypes from raw concepts in our ultimate whiteboard session.
          </p>

          {/* Add Sticky Note Form */}
          <form onSubmit={addSticky} className="mt-8 bg-kraft-dark/20 p-6 wobbly-border relative max-w-md">
            <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-1"></div>
            <h3 className="font-marker text-2xl mb-4 text-ink">Drop an Idea!</h3>
            <textarea 
              value={newStickyText}
              onChange={(e) => setNewStickyText(e.target.value)}
              placeholder="What's on your mind?..."
              className="w-full bg-white p-3 font-marker text-xl text-ink resize-none h-24 border-2 border-ink focus:outline-none focus:border-neon-pink shadow-[2px_2px_0px_rgba(26,26,26,1)]"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {colors.map(c => (
                  <button 
                    key={c} type="button" 
                    onClick={() => setNewStickyColor(c)}
                    className={`w-6 h-6 rounded-full border-2 border-ink ${c} ${newStickyColor === c ? 'ring-2 ring-offset-2 ring-ink' : ''}`}
                  />
                ))}
              </div>
              <button type="submit" className="font-sans font-bold bg-ink text-canvas px-4 py-2 wobbly-border hover:bg-neon-yellow hover:text-ink transition-colors">
                Stick it!
              </button>
            </div>
          </form>
        </div>

        {/* Right: Interactive Draggable Board */}
        <div className="relative h-[600px] w-full border-4 border-kraft-dark bg-white shadow-xl rounded-sm">
          {/* Corkboard texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="absolute top-2 left-2 font-mono text-sm text-ink/50 bg-neon-yellow px-2 border border-ink rotate-2">
            [ DRAG THE STICKIES ]
          </div>

          {stickies.map((sticky) => (
            <motion.div
              key={sticky.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50 }}
              initial={{ x: sticky.x, y: sticky.y, rotate: sticky.rotate }}
              className={`absolute w-40 h-40 ${sticky.color} p-4 cursor-grab active:cursor-grabbing border border-ink/10 flex items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/40 shadow-sm border border-white/50 -translate-y-1 rotate-1 backdrop-blur-sm"></div>
              <p className="font-marker text-2xl text-ink leading-tight select-none">
                {sticky.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
