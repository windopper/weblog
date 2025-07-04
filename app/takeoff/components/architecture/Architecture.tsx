"use client";

import {
  SiClaude,
  SiCloudflare,
  SiCloudflareworkers,
  SiGithub,
  SiGooglegemini,
  SiMysql,
  SiNextdotjs,
  SiSqlite,
  SiVercel,
} from "react-icons/si";
import ArchitectureElement from "./ArchitectureElement";
import ArchitecturePath from "./ArchitecturePath";
import { useRef, useState } from "react";
import { TbWorldSearch } from "react-icons/tb";
import { Webhook } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ArchitectureDescription from "./ArchitectureDescription";

export type HoverType =
  | "sqlite"
  | "cloudflare"
  | "ai"
  | "worldSearch"
  | "github"
  | "vercel"
  | "nextjs"
  | "webhook"
  | "none";

export default function Architecture() {
  const cloudflare = useRef<HTMLDivElement>(null);
  const nextjs = useRef<HTMLDivElement>(null);
  const sqlite = useRef<HTMLDivElement>(null);
  const ai = useRef<HTMLDivElement>(null);
  const worldSearch = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const webhook = useRef<HTMLDivElement>(null);
  const vercel = useRef<HTMLDivElement>(null);
  const github = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverType>("none");

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col w-full relative"
    >
      <AnimatePresence>
        {/* {hover !== "none" && (
          <motion.div
            className="absolute -top-10 -left-10 w-[calc(100%+100px)] h-[calc(100%+100px)] z-10 rounded-md
        backdrop-blur-sm bg-radial from-black/50 to-transparent
        "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            key={`${hover}-background`}
          />
        )} */}
      </AnimatePresence>
      <ArchitectureDescription />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-row justify-between w-full"
      >
        <div className="flex flex-col justify-center gap-24">
          <ArchitectureElement
            ref={sqlite}
            hover={"sqlite"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <div className="flex flex-row gap-2">
                <SiSqlite
                  size={32}
                  className="group-hover:text-[#003B57] transition-all duration-300"
                />
                <SiCloudflare
                  size={32}
                  className="group-hover:text-[#F38020]  transition-all duration-300"
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col justify-center gap-24">
          <ArchitectureElement
            ref={worldSearch}
            hover={"worldSearch"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <TbWorldSearch
                size={32}
                className="group-hover:text-[#C5F74F] transition-all duration-300"
              />
            }
          />
          <ArchitectureElement
            ref={cloudflare}
            hover={"cloudflare"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <SiCloudflareworkers
                size={32}
                className="group-hover:text-[#F38020] transition-all duration-300"
              />
            }
          />
          <ArchitectureElement
            ref={ai}
            hover={"ai"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <div className="flex flex-row gap-2">
                <SiGooglegemini
                  size={32}
                  className="group-hover:text-[#8E75B2] transition-all duration-300"
                />
                <SiClaude
                  size={32}
                  className="group-hover:text-[#D97757] transition-all duration-300"
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col justify-center gap-24">
          <ArchitectureElement
            ref={github}
            hover={"github"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <SiGithub size={32} className="transition-all duration-300" />
            }
          />
          <ArchitectureElement
            ref={vercel}
            hover={"vercel"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <SiVercel size={32} className="transition-all duration-300" />
            }
          />
          <ArchitectureElement
            ref={webhook}
            hover={"webhook"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <Webhook
                size={32}
                className="group-hover:text-[#789dd3] transition-all duration-300"
              />
            }
          />
        </div>
        <div className="flex flex-col justify-center gap-24">
          <ArchitectureElement
            ref={nextjs}
            hover={"nextjs"}
            currentHover={hover}
            setHover={setHover}
            icon={
              <SiNextdotjs size={32} className="transition-all duration-300" />
            }
          />
        </div>
      </motion.div>
      <ArchitecturePath
        containerRef={containerRef}
        from={worldSearch}
        to={cloudflare}
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={vercel}
      />
      <ArchitecturePath containerRef={containerRef} from={vercel} to={nextjs} />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={webhook}
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={sqlite}
        to={cloudflare}
        reverse
      />
      <ArchitecturePath containerRef={containerRef} from={cloudflare} to={ai} />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={ai}
        reverse
      />
      <ArchitecturePath containerRef={containerRef} from={github} to={vercel} />
      <ArchitecturePath
        containerRef={containerRef}
        from={github}
        to={cloudflare}
        reverse
        curvature={-45}
      />
    </motion.div>
  );
}
