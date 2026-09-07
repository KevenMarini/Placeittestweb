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
  const [user, setUser] = useState<{regNo: string, username: string} | null>(null);
  const [team, setTeam] = useState<{name: string, code: string, members: string[], statementId?: string} | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("hardware");
  const [selectedStatement, setSelectedStatement] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("placeit_user");
    if (!storedUser) {
      router.push("/register");
      return;
    }
    setUser(JSON.parse(storedUser));
    
    const storedTeam = localStorage.getItem("placeit_team");
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    }
  }, [router]);

  const handleCreateTeam = () => {
    if (!newTeamName) return;
    const newTeam = {
      name: newTeamName,
      code: `TEAM_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      members: [user?.username || "Unknown"],
    };
    setTeam(newTeam);
    localStorage.setItem("placeit_team", JSON.stringify(newTeam));
  };

  const handleJoinTeam = () => {
    if (!joinCode) return;
    const newTeam = {
      name: "Joined Team",
      code: joinCode,
      members: ["Leader", user?.username || "Unknown"],
    };
    setTeam(newTeam);
    localStorage.setItem("placeit_team", JSON.stringify(newTeam));
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-marker text-3xl text-ink">Checking clipboard...</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-ink pb-4 border-dashed">
          <div>
            <h1 className="font-marker text-5xl font-bold text-ink">The Workspace</h1>
            <p className="font-mono text-sm text-ink bg-neon-yellow px-2 py-1 inline-block mt-2 -rotate-1">
              Hacker: {user.username} | Badge: {user.regNo}
            </p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("placeit_user"); router.push("/register"); }}
            className="font-marker text-xl text-ink underline decoration-wavy hover:text-neon-pink transition-colors"
          >
            Leave Room
          </button>
        </div>

        {!team ? (
          /* TEAM FORMATION SECTION */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 wobbly-border shadow-[8px_8px_0px_rgba(26,26,26,0.1)] relative">
              <div className="tape -top-3 left-1/2 -translate-x-1/2"></div>
              <h2 className="font-marker text-3xl font-bold text-ink mb-6">Start a New Team</h2>
              <input
                type="text"
                placeholder="Awesome Team Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full bg-canvas border-2 border-ink text-ink font-sans text-lg p-3 mb-6 focus:outline-none focus:border-neon-mint"
              />
              <button onClick={handleCreateTeam} className="w-full bg-neon-mint text-ink font-marker text-2xl py-3 wobbly-border-alt hover:bg-neon-yellow transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)]">
                Create Team
              </button>
            </div>

            <div className="bg-kraft p-8 wobbly-border shadow-[8px_8px_0px_rgba(26,26,26,0.1)] relative">
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-3"></div>
              <h2 className="font-marker text-3xl font-bold text-ink mb-6">Join an Existing Team</h2>
              <input
                type="text"
                placeholder="Enter Team Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full bg-white border-2 border-ink text-ink font-mono text-lg p-3 mb-6 focus:outline-none focus:border-neon-cyan"
              />
              <button onClick={handleJoinTeam} className="w-full bg-neon-cyan text-ink font-marker text-2xl py-3 wobbly-border hover:bg-neon-pink transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)]">
                Join Team
              </button>
            </div>
          </div>
        ) : (
          /* TEAM DASHBOARD SECTION */
          <div className="space-y-12">
            
            {/* Team Index Card */}
            <div className="bg-white p-8 border-t-[20px] border-neon-pink shadow-md relative w-fit mx-auto min-w-[300px] rotate-1">
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-canvas border-2 border-ink flex items-center justify-center">
                <div className="w-3 h-3 bg-ink rounded-full" />
              </div>
              <h2 className="font-marker text-4xl text-ink text-center mb-2">{team.name}</h2>
              <div className="border-y-2 border-ink/20 py-2 my-4 text-center">
                <p className="font-mono text-sm text-ink-light">Team Code</p>
                <p className="font-mono text-xl font-bold text-ink">{team.code}</p>
              </div>
              <p className="font-sans text-sm font-bold text-ink mb-2">Members:</p>
              <ul className="font-marker text-xl text-ink space-y-1">
                {team.members.map((m, i) => <li key={i}>- {m}</li>)}
              </ul>
            </div>

            {/* Bidding & Domains */}
            <div>
              <div className="text-center mb-12">
                <h2 className="font-marker text-5xl font-bold text-ink inline-block bg-neon-yellow px-6 py-2 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,1)] -rotate-2">
                  IT'S TIME FOR BIDDING!
                </h2>
                <p className="font-sans text-lg text-ink-light mt-4 bg-white/50 inline-block px-4 py-2 wobbly-border-alt">
                  Review the problem statements below. Admins will assign the final blueprints.
                </p>
              </div>

              <h3 className="font-marker text-3xl font-bold text-ink mb-6">View Problem Statements</h3>
              
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
          </div>
        )}
      </div>

      {/* Statement Details Modal */}
      {selectedStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
          <div className="bg-canvas max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative wobbly-border shadow-[12px_12px_0px_rgba(26,26,26,1)]">
            <button 
              onClick={() => setSelectedStatement(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-neon-pink text-ink font-marker text-xl wobbly-border-alt hover:bg-neon-yellow transition-colors"
            >
              X
            </button>
            
            <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2"></div>
            
            <span className="font-mono text-sm font-bold text-ink/50 block mb-2">{selectedStatement.id}</span>
            <h2 className="font-marker text-4xl text-ink mb-8 leading-tight">{selectedStatement.title}</h2>
            
            <div className="space-y-6 font-sans text-lg text-ink">
              <div>
                <h3 className="font-marker text-2xl bg-neon-yellow/30 inline-block px-2 mb-2 -rotate-1">Problem Statement:</h3>
                <p className="leading-relaxed">{selectedStatement.problem}</p>
              </div>
              
              <div className="border-l-4 border-neon-cyan pl-4 py-2 bg-white/50">
                <h3 className="font-marker text-2xl bg-neon-cyan/30 inline-block px-2 mb-2 rotate-1">Challenge:</h3>
                <p className="leading-relaxed font-bold italic">{selectedStatement.challenge}</p>
              </div>
              
              <div>
                <h3 className="font-marker text-2xl bg-neon-mint/30 inline-block px-2 mb-2 -rotate-1">Why it works for an ideathon:</h3>
                <p className="leading-relaxed">{selectedStatement.why}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
