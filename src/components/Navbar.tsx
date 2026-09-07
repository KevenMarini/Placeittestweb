"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 wobbly-border shadow-[4px_4px_0px_rgba(26,26,26,0.2)]">
        
        {/* Tape decoration */}
        <div className="tape -top-2 left-10 rotate-3"></div>

        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="hover:scale-105 transition-transform inline-block">
            <Image src="/logo.jpg" alt="PlaceIT 5.0 Logo" width={120} height={40} className="w-auto h-12 rounded-sm" />
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
        <div>
          <Link
            href="/register"
            className="font-marker text-xl font-bold text-ink bg-neon-cyan px-6 py-2 wobbly-border-alt hover:bg-neon-pink transition-colors shadow-[2px_2px_0px_rgba(26,26,26,1)] hover:shadow-[4px_4px_0px_rgba(26,26,26,1)] -translate-y-1 hover:-translate-y-2 inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
