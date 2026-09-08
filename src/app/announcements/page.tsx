"use client";

import { useEffect, useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/announcements")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnnouncements(data.announcements);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12 relative">
        <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-1"></div>
        <h1 className="font-marker text-5xl md:text-6xl text-ink inline-block bg-paper px-8 py-4 wobbly-border shadow-[8px_8px_0px_rgba(26,26,26,1)] -rotate-1">
          📢 Announcements
        </h1>
        <p className="font-sans text-xl text-ink-light mt-6 bg-paper/50 inline-block px-4 py-2 wobbly-border-alt">
          Stay updated with the latest drops from the admin team.
        </p>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="text-center font-marker text-2xl text-ink-light">Loading...</div>
        ) : announcements.length > 0 ? (
          announcements.map((ann, i) => (
            <div 
              key={ann.id} 
              className={`bg-paper p-6 md:p-8 wobbly-border shadow-[6px_6px_0px_rgba(26,26,26,0.2)] relative ${i === 0 ? 'border-l-[16px] border-l-neon-pink' : 'border-l-[16px] border-l-neon-yellow'}`}
            >
              <div className="tape -top-3 right-10 rotate-3"></div>
              <div className="flex justify-between items-start mb-4 gap-4 flex-col md:flex-row">
                <span className="font-mono text-sm font-bold text-ink-light shrink-0 bg-canvas px-2 py-1 border border-ink/20">
                  {new Date(ann.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="font-sans text-lg text-ink leading-relaxed whitespace-pre-wrap">
                {ann.message}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-paper p-12 text-center wobbly-border border-dashed border-4 border-ink/20">
            <h3 className="font-marker text-2xl text-ink-light">No announcements yet.</h3>
            <p className="font-sans text-ink-light mt-2">Check back later for updates from the admins.</p>
          </div>
        )}
      </div>
    </div>
  );
}
