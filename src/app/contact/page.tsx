import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-[80vh] py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-off-white mb-2">COMM_LINK</h1>
          <p className="font-mono text-sm text-cyan">ESTABLISH CONNECTION WITH ADMIN HQ</p>
        </div>

        <div className="border border-cyan/30 bg-navy-dark/80 p-8 cad-border relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-cyan/30"></div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 border border-cyan/30 text-cyan shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-mono text-xs text-off-white/50 mb-1">HQ_LOCATION</h3>
                <p className="font-sans text-off-white">
                  VIT, Vellore<br />
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 border border-cyan/30 text-cyan shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-mono text-xs text-off-white/50 mb-1">SECURE_EMAIL</h3>
                <p className="font-sans text-off-white">
                  placeit@ieee-pcs.org <span className="text-amber text-xs ml-2">(Awaiting Activation)</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan/10 border border-cyan/30 text-cyan shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-mono text-xs text-off-white/50 mb-1">EMERGENCY_COMMS</h3>
                <p className="font-sans text-off-white">
                  +91 XXXXX XXXXX <span className="text-amber text-xs ml-2">(Awaiting Activation)</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-cyan/20">
            <p className="font-mono text-xs text-center text-off-white/40">
              MORE DETAILS WILL BE UPLOADED TO THIS NODE SHORTLY.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
