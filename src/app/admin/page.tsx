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

  const [newPSDomain, setNewPSDomain] = useState("");
  const [newPSTitle, setNewPSTitle] = useState("");
  const [newPSDesc, setNewPSDesc] = useState("");

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
      fetch("/api/admin/statements").then(res => res.json())
    ]).then(([usersData, teamsData, annData, stmtsData]) => {
      if (usersData.success) setUsers(usersData.users);
      if (teamsData.success) setTeams(teamsData.teams);
      if (annData.success) setAnnouncements(annData.announcements);
      if (stmtsData.success) setStatements(stmtsData.statements);
    });

    if (currentUser.role === "main_admin") {
      fetch("/api/admin/subadmins").then(res => res.json()).then(data => { if(data.success) setSubAdmins(data.subAdmins); });
      fetch("/api/admin/logs").then(res => res.json()).then(data => { if(data.success) setLogs(data.logs); });
    }
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
    if (!newPSDomain || !newPSTitle) return;
    await fetch("/api/admin/statements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: newPSDomain, title: newPSTitle, description: newPSDesc, adminUser: admin.username })
    });
    setNewPSDomain("");
    setNewPSTitle("");
    setNewPSDesc("");
    fetchData(admin);
  };

  const assignStatement = async (teamId: string, statementId: string, isLocked: boolean) => {
    const statement = statements.find(s => s.id === statementId);
    const body = statement 
      ? { teamId, domain: statement.domain, statementId: statement.id, statementTitle: statement.title, isLocked, adminUser: admin.username }
      : { teamId, domain: "", statementId: "", statementTitle: "", isLocked, adminUser: admin.username }; // Clear assignment if empty

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
    { id: "blueprints", label: "Blueprints" },
    { id: "announcements", label: "Announcements" },
    ...(admin.role === "main_admin" ? [
      { id: "subadmins", label: "Sub-Admins" },
      { id: "logs", label: "Logs" }
    ] : [])
  ];

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
          <button 
            onClick={() => { localStorage.removeItem("placeit_user"); router.push("/"); }}
            className="font-marker text-2xl text-ink underline decoration-wavy hover:text-neon-cyan transition-colors"
          >
            Logout Admin
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`font-marker text-2xl px-6 py-2 border-2 border-ink shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-transform ${
                activeTab === t.id ? "bg-neon-pink text-white -translate-y-1" : "bg-white text-ink hover:bg-neon-yellow"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "participants" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-white">
            <h2 className="font-marker text-3xl mb-4 text-ink">All Participants ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans border-collapse">
                <thead>
                  <tr className="border-b-4 border-ink bg-neon-yellow text-ink">
                    <th className="p-3">Reg No</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Passcode</th>
                    <th className="p-3">Team Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b-2 border-ink border-dashed hover:bg-canvas/50">
                      <td className="p-3 font-bold text-ink">{u.regNo}</td>
                      <td className="p-3 text-ink">{u.username}</td>
                      <td className="p-3 font-mono text-red-600">{u.password}</td>
                      <td className="p-3 text-ink">{u.team ? (u.isLeader ? `Leader of ${u.team.name}` : `Member of ${u.team.name}`) : "No Team"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "blueprints" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-white">
            <h2 className="font-marker text-3xl mb-4 text-neon-cyan">Manage Problem Statements</h2>
            <div className="bg-kraft p-4 mb-8 border-2 border-ink border-dashed">
              <h3 className="font-marker text-xl mb-4 text-ink">Add New Blueprint</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block font-bold text-xs text-ink">Domain</label>
                  <input type="text" value={newPSDomain} onChange={(e)=>setNewPSDomain(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-white" placeholder="e.g. HealthCare" />
                </div>
                <div className="flex-[2] min-w-[200px]">
                  <label className="block font-bold text-xs text-ink">Statement Title</label>
                  <input type="text" value={newPSTitle} onChange={(e)=>setNewPSTitle(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-white" placeholder="e.g. AI Med Diagnosis" />
                </div>
                <div className="flex-[2] min-w-[200px]">
                  <label className="block font-bold text-xs text-ink">Description (optional)</label>
                  <input type="text" value={newPSDesc} onChange={(e)=>setNewPSDesc(e.target.value)} className="w-full border-2 border-ink p-2 text-ink bg-white" placeholder="Details..." />
                </div>
                <button onClick={addStatement} className="bg-neon-pink text-white font-bold px-6 py-2 border-2 border-ink hover:bg-neon-yellow hover:text-ink">Add</button>
              </div>
            </div>

            <table className="w-full text-left font-sans border-collapse">
              <thead><tr className="border-b-4 border-ink bg-neon-mint text-ink"><th className="p-2">Domain</th><th className="p-2">Title</th><th className="p-2">Description</th><th className="p-2">Added</th></tr></thead>
              <tbody>
                {statements.map(s => (
                  <tr key={s.id} className="border-b-2 border-ink border-dashed text-ink">
                    <td className="p-2 font-bold">{s.domain}</td>
                    <td className="p-2">{s.title}</td>
                    <td className="p-2">{s.description}</td>
                    <td className="p-2 text-sm">{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="space-y-6">
            <h2 className="font-marker text-3xl text-neon-mint">Teams & Assignments</h2>
            {teams.map(team => (
              <div key={team.id} className="bg-canvas p-6 shadow-md wobbly-border relative border-4 border-kraft bg-white">
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
                    <input type="text" id={`addreg-${team.id}`} placeholder="VIT Reg No" className="border-2 border-ink p-1 text-sm text-ink w-32 bg-white" />
                    <button onClick={() => addMemberToTeam(team.id, `addreg-${team.id}`)} className="bg-neon-cyan text-ink text-sm px-3 py-1 font-bold border-2 border-ink hover:bg-neon-mint">Add Member</button>
                  </div>
                </div>

                <div className="bg-kraft p-4 border-2 border-ink border-dashed">
                  <h4 className="font-marker text-xl mb-2 text-neon-pink">Assign Problem Statement</h4>
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[300px]">
                      <label className="block font-bold text-xs text-ink">Select Blueprint</label>
                      <select id={`select-${team.id}`} defaultValue={team.statementId || ""} className="w-full border-2 border-ink p-2 text-ink bg-white">
                        <option value="">-- No Statement Assigned --</option>
                        {statements.map(s => (
                          <option key={s.id} value={s.id}>[{s.domain}] {s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
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
            ))}
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-white">
            <h2 className="font-marker text-3xl mb-4 text-neon-cyan">Post Announcement</h2>
            <textarea 
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="w-full border-2 border-ink p-4 font-sans mb-4 h-32 text-ink bg-white"
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
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-white">
            <h2 className="font-marker text-3xl mb-4 text-ink">Manage Sub-Admins</h2>
            <div className="flex gap-4 mb-8">
              <input type="text" value={newAdminUser} onChange={(e) => setNewAdminUser(e.target.value)} placeholder="Username" className="border-2 border-ink p-2 flex-1 text-ink bg-white" />
              <input type="text" value={newAdminPass} onChange={(e) => setNewAdminPass(e.target.value)} placeholder="Password" className="border-2 border-ink p-2 flex-1 text-ink bg-white" />
              <button onClick={createSubAdmin} className="bg-ink text-canvas font-bold px-4 py-2 hover:bg-neon-yellow hover:text-ink">Create</button>
            </div>

            <table className="w-full text-left font-sans text-ink">
              <thead><tr className="border-b-2 border-ink"><th>Username</th><th>Password</th><th>Created At</th></tr></thead>
              <tbody>
                {subAdmins.map(s => (
                  <tr key={s.id} className="border-b border-ink/20">
                    <td className="p-2 font-bold">{s.username}</td>
                    <td className="p-2 font-mono text-red-600">{s.password}</td>
                    <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "logs" && admin.role === "main_admin" && (
          <div className="bg-canvas p-6 shadow-md wobbly-border border-4 border-ink bg-white">
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

      </div>
    </div>
  );
}
