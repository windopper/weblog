"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import MemoTreeMenu from "./MemoTreeMenu";
import MemoList from "./MemoList";
import { type MemoTreeMenu as MemoTreeMenuType } from "@/app/types/memo";
import { type Memo } from "@/app/types/memo";

interface MemoLayoutProps {
  menus: MemoTreeMenuType[];
  memos: Memo[];
}

export default function MemoLayout({ menus, memos }: MemoLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden fixed top-24 left-4 z-50 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-lg p-2 text-zinc-300 hover:text-white transition-colors"
        aria-label="메뉴 토글"
      >
        <Menu size={20} />
      </button>

      <div className="px-4 max-w-7xl mx-auto py-16">
        <div className="flex gap-8">
          {/* 데스크톱 사이드바 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <MemoTreeMenu menus={menus} />
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 w-full lg:w-auto">
            <MemoList memos={memos} />
          </main>
        </div>
      </div>

      {/* 모바일 사이드바 오버레이 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 사이드바 */}
          <aside className="lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-zinc-900 border-r border-zinc-800 overflow-y-auto">
            <div className="p-4">
              {/* 닫기 버튼 */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-zinc-300 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
                  aria-label="메뉴 닫기"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 메뉴 */}
              <MemoTreeMenu menus={menus} />
            </div>
          </aside>
        </>
      )}
    </>
  );
}

