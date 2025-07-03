"use client";

import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  SiCloudflare,
  SiD3Dotjs,
  SiLangchain,
  SiSqlite,
  SiNextdotjs,
  SiVercel,
  SiVisx,
  SiVitest,
  SiDrizzle,
} from "react-icons/si";
import TakeoffBentoGrid from "./TakeoffBentoGrid";
import ArchitectureElement from "./components/architecture/ArchitectureElement";
import Architecture from "./components/architecture/Architecture";

export default function TakeoffPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen max-w-4xl mx-auto">
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <StarsBackground />
        <ShootingStars />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div
          className={`flex flex-col items-center justify-center mb-16 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/image/takeoff.png"
              width={80}
              height={80}
              alt="Takeoff"
              className="rounded-lg"
            />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500">
              Takeoff.
            </h1>
          </div>
          <p className="text-xl text-center text-zinc-300 max-w-2xl">
            AI 관련 아티클을 자동으로 정리 및 게시하는 서비스
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href="https://github.com/windopper/takeoff"
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            >
              <FaGithub size={20} />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://ai-takeoff.dev"
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            >
              <FaExternalLinkAlt size={16} />
              <span>바로가기</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-12 mb-16">
          <TakeoffBentoGrid />

          <div className={`flex flex-col items-center justify-center`}>
            <h2 className="text-2xl font-bold my-16 text-zinc-100">기술 스택</h2>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-3 text-zinc-200">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#000000] transition-colors duration-300">
                    <SiNextdotjs size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#000000] transition-colors duration-300">
                    <SiVercel size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#FF1231] transition-colors duration-300">
                    <SiVisx size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#F9A03C] transition-colors duration-300">
                    <SiD3Dotjs size={32} />
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-medium mb-3 text-zinc-200">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#1C3C3C] transition-colors duration-300">
                    <SiLangchain size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#003B57] transition-colors duration-300">
                    <SiSqlite size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#F38020] transition-colors duration-300">
                    <SiCloudflare size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#C5F74F] transition-colors duration-300">
                    <SiDrizzle size={32} />
                  </span>
                  <span className="px-3 py-1 rounded-md text-sm hover:text-[#6E9F18] transition-colors duration-300">
                    <SiVitest size={32} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-zinc-100 my-16">
            아키텍처 구성도
          </h2>
          <Architecture />
        </div>
      </div>
    </div>
  );
}
