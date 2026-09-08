import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-[80vh] py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-paper p-8 md:p-12 shadow-xl relative rotate-1" style={{ backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "100% 2rem", backgroundPosition: "0 1rem" }}>
        
        {/* Paperclips */}
        <div className="absolute -top-4 left-1/4 w-4 h-12 border-2 border-ink rounded-full bg-slate-300 shadow-sm" />
        <div className="absolute -top-4 right-1/4 w-4 h-12 border-2 border-ink rounded-full bg-slate-300 shadow-sm" />

        <h1 className="font-marker text-6xl text-ink mb-8 mt-4 text-center">Get in Touch</h1>

        <div className="space-y-8 font-marker text-2xl text-ink">
          
          <div className="flex items-center gap-4 border-2 border-ink p-4 bg-neon-cyan/10 wobbly-border">
            <Mail className="text-neon-pink" size={32} />
            <div>
              <p className="font-sans text-sm font-bold text-ink-light uppercase mb-1">Email Us</p>
              <a href="mailto:hello@placeit.io" className="hover:text-neon-pink underline decoration-wavy transition-colors">
                hello@placeit.io
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 border-2 border-ink p-4 bg-neon-yellow/10 wobbly-border-alt">
            <MapPin className="text-neon-mint" size={32} />
            <div>
              <p className="font-sans text-sm font-bold text-ink-light uppercase mb-1">Location</p>
              <p>VIT University, Vellore</p>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t-4 border-ink border-dashed">
            <p className="text-3xl text-neon-pink rotate-[-2deg]">
              We can't wait to see what you build!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
