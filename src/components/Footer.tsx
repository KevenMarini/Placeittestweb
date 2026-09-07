export default function Footer() {
  return (
    <footer className="border-t border-cyan/30 bg-navy-dark mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-heading font-bold text-lg text-cyan tracking-wider flex items-center gap-2">
            <span className="text-amber">{"//"}</span> PLACE_IT
          </div>
          <p className="font-mono text-xs text-off-white/50">
            SYS.VER: 2026.09 | IEEE PCS
          </p>
        </div>
        
        <div className="font-mono text-xs text-off-white/50 flex gap-6">
          <span className="hover:text-cyan cursor-pointer transition-colors">[ STATUS: ONLINE ]</span>
          <span className="hover:text-cyan cursor-pointer transition-colors">[ PROTOCOL: ACTIVE ]</span>
        </div>
      </div>
    </footer>
  );
}
