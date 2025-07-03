import Image from "next/image";
import { useRef } from "react";
import { SiReddit, SiYcombinator } from "react-icons/si";
import { AnimatedBeam } from "../AnimatedBeam";
import { FaServer } from "react-icons/fa";
import { DotPattern } from "@/app/components/ui/dot-pattern-background";
import { cn } from "@/app/libs/utils";

export default function AutoOrganizeBentoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const from1Ref = useRef<HTMLDivElement>(null);
  const from2Ref = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full gap-20"
      ref={containerRef}
    >
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,transparent,white)]"
        )}
      />
      <div className="relative p-2 bg-zinc-900 rounded-lg">
        <div
          className="flex flex-row items-center justify-center gap-16 p-2 px-4
      bg-gradient-to-bl from-zinc-900/70 via-zinc-800/70 to-zinc-900/70 rounded-lg
      "
        >
          <div ref={from1Ref} className="z-10">
            <SiYcombinator size={30} />
          </div>
          <div className="flex flex-col gap-2 z-10" ref={toRef}>
            <FaServer className="w-14 h-14" gradientUnits="userSpaceOnUse" />
          </div>
          <div ref={from2Ref} className="z-10">
            <SiReddit size={30} />
          </div>
        </div>
      </div>
      <AnimatedBeam
        className="z-0"
        duration={3}
        containerRef={containerRef}
        fromRef={from1Ref}
        toRef={toRef}
      />
      <AnimatedBeam
        className="z-0"
        duration={3}
        containerRef={containerRef}
        fromRef={from2Ref}
        toRef={toRef}
        reverse
      />
    </div>
  );
}