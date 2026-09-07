export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "Ideathon Kickoff!",
      date: "September 8, 2026 - 09:00 AM",
      content: "Welcome to PlaceIT 5.0! Registration is officially open. Gather your team, finalize your secret passcode, and review the problem statements in the dashboard.",
      important: true,
    },
    {
      id: 2,
      title: "Problem Statements Revealed",
      date: "September 8, 2026 - 10:30 AM",
      content: "All 30 problem statements across our domains (including the newly added Mathematical Models & NLMs) have been published to the dashboard. Start brainstorming!",
      important: false,
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 relative">
        <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-1"></div>
        <h1 className="font-marker text-5xl md:text-6xl text-ink inline-block bg-white px-8 py-4 wobbly-border shadow-[8px_8px_0px_rgba(26,26,26,1)] -rotate-1">
          📢 Announcements
        </h1>
        <p className="font-sans text-xl text-ink-light mt-6 bg-white/50 inline-block px-4 py-2 wobbly-border-alt">
          Stay updated with the latest drops from the admin team.
        </p>
      </div>

      <div className="space-y-8">
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div 
              key={ann.id} 
              className={`bg-white p-6 md:p-8 wobbly-border shadow-[6px_6px_0px_rgba(26,26,26,0.2)] relative ${ann.important ? 'border-l-[16px] border-l-neon-pink' : 'border-l-[16px] border-l-neon-yellow'}`}
            >
              <div className="tape -top-3 right-10 rotate-3"></div>
              <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
                <h2 className="font-marker text-3xl text-ink leading-tight">{ann.title}</h2>
                <span className="font-mono text-sm font-bold text-ink-light shrink-0 bg-canvas px-2 py-1 border border-ink/20">
                  {ann.date}
                </span>
              </div>
              <p className="font-sans text-lg text-ink leading-relaxed">
                {ann.content}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 text-center wobbly-border border-dashed border-4 border-ink/20">
            <h3 className="font-marker text-2xl text-ink-light">No announcements yet.</h3>
            <p className="font-sans text-ink-light mt-2">Check back later for updates from the admins.</p>
          </div>
        )}
      </div>
    </div>
  );
}
