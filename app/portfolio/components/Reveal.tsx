"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// 스크롤로 보일 때 아래에서 올라오며 나타나는 래퍼입니다.
// 인쇄(PDF 저장)에서는 whileInView가 발동하지 않아 내용이 투명하게 남으므로, 인쇄 시에는 항상 보이게 덮어씁니다.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
      className={`${className} print:!opacity-100 print:!transform-none`}
    >
      {children}
    </motion.div>
  );
}
