"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("participants");

  const [users, setUsers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [subAdmins, setSubAdmins] = useState<any[]>([]);

  // Form states
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [newAdminUser, setNewAdminUser] = useState("");
  const [newAdminPass, setNewAdminPass] = useState("");

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
    fetchData();
    
    // Live updates every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const [uRes, tRes, aRes, lRes, sRes] = await Promise.all([
      fetch("/api/admin/users").then(r => r.json()),
      fetch("/api/admin/teams").then(r => r.json()),
      fetch("/api/admin/announcements").then(r => r.json()),
      fetch("/api/admin/logs").then(r => r.json()),
      fetch("/api/admin/subadmins").then(r => r.json())
    ]);

    if (uRes.success) setUsers(uRes.users);
    if (tRes.success) setTeams(tRes.teams);
    if (aRes.success) setAnnouncements(aRes.announcements);
    if (lRes.success) setLogs(lRes.logs);
    if (sRes.success) setSubAdmins(sRes.subAdmins);
  };

  const postAnnouncement = async () => {
    if (!newAnnouncement) return;
    await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newAnnouncement, adminUser: admin.username })
    });
    setNewAnnouncement("");
    fetchData();
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
    fetchData();
  };

  const updateTeamStatement = async (teamId: string, domain: string, statementId: string, statementTitle: string, isLocked: boolean) => {
    await fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId, domain, statementId, statementTitle, isLocked, adminUser: admin.username })
    });
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("placeit_user");
    router.push("/");
  };

  if (!admin) return <div className="min-h-screen bg-canvas pt-24 text-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-marker text-5xl text-ink">Admin Command Center</h1>
          <div className="flex gap-4 items-center">
            <span className="font-sans font-bold text-ink bg-neon-yellow px-4 py-1 wobbly-border">
              Logged in as: {admin.username} ({admin.role})
            </span>
            <button onClick={logout} className="text-neon-pink underline font-bold font-marker text-xl hover:text-ink">
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b-4 border-ink mb-8 overflow-x-auto">
          {["participants", "teams", "announcements", "subadmins", "logs"].map(tab => {
            if ((tab === "subadmins" || tab === "logs") && admin.role !== "main_admin") return null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-marker text-2xl px-6 py-2 uppercase ${activeTab === tab ? "bg-ink text-canvas" : "text-ink hover:bg-ink/10"}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "participants" && (
          <div className="bg-white p-6 shadow-md wobbly-border-alt">
            <h2 className="font-marker text-3xl mb-4 text-neon-pink">Registered Participants</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-ink">
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th className="p-2">Reg No</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Password</th>
                    <th className="p-2">Team Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-ink/20">
                      <td className="p-2 font-bold">{u.regNo}</td>
                      <td className="p-2">{u.username}</td>
                      <td className="p-2 font-mono text-red-600">{u.password}</td>
                      <td className="p-2">{u.team ? (u.isLeader ? `Leader of ${u.team.name}` : `Member of ${u.team.name}`) : "No Team"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <div className="space-y-6">
            <h2 className="font-marker text-3xl text-neon-mint">Teams & Assignments</h2>
            {teams.map(team => (
              <div key={team.id} className="bg-white p-6 shadow-md wobbly-border relative border-4 border-kraft">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-marker text-2xl text-ink">{team.name}</h3>
                    <p className="font-mono text-ink-light bg-neon-yellow px-2 inline-block">Code: {team.code}</p>
                    {team.isConfirmed ? <span className="ml-2 text-green-600 font-bold font-sans">✓ Confirmed</span> : <span className="ml-2 text-red-600 font-bold font-sans">⚠ Unconfirmed</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-ink uppercase text-sm">Members:</h4>
                  <ul className="list-disc pl-5 font-sans">
                    {team.members.map((m: any) => (
                      <li key={m.id}>{m.regNo} - {m.username} {m.isLeader && "(Leader)"}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-canvas p-4 border-2 border-ink-light border-dashed">
                  <h4 className="font-marker text-xl mb-2 text-neon-pink">Assign Problem Statement</h4>
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block font-bold text-xs">Domain</label>
                      <input type="text" className="w-full border-2 border-ink p-2" defaultValue={team.domain || ""} id={`domain-${team.id}`} />
                    </div>
                    <div className="flex-1 min-w-[100px]">
                      <label className="block font-bold text-xs">PS ID</label>
                      <input type="text" className="w-full border-2 border-ink p-2" defaultValue={team.statementId || ""} id={`psid-${team.id}`} />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block font-bold text-xs">PS Title</label>
                      <input type="text" className="w-full border-2 border-ink p-2" defaultValue={team.statementTitle || ""} id={`pstitle-${team.id}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`lock-${team.id}`} defaultChecked={team.isLocked} className="w-5 h-5" />
                      <label htmlFor={`lock-${team.id}`} className="font-bold text-red-600 uppercase text-sm">Lock</label>
                    </div>
                    <button 
                      onClick={() => {
                        const d = (document.getElementById(`domain-${team.id}`) as HTMLInputElement).value;
                        const i = (document.getElementById(`psid-${team.id}`) as HTMLInputElement).value;
                        const t = (document.getElementById(`pstitle-${team.id}`) as HTMLInputElement).value;
                        const l = (document.getElementById(`lock-${team.id}`) as HTMLInputElement).checked;
                        updateTeamStatement(team.id, d, i, t, l);
                      }}
                      className="bg-ink text-canvas font-bold px-4 py-2 hover:bg-neon-pink transition-colors"
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
          <div className="bg-white p-6 shadow-md wobbly-border">
            <h2 className="font-marker text-3xl mb-4 text-neon-cyan">Post Announcement</h2>
            <textarea 
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              className="w-full border-2 border-ink p-4 font-sans mb-4 h-32"
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
          <div className="bg-white p-6 shadow-md wobbly-border">
            <h2 className="font-marker text-3xl mb-4 text-ink">Manage Sub-Admins</h2>
            <div className="flex gap-4 mb-8">
              <input type="text" value={newAdminUser} onChange={(e) => setNewAdminUser(e.target.value)} placeholder="Username" className="border-2 border-ink p-2 flex-1" />
              <input type="text" value={newAdminPass} onChange={(e) => setNewAdminPass(e.target.value)} placeholder="Password" className="border-2 border-ink p-2 flex-1" />
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
          <div className="bg-white p-6 shadow-md wobbly-border">
            <h2 className="font-marker text-3xl mb-4 text-ink">System Logs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
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
