"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Terminal } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    d: 0, h: 0, m: 0, s: 0,
  });

  useEffect(() => {
    // Target date: Sept 12, 2026
    const targetDate = new Date("2026-09-12T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-cyan/20">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-64 h-px bg-cyan" />
        <div className="absolute bottom-1/4 right-10 w-64 h-px bg-cyan" />
        <div className="absolute top-20 right-20 w-px h-64 bg-cyan" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 border border-amber/30 bg-amber/5 px-3 py-1 w-fit cad-chamfer">
            <Terminal size={14} className="text-amber" />
            <span className="font-mono text-xs text-amber tracking-widest uppercase">
              SYS_INIT // SEC_01
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-off-white uppercase leading-tight">
            Place<span className="text-cyan">IT</span>
            <br />
            <span className="text-3xl md:text-4xl text-off-white/70">Ideathon 2026</span>
          </h1>

          <p className="font-sans text-lg text-off-white/70 max-w-xl border-l-2 border-cyan/50 pl-4 py-2">
            The flagship ideathon by IEEE PCS. Develop and pitch innovative solutions to real-world problems. Enter the laboratory. Build the future.
          </p>

          <div className="grid grid-cols-4 gap-4 max-w-sm border border-cyan/20 p-4 bg-navy-dark/50 relative cad-border">
            {/* Countdown */}
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <span className="font-mono text-2xl text-cyan text-glow">
                  {value.toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] text-off-white/50 uppercase">{unit}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 font-mono text-sm font-bold text-navy bg-cyan px-8 py-4 hover:bg-amber transition-all duration-300 cad-chamfer shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(255,183,3,0.6)] group"
            >
              <Cpu className="group-hover:animate-spin" size={18} />
              [ INITIALIZE REGISTRATION ]
            </Link>
          </div>
        </div>

        {/* Right Content - Wireframe Visual */}
        <div className="relative h-[400px] w-full flex items-center justify-center">
          <div className="absolute inset-0 border border-cyan/20 cad-border opacity-50"></div>
          
          {/* Rotating Wireframe SVG */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: 20, rotateY: 30 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-64 h-64"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              {/* Outer Hexagon */}
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="var(--color-cyan)" strokeWidth="0.5" />
              {/* Inner Hexagon */}
              <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="none" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="2 2" />
              {/* Connecting Lines */}
              <line x1="50" y1="5" x2="50" y2="20" stroke="var(--color-cyan)" strokeWidth="0.5" />
              <line x1="95" y1="27.5" x2="75" y2="35" stroke="var(--color-cyan)" strokeWidth="0.5" />
              <line x1="95" y1="72.5" x2="75" y2="65" stroke="var(--color-cyan)" strokeWidth="0.5" />
              <line x1="50" y1="95" x2="50" y2="80" stroke="var(--color-cyan)" strokeWidth="0.5" />
              <line x1="5" y1="72.5" x2="25" y2="65" stroke="var(--color-cyan)" strokeWidth="0.5" />
              <line x1="5" y1="27.5" x2="25" y2="35" stroke="var(--color-cyan)" strokeWidth="0.5" />
              {/* Center Core */}
              <circle cx="50" cy="50" r="8" fill="none" stroke="var(--color-amber)" strokeWidth="1" className="text-glow-amber" />
              <circle cx="50" cy="50" r="3" fill="var(--color-amber)" />
            </svg>
          </motion.div>

          {/* Callouts */}
          <div className="absolute top-10 right-10 font-mono text-[10px] text-cyan/70 border-b border-cyan/30 pb-1">
            CORE_TEMP: OPTIMAL
          </div>
          <div className="absolute bottom-10 left-10 font-mono text-[10px] text-amber border-l border-amber/30 pl-2">
            PROTOTYPE: MK-I
          </div>
        </div>

      </div>
    </section>
  );
}
