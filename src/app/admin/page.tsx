"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("participants");

  const [users, setUsers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [statements, setStatements] = useState<any[]>([]);
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");

  // Domain & Statement Management
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [newPSDomain, setNewPSDomain] = useState("");
  const [newPSTrack, setNewPSTrack] = useState("");
  const [newPSTitle, setNewPSTitle] = useState("");
  const [newPSProblem, setNewPSProblem] = useState("");
  const [newPSChallenge, setNewPSChallenge] = useState("");
  const [newPSDesc, setNewPSDesc] = useState("");

  // Contact Links
  const [contactLinks, setContactLinks] = useState<any[]>([]);
  const [newContactLabel, setNewContactLabel] = useState("");
  const [newContactIcon, setNewContactIcon] = useState("");
  const [newContactLink, setNewContactLink] = useState("");
  const [editingContact, setEditingContact] = useState<any | null>(null);

  // Teams tab state mapping for cascading dropdowns (teamId -> selectedDomain)
  const [teamSelectedDomains, setTeamSelectedDomains] = useState<Record<string, string>>({});

  // Inline editing
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editingSubAdmin, setEditingSubAdmin] = useState<any | null>(null);

  // Presentations
  const [presentations, setPresentations] = useState<any[]>([]);
  const [presentationsUnlocked, setPresentationsUnlocked] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("placeit_user");
    if (!userStr) {
      router.push("/register");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "main_admin" && user.role !== "sub_admin") {
      router.push("/dashboard");
      return;
    }
    setAdmin(user);
    
    // Initial fetch
    fetchData(user);
    
    // Live updates every 5 seconds
    const interval = setInterval(() => fetchData(user), 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async (currentUser: any) => {
    if (!currentUser) return;
    Promise.all([
      fetch("/api/admin/users").then(res => res.json()),
      fetch("/api/admin/teams").then(res => res.json()),
      fetch("/api/admin/announcements").then(res => res.json()),
      fetch("/api/admin/statements").then(res => res.json()),
      fetch("/api/admin/contact").then(res => res.json()),
      fetch("/api/admin/presentations").then(res => res.json()),
    ]).then(([usersData, teamsData, annData, stmtsData, contactData, presData]) => {
      if (usersData.success) setUsers(usersData.users);
      if (teamsData.success) setTeams(teamsData.teams);
      if (annData.success) setAnnouncements(annData.announcements);
      if (stmtsData.success) setStatements(stmtsData.statements);
      if (contactData.success) setContactLinks(contactData.links);
      if (presData.success) { setPresentations(presData.submissions); setPresentationsUnlocked(presData.isUnlocked); }
    });

    if (currentUser.role === "main_admin") {
      fetch("/api/admin/subadmins").then(res => res.json()).then(data => { if(data.success) setSubAdmins(data.subAdmins); });
      fetch("/api/admin/logs").then(res => res.json()).then(data => { if(data.success) setLogs(data.logs); });
    }
  };

  const addContactLink = async () => {
    if (!newContactLabel) return;
    await fetch("/api/admin/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newContactLabel, icon: newContactIcon, link: newContactLink, sortOrder: contactLinks.length, adminUser: admin.username })
    });
    setNewContactLabel(""); setNewContactIcon(""); setNewContactLink("");
    fetchData(admin);
  };

  const updateContactLink = async (item: any) => {
    await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, adminUser: admin.username })
    });
    setEditingContact(null);
    fetchData(admin);
  };

  const deleteContactLink = async (id: string) => {
    if (!confirm("Delete this contact entry?")) return;
    await fetch("/api/admin/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminUser: admin.username })
    });
    fetchData(admin);
  };


  const updateUser = async (u: any) => {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id, username: u.username, password: u.password, adminUser: admin.username })
    });
    if ((await res.json()).success) { setEditingUser(null); fetchData(admin); }
  };

  const deleteUser = async (id: string, name: string) => {
    if (!confirm(`Delete participant "${name}"? This cannot be undone.`)) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminUser: admin.username })
    });
    fetchData(admin);
  };

  const updateSubAdmin = async (s: any) => {
    const res = await fetch("/api/admin/subadmins", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, username: s.username, password: s.password, mainAdminUser: admin.username })
    });
    if ((await res.json()).success) { setEditingSubAdmin(null); fetchData(admin); }
  };

  const deleteSubAdmin = async (id: string, username: string) => {
    if (!confirm(`Delete sub-admin "${username}"?`)) return;
    await fetch("/api/admin/subadmins", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, mainAdminUser: admin.username })
    });
    fetchData(admin);
  };

  const postAnnouncement = async () => {
    if (!newAnnouncement) return;
    await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newAnnouncement, adminUser: admin.username })
    });
    setNewAnnouncement("");
    fetchData(admin);
  };

  const createSubAdmin = async () => {
    if (!newAdminUser || !newAdminPass) return;
    await fetch("/api/admin/subadmins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newAdminUser, password: newAdminPass, mainAdminUser: admin.username })
    });
    setNewAdminUser("");
    setNewAdminPass("");
    fetchData(admin);
  };

  const addStatement = async () => {
    const domainToUse = activeDomain || newPSDomain;
    if (!domainToUse || !newPSTrack || !newPSTitle || !newPSProblem || !newPSChallenge) return;
    await fetch("/api/admin/statements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        domain: domainToUse, 
        track: newPSTrack, 
        title: newPSTitle, 
        problem: newPSProblem,
        challenge: newPSChallenge,
        description: newPSDesc, 
        adminUser: admin.username 
      })
    });
    setNewPSDomain("");
    setNewPSTrack("");
    setNewPSTitle("");
    setNewPSProblem("");
    setNewPSChallenge("");
    setNewPSDesc("");
    fetchData(admin);
  };

  const deleteDomain = async (domain: string) => {
    if (!confirm(`Are you sure you want to delete ALL tracks in ${domain}?`)) return;
    await fetch("/api/admin/statements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: 'domain', domain, adminUser: admin.username })
    });
    fetchData(admin);
  };

  const deleteTrack = async (id: string) => {
    if (!confirm("Are you sure you want to delete this specific track?")) return;
    await fetch("/api/admin/statements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: 'track', id, adminUser: admin.username })
    });
    fetchData(admin);
  };

  const assignStatement = async (teamId: string, statementId: string, isLocked: boolean) => {
    const statement = statements.find(s => s.id === statementId);
    const body = statement 
      ? { teamId, domain: statement.domain, statementId: statement.id, statementTitle: statement.title, statementTrack: statement.track, isLocked, adminUser: admin.username }
      : { teamId, domain: "", statementId: "", statementTitle: "", statementTrack: "", isLocked, adminUser: admin.username }; // Clear assignment if empty

    await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    fetchData(admin);
  };

  const removeMember = async (regNo: string) => {
    if (!confirm(`Remove ${regNo} from their team?`)) return;
    await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo, targetTeamId: null, adminUser: admin.username })
    });
    fetchData(admin);
  };

  const addMemberToTeam = async (teamId: string, inputId: string) => {
    const regNo = (document.getElementById(inputId) as HTMLInputElement).value;
    if (!regNo) return;
    await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ regNo, targetTeamId: teamId, adminUser: admin.username })
    });
    (document.getElementById(inputId) as HTMLInputElement).value = "";
    fetchData(admin);
  };

  if (!admin) return null;

  const tabs = [
    { id: "participants", label: "Participants" },
    { id: "teams", label: "Teams" },
    { id: "domains", label: "Domains" },
    { id: "presentations", label: "📊 Presentations" },
    { id: "announcements", label: "Announcements" },
    { id: "contact", label: "Contact Page" },
    ...(admin.role === "main_admin" ? [
      { id: "subadmins", label: "Sub-Admins" },
      { id: "logs", label: "Logs" }
    ] : [])
  ];
  const togglePresentationLock = async () => {
    const res = await fetch("/api/admin/presentations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminUser: admin.username, unlock: !presentationsUnlocked })
    });
    const data = await res.json();
    if (data.success) {
      setPresentationsUnlocked(data.isUnlocked);
      fetchData(admin);
    }
  };

  const deletePresentation = async (id: string, teamName: string) => {
    if (!confirm(`Delete presentation submission for "${teamName}"?`)) return;
    await fetch("/api/admin/presentations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminUser: admin.username })
    });
    fetchData(admin);
  };


  const uniqueDomains = Array.from(new Set(statements.map(s => s.domain)));

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-4 border-ink pb-4">
          <div>
            <h1 className="font-marker text-5xl md:text-6xl text-neon-pink">Command Center</h1>
            <p className="font-mono text-ink-light mt-2 bg-neon-yellow px-2 py-1 inline-block text-ink">
              Logged in as: {admin.username} ({admin.role})
            </p>
          </div>
          <div className="flex items-center gap-4">
            {admin.role === "main_admin" && (
              <button
                onClick={async () => {
                  if (!confirm("⚠️ DANGER: This will PERMANENTLY delete ALL participants, teams, statements, announcements, and sub-admins. Are you absolutely sure?")) return;
                  if (!confirm("This is your FINAL warning. Type OK in the next prompt to confirm.")) return;
                  const r = prompt("Type CLEAR to confirm wipe:");
                  if (r !== "CLEAR") { alert("Cancelled."); return; }
                  const res = await fetch("/api/admin/cleardata", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ adminUser: admin.username })
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert("✅ All data cleared successfully!");
                    fetchData(admin);
                  } else {
                    alert("Error: " + data.error);
                  }
                }}
                className="font-marker text-lg text-white bg-red-600 px-4 py-2 border-2 border-red-800 hover:bg-red-800 transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
              >
                🗑️ Clear All Data
              </button>
            )}
            <button 
              onClick={() => { localStorage.removeItem("placeit_user"); router.push("/"); }}
              className="font-marker text-2xl text-ink underline decoration-wavy hover:text-neon-cyan transition-colors"
            >
              Logout Admin
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`font-marker text-2xl px-6 py-2 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-transform ${
                activeTab === t.id ? "bg-neon-pink text-white -translate-y-1" : "bg-paper text-ink hover:bg-neon-yellow"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "participants" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            <h2 className="font-marker text-3xl mb-4 text-ink">All Participants ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans border-collapse">
                <thead>
                  <tr className="border-b-4 border-ink bg-neon-yellow text-ink">
                    <th className="p-3">Reg No</th>
                    <th className="p-3">Name (Alias)</th>
                    <th className="p-3">Passcode</th>
                    <th className="p-3">Team</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b-2 border-ink border-dashed hover:bg-canvas/50">
                      <td className="p-3 font-bold text-ink">{u.regNo}</td>

                      {editingUser?.id === u.id ? (
                        <>
                          <td className="p-2">
                            <input
                              className="border-2 border-ink p-1 text-ink bg-paper w-full text-sm"
                              value={editingUser.username}
                              onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              className="border-2 border-ink p-1 text-ink bg-paper w-full font-mono text-sm"
                              value={editingUser.password}
                              onChange={e => setEditingUser({...editingUser, password: e.target.value})}
                            />
                          </td>
                          <td className="p-2 text-ink text-sm">{u.team ? (u.isLeader ? `★ ${u.team.name}` : u.team.name) : "—"}</td>
                          <td className="p-2 flex gap-2">
                            <button onClick={() => updateUser(editingUser)} className="text-xs bg-neon-cyan text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-mint">Save</button>
                            <button onClick={() => setEditingUser(null)} className="text-xs bg-paper text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-yellow">Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 text-ink">{u.username}</td>
                          <td className="p-3 font-mono text-red-600">{u.password}</td>
                          <td className="p-3 text-ink text-sm">{u.team ? (u.isLeader ? `★ ${u.team.name}` : u.team.name) : "No Team"}</td>
                          <td className="p-3 flex gap-2">
                            <button onClick={() => setEditingUser({...u})} className="text-xs bg-neon-yellow text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-cyan">Edit</button>
                            <button onClick={() => deleteUser(u.id, u.username)} className="text-xs bg-red-100 text-red-600 font-bold px-3 py-1 border border-red-300 hover:bg-red-200">Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "domains" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            
            {!activeDomain ? (
              <div>
                <h2 className="font-marker text-3xl mb-6 text-neon-cyan">Manage Domains</h2>
                
                <div className="bg-kraft p-6 mb-8 border-2 border-ink border-dashed shadow-sm">
                  <h3 className="font-marker text-xl mb-4 text-ink">Create New Domain</h3>
                  <div className="flex gap-4">
                    <input type="text" value={newPSDomain} onChange={(e)=>setNewPSDomain(e.target.value)} className="flex-1 border-2 border-ink p-2 text-ink bg-paper" placeholder="Paste or type new Domain Name (e.g. Web3)" />
                    <button onClick={() => { if(newPSDomain) setActiveDomain(newPSDomain); }} className="bg-neon-pink text-white font-bold px-6 py-2 border-2 border-ink hover:bg-neon-yellow hover:text-ink">Go</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {uniqueDomains.map(d => (
                    <div 
                      key={d} 
                      className="bg-paper p-6 border-4 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:-translate-y-1 transition-transform relative"
                    >
                      <button 
                        onClick={() => setActiveDomain(d)}
                        className="text-left w-full h-full block hover:bg-neon-yellow p-4 -m-4 rounded"
                      >
                        <h3 className="font-marker text-2xl text-ink">{d}</h3>
                        <p className="font-sans text-ink-light text-sm mt-2">{statements.filter(s => s.domain === d).length} Blueprints</p>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteDomain(d); }}
                        className="absolute top-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300 hover:bg-red-200 z-10 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveDomain(null)} className="font-sans font-bold text-ink underline mb-6 hover:text-neon-pink">&larr; Back to Domains</button>
                <h2 className="font-marker text-4xl mb-6 text-neon-cyan inline-block bg-ink text-white px-4 py-1 -rotate-1">{activeDomain}</h2>
                
                <div className="bg-kraft p-6 mb-8 border-2 border-ink border-dashed">
                  <h3 className="font-marker text-xl mb-4 text-ink">Add Blueprint to {activeDomain}</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[150px]">
                        <label className="block font-bold text-xs text-ink mb-1">Track</label>
                        <input type="text" value={newPSTrack} onChange={(e)=>setNewPSTrack(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper" placeholder="e.g. Track 1" />
                      </div>
                      <div className="flex-[2] min-w-[200px]">
                        <label className="block font-bold text-xs text-ink mb-1">Statement Title</label>
                        <input type="text" value={newPSTitle} onChange={(e)=>setNewPSTitle(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper" placeholder="e.g. AI Med Diagnosis" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-bold text-xs text-ink mb-1">The Core Problem</label>
                      <textarea value={newPSProblem} onChange={(e)=>setNewPSProblem(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper h-24" placeholder="Paste the problem statement here..." />
                    </div>

                    <div>
                      <label className="block font-bold text-xs text-ink mb-1">Your Challenge</label>
                      <textarea value={newPSChallenge} onChange={(e)=>setNewPSChallenge(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper h-24" placeholder="Paste the specific challenge here..." />
                    </div>

                    <div>
                      <label className="block font-bold text-xs text-ink mb-1">Description (In simple terms - Optional)</label>
                      <input type="text" value={newPSDesc} onChange={(e)=>setNewPSDesc(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper" placeholder="Easy explanation..." />
                    </div>

                    <button onClick={addStatement} className="bg-neon-pink text-white font-bold px-6 py-3 border-2 border-ink hover:bg-neon-yellow hover:text-ink w-fit shadow-[4px_4px_0px_rgba(26,26,26,1)]">
                      Add Statement
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans border-collapse">
                    <thead><tr className="border-b-4 border-ink bg-neon-mint text-ink"><th className="p-2">Track</th><th className="p-2">Title</th><th className="p-2">Added</th><th className="p-2">Actions</th></tr></thead>
                    <tbody>
                      {statements.filter(s => s.domain === activeDomain).map(s => (
                        <tr key={s.id} className="border-b-2 border-ink border-dashed text-ink hover:bg-canvas/50">
                          <td className="p-2 font-bold whitespace-nowrap">{s.track}</td>
                          <td className="p-2">
                            <p className="font-bold">{s.title}</p>
                            <p className="text-xs text-ink/70 line-clamp-1 mt-1">{s.problem}</p>
                          </td>
                          <td className="p-2 text-sm">{new Date(s.createdAt).toLocaleDateString()}</td>
                          <td className="p-2">
                            <button onClick={() => deleteTrack(s.id)} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded border border-red-300 hover:bg-red-200 font-bold">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "teams" && (
          <div className="space-y-6">
            <h2 className="font-marker text-3xl text-neon-mint">Teams & Assignments</h2>
            {teams.map(team => {
              const currentSelectedDomain = teamSelectedDomains[team.id] || team.domain || "";
              
              return (
                <div key={team.id} className="bg-canvas p-6 shadow-md wobbly-border relative border-4 border-kraft bg-paper">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-marker text-2xl text-ink">{team.name}</h3>
                      <p className="font-mono text-ink bg-neon-yellow px-2 inline-block">Code: {team.code}</p>
                      {team.isConfirmed ? <span className="ml-2 text-green-600 font-bold font-sans">✓ Confirmed</span> : <span className="ml-2 text-red-600 font-bold font-sans">⚠ Unconfirmed</span>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-ink uppercase text-sm">Members:</h4>
                    <ul className="pl-5 font-sans space-y-2 mt-2">
                      {team.members.map((m: any) => (
                        <li key={m.id} className="flex items-center gap-4 text-ink">
                          <span><span className="font-bold">{m.regNo}</span> - {m.username} {m.isLeader && "(Leader)"}</span>
                          <button onClick={() => removeMember(m.regNo)} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded border border-red-300 hover:bg-red-200">Remove</button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center gap-2">
                      <input type="text" id={`addreg-${team.id}`} placeholder="VIT Reg No" className="border-2 border-ink p-1 text-sm text-ink w-32 bg-paper" />
                      <button onClick={() => addMemberToTeam(team.id, `addreg-${team.id}`)} className="bg-neon-cyan text-ink text-sm px-3 py-1 font-bold border-2 border-ink hover:bg-neon-mint">Add Member</button>
                    </div>
                  </div>

                  <div className="bg-kraft p-4 border-2 border-ink border-dashed">
                    <h4 className="font-marker text-xl mb-2 text-neon-pink">Assign Problem Statement</h4>
                    <div className="flex flex-wrap gap-4 items-end">
                      
                      {/* Domain Dropdown */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block font-bold text-xs text-ink">1. Select Domain</label>
                        <select 
                          value={currentSelectedDomain}
                          onChange={(e) => setTeamSelectedDomains({...teamSelectedDomains, [team.id]: e.target.value})}
                          className="w-full border-2 border-ink p-2 text-ink bg-paper"
                        >
                          <option value="">-- Choose Domain --</option>
                          {Array.from(new Set(statements.map(s => s.domain))).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      {/* Track/Statement Dropdown */}
                      <div className="flex-[2] min-w-[300px]">
                        <label className="block font-bold text-xs text-ink">2. Select Track & Blueprint</label>
                        <select 
                          id={`select-${team.id}`} 
                          defaultValue={team.statementId || ""} 
                          disabled={!currentSelectedDomain}
                          className="w-full border-2 border-ink p-2 text-ink bg-paper disabled:opacity-50"
                        >
                          <option value="">-- Choose Statement --</option>
                          {statements.filter(s => s.domain === currentSelectedDomain).map(s => (
                            <option key={s.id} value={s.id}>[{s.track}] {s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" id={`lock-${team.id}`} defaultChecked={team.isLocked} className="w-5 h-5 accent-red-600" />
                        <label htmlFor={`lock-${team.id}`} className="font-bold text-red-600 uppercase text-sm">Lock to Dashboard</label>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const sId = (document.getElementById(`select-${team.id}`) as HTMLSelectElement).value;
                          const l = (document.getElementById(`lock-${team.id}`) as HTMLInputElement).checked;
                          assignStatement(team.id, sId, l);
                        }}
                        className="bg-ink text-canvas font-bold px-4 py-2 hover:bg-neon-pink transition-colors border-2 border-ink"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "presentations" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-marker text-3xl text-ink">Presentations</h2>
              <button
                onClick={togglePresentationLock}
                className={`font-bold px-4 py-2 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-transform hover:-translate-y-1 ${
                  presentationsUnlocked 
                    ? "bg-neon-pink text-white hover:bg-red-500" 
                    : "bg-neon-mint text-ink hover:bg-neon-cyan"
                }`}
              >
                {presentationsUnlocked ? "🔓 Submissions Open (Click to Lock)" : "🔒 Submissions Locked (Click to Unlock)"}
              </button>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left font-sans border-collapse">
                <thead>
                  <tr className="border-b-4 border-ink bg-neon-yellow text-ink">
                    <th className="p-3">Team Name</th>
                    <th className="p-3">Link</th>
                    <th className="p-3">Submitted At</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {presentations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-ink-light italic">No presentations submitted yet.</td>
                    </tr>
                  ) : (
                    presentations.map(p => (
                      <tr key={p.id} className="border-b-2 border-ink border-dashed hover:bg-canvas/50">
                        <td className="p-3 font-bold text-ink">{p.teamName}</td>
                        <td className="p-3">
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-neon-cyan underline decoration-wavy hover:text-neon-pink break-all">
                            {p.link}
                          </a>
                        </td>
                        <td className="p-3 text-xs text-ink-light">{new Date(p.createdAt).toLocaleString()}</td>
                        <td className="p-3">
                          <button onClick={() => deletePresentation(p.id, p.teamName)} className="text-xs bg-red-100 text-red-600 font-bold px-3 py-1 border border-red-300 hover:bg-red-200">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            <h2 className="font-marker text-3xl mb-4 text-neon-cyan">Post Announcement</h2>
            <textarea 
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="w-full border-2 border-ink p-4 font-sans mb-4 h-32 text-ink bg-paper"
              placeholder="Type announcement here..."
            />
            <button onClick={postAnnouncement} className="bg-neon-yellow text-ink font-marker text-2xl px-6 py-2 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] hover:bg-neon-cyan transition-colors">
              Push Announcement
            </button>

            <div className="mt-8 space-y-4">
              <h3 className="font-marker text-2xl text-ink">Past Announcements</h3>
              {announcements.map(a => (
                <div key={a.id} className="border-l-4 border-neon-pink pl-4 py-2">
                  <p className="font-sans text-ink">{a.message}</p>
                  <p className="font-mono text-xs text-ink-light mt-1">{new Date(a.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "subadmins" && admin.role === "main_admin" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            <h2 className="font-marker text-3xl mb-4 text-ink">Manage Sub-Admins</h2>
            <div className="flex gap-4 mb-8">
              <input type="text" value={newAdminUser} onChange={(e) => setNewAdminUser(e.target.value)} placeholder="Username" className="border-2 border-ink p-2 flex-1 text-ink bg-paper" />
              <input type="text" value={newAdminPass} onChange={(e) => setNewAdminPass(e.target.value)} placeholder="Password" className="border-2 border-ink p-2 flex-1 text-ink bg-paper" />
              <button onClick={createSubAdmin} className="bg-ink text-canvas font-bold px-4 py-2 hover:bg-neon-yellow hover:text-ink">Create</button>
            </div>

            <table className="w-full text-left font-sans text-ink border-collapse">
              <thead>
                <tr className="border-b-4 border-ink bg-neon-cyan text-ink">
                  <th className="p-3">Username</th>
                  <th className="p-3">Password</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subAdmins.map(s => (
                  <tr key={s.id} className="border-b-2 border-ink border-dashed hover:bg-canvas/50">
                    {editingSubAdmin?.id === s.id ? (
                      <>
                        <td className="p-2">
                          <input
                            className="border-2 border-ink p-1 text-ink bg-paper w-full text-sm"
                            value={editingSubAdmin.username}
                            onChange={e => setEditingSubAdmin({...editingSubAdmin, username: e.target.value})}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            className="border-2 border-ink p-1 text-ink bg-paper w-full font-mono text-sm"
                            value={editingSubAdmin.password}
                            onChange={e => setEditingSubAdmin({...editingSubAdmin, password: e.target.value})}
                          />
                        </td>
                        <td className="p-2 text-xs text-ink-light">{new Date(s.createdAt).toLocaleString()}</td>
                        <td className="p-2 flex gap-2">
                          <button onClick={() => updateSubAdmin(editingSubAdmin)} className="text-xs bg-neon-cyan text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-mint">Save</button>
                          <button onClick={() => setEditingSubAdmin(null)} className="text-xs bg-paper text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-yellow">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 font-bold">{s.username}</td>
                        <td className="p-3 font-mono text-red-600">{s.password}</td>
                        <td className="p-3 text-xs text-ink-light">{new Date(s.createdAt).toLocaleString()}</td>
                        <td className="p-3 flex gap-2">
                          <button onClick={() => setEditingSubAdmin({...s})} className="text-xs bg-neon-yellow text-ink font-bold px-3 py-1 border border-ink hover:bg-neon-cyan">Edit</button>
                          <button onClick={() => deleteSubAdmin(s.id, s.username)} className="text-xs bg-red-100 text-red-600 font-bold px-3 py-1 border border-red-300 hover:bg-red-200">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "logs" && admin.role === "main_admin" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-paper">
            <h2 className="font-marker text-3xl mb-4 text-ink">System Logs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs text-ink">
                <thead><tr className="border-b-2 border-ink text-sm"><th>Time</th><th>Admin</th><th>Action</th><th>Details</th></tr></thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} className="border-b border-ink/10">
                      <td className="p-2">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="p-2 font-bold">{log.adminUser}</td>
                      <td className="p-2 text-neon-pink">{log.action}</td>
                      <td className="p-2">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-paper p-6 shadow-md wobbly-border border-4 border-ink">
            <h2 className="font-marker text-3xl mb-6 text-neon-mint">Manage Contact Page</h2>

            {/* Add new entry */}
            <div className="bg-kraft p-6 mb-8 border-2 border-ink border-dashed">
              <h3 className="font-marker text-xl mb-4 text-ink">Add New Entry</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="w-16">
                  <label className="block font-bold text-xs text-ink mb-1">Icon (emoji)</label>
                  <input type="text" value={newContactIcon} onChange={e => setNewContactIcon(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper text-center text-xl" placeholder="💬" />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <label className="block font-bold text-xs text-ink mb-1">Label / ID</label>
                  <input type="text" value={newContactLabel} onChange={e => setNewContactLabel(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper" placeholder="e.g. WhatsApp" />
                </div>
                <div className="flex-[2] min-w-[200px]">
                  <label className="block font-bold text-xs text-ink mb-1">Link / URL / Text</label>
                  <input type="text" value={newContactLink} onChange={e => setNewContactLink(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-paper" placeholder="https://... or mailto:... or plain text" />
                </div>
                <button onClick={addContactLink} className="bg-neon-pink text-white font-bold px-6 py-2 border-2 border-ink hover:bg-neon-yellow hover:text-ink shadow-[4px_4px_0px_rgba(26,26,26,1)]">
                  Add
                </button>
              </div>
            </div>

            {/* Existing entries */}
            <div className="space-y-3">
              {contactLinks.length === 0 && (
                <p className="font-sans text-ink-light italic text-center py-8">No contact entries yet. Add one above!</p>
              )}
              {contactLinks.map(item => (
                <div key={item.id} className="border-2 border-ink p-4 bg-canvas">
                  {editingContact?.id === item.id ? (
                    <div className="flex flex-wrap gap-3 items-end">
                      <div className="w-16">
                        <input type="text" value={editingContact.icon} onChange={e => setEditingContact({...editingContact, icon: e.target.value})} className="w-full border-2 border-ink p-2 text-ink bg-paper text-center text-xl" />
                      </div>
                      <div className="flex-1 min-w-[140px]">
                        <input type="text" value={editingContact.label} onChange={e => setEditingContact({...editingContact, label: e.target.value})} className="w-full border-2 border-ink p-2 text-ink bg-paper" />
                      </div>
                      <div className="flex-[2] min-w-[200px]">
                        <input type="text" value={editingContact.link} onChange={e => setEditingContact({...editingContact, link: e.target.value})} className="w-full border-2 border-ink p-2 text-ink bg-paper" />
                      </div>
                      <button onClick={() => updateContactLink(editingContact)} className="bg-neon-cyan text-ink font-bold px-4 py-2 border-2 border-ink hover:bg-neon-mint">Save</button>
                      <button onClick={() => setEditingContact(null)} className="bg-paper text-ink font-bold px-4 py-2 border-2 border-ink hover:bg-neon-yellow">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-bold text-ink">{item.label}</p>
                          <p className="font-mono text-sm text-ink-light break-all">{item.link || "—"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingContact({...item})} className="text-sm bg-neon-yellow text-ink px-3 py-1 border-2 border-ink font-bold hover:bg-neon-cyan">Edit</button>
                        <button onClick={() => deleteContactLink(item.id)} className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded border border-red-300 hover:bg-red-200 font-bold">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
