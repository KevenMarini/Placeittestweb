"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We only want the splash screen to show once per session ideally,
    // but for the demo, showing it on initial load is fine.
    const hasSeenSplash = sessionStorage.getItem("placeit_splash_seen");
    
    if (hasSeenSplash) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("placeit_splash_seen", "true");
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash"
            initial={{ y: 0 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-canvas"
            style={{ 
              backgroundImage: "radial-gradient(var(--color-kraft) 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          >
            <div className="relative wobbly-border bg-paper p-8 md:p-12 shadow-[8px_8px_0px_rgba(26,26,26,1)] flex flex-col items-center -rotate-2 max-w-sm text-center">
              <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-3"></div>
              
              <Image 
                src="/icon.jpg" 
                alt="PlaceIT 5.0" 
                width={150} 
                height={50} 
                className="w-auto h-16 rounded-sm mb-6 shadow-sm"
              />
              
              <h2 className="font-marker text-3xl text-ink mb-6">Setting up the lab...</h2>
              
              {/* Hand-drawn loading bar */}
              <div className="w-full h-4 border-2 border-ink rounded-full overflow-hidden relative bg-canvas">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-neon-yellow"
                  style={{ borderRight: "2px solid #1A1A1A" }}
                />
              </div>
              <p className="font-mono text-xs text-ink-light mt-4">Gathering markers & tape...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hide the main content's scrollbar while loading to prevent scrolling */}
      <div style={{ height: isLoading ? "100vh" : "auto", overflow: isLoading ? "hidden" : "visible" }}>
        {children}
      </div>
    </>
  );
}
