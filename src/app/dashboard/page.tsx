"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const domains = [
  { id: "iot-aiml", name: "IOT / AI / ML" },
  { id: "cyber", name: "Cyber Security / Blockchain" },
  { id: "math", name: "Mathematical Models & NLMs" },
  { id: "health", name: "HealthCare / MedTech" },
  { id: "auto", name: "Smart Automation" },
  { id: "hardware", name: "Hardware Innovation" },
  { id: "open", name: "Open Statements" },
];

const mockStatements = {
  "iot-aiml": [
    { id: "stmt_01", title: "Predictive Maintenance System", desc: "Build an AI model using IoT sensor data to predict equipment failure." },
    { id: "stmt_02", title: "Smart City Traffic Optimizer", desc: "Use computer vision and ML to optimize traffic light timings." }
  ],
  "cyber": [
    { id: "stmt_03", title: "Decentralized Identity Vault", desc: "Create a blockchain-based secure identity verification system." }
  ]
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{regNo: string, username: string} | null>(null);
  const [team, setTeam] = useState<{name: string, code: string, members: string[], statementId?: string} | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

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

  const handleSelectStatement = (id: string) => {
    if (!team) return;
    const updatedTeam = { ...team, statementId: id };
    setTeam(updatedTeam);
    localStorage.setItem("placeit_team", JSON.stringify(updatedTeam));
    alert("Blueprint pinned to your board!");
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-marker text-3xl text-ink">Checking clipboard...</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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

            {/* Domains & Schematics */}
            <div>
              <h2 className="font-marker text-4xl font-bold text-ink mb-8">Idea Board (Domains)</h2>
              
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

              {/* Problem Statements */}
              {selectedDomain && (
                <div className="space-y-6">
                  <h3 className="font-marker text-3xl text-ink bg-white inline-block px-4 py-1 wobbly-border-alt -rotate-1 shadow-sm">
                    Blueprints for {domains.find(d=>d.id === selectedDomain)?.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {/* @ts-ignore */}
                    {(mockStatements[selectedDomain] || []).length > 0 ? (
                      /* @ts-ignore */
                      mockStatements[selectedDomain].map((stmt) => (
                        <div key={stmt.id} className="polaroid relative hover:scale-[1.02] transition-transform cursor-pointer">
                          <div className="tape -top-2 left-10 rotate-1"></div>
                          
                          <div className="w-full h-32 bg-canvas border-2 border-ink/20 mb-4 flex items-center justify-center">
                            <span className="font-marker text-ink/20 text-4xl">SKETCH</span>
                          </div>
                          
                          <div className="font-mono text-xs text-ink-light mb-1">ID: {stmt.id}</div>
                          <h4 className="font-marker text-2xl text-ink mb-2 leading-tight">{stmt.title}</h4>
                          <p className="font-sans text-sm text-ink leading-relaxed">{stmt.desc}</p>
                          
                          <div className="mt-4 flex justify-end">
                            {team.statementId === stmt.id ? (
                              <div className="font-marker text-xl text-neon-pink rotate-[-5deg] border-2 border-neon-pink px-2 py-1 inline-block">
                                PINNED!
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleSelectStatement(stmt.id)}
                                className="font-marker text-xl text-ink bg-neon-cyan px-4 py-1 wobbly-border hover:bg-neon-yellow transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)]"
                              >
                                Pin this idea
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full p-8 font-marker text-2xl text-ink-light text-center">
                        No ideas scribbled here yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
