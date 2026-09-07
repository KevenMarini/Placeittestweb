"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Users, Cpu, Shield, Activity, Settings, Wrench, Globe, Check } from "lucide-react";

const domains = [
  { id: "iot-aiml", name: "IOT / AI / ML", icon: Cpu },
  { id: "cyber", name: "Cyber Security / Blockchain", icon: Shield },
  { id: "math", name: "Mathematical Models & NLMs", icon: Settings },
  { id: "health", name: "HealthCare / MedTech", icon: Activity },
  { id: "auto", name: "Smart Automation", icon: Settings },
  { id: "hardware", name: "Hardware Innovation", icon: Wrench },
  { id: "open", name: "Open Statements", icon: Globe },
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
  
  // Team State
  const [team, setTeam] = useState<{name: string, code: string, members: string[], statementId?: string} | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [newTeamName, setNewTeamName] = useState("");

  // Domain State
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    // Check if user is logged in (mock)
    const storedUser = localStorage.getItem("placeit_user");
    if (!storedUser) {
      router.push("/register");
      return;
    }
    setUser(JSON.parse(storedUser));
    
    // Check for team
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
    // In a real app, verify code. Here we just mock joining.
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
    alert("Problem Statement selected successfully. Awaiting admin approval.");
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-mono text-cyan">LOADING_SYSTEM_PROFILE...</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-cyan/30 pb-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-off-white">COMMAND_CENTER</h1>
            <p className="font-mono text-xs text-cyan">ACTIVE_USER: {user.username} [{user.regNo}]</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("placeit_user"); router.push("/register"); }}
            className="font-mono text-xs text-amber border border-amber/30 px-3 py-1 hover:bg-amber/10 transition-colors cad-chamfer"
          >
            [ LOGOUT ]
          </button>
        </div>

        {!team ? (
          /* TEAM FORMATION SECTION */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-cyan/30 bg-navy-dark/80 p-6 cad-border">
              <h2 className="font-mono text-sm font-bold text-cyan mb-4 flex items-center gap-2">
                <Users size={16} /> INITIALIZE_NEW_TEAM
              </h2>
              <input
                type="text"
                placeholder="TEAM_NAME"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full bg-navy border border-cyan/30 text-off-white font-mono p-3 mb-4 focus:outline-none focus:border-cyan cad-chamfer"
              />
              <button onClick={handleCreateTeam} className="w-full bg-cyan text-navy font-mono text-sm font-bold py-3 hover:bg-amber transition-colors cad-chamfer">
                [ CREATE_TEAM ]
              </button>
            </div>

            <div className="border border-cyan/30 bg-navy-dark/80 p-6 cad-border">
              <h2 className="font-mono text-sm font-bold text-cyan mb-4 flex items-center gap-2">
                <Shield size={16} /> JOIN_EXISTING_TEAM
              </h2>
              <input
                type="text"
                placeholder="ENTER_TEAM_CODE"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full bg-navy border border-cyan/30 text-off-white font-mono p-3 mb-4 focus:outline-none focus:border-cyan cad-chamfer"
              />
              <button onClick={handleJoinTeam} className="w-full bg-transparent border border-cyan text-cyan font-mono text-sm font-bold py-3 hover:bg-cyan/10 transition-colors cad-chamfer">
                [ JOIN_TEAM ]
              </button>
            </div>
          </div>
        ) : (
          /* TEAM DASHBOARD SECTION */
          <div className="space-y-8">
            {/* Team Info Card */}
            <div className="border border-cyan/30 bg-navy-dark/50 p-6 cad-border relative overflow-hidden">
              <div className="absolute right-0 top-0 text-9xl text-cyan/5 -z-10 -mt-8"><Users /></div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-off-white">{team.name}</h2>
                  <p className="font-mono text-sm text-cyan mt-1">TEAM_CODE: <span className="text-amber">{team.code}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-off-white/50 mb-1">MEMBERS</p>
                  <ul className="font-mono text-sm text-off-white">
                    {team.members.map((m, i) => (
                      <li key={i} className="flex items-center gap-2 justify-end">
                        {m} <User size={12} className="text-cyan" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Domains & Schematics */}
            <div>
              <div className="mb-6 border-b border-cyan/30 pb-2 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-off-white">SCHEMATICS_LIBRARY</h2>
                <span className="font-mono text-xs text-off-white/50">SELECT DOMAIN</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {domains.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDomain(d.id)}
                    className={`p-3 border flex flex-col items-center gap-2 text-center transition-all cad-chamfer ${
                      selectedDomain === d.id 
                      ? "border-cyan bg-cyan/10 text-cyan box-glow" 
                      : "border-cyan/20 bg-navy-dark/50 text-off-white/70 hover:border-cyan/50 hover:text-off-white"
                    }`}
                  >
                    <d.icon size={20} className={selectedDomain === d.id ? "text-cyan" : ""} />
                    <span className="font-mono text-[10px] uppercase">{d.name}</span>
                  </button>
                ))}
              </div>

              {/* Problem Statements */}
              {selectedDomain && (
                <div className="space-y-4">
                  <h3 className="font-mono text-sm text-cyan mb-4">AVAILABLE_BLUEPRINTS // {domains.find(d=>d.id === selectedDomain)?.name}</h3>
                  
                  {/* @ts-ignore */}
                  {(mockStatements[selectedDomain] || []).length > 0 ? (
                    /* @ts-ignore */
                    mockStatements[selectedDomain].map((stmt) => (
                      <div key={stmt.id} className="border border-cyan/20 p-5 bg-navy-dark relative group hover:border-cyan/50 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan/30 group-hover:bg-cyan transition-colors"></div>
                        <div className="flex justify-between items-center gap-4">
                          <div>
                            <div className="font-mono text-xs text-amber mb-1">ID: {stmt.id}</div>
                            <h4 className="font-heading text-lg text-off-white font-medium">{stmt.title}</h4>
                            <p className="font-sans text-sm text-off-white/70 mt-1">{stmt.desc}</p>
                          </div>
                          
                          {team.statementId === stmt.id ? (
                            <div className="font-mono text-xs font-bold text-amber border border-amber/30 px-4 py-2 flex items-center gap-2 bg-amber/5">
                              <Check size={14} /> SELECTED
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleSelectStatement(stmt.id)}
                              className="font-mono text-xs font-bold text-navy bg-cyan/80 hover:bg-cyan px-4 py-2 cad-chamfer transition-colors whitespace-nowrap"
                            >
                              [ SELECT ]
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 border border-cyan/10 border-dashed text-center font-mono text-sm text-off-white/50">
                      NO DATA FOUND FOR THIS DIRECTORY. AWAITING TRANSMISSION...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
