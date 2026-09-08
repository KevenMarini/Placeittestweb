"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [statements, setStatements] = useState<any[]>([]);
  
  // Create / Join Forms
  const [createTeamName, setCreateTeamName] = useState("");
  const [joinTeamCode, setJoinTeamCode] = useState("");

  const [viewingStatements, setViewingStatements] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedStatement, setSelectedStatement] = useState<any | null>(null);

  const fetchState = () => {
    const userStr = localStorage.getItem("placeit_user");
    if (!userStr) {
      router.push("/register");
      return;
    }
    const parsedUser = JSON.parse(userStr);
    
    fetch("/api/teams/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: parsedUser.regNo })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setUser(data.user);
        setTeam(data.user.team);
      } else {
        setUser(parsedUser);
      }
    });

    fetch("/api/statements")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatements(data.statements);
        }
      });
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 5000); // Live update every 5 seconds
    return () => clearInterval(interval);
  }, [router]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTeamName) return;
    const res = await fetch("/api/teams/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: user.regNo, teamName: createTeamName })
    });
    const data = await res.json();
    if (data.success) {
      setCreateTeamName("");
      fetchState();
    } else alert(data.error);
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinTeamCode) return;
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: user.regNo, code: joinTeamCode })
    });
    const data = await res.json();
    if (data.success) {
      setJoinTeamCode("");
      fetchState();
    } else alert(data.error);
  };

  const handleConfirmTeam = async () => {
    const res = await fetch("/api/teams/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo: user.regNo, teamId: team.id })
    });
    const data = await res.json();
    if (data.success) {
      alert("Team confirmed successfully!");
      fetchState();
    } else alert(data.error);
  };

  const leaveRoom = () => {
    localStorage.removeItem("placeit_user");
    router.push("/");
  };

  if (!user) return <div className="min-h-screen bg-canvas pt-24 text-center">Loading Workspace...</div>;

  const isTeamLocked = team && team.isLocked && team.statementId;
  const uniqueDomains = Array.from(new Set(statements.map(s => s.domain)));

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-4 border-ink pb-4">
          <div>
            <h1 className="font-marker text-5xl md:text-6xl text-ink">Innovator Workspace</h1>
            <p className="font-mono text-ink-light mt-2">ID: {user.regNo} | Alias: {user.username}</p>
          </div>
          <button 
            onClick={leaveRoom}
            className="font-marker text-2xl text-ink underline decoration-wavy hover:text-neon-pink transition-colors"
          >
            Leave Room
          </button>
        </div>

        {!team ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Create Team */}
            <div className="bg-paper p-8 relative shadow-lg wobbly-border-alt">
              <div className="tape -top-3 left-1/2 -translate-x-1/2"></div>
              <h2 className="font-marker text-3xl mb-6 text-ink">Create a Team</h2>
              <form onSubmit={handleCreateTeam}>
                <label className="block font-sans font-bold text-ink mb-2">Team Name</label>
                <input 
                  type="text" 
                  value={createTeamName}
                  onChange={(e) => setCreateTeamName(e.target.value)}
                  className="w-full bg-paper border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-pink"
                  placeholder="e.g. ByteBuilders"
                  required
                />
                <button type="submit" className="w-full bg-neon-pink text-white font-marker text-2xl py-3 wobbly-border hover:bg-neon-yellow hover:text-ink transition-colors shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_rgba(26,26,26,1)] -translate-y-1 hover:-translate-y-2">
                  Form Team
                </button>
              </form>
            </div>

            {/* Join Team */}
            <div className="bg-paper p-8 relative shadow-lg wobbly-border">
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3"></div>
              <h2 className="font-marker text-3xl mb-6 text-ink">Join a Team</h2>
              <form onSubmit={handleJoinTeam}>
                <label className="block font-sans font-bold text-ink mb-2">Team Passcode</label>
                <input 
                  type="text" 
                  value={joinTeamCode}
                  onChange={(e) => setJoinTeamCode(e.target.value)}
                  className="w-full bg-paper border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-cyan uppercase"
                  placeholder="e.g. A1B2C3D4"
                  required
                />
                <button type="submit" className="w-full bg-neon-cyan text-ink font-marker text-2xl py-3 wobbly-border-alt hover:bg-neon-yellow transition-colors shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_rgba(26,26,26,1)] -translate-y-1 hover:-translate-y-2">
                  Enter Team
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-paper p-8 border-t-[20px] border-neon-pink shadow-md relative w-fit mx-auto min-w-[300px] rotate-1">
              <div className="tape -top-8 left-10 -rotate-2"></div>
              <h2 className="font-marker text-4xl text-ink text-center mb-2">{team.name}</h2>
              <div className="text-center mb-6">
                <span className="font-mono text-lg bg-neon-yellow px-4 py-1 font-bold text-ink inline-block shadow-sm">
                  Code: {team.code}
                </span>
              </div>
              
              <ul className="space-y-3 font-sans text-lg">
                {team.members.map((m: any) => (
                  <li key={m.id} className="flex items-center gap-2 text-ink">
                    <span className="w-4 h-4 rounded-full bg-neon-mint inline-block border border-ink"></span>
                    <span className="font-bold">{m.regNo}</span> - {m.username}
                    {m.isLeader && <span className="ml-2 bg-ink text-white text-xs px-2 py-0.5 rounded-sm font-bold uppercase">Captain</span>}
                  </li>
                ))}
              </ul>

              {user.isLeader && !team.isConfirmed && (
                <div className="mb-4 bg-red-50 p-2 border-l-4 border-red-500 text-center mt-6">
                  <p className="font-sans text-xs text-red-700 mb-2 font-bold">
                    Need 2-4 members to confirm.
                  </p>
                  <button 
                    onClick={handleConfirmTeam}
                    className="bg-red-500 text-white font-bold px-4 py-1 text-sm hover:bg-red-600 transition"
                  >
                    Confirm Team
                  </button>
                </div>
              )}
            </div>

            {/* Bidding & Domains Flow */}
            {isTeamLocked ? (
              <div className="mt-16 bg-paper p-8 shadow-xl wobbly-border-alt border-4 border-neon-cyan relative max-w-4xl mx-auto">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neon-cyan text-ink font-marker text-3xl px-8 py-2 wobbly-border rotate-2 whitespace-nowrap z-10">
                  ASSIGNED BLUEPRINT
                </div>
                
                {(() => {
                  const assignedStatement = statements.find(s => s.id === team.statementId);
                  if (!assignedStatement) return (
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
                        <span className="font-mono font-bold text-ink/60 mb-2 block">[{assignedStatement.domain}] {assignedStatement.track}</span>
                        <h3 className="font-marker text-4xl text-ink leading-tight">{assignedStatement.title}</h3>
                      </div>
                      
                      <div>
                        <h4 className="font-marker text-2xl bg-neon-yellow/30 inline-block px-2 mb-2 -rotate-1 text-ink">The Core Problem:</h4>
                        <p className="font-sans text-lg text-ink leading-relaxed whitespace-pre-wrap">{assignedStatement.problem}</p>
                      </div>

                      <div className="border-l-4 border-neon-cyan pl-4 py-2 bg-canvas/50">
                        <h4 className="font-marker text-2xl bg-neon-cyan/30 inline-block px-2 mb-2 rotate-1 text-ink">Your Challenge:</h4>
                        <p className="font-sans text-lg text-ink leading-relaxed font-bold italic whitespace-pre-wrap">{assignedStatement.challenge}</p>
                      </div>

                      {assignedStatement.description && (
                        <div className="bg-kraft/30 p-4 wobbly-border-alt">
                          <span className="font-bold font-mono uppercase text-ink/70 block mb-1">In simple terms:</span>
                          <p className="font-sans text-ink leading-relaxed whitespace-pre-wrap">{assignedStatement.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : !viewingStatements ? (
              <div className="text-center mt-16 mb-12">
                <h2 className="font-marker text-5xl font-bold text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-2">
                  IT'S TIME FOR BIDDING!
                </h2>
                <p className="font-sans text-lg text-ink-light mt-4 bg-paper/50 inline-block px-4 py-2 wobbly-border-alt mb-8">
                  Review the problem statements below. Admins will assign the final blueprints.
                </p>
                <div>
                  <button
                    onClick={() => setViewingStatements(true)}
                    className="font-marker text-2xl text-ink bg-neon-cyan px-8 py-3 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-all"
                  >
                    View Problem Statements &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                <button 
                  onClick={() => {
                    setViewingStatements(false);
                    setSelectedDomain(null);
                  }}
                  className="font-marker text-xl underline decoration-wavy hover:text-neon-pink"
                >
                  &larr; Back to Dashboard
                </button>

                <h3 className="font-marker text-3xl font-bold text-ink mb-6">Select a Domain</h3>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  {uniqueDomains.map((d, i) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDomain(d)}
                      className={`font-marker text-xl px-4 py-2 transition-transform hover:-translate-y-1 sticky-note ${
                        selectedDomain === d 
                        ? "bg-neon-yellow scale-110 z-10" 
                        : "bg-paper text-ink-light"
                      }`}
                      style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
                    >
                      {d}
                    </button>
                  ))}
                  {uniqueDomains.length === 0 && (
                    <p className="font-sans text-ink-light italic">No domains available yet.</p>
                  )}
                </div>

                {/* Problem Statements List */}
                {selectedDomain && (
                  <div className="space-y-6">
                    <h3 className="font-marker text-3xl text-ink bg-paper inline-block px-4 py-1 wobbly-border-alt -rotate-1 shadow-sm">
                      Blueprints for {selectedDomain}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                      {statements.filter(s => s.domain === selectedDomain).length > 0 ? (
                        statements.filter(s => s.domain === selectedDomain).map((stmt) => (
                          <div 
                            key={stmt.id} 
                            onClick={() => setSelectedStatement(stmt)}
                            className="polaroid relative hover:scale-[1.01] transition-transform cursor-pointer"
                          >
                            <div className="tape -top-2 left-10 rotate-1"></div>
                            
                            <div className="w-full h-12 bg-canvas border-b-2 border-ink/20 mb-4 flex items-center justify-between px-4">
                              <span className="font-mono text-sm font-bold text-ink">{stmt.track}</span>
                              <span className="font-marker text-sm text-neon-pink bg-neon-pink/10 px-2 py-0.5 border border-neon-pink/30 rounded-sm -rotate-2">
                                Awaiting Admin Assignment
                              </span>
                            </div>
                            
                            <h4 className="font-marker text-2xl text-ink mb-2 leading-tight px-2">{stmt.title}</h4>
                            <p className="font-sans text-sm text-ink leading-relaxed px-2 pb-4 line-clamp-3">
                              {stmt.description}
                            </p>
                            <div className="px-2 pb-4">
                              <span className="text-neon-cyan font-bold font-mono text-xs uppercase underline decoration-wavy hover:text-neon-pink">
                                Click to read full details
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full p-8 font-marker text-2xl text-ink-light text-center border-4 border-dashed border-ink/20 rounded-xl">
                          No blueprints scribbled here yet. Check back later!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statement Details Modal */}
      {selectedStatement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 sm:p-6 sm:pt-24 bg-ink/40 backdrop-blur-sm"
          onClick={() => setSelectedStatement(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedStatement(null)}
              className="absolute -top-5 -right-2 md:-right-5 z-50 w-12 h-12 flex items-center justify-center bg-neon-pink text-ink font-marker text-2xl wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-yellow transition-transform hover:scale-110"
            >
              X
            </button>

            <div className="bg-canvas w-full max-h-[calc(100vh-8rem)] flex flex-col relative wobbly-border shadow-[12px_12px_0px_rgba(26,26,26,1)] overflow-hidden">
              <div className="p-6 pb-4 flex flex-col border-b-2 border-ink/10 relative z-10 bg-canvas shrink-0">
                <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2"></div>
                <span className="font-mono text-sm font-bold text-ink/50 block mb-1">[{selectedStatement.domain}] {selectedStatement.track}</span>
                <h2 className="font-marker text-3xl md:text-4xl text-ink leading-tight pr-8">{selectedStatement.title}</h2>
              </div>
              
              <div className="p-6 overflow-y-auto font-sans text-lg text-ink space-y-6 bg-paper">
                <div>
                  <h3 className="font-marker text-2xl bg-neon-yellow/30 inline-block px-2 mb-2 -rotate-1 text-ink">The Core Problem:</h3>
                  <p className="leading-relaxed whitespace-pre-wrap text-ink">{selectedStatement.problem}</p>
                </div>

                <div className="border-l-4 border-neon-cyan pl-4 py-2 bg-canvas/50">
                  <h3 className="font-marker text-2xl bg-neon-cyan/30 inline-block px-2 mb-2 rotate-1 text-ink">Your Challenge:</h3>
                  <p className="leading-relaxed font-bold italic whitespace-pre-wrap text-ink">{selectedStatement.challenge}</p>
                </div>

                {selectedStatement.description && (
                  <div className="bg-kraft/30 p-4 wobbly-border-alt">
                    <span className="font-bold font-mono uppercase text-ink/70 block mb-1">In simple terms:</span>
                    <p className="leading-relaxed whitespace-pre-wrap text-ink">{selectedStatement.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
