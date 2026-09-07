export default function Footer() {
  return (
    <footer className="mt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="w-full h-1 bg-ink/10 mb-8 rounded-full" />
        <div className="flex flex-col items-center gap-2">
          <div className="font-marker text-2xl font-bold text-ink">
            Place<span className="text-neon-pink">IT</span>
          </div>
          <p className="font-sans text-sm text-ink-light font-medium">
            IEEE PCS &copy; 2026. Made with markers & tape.
          </p>
        </div>
      </div>
    </footer>
  );
}
