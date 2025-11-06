"use client";

import { TOCItem } from "../../libs/toc";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface TableOfContentsProps {
  toc: TOCItem[];
}

/**
 * 포스트 목차 컴포넌트.
 *
 * @param toc
 * @returns
 */
export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80px 0px",
        threshold: 0.1,
      }
    );

    // 모든 헤딩 요소들을 관찰
    const headings = document.querySelectorAll(
      "div.prose>h1, div.prose>h2, div.prose>h3"
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (toc.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* 모바일 토글 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden fixed top-32 right-4 z-50 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-lg p-2 text-zinc-300 hover:text-white transition-colors"
          aria-label="목차 토글"
        >
          <Menu size={20} />
        </button>
      )}

      {/* 데스크톱 TOC */}
      <div className="hidden xl:block fixed top-52 right-4 w-64 max-h-[calc(100vh-12rem)] overflow-y-auto z-50">
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-4">
          <h3 className="text-md font-semibold text-zinc-300 my-2 uppercase tracking-wider">
            목차
          </h3>
          <nav>
            <ul className="space-y-0.5">
              {toc.map((item) => (
                <li key={item.id} className="pt-2">
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`
                      block w-full text-left text-sm transition-colors duration-200
                      hover:text-blue-400 cursor-pointer
                      ${
                        activeId === item.id
                          ? "text-blue-400 font-medium"
                          : "text-gray-400"
                      }
                      ${item.level === 1 ? "font-medium" : ""}
                      ${item.level === 2 ? "pl-3" : ""}
                      ${item.level === 3 ? "pl-6" : ""}
                    `}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* 모바일 TOC 오버레이 */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed top-16 right-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] bg-zinc-900/95 backdrop-blur-sm border
             border-zinc-800 rounded-lg p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                목차
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id} className="pt-2">
                    <button
                      onClick={() => {
                        handleClick(item.id);
                        setIsOpen(false);
                      }}
                      className={`
                        block w-full text-left text-sm transition-colors duration-200
                        hover:text-blue-400
                        ${
                          activeId === item.id
                            ? "text-blue-400 font-medium"
                            : "text-gray-400"
                        }
                        ${item.level === 1 ? "font-medium" : ""}
                        ${item.level === 2 ? "pl-3" : ""}
                        ${item.level === 3 ? "pl-6" : ""}
                      `}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
