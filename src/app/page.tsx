import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Guidelines from "@/components/Guidelines";
import Domains from "@/components/Domains";
import SplashScreen from "@/components/SplashScreen";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <SplashScreen>
      <div className="flex flex-col">
        <Hero />
        <Reveal direction="up" delay={0}>
          <Domains />
        </Reveal>
        <Reveal direction="up" delay={0}>
          <Guidelines />
        </Reveal>
        <Reveal direction="up" delay={0}>
          <Timeline />
        </Reveal>
      </div>
    </SplashScreen>
  );
}
