"use client";

import useBack from "@/app/hooks/useBack";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * 스크롤 위치에 따라 헤더를 표시하는 컴포넌트. 헤더에는 뒤로가기 버튼,
 * 타이틀 그리고 진행 상태를 표시하는 스크롤 바가 있음.
 *
 * @param title
 * @returns
 */
export default function ConditionalPostHeader({ title }: { title: string }) {
  const [showHeader, setShowHeader] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { handleBack } = useBack();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
      setShowHeader(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-sm border
         border-zinc-800 rounded-b-lg p-4 w-full`}
        >
          <div className="flex flex-row items-center gap-2">
            <ChevronLeft
              size={24}
              onClick={handleBack}
              className="cursor-pointer"
            />
            <h1 className="text-zinc-200 md:text-xl text-sm font-bold">
              {title}
            </h1>
          </div>

          {/* Progress scoll bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
            <motion.div
              className="h-full bg-zinc-200"
              style={{ width: `${scrollY}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${scrollY}%` }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
