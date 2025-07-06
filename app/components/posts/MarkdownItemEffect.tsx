"use client";

import { useRef } from "react";
import { useSpring } from "motion/react";
import { useEffect } from "react";
import { MarkdownFile } from "@/app/types/weblog";
import { motion } from "motion/react";
import Link from "next/link";

interface MarkdownItemProps {
  file: MarkdownFile;
  children: React.ReactNode;
}

export default function MarkdownItemEffect({ children, file }: MarkdownItemProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const translateX = useSpring(0, { stiffness: 2000, damping: 60 });
  const translateY = useSpring(0, { stiffness: 2000, damping: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        containerRef.current?.getBoundingClientRect() || {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        };
      const x = clientX - left;
      const y = clientY - top;

      const scale = 4;
      const normalizedX = (x / width) * 2 - 1;
      const normalizedY = (y / height) * 2 - 1;

      requestAnimationFrame(() => {
        translateX.set(normalizedX * scale);
        translateY.set(normalizedY * scale);
      });
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        translateX.set(0);
        translateY.set(0);
      });
    };

    containerRef.current?.addEventListener("mousemove", handleMouseMove);
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link
      key={file.name}
      href={file.path}
      className="group relative block p-6 w-full h-full backdrop-blur-sm"
      ref={containerRef}
      title={file.name}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full border border-zinc-700 rounded-lg 
      group-hover:border-zinc-600 transition-color group-hover:bg-zinc-900/30 -z-50"
        style={{
          translateX: translateX,
          translateY: translateY,
        }}
      />
      {children}
    </Link>
  );
}
