'use client';

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center mb-16"
    >
      <motion.div className="flex items-center gap-4 mb-6">
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
      </motion.div>
      <p className="text-xl text-center text-zinc-300 max-w-2xl">
        AI 정보 정리 서비스
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          href="https://github.com/windopper/takeoff"
          className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
          title="GitHub"
        >
          <FaGithub size={20} />
          <span>GitHub</span>
        </Link>
        <Link
          href="https://ai-takeoff.dev"
          className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
          title="바로가기"
        >
          <FaExternalLinkAlt size={16} />
          <span>바로가기</span>
        </Link>
      </div>
    </motion.div>
  );
}
