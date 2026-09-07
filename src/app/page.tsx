import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Guidelines from "@/components/Guidelines";
import Domains from "@/components/Domains";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <SplashScreen>
      <div className="flex flex-col">
        <Hero />
        <Domains />
        <Guidelines />
        <Timeline />
      </div>
    </SplashScreen>
  );
}
