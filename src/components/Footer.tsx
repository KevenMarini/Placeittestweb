import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="w-full h-1 bg-ink/10 mb-8 rounded-full" />
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.jpg" alt="PlaceIT 5.0" width={120} height={40} className="w-auto h-12 rounded-sm grayscale hover:grayscale-0 transition-all" />
          <p className="font-sans text-sm text-ink-light font-medium">
            IEEE PCS &copy; 2026. Made with markers & tape.
          </p>
        </div>
      </div>
    </footer>
  );
}
