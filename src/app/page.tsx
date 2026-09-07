import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Guidelines from "@/components/Guidelines";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Guidelines />
      <Timeline />
    </div>
  );
}
