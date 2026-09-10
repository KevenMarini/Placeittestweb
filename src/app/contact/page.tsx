"use client";

import { useEffect, useState } from "react";
import RuleBooks from "@/components/RuleBooks";

export default function Contact() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then(res => res.json())
      .then(data => {
        if (data.success) setLinks(data.links);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto space-y-24">
        
        {/* Contact Paper Block */}
        <div
          className="max-w-2xl w-full bg-paper p-8 md:p-12 shadow-xl relative rotate-1"
          style={{
            backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "100% 2rem",
            backgroundPosition: "0 1rem"
          }}
        >
          {/* Paperclips */}
          <div className="absolute -top-4 left-1/4 w-4 h-12 border-2 border-ink rounded-full bg-slate-300 shadow-sm" />
          <div className="absolute -top-4 right-1/4 w-4 h-12 border-2 border-ink rounded-full bg-slate-300 shadow-sm" />

          <h1 className="font-marker text-6xl text-ink mb-8 mt-4 text-center">Get in Touch</h1>

          {loading ? (
            <p className="font-marker text-2xl text-ink-light text-center">Loading...</p>
          ) : links.length === 0 ? (
            <p className="font-marker text-2xl text-ink-light text-center">No contact info available yet.</p>
          ) : (
            <div className="space-y-5">
              {links.map((item, i) => {
                const bgColors = [
                  "bg-neon-mint/10",
                  "bg-neon-cyan/10",
                  "bg-neon-pink/10",
                  "bg-neon-yellow/10",
                ];
                const borderStyles = i % 2 === 0 ? "wobbly-border" : "wobbly-border-alt";
                const bg = bgColors[i % bgColors.length];

                const isLink = item.link && (item.link.startsWith("http") || item.link.startsWith("mailto:"));

                return (
                  <div key={item.id} className={`flex items-center gap-4 border-2 border-ink p-4 ${bg} ${borderStyles}`}>
                    {item.icon && <span className="text-3xl flex-shrink-0">{item.icon}</span>}
                    <div>
                      <p className="font-sans text-sm font-bold text-ink-light uppercase mb-1">{item.label}</p>
                      {isLink ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-marker text-2xl text-ink hover:text-neon-pink underline decoration-wavy transition-colors break-all"
                        >
                          {item.link.startsWith("mailto:") ? item.link.replace("mailto:", "") : item.link}
                        </a>
                      ) : (
                        <p className="font-marker text-2xl text-ink break-all">{item.link || "—"}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-10 pt-8 border-t-4 border-ink border-dashed">
            <p className="font-marker text-2xl text-neon-pink rotate-[-2deg]">
              We can't wait to see what you build!
            </p>
          </div>
        </div>

        {/* Rule Books Section */}
        <RuleBooks />

      </div>
    </div>
  );
}
