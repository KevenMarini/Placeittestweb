"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockStatements } from "@/data/statements";

const domains = [
  { id: "iot-aiml", name: "IOT / AI / ML" },
  { id: "cyber", name: "Cyber Security / Blockchain" },
  { id: "math", name: "Mathematical Models & NLMs" },
  { id: "health", name: "HealthCare / MedTech" },
  { id: "auto", name: "Smart Automation" },
  { id: "hardware", name: "Hardware Innovation" },
  { id: "open", name: "Open Statements" },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  
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

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-4 border-ink pb-4">
          <div>
            <h1 className="font-marker text-5xl md:text-6xl text-ink">Innovator Workspace</h1>
            <p className="font-mono text-ink-light mt-2">ID: {user.regNo} | Alias: {user.username}</p>
          </div>
          <button onClick={leaveRoom} className="font-marker text-2xl text-neon-pink underline decoration-wavy hover:text-ink transition-colors">
            Leave Room
          </button>
        </div>

        {!team ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 relative shadow-lg wobbly-border-alt">
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-1"></div>
              <h2 className="font-marker text-3xl text-ink mb-2">Make a Team</h2>
              <p className="font-sans text-ink-light mb-6">Become the Team Captain</p>
              
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <input
                  type="text"
                  required
                  value={createTeamName}
                  onChange={(e) => setCreateTeamName(e.target.value)}
                  placeholder="Enter Team Name..."
                  className="w-full bg-transparent border-b-2 border-ink p-2 font-sans text-lg focus:outline-none focus:border-neon-pink"
                />
                <button type="submit" className="w-full font-marker text-2xl bg-neon-cyan py-3 text-ink wobbly-border shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-neon-pink hover:text-white transition-colors">
                  Create Crew
                </button>
              </form>
            </div>

            <div className="bg-kraft p-8 wobbly-border shadow-[8px_8px_0px_rgba(26,26,26,0.1)] relative">
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3"></div>
              <h2 className="font-marker text-3xl font-bold text-ink mb-2">Join a Team</h2>
              <p className="font-sans text-sm text-ink/70 mb-6">(Enter Team ID given by Captain)</p>
              <form onSubmit={handleJoinTeam}>
                <input
                  type="text"
                  placeholder="Enter Team ID"
                  required
                  value={joinTeamCode}
                  onChange={(e) => setJoinTeamCode(e.target.value)}
                  className="w-full bg-white border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-cyan uppercase"
                />
                <button type="submit" className="w-full bg-neon-cyan text-ink font-marker text-2xl py-3 wobbly-border hover:bg-neon-pink transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)]">
                  Join Team
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Team Index Card */}
            <div className="bg-white p-8 border-t-[20px] border-neon-pink shadow-md relative w-fit mx-auto min-w-[300px] rotate-1">
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-canvas border-2 border-ink flex items-center justify-center">
                <div className="w-3 h-3 bg-ink rounded-full" />
              </div>
              <h2 className="font-marker text-4xl text-ink text-center mb-2">{team.name}</h2>
              <div className="border-y-2 border-ink/20 py-2 my-4 text-center">
                <p className="font-mono text-sm text-ink-light">Team ID</p>
                <p className="font-mono text-xl font-bold text-ink">{team.code}</p>
                <p className="mt-2 font-sans font-bold text-sm">Status: {team.isConfirmed ? "Confirmed ✓" : "Forming..."}</p>
              </div>
              <p className="font-sans text-sm font-bold text-ink mb-2">Members:</p>
              <ul className="font-sans text-ink space-y-1 mb-6">
                {team.members.map((m: any) => (
                  <li key={m.id}>
                    <span className="font-bold">{m.regNo}</span> - {m.username} {m.isLeader && <span className="text-xs bg-ink text-white px-1 ml-1 rounded">Captain</span>}
                  </li>
                ))}
              </ul>

              {user.isLeader && !team.isConfirmed && (
                <div className="mb-4 bg-red-50 p-2 border-l-4 border-red-500 text-center">
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
              <div className="mt-16 bg-white p-8 shadow-xl wobbly-border-alt border-4 border-neon-cyan relative max-w-2xl mx-auto">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neon-cyan text-ink font-marker text-3xl px-8 py-2 wobbly-border rotate-2 whitespace-nowrap">
                  ASSIGNED BLUEPRINT
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-marker text-3xl text-ink mb-4">{team.statementTitle}</h3>
                  <p className="font-mono mt-2 bg-ink text-white inline-block px-4 py-2">Domain: {team.domain} | ID: {team.statementId}</p>
                </div>
              </div>
            ) : !viewingStatements ? (
              <div className="text-center mt-16 mb-12">
                <h2 className="font-marker text-5xl font-bold text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-2">
                  IT'S TIME FOR BIDDING!
                </h2>
                <p className="font-sans text-lg text-ink-light mt-4 bg-white/50 inline-block px-4 py-2 wobbly-border-alt mb-8">
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
                  {domains.map((d, i) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDomain(d.id)}
                      className={`font-marker text-xl px-4 py-2 transition-transform hover:-translate-y-1 sticky-note ${
                        selectedDomain === d.id 
                        ? "bg-neon-yellow scale-110 z-10" 
                        : "bg-white text-ink-light"
                      }`}
                      style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>

                {/* Problem Statements List */}
                {selectedDomain && (
                  <div className="space-y-6">
                    <h3 className="font-marker text-3xl text-ink bg-white inline-block px-4 py-1 wobbly-border-alt -rotate-1 shadow-sm">
                      Blueprints for {domains.find(d=>d.id === selectedDomain)?.name}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                      {/* @ts-ignore */}
                      {(mockStatements[selectedDomain] || []).length > 0 ? (
                        /* @ts-ignore */
                        mockStatements[selectedDomain].map((stmt) => (
                          <div 
                            key={stmt.id} 
                            onClick={() => setSelectedStatement(stmt)}
                            className="polaroid relative hover:scale-[1.01] transition-transform cursor-pointer"
                          >
                            <div className="tape -top-2 left-10 rotate-1"></div>
                            
                            <div className="w-full h-12 bg-canvas border-b-2 border-ink/20 mb-4 flex items-center justify-between px-4">
                              <span className="font-mono text-sm font-bold text-ink">{stmt.id}</span>
                              <span className="font-marker text-sm text-neon-pink bg-neon-pink/10 px-2 py-0.5 border border-neon-pink/30 rounded-sm -rotate-2">
                                Awaiting Admin Assignment
                              </span>
                            </div>
                            
                            <h4 className="font-marker text-2xl text-ink mb-2 leading-tight px-2">{stmt.title}</h4>
                            <p className="font-sans text-sm text-ink leading-relaxed px-2 pb-4 line-clamp-3">
                              {stmt.problem}
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
            {/* Absolute Close Button */}
            <button 
              onClick={() => setSelectedStatement(null)}
              className="absolute -top-5 -right-2 md:-right-5 z-50 w-12 h-12 flex items-center justify-center bg-neon-pink text-ink font-marker text-2xl wobbly-border-alt shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-yellow transition-transform hover:scale-110"
            >
              X
            </button>

            <div className="bg-canvas w-full max-h-[calc(100vh-8rem)] flex flex-col relative wobbly-border shadow-[12px_12px_0px_rgba(26,26,26,1)] overflow-hidden">
              {/* Modal Header (Fixed) */}
              <div className="p-6 pb-4 flex flex-col border-b-2 border-ink/10 relative z-10 bg-canvas shrink-0">
                <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2"></div>
                <span className="font-mono text-sm font-bold text-ink/50 block mb-1">{selectedStatement.id}</span>
                <h2 className="font-marker text-3xl md:text-4xl text-ink leading-tight pr-8">{selectedStatement.title}</h2>
              </div>
              
              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto font-sans text-lg text-ink space-y-6">
                
                <div>
                  <h3 className="font-marker text-2xl bg-neon-yellow/30 inline-block px-2 mb-2 -rotate-1">The Core Problem:</h3>
                  <p className="leading-relaxed">{selectedStatement.problem}</p>
                </div>

                {selectedStatement.easy && (
                  <div className="bg-kraft/30 p-4 wobbly-border-alt text-base">
                    <span className="font-bold font-mono uppercase text-ink/70 block mb-1">In simple terms:</span>
                    <p className="leading-relaxed">{selectedStatement.easy}</p>
                  </div>
                )}
                
                <div className="border-l-4 border-neon-cyan pl-4 py-2 bg-white/50">
                  <h3 className="font-marker text-2xl bg-neon-cyan/30 inline-block px-2 mb-2 rotate-1">Your Challenge:</h3>
                  <p className="leading-relaxed font-bold italic">{selectedStatement.challenge}</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
