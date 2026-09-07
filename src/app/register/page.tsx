"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    regNo: "",
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.regNo || !formData.password) return;
    if (!isLogin && !formData.username) return;
    
    setIsSubmitted(true);

    setTimeout(() => {
      localStorage.setItem("placeit_user", JSON.stringify({
        regNo: formData.regNo,
        username: isLogin ? "Ideator" : formData.username, // Mock user name on login
      }));
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 perspective-[2000px]">
      <motion.div 
        className="relative w-full max-w-md h-[650px] preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT FACE: GUIDELINES */}
        <div 
          className="absolute inset-0 bg-white p-8 shadow-xl backface-hidden flex flex-col" 
          style={{ borderLeft: "4px dashed #D9C5A0" }}
        >
          {/* Tear stub */}
          <div className="absolute top-8 bottom-8 -left-8 w-8 bg-kraft flex flex-col justify-between py-4" style={{ borderRight: "4px dashed #1A1A1A" }}>
            {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-canvas rounded-full -ml-2 border border-ink/20"></div>)}
          </div>
          
          <div className="tape -top-3 left-10 rotate-2"></div>
          
          <div className="mb-6 border-b-2 border-ink/20 pb-4">
            <h1 className="font-marker text-4xl font-bold text-ink mb-1">Registration Guide</h1>
            <p className="font-mono text-xs text-ink-light">Read before you flip!</p>
          </div>

          <div className="flex-grow space-y-6 font-sans text-lg text-ink">
            <div>
              <h3 className="font-marker text-2xl text-neon-pink">1. VIT Reg No</h3>
              <p className="text-sm leading-relaxed">Enter your valid registration number (e.g., 23BCE1001). This will be verified during check-in.</p>
            </div>
            <div>
              <h3 className="font-marker text-2xl text-neon-cyan">2. Alias / Name</h3>
              <p className="text-sm leading-relaxed">Choose your real name or a cool hacker alias to be displayed on the leaderboards.</p>
            </div>
            <div>
              <h3 className="font-marker text-2xl text-neon-mint">3. Secret Passcode</h3>
              <p className="text-sm leading-relaxed">Set a simple PIN or password to secure your team identity during the event.</p>
            </div>
          </div>

          <button
            onClick={() => setIsFlipped(true)}
            className="mt-6 w-full font-marker text-2xl text-ink bg-neon-cyan py-3 hover:bg-neon-pink hover:text-white transition-all duration-300 wobbly-border shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_rgba(26,26,26,1)]"
          >
            Turn Page &rarr;
          </button>
        </div>

        {/* BACK FACE: FORM */}
        <div 
          className="absolute inset-0 bg-white p-8 shadow-xl backface-hidden flex flex-col" 
          style={{ transform: "rotateY(180deg)", borderRight: "4px dashed #D9C5A0" }}
        >
          {/* Tear stub on the "right" side since it's flipped */}
          <div className="absolute top-8 bottom-8 -right-8 w-8 bg-kraft flex flex-col justify-between py-4" style={{ borderLeft: "4px dashed #1A1A1A" }}>
            {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-canvas rounded-full -mr-2 border border-ink/20"></div>)}
          </div>

          <div className="tape -top-2 right-10 -rotate-3"></div>
          
          <div className="mb-6 border-b-2 border-ink/20 pb-4 flex justify-between items-start">
            <div>
              <h1 className="font-marker text-4xl font-bold text-ink mb-1">
                {isLogin ? "RSVP / Check-in" : "New RSVP"}
              </h1>
              <p className="font-mono text-xs text-ink-light">
                {isLogin ? "Admit One to The Lab" : "Fill out your tag"}
              </p>
            </div>
            <button 
              onClick={() => setIsFlipped(false)}
              className="font-marker text-xl underline decoration-wavy hover:text-neon-pink"
            >
              &larr; Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
            <div className="space-y-1">
              <label className="font-marker text-xl text-ink">VIT Reg No:</label>
              <input
                type="text"
                required
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                className="w-full bg-transparent border-b-2 border-ink text-ink font-sans p-2 focus:outline-none focus:border-neon-pink transition-colors text-lg"
                placeholder="23BCE1001"
              />
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="font-marker text-xl text-ink">Alias / Name:</label>
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-ink text-ink font-sans p-2 focus:outline-none focus:border-neon-pink transition-colors text-lg"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-marker text-xl text-ink">Secret Passcode:</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent border-b-2 border-ink text-ink font-sans p-2 focus:outline-none focus:border-neon-pink transition-colors text-lg"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full font-marker text-2xl text-ink bg-neon-yellow py-3 hover:bg-neon-pink hover:text-white transition-all duration-300 wobbly-border shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_rgba(26,26,26,1)]"
            >
              {isLogin ? "Punch Ticket" : "Get Ticket"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-sans font-bold text-sm text-ink-light hover:text-neon-pink transition-colors underline decoration-wavy"
            >
              {isLogin ? "Don't have a ticket? Create a new account." : "Already have a ticket? Check in."}
            </button>
          </div>

          {/* Stamp Animation */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 3, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/50 backdrop-blur-[1px] rounded-sm"
              >
                <div className="border-4 border-neon-pink text-neon-pink font-marker text-5xl p-4 rotate-12 bg-white shadow-xl opacity-90 mix-blend-multiply">
                  APPROVED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
