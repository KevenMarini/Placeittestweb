"use client";

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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* Left Col: Rules (Notebook style) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-white p-8 md:p-12 shadow-md rotate-1"
        >
          {/* Notebook holes */}
          <div className="absolute left-4 top-0 bottom-0 w-8 border-r-2 border-neon-pink flex flex-col justify-evenly">
            {[1,2,3,4,5,6].map(i => <div key={i} className="w-4 h-4 bg-canvas rounded-full border border-ink/20 -ml-2" />)}
          </div>
          
          <div className="pl-10">
            <h2 className="font-marker text-4xl font-bold text-ink mb-6 inline-block relative">
              Rules of Engagement
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 0" stroke="var(--color-neon-yellow)" strokeWidth="4" fill="none" />
              </svg>
            </h2>

            <div className="space-y-6 font-sans text-ink">
              <motion.div variants={itemVariants}>
                <h3 className="font-marker text-2xl text-neon-pink">Team Formation</h3>
                <ul className="list-disc pl-5 marker:text-ink">
                  <li><strong>Team Size:</strong> 2 to 4 members. Solo participation is a no-go.</li>
                  <li><strong>Eligibility:</strong> Open to all disciplines. Cross-specialization is cool!</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="font-marker text-2xl text-neon-cyan">Code of Conduct</h3>
                <ul className="list-disc pl-5 marker:text-ink">
                  <li><strong>Original Work:</strong> Build it here. No pre-existing projects!</li>
                  <li><strong>Deadlines:</strong> Submit before Day 2 morning. No exceptions.</li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="font-marker text-2xl text-neon-mint">Pitching</h3>
                <ul className="list-disc pl-5 marker:text-ink">
                  <li><strong>Time:</strong> 7 min pitch + 2 min Q&A.</li>
                  <li><strong>Speakers:</strong> At least two members must present.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Rubric (Clipboard style) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-kraft-dark p-6 md:p-8 rounded-md shadow-lg -rotate-2"
        >
          {/* Clipboard clip */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-ink rounded-md shadow-md border-b-4 border-ink-light flex justify-center items-center">
            <div className="w-16 h-2 bg-canvas/20 rounded-full" />
          </div>

          <div className="bg-canvas p-6 mt-4 wobbly-border">
            <h2 className="font-marker text-3xl font-bold text-ink mb-6 text-center">
              Evaluation Rubric
            </h2>

            <div className="divide-y-2 divide-ink/20 font-marker text-xl">
              <div className="flex justify-between items-center py-2 text-ink-light text-lg">
                <span>Criteria</span>
                <span>Points</span>
              </div>
              
              {criteria.map((item, index) => (
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ x: 10, color: "var(--color-neon-pink)" }}
                  key={index} 
                  className="flex justify-between items-center py-3 cursor-pointer transition-colors"
                >
                  <span className="font-sans font-bold text-ink">{item.name}</span>
                  <span className="text-ink">{item.points}</span>
                </motion.div>
              ))}
              
              <div className="flex justify-between items-center py-4 mt-2 border-t-4 border-ink">
                <span className="font-sans font-bold text-ink">TOTAL</span>
                <span className="font-marker text-3xl text-neon-pink">50</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
