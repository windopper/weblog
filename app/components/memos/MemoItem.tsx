"use client";
import { Memo } from "@/app/types/memo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MemoTagViewer from "./MemoTagViewer";
import MemoPreview from "./MemoPreview";
import Link from "next/link";

interface MemoItemProps {
  memo: Memo;
}

export default function MemoItem({ memo }: MemoItemProps) {
  const tags = memo.tags ? memo.tags : [];
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <Link href={memo.path || `/memos/${memo.name || memo.title}`}>
        <div
          className="relative p-4 bg-zinc-900/50 rounded-lg border border-zinc-800 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/** space */}
          <div className="h-12"></div>

          {/** image */}
          <div className="absolute top-0 left-0 -z-50 w-full h-full">
            <Image
              src={memo.thumbnail || "/image/weblog.png"}
              alt="memo"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <h3 className="title text-lg font-bold text-zinc-100 line-clamp-2">
            {memo.title}
          </h3>
          <p className="text-sm text-zinc-400">
            {memo.description ? memo.description : "No description"}
          </p>
          <MemoTagViewer tags={tags} />
        </div>
      </Link>
      {isHovered && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${mousePosition.x + 10}px`,
            top: `${mousePosition.y + 10}px`,
            transform: "translate(0, 0)",
          }}
        >
          <MemoPreview memo={memo} />
        </div>
      )}
    </>
  );
}
