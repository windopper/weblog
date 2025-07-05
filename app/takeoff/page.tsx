'use client';

import { motion } from "motion/react";
import { ShootingStars } from "../components/ui/shooting-stars";
import { StarsBackground } from "../components/ui/stars-background";

import TakeoffBentoGrid from "./TakeoffBentoGrid";
import Architecture from "./components/architecture/Architecture";
import TakeoffPosts from "./components/TakeoffPosts";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Header from "../components/common/Header";

export default function TakeoffPage() {
  return (
    <div className="relative min-h-screen max-w-4xl mx-auto">
      <Header />
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <StarsBackground />
        <ShootingStars />
      </div>

      <div className="container mx-auto px-4 py-16">
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12"
        >
          <TakeoffBentoGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-2xl font-bold text-zinc-100 my-16">정보</h2>
          <div className="flex flex-row font-bold text-zinc-100 gap-4">
            <p>제작 기간</p>
            <div className="border-r-[1px] border-zinc-400" />
            <p>2025.06.17 ~ 2025.06.30</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className={`flex flex-col items-center justify-center`}
        >
          <h2 className="text-2xl font-bold my-16 text-zinc-100">기술 스택</h2>
          <TechStack />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-2xl font-bold text-zinc-100 my-16">
            아키텍처 구성도
          </h2>
          <Architecture />
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-2xl font-bold text-zinc-100 my-16">
            데이터베이스 스키마
          </h2>
          <SchemaGroup />
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-2xl font-bold text-zinc-100 my-16">
            Takeoff 제작기
          </h2>
          <TakeoffPosts />
        </motion.div>
      </div>
    </div>
  );
}
