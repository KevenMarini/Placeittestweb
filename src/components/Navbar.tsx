"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.classList.contains('dark') ? 'dark' : 'light';
    const stored = window.localStorage.getItem('theme');
    
    if (stored === 'dark' || (!stored && initialColorValue === 'dark')) {
      setIsDark(true);
      root.classList.add('dark');
    } else {
      setIsDark(false);
      root.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-paper/80 backdrop-blur-sm p-3 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,0.2)]">
        
        {/* Tape decoration */}
        <div className="tape -top-2 left-10 rotate-3"></div>

        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="font-marker text-3xl font-bold text-ink hover:text-neon-pink transition-colors">
            Place<span className="text-neon-mint">IT</span> <span className="text-ink-light">5.0</span>
          </Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-sans font-bold text-lg px-2 py-1 relative group`}
            >
              <span className={`relative z-10 ${pathname === link.path ? "text-ink" : "text-ink-light group-hover:text-ink"}`}>
                {link.name}
              </span>
              {pathname === link.path && (
                <div className="absolute bottom-1 left-0 w-full h-3 bg-neon-yellow -z-10 -rotate-2" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 bg-paper border-2 border-ink rounded-full shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-neon-mint hover:shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-all -translate-y-1 hover:-translate-y-2 group text-ink"
            title="Toggle Dark Mode"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">
              {isDark ? "🌙" : "☀️"}
            </span>
          </button>
          <Link
            href="/announcements"
            className="flex items-center justify-center w-10 h-10 bg-paper border-2 border-ink rounded-full shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:bg-neon-yellow hover:shadow-[4px_4px_0px_rgba(26,26,26,1)] transition-all -translate-y-1 hover:-translate-y-2 group"
            title="Announcements"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📢</span>
          </Link>
          <Link
            href="/register"
            className="font-marker text-xl font-bold text-ink bg-neon-cyan px-6 py-2 wobbly-border-alt hover:bg-neon-pink transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_rgba(26,26,26,1)] -translate-y-1 hover:-translate-y-2 inline-block"
          >
            Login
          </Link>
          <a
            href="https://gravitas.vit.ac.in/events/26a62ec7-d68b-4808-8c2b-d06843af19d6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-marker text-xl font-bold text-ink bg-neon-yellow px-6 py-2 wobbly-border hover:bg-neon-pink hover:text-white transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_rgba(26,26,26,1)] -translate-y-1 hover:-translate-y-2 hidden sm:inline-block"
          >
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
}
