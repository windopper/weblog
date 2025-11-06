"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, createScope, spring } from "animejs";
import { Memo } from "@/app/types/memo";

interface MemoPageProps {
  memo: Memo;
  content: React.ReactNode;
}

export default function MemoPage({ memo, content }: MemoPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<any>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // 초기 상태 설정
    const header = rootRef.current.querySelector("[data-animate='header']") as HTMLElement;
    const title = rootRef.current.querySelector("[data-animate='title']") as HTMLElement;
    const description = rootRef.current.querySelector("[data-animate='description']") as HTMLElement;
    const content = rootRef.current.querySelector("[data-animate='content']") as HTMLElement;
    const tags = rootRef.current.querySelectorAll("[data-animate='tag']");

    if (header) {
      header.style.opacity = "0";
      header.style.transform = "scale(0.95)";
    }
    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(20px)";
    }
    if (description) {
      description.style.opacity = "0";
      description.style.transform = "translateY(20px)";
    }
    tags.forEach((tag) => {
      (tag as HTMLElement).style.opacity = "0";
      (tag as HTMLElement).style.transform = "translateY(10px) scale(0.9)";
    });
    if (content) {
      content.style.opacity = "0";
    }

    // 애니메이션 스코프 생성
    scopeRef.current = createScope({ root: rootRef }).add(() => {
      // 헤더 이미지 애니메이션
      animate("[data-animate='header']", {
        opacity: [0, 1],
        scale: [0.95, 1],
        ease: "out(4)",
        duration: 1000,
      });

      // 제목 애니메이션
      animate("[data-animate='title']", {
        opacity: [0, 1],
        translateY: [20, 0],
        ease: spring({ bounce: 0.2 }),
        duration: 800,
        delay: 200,
      });

      // 설명 애니메이션
      animate("[data-animate='description']", {
        opacity: [0, 1],
        translateY: [20, 0],
        ease: spring({ bounce: 0.2 }),
        duration: 800,
        delay: 400,
      });

      // 태그 stagger 애니메이션
      tags.forEach((tag, index) => {
        animate(tag, {
          opacity: [0, 1],
          translateY: [10, 0],
          scale: [0.9, 1],
          ease: spring({ bounce: 0.4 }),
          duration: 600,
          delay: 600 + index * 100,
        });
      });

      // 콘텐츠 영역 애니메이션
      animate("[data-animate='content']", {
        opacity: [0, 1],
        ease: "out(4)",
        duration: 1000,
        delay: 800,
      });
    });

    // cleanup
    return () => {
      if (scopeRef.current) {
        scopeRef.current.revert();
      }
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* 헤더 영역 */}
      <div
        data-animate="header"
        className="relative mb-8 h-96 rounded-lg overflow-hidden"
      >
        <Image
          src={memo.thumbnail || ""}
          alt="memo"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 data-animate="title" className="text-4xl font-bold text-zinc-100">
            {memo.title}
          </h1>
          {memo.description && (
            <p data-animate="description" className="text-zinc-400">
              {memo.description}
            </p>
          )}
          {memo.tags && memo.tags.length > 0 && (
            <div className="flex gap-2 mt-2">
              {memo.tags.map((tag, index) => (
                <span
                  key={index}
                  data-animate="tag"
                  className="px-2 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-md border border-zinc-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div
        data-animate="content"
        className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert max-w-none w-full px-4 lg:px-0 [&_figure]:m-0 [&_img]:m-0"
      >
        {content}
      </div>
    </div>
  );
}
