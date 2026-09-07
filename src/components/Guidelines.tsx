"use client";

import { AlertTriangle, CheckCircle2, Target } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Guidelines() {
  const criteria = [
    { name: "Innovation", points: 10 },
    { name: "Feasibility", points: 10 },
    { name: "Impact & Scale", points: 10 },
    { name: "MVP / Design", points: 10 },
    { name: "Presentation", points: 10 },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-24 relative border-b border-cyan/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Col: Rules */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-8 flex items-end gap-4 border-b border-cyan/30 pb-4">
            <h2 className="font-heading text-3xl font-bold text-off-white">
              SYSTEM_PROTOCOLS
            </h2>
            <span className="font-mono text-xs text-cyan mb-1">
              // GUIDELINES
            </span>
          </div>

          <div className="space-y-6">
            <motion.div variants={itemVariants} className="border border-cyan/20 bg-navy-dark/50 p-6 cad-border box-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-cyan" size={20} />
                <h3 className="font-mono text-sm font-bold text-off-white">TEAM_FORMATION</h3>
              </div>
              <ul className="font-sans text-sm text-off-white/70 space-y-2 list-disc pl-5 marker:text-cyan">
                <li><strong className="text-off-white">Team Size:</strong> Teams must consist of 2 to 4 members. Solo participation is not permitted.</li>
                <li><strong className="text-off-white">Eligibility:</strong> Open to all undergraduate and postgraduate students across disciplines.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="border border-amber/30 bg-amber/5 p-6 cad-border hover:shadow-[0_0_15px_rgba(255,183,3,0.3)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-amber" size={20} />
                <h3 className="font-mono text-sm font-bold text-amber">CODE_OF_CONDUCT</h3>
              </div>
              <ul className="font-sans text-sm text-off-white/70 space-y-2 list-disc pl-5 marker:text-amber">
                <li><strong className="text-off-white">Original Work:</strong> All ideas and design frameworks must be conceived during the event.</li>
                <li><strong className="text-off-white">Deadlines:</strong> Submissions must be uploaded to the official portal before Day 2 morning deadline.</li>
                <li><strong className="text-off-white">Professionalism:</strong> Participants must maintain professional decorum.</li>
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="border border-cyan/20 bg-navy-dark/50 p-6 cad-border box-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-cyan" size={20} />
                <h3 className="font-mono text-sm font-bold text-off-white">PITCHING_RULES</h3>
              </div>
              <ul className="font-sans text-sm text-off-white/70 space-y-2 list-disc pl-5 marker:text-cyan">
                <li><strong className="text-off-white">Time Limits:</strong> Exactly 7 minutes to pitch, followed by a 2-minute Q&A.</li>
                <li><strong className="text-off-white">Presenters:</strong> At least two members must speak during the presentation.</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Col: Rubric */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-8 flex items-end gap-4 border-b border-cyan/30 pb-4">
            <h2 className="font-heading text-3xl font-bold text-off-white">
              EVAL_CRITERIA
            </h2>
            <span className="font-mono text-xs text-amber mb-1">
              // RUBRIC_MAX_50
            </span>
          </div>

          <div className="border border-cyan/30 bg-navy-dark overflow-hidden cad-border hover:border-cyan/50 transition-colors duration-500">
            <div className="bg-cyan/10 px-4 py-3 border-b border-cyan/30 flex justify-between">
              <span className="font-mono text-xs text-cyan">PARAMETER</span>
              <span className="font-mono text-xs text-cyan">WEIGHT</span>
            </div>
            
            <div className="divide-y divide-cyan/10">
              {criteria.map((item, index) => (
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ x: 10, backgroundColor: "rgba(0, 240, 255, 0.1)" }}
                  key={index} 
                  className="flex justify-between items-center px-4 py-4 cursor-pointer transition-colors"
                >
                  <span className="font-heading font-medium text-off-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full hidden sm:block opacity-50"></span>
                    {item.name}
                  </span>
                  <span className="font-mono text-amber">
                    {item.points} PTS
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={itemVariants} className="bg-amber/10 px-4 py-3 border-t border-amber/30 flex justify-between items-center relative overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/10 to-transparent skew-x-12"
              />
              <span className="font-mono text-xs font-bold text-amber relative z-10">TOTAL_POSSIBLE</span>
              <span className="font-mono text-lg font-bold text-amber text-glow-amber relative z-10">50 PTS</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
