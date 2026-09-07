import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Guidelines from "@/components/Guidelines";
import Domains from "@/components/Domains";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Domains />
      <Guidelines />
      <Timeline />
    </div>
  );
}
