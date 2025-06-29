import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaLink } from "react-icons/fa";

export default function TakeoffButton() {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Link href="https://ai-takeoff.dev" className="flex flex-row items-center gap-4">
        <Image
          src="/image/takeoff.png"
          alt="Takeoff."
          width={100}
          height={100}
          className="rounded-lg w-8 h-8"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Takeoff.</span>
          <span className="text-xs">
            Takeoff is a service for posting ai related articles automatically.
          </span>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link href="https://github.com/windopper/takeoff">
          <FaGithub className="w-8 h-8" />
        </Link>
        <Link href="https://ai-takeoff.dev">
          <FaArrowRight className="w-8 h-8 opacity-80" />
        </Link>
      </div>
    </div>
  );
}
