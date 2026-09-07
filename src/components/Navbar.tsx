"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const pathname = usePathname();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const formatCoord = (val: number) => val.toString().padStart(4, "0");

  const navLinks = [
    { name: "SYSTEM_ROOT", path: "/" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "COMM_LINK", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan/30 bg-navy-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading font-bold text-xl text-cyan tracking-wider flex items-center gap-2">
              <span className="text-amber">{"//"}</span> PLACE_IT
            </Link>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-mono text-xs tracking-widest px-3 py-2 transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-cyan border-b-2 border-cyan text-glow"
                    : "text-off-white/70 hover:text-cyan"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Coordinates & Auth */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex font-mono text-xs text-cyan/70 border border-cyan/20 px-3 py-1 rounded bg-navy-dark">
              X: {formatCoord(coords.x)} | Y: {formatCoord(coords.y)}
            </div>
            
            <Link
              href="/register"
              className="font-mono text-xs font-bold text-navy bg-cyan px-4 py-2 hover:bg-amber transition-colors duration-300 cad-chamfer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_15px_rgba(255,183,3,0.5)]"
            >
              [ LOGIN_INIT ]
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
