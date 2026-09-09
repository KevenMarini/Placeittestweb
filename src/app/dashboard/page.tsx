"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const POWERUPS = [
  { no: "01", name: "Reveal Track", tag: "Recon", icon: "🔍", color: "bg-neon-cyan", borderColor: "border-neon-cyan", textColor: "text-neon-cyan", desc: "One team gets a chance to reveal one particular domain track before the auction begins. Use it wisely — information is power." },
  { no: "02", name: "Track Swap", tag: "Statement Swap", icon: "🔄", color: "bg-neon-pink", borderColor: "border-neon-pink", textColor: "text-neon-pink", desc: "If your assigned problem statement feels too tough, use this to swap tracks. You can change the track within your domain — but choose carefully, there's no going back." },
  { no: "03", name: "Tech Stack Lifeline", tag: "Debug Session", icon: "🛠️", color: "bg-neon-mint", borderColor: "border-neon-mint", textColor: "text-neon-mint", desc: "Grants a dedicated 15-minute hands-on debugging session with a senior Technical Head to solve a specific, critical codebase blocker." },
  { no: "04", name: "Extra Time", tag: "Time Boost", icon: "⏱️", color: "bg-neon-yellow", borderColor: "border-neon-yellow", textColor: "text-ink", desc: "The team is awarded an extra 5 minutes of working time for pitch prep, or an extra minute during pitching at the judges' discretion." },
  { no: "05", name: "Judge's Insight", tag: "Mentorship", icon: "🎯", color: "bg-neon-pink", borderColor: "border-neon-pink", textColor: "text-neon-pink", desc: "The team gets direct, personalized feedback from a judge on how to improve their idea. The team must align their solution with the judge's suggestions going forward." },
  { no: "06", name: "Pitch Order Pick", tag: "Strategy", icon: "🃏", color: "bg-neon-cyan", borderColor: "border-neon-cyan", textColor: "text-neon-cyan", desc: "The team gets to choose their slot in the pitching order, letting them pick the position they believe gives them the strongest edge in front of the jury." },
];

const UPLOAD_GUIDELINES = [
  { icon: "📁", rule: "Upload your file to Google Drive before submitting." },
  { icon: "🔓", rule: 'Set sharing to "Anyone with the link can view" — not restricted to specific people.' },
  { icon: "🔗", rule: "Copy the shareable link from Drive (Share → Copy Link) and paste it here." },
  { icon: "📄", rule: "Accepted formats: Google Slides, PDF, or PowerPoint (.pptx) uploaded to Drive." },
  { icon: "🏷️", rule: "Name your file clearly: [TeamName]_PlaceIT5.0_Presentation" },
  { icon: "🚫", rule: "Do NOT submit editing or commenting links — view-only links only." },
  { icon: "✅", rule: "Test your link in an incognito/private window before submitting." },
  { icon: "⚠️", rule: "You can update your link anytime while submissions are open. Only your last submission counts." },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [statements, setStatements] = useState<any[]>([]);
  const [createTeamName, setCreateTeamName] = useState("");
  const [joinTeamCode, setJoinTeamCode] = useState("");
  const [flippedPowerup, setFlippedPowerup] = useState<number | null>(null);

  // Presentation
  const [presentationUnlocked, setPresentationUnlocked] = useState(false);
  const [presentationLink, setPresentationLink] = useState("");
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const fetchState = () => {
    const userStr = localStorage.getItem("placeit_user");
    if (!userStr) { router.push("/register"); return; }
    const parsedUser = JSON.parse(userStr);

    fetch("/api/teams/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: parsedUser.regNo })
    }).then(res => res.json()).then(data => {
      const u = data.success ? data.user : parsedUser;
      setUser(u);
      if (data.success) {
        setTeam(data.user.team);
        // Fetch presentation state once we have team
        if (data.user.team?.id) {
          fetch(`/api/presentations?teamId=${data.user.team.id}`)
            .then(r => r.json())
            .then(pd => {
              setPresentationUnlocked(pd.isUnlocked);
              setSubmittedLink(pd.submission?.link || null);
            });
        }
      }
    });

    fetch("/api/statements").then(res => res.json()).then(data => {
      if (data.success) setStatements(data.statements);
    });
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 6000);
    return () => clearInterval(interval);
  }, [router]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTeamName) return;
    const res = await fetch("/api/teams/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ regNo: user.regNo, teamName: createTeamName }) });
    const data = await res.json();
    if (data.success) { setCreateTeamName(""); fetchState(); } else alert(data.error);
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinTeamCode) return;
    const res = await fetch("/api/teams/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ regNo: user.regNo, code: joinTeamCode }) });
    const data = await res.json();
    if (data.success) { setJoinTeamCode(""); fetchState(); } else alert(data.error);
  };

  const handleConfirmTeam = async () => {
    const res = await fetch("/api/teams/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ regNo: user.regNo, teamId: team.id }) });
    const data = await res.json();
    if (data.success) { alert("Team confirmed!"); fetchState(); } else alert(data.error);
  };

  const handleSubmitPresentation = async () => {
    if (!presentationLink.trim()) return;
    if (!presentationLink.startsWith("http")) { alert("Please enter a valid URL starting with http/https"); return; }
    setSubmitting(true);
    const res = await fetch("/api/presentations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: team.id, teamName: team.name, link: presentationLink.trim() })
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.success) {
      setSubmittedLink(data.submission.link);
      setPresentationLink("");
      alert("✅ Presentation submitted successfully!");
    } else {
      alert("Error: " + data.error);
    }
  };

  const leaveRoom = () => { localStorage.removeItem("placeit_user"); router.push("/"); };

  if (!user) return <div className="min-h-screen bg-canvas pt-24 text-center font-marker text-3xl text-ink pt-40">Loading Workspace...</div>;

  const isTeamLocked = team && team.isLocked && team.statementId;
  const uniqueDomains = Array.from(new Set(statements.map(s => s.domain)));

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-end mb-10 border-b-4 border-ink pb-4">
          <div>
            <h1 className="font-marker text-5xl md:text-6xl text-ink">Innovator Workspace</h1>
            <p className="font-mono text-ink-light mt-2">ID: {user.regNo} | Alias: {user.username}</p>
          </div>
          <button onClick={leaveRoom} className="font-marker text-2xl text-ink underline decoration-wavy hover:text-neon-pink transition-colors">Leave Room</button>
        </div>

        {!team ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-paper p-8 relative shadow-lg wobbly-border-alt">
              <div className="tape -top-3 left-1/2 -translate-x-1/2"></div>
              <h2 className="font-marker text-3xl mb-6 text-ink">Create a Team</h2>
              <form onSubmit={handleCreateTeam}>
                <label className="block font-sans font-bold text-ink mb-2">Team Name</label>
                <input type="text" value={createTeamName} onChange={e => setCreateTeamName(e.target.value)} className="w-full bg-paper border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-pink" placeholder="e.g. ByteBuilders" required />
                <button type="submit" className="w-full bg-neon-pink text-white font-marker text-2xl py-3 wobbly-border hover:bg-neon-yellow hover:text-ink transition-colors shadow-[4px_4px_0px_rgba(26,26,26,1)]">Form Team</button>
              </form>
            </div>
            <div className="bg-paper p-8 relative shadow-lg wobbly-border">
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3"></div>
              <h2 className="font-marker text-3xl mb-6 text-ink">Join a Team</h2>
              <form onSubmit={handleJoinTeam}>
                <label className="block font-sans font-bold text-ink mb-2">Team Passcode</label>
                <input type="text" value={joinTeamCode} onChange={e => setJoinTeamCode(e.target.value)} className="w-full bg-paper border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-cyan uppercase" placeholder="e.g. A1B2C3D4" required />
                <button type="submit" className="w-full bg-neon-cyan text-ink font-marker text-2xl py-3 wobbly-border-alt hover:bg-neon-yellow transition-colors shadow-[4px_4px_0px_rgba(26,26,26,1)]">Enter Team</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-14">

            {/* ── Team Card ── */}
            <div className="bg-paper p-8 border-t-[20px] border-neon-pink shadow-md relative w-fit mx-auto min-w-[300px] rotate-1">
              <div className="tape -top-8 left-10 -rotate-2"></div>
              <h2 className="font-marker text-4xl text-ink text-center mb-2">{team.name}</h2>
              <div className="text-center mb-6">
                <span className="font-mono text-lg bg-neon-yellow px-4 py-1 font-bold text-ink inline-block shadow-sm">Code: {team.code}</span>
              </div>
              <ul className="space-y-3 font-sans text-lg">
                {team.members.map((m: any) => (
                  <li key={m.id} className="flex items-center gap-2 text-ink">
                    <span className="w-4 h-4 rounded-full bg-neon-mint inline-block border border-ink"></span>
                    <span className="font-bold">{m.regNo}</span> - {m.username}
                    {m.isLeader && <span className="ml-2 bg-ink text-white text-xs px-2 py-0.5 font-bold uppercase">Captain</span>}
                  </li>
                ))}
              </ul>
              {user.isLeader && !team.isConfirmed && (
                <div className="mb-4 bg-red-50 p-2 border-l-4 border-red-500 text-center mt-6">
                  <p className="font-sans text-xs text-red-700 mb-2 font-bold">Need 2-4 members to confirm.</p>
                  <button onClick={handleConfirmTeam} className="bg-red-500 text-white font-bold px-4 py-1 text-sm hover:bg-red-600 transition">Confirm Team</button>
                </div>
              )}
            </div>

            {/* ── Problem Statement Section ── */}
            <div>
              <div className="mb-6 relative">
                <div className="tape -top-3 left-8 rotate-2"></div>
                <h2 className="font-marker text-4xl text-ink inline-block bg-neon-yellow px-5 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-1">
                  Problem Statement
                </h2>
              </div>

              {isTeamLocked ? (
                /* ── Assigned Blueprint ── */
                <div className="bg-paper p-8 shadow-xl wobbly-border-alt border-4 border-neon-cyan relative max-w-4xl">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neon-cyan text-ink font-marker text-2xl px-6 py-2 wobbly-border rotate-2 whitespace-nowrap z-10">
                    ASSIGNED BLUEPRINT ✓
                  </div>
                  {(() => {
                    const stmt = statements.find(s => s.id === team.statementId);
                    if (!stmt) return (
                      <div className="mt-6 text-center">
                        <h3 className="font-marker text-3xl text-ink mb-4">{team.statementTitle}</h3>
                        <p className="font-mono mt-2 bg-ink text-white inline-block px-4 py-2">
                          Domain: {team.domain} {team.statementTrack ? `| Track: ${team.statementTrack}` : ''}
                        </p>
                      </div>
                    );
                    return (
                      <div className="mt-8 text-left space-y-6">
                        <div className="text-center mb-8 border-b-2 border-ink/10 pb-6">
                          <span className="font-mono font-bold text-ink/60 mb-2 block">[{stmt.domain}] {stmt.track}</span>
                          <h3 className="font-marker text-4xl text-ink leading-tight">{stmt.title}</h3>
                        </div>
                        <div>
                          <h4 className="font-marker text-2xl bg-neon-yellow/30 inline-block px-2 mb-2 -rotate-1 text-ink">The Core Problem:</h4>
                          <p className="font-sans text-lg text-ink leading-relaxed whitespace-pre-wrap">{stmt.problem}</p>
                        </div>
                        <div className="border-l-4 border-neon-cyan pl-4 py-2 bg-canvas/50">
                          <h4 className="font-marker text-2xl bg-neon-cyan/30 inline-block px-2 mb-2 rotate-1 text-ink">Your Challenge:</h4>
                          <p className="font-sans text-lg text-ink leading-relaxed font-bold italic whitespace-pre-wrap">{stmt.challenge}</p>
                        </div>
                        {stmt.description && (
                          <div className="bg-kraft/30 p-4 wobbly-border-alt">
                            <span className="font-bold font-mono uppercase text-ink/70 block mb-1">In simple terms:</span>
                            <p className="font-sans text-ink leading-relaxed whitespace-pre-wrap">{stmt.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                /* ── Domains + Waiting ── */
                <div className="bg-paper border-4 border-ink p-6 shadow-[4px_4px_0px_rgba(26,26,26,1)] wobbly-border-alt">
                  <p className="font-sans text-ink-light mb-5 text-base">
                    Domains available for bidding. Your blueprint will appear here once the admin assigns it.
                  </p>
                  {uniqueDomains.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {uniqueDomains.map((d, i) => {
                        const colors = ["bg-neon-cyan", "bg-neon-pink", "bg-neon-yellow", "bg-neon-mint"];
                        const rots = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
                        return (
                          <motion.span
                            key={d as string}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.07 }}
                            className={`${colors[i % colors.length]} ${rots[i % rots.length]} px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_rgba(26,26,26,1)] font-marker text-lg text-ink`}
                          >
                            {d as string}
                          </motion.span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="font-mono text-ink-light italic">No domains added yet. Check back soon!</p>
                  )}
                  <div className="mt-5 inline-block bg-neon-yellow/30 border-2 border-neon-yellow px-4 py-2 font-marker text-lg text-ink">
                    ⏳ Waiting for admin assignment...
                  </div>
                </div>
              )}
            </div>

            {/* ── Submit Presentation ── */}
            <div>
              <div className="mb-6 relative">
                <div className="tape -top-3 right-12 -rotate-2"></div>
                <h2 className="font-marker text-4xl text-ink inline-block bg-neon-mint px-5 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] rotate-1">
                  📊 Submit Presentation
                </h2>
              </div>

              <div className={`bg-paper border-4 ${presentationUnlocked ? 'border-neon-mint wobbly-border-alt' : 'border-ink wobbly-border'} p-6 shadow-[4px_4px_0px_rgba(26,26,26,1)] space-y-5`}>
                
                {/* Always show Current submission if it exists */}
                {submittedLink && (
                  <div className={`border-2 p-4 flex items-center justify-between gap-4 flex-wrap ${presentationUnlocked ? 'bg-neon-mint/20 border-neon-mint' : 'bg-canvas/50 border-ink'}`}>
                    <div>
                      <p className="font-bold font-sans text-ink text-sm uppercase mb-1">
                        {presentationUnlocked ? "✅ Current Submission" : "🔒 Final Submission"}
                      </p>
                      <a href={submittedLink} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-neon-cyan underline break-all hover:text-neon-pink">
                        {submittedLink}
                      </a>
                    </div>
                    <span className={`font-marker text-sm text-ink px-3 py-1 border border-ink ${presentationUnlocked ? 'bg-neon-mint' : 'bg-paper'}`}>
                      {presentationUnlocked ? "Submitted" : "Locked"}
                    </span>
                  </div>
                )}

                {!presentationUnlocked ? (
                  <div className="bg-paper/50 border-2 border-ink border-dashed p-6 text-center mt-4">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="font-marker text-2xl text-ink mb-1">Submissions Locked</h3>
                    <p className="font-sans text-sm text-ink-light">
                      {submittedLink ? "Your presentation is locked in and cannot be changed." : "Presentation submissions are currently closed."}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Guidelines toggle */}
                    <button
                      onClick={() => setShowGuidelines(!showGuidelines)}
                      className="font-marker text-lg text-neon-cyan underline decoration-wavy hover:text-neon-pink transition-colors"
                    >
                      {showGuidelines ? "▲ Hide Guidelines" : "▼ Read Before Uploading (Important!)"}
                    </button>

                    <AnimatePresence>
                      {showGuidelines && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-kraft/30 border-2 border-ink p-5 space-y-3 overflow-hidden"
                        >
                          <h4 className="font-marker text-xl text-ink mb-3">📋 Upload Guidelines</h4>
                          {UPLOAD_GUIDELINES.map((g, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="text-xl flex-shrink-0">{g.icon}</span>
                              <p className="font-sans text-sm text-ink leading-relaxed">{g.rule}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Link input */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="url"
                        value={presentationLink}
                        onChange={e => setPresentationLink(e.target.value)}
                        className="flex-1 border-2 border-ink p-3 font-mono text-sm text-ink bg-paper focus:outline-none focus:border-neon-mint"
                        placeholder="Paste your Google Drive share link here..."
                      />
                      <button
                        onClick={handleSubmitPresentation}
                        disabled={submitting || !presentationLink.trim()}
                        className="bg-neon-mint text-ink font-marker text-xl px-6 py-3 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-yellow hover:shadow-[6px_6px_0px_rgba(26,26,26,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {submitting ? "Submitting..." : submittedLink ? "Update Link" : "Submit →"}
                      </button>
                    </div>
                    <p className="font-sans text-xs text-ink-light">
                      🔓 Submissions are open. You can update your link at any time while it remains unlocked.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* ── Power-Ups ── */}
            <div>
              <div className="mb-8 relative">
                <div className="tape -top-3 left-12 rotate-3"></div>
                <h2 className="font-marker text-5xl text-ink inline-block bg-neon-pink px-6 py-2 wobbly-border shadow-[6px_6px_0px_rgba(26,26,26,1)] -rotate-1">
                  ⚡ Power-Ups
                </h2>
                <p className="font-sans text-ink-light mt-4 ml-1">Win these during The Power-Up Hour! Click a card to read more.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {POWERUPS.map((p, i) => (
                  <motion.div
                    key={p.no}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setFlippedPowerup(flippedPowerup === i ? null : i)}
                    className={`relative cursor-pointer border-4 border-ink bg-paper shadow-[5px_5px_0px_rgba(26,26,26,1)] hover:shadow-[8px_8px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "-rotate-2"}`}
                  >
                    <div className={`${p.color} border-b-4 border-ink px-4 py-2 flex items-center justify-between`}>
                      <span className="font-mono text-xs font-black text-ink">POWER-UP {p.no}</span>
                      <span className="font-marker text-xs bg-ink text-white px-2 py-0.5">{p.tag}</span>
                    </div>
                    <div className="p-5">
                      <div className="text-4xl mb-3">{p.icon}</div>
                      <h3 className="font-marker text-2xl text-ink mb-2 leading-tight">{p.name}</h3>
                      {flippedPowerup === i ? (
                        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-sm text-ink leading-relaxed">{p.desc}</motion.p>
                      ) : (
                        <p className={`font-mono text-xs font-bold ${p.textColor} uppercase tracking-wider`}>Tap to reveal →</p>
                      )}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${p.color} border-2 border-ink shadow-sm`}></div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
