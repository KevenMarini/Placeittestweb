"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, ShieldAlert } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    regNo: "",
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.regNo || !formData.username || !formData.password) return;
    
    // Mock Auth: Save user to local storage
    localStorage.setItem("placeit_user", JSON.stringify({
      regNo: formData.regNo,
      username: formData.username,
      // In a real app, never store passwords!
    }));
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-cyan/30 bg-navy-dark/80 p-8 cad-border backdrop-blur-md relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-cyan/20 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-cyan/20 opacity-50"></div>
        
        <div className="mb-8 border-b border-cyan/30 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="text-cyan" size={18} />
            <h1 className="font-heading text-2xl font-bold text-off-white tracking-widest uppercase">
              {isLogin ? "AUTH_SYSTEM" : "USER_REGISTRATION"}
            </h1>
          </div>
          <p className="font-mono text-xs text-off-white/50">
            {isLogin ? "ENTER CREDENTIALS TO ACCESS TERMINAL" : "INITIALIZE NEW USER PROFILE"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="font-mono text-[10px] text-cyan uppercase tracking-wider">
              VIT_REG_NO
            </label>
            <input
              type="text"
              required
              value={formData.regNo}
              onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
              className="w-full bg-navy border border-cyan/30 text-off-white font-mono p-3 focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cad-chamfer"
              placeholder="e.g. 23BCE1001"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] text-cyan uppercase tracking-wider">
              USERNAME
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-navy border border-cyan/30 text-off-white font-mono p-3 focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cad-chamfer"
              placeholder="Hacker_Name"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] text-cyan uppercase tracking-wider">
              ACCESS_KEY (PASSWORD)
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-navy border border-cyan/30 text-off-white font-mono p-3 focus:outline-none focus:border-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all cad-chamfer"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start gap-2 p-3 border border-amber/30 bg-amber/5">
            <ShieldAlert className="text-amber shrink-0 mt-0.5" size={14} />
            <p className="font-mono text-[10px] text-off-white/70">
              BY INITIALIZING, YOU AGREE TO THE SYSTEM PROTOCOLS AND CODE OF CONDUCT.
            </p>
          </div>

          <button
            type="submit"
            className="w-full font-mono text-sm font-bold text-navy bg-cyan py-4 hover:bg-amber transition-all duration-300 cad-chamfer box-glow"
          >
            [ {isLogin ? "EXECUTE_LOGIN" : "INITIALIZE_USER"} ]
          </button>
        </form>

        <div className="mt-6 text-center border-t border-cyan/10 pt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-mono text-xs text-cyan hover:text-amber transition-colors"
          >
            {isLogin ? "> SWITCH TO REGISTRATION" : "> EXISTING USER? SWITCH TO LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
}
