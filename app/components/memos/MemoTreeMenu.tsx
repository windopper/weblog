"use client";

import { type MemoTreeMenu } from "@/app/types/memo";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * 메모 Tag에 따른 트리 메뉴를 렌더링합니다.
 *
 * @returns MemoTreeMenu
 */
export default function MemoTreeMenu({ menus }: { menus: MemoTreeMenu[] }) {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-md p-4">
      <h3 className="text-md font-semibold text-zinc-300 mb-4 uppercase tracking-wider">
        카테고리
      </h3>
      <nav>
        <ul className="space-y-1">
          {menus.map((menu) => (
            <TreeMenuItem key={menu.name} menu={menu} level={0} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

interface TreeMenuItemProps {
  menu: MemoTreeMenu;
  level: number;
}

function TreeMenuItem({ menu, level }: TreeMenuItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = menu.subTreeMenus.length > 0;
  const hasFileName = !!menu.fileName;
  const paddingLeft = level * 1.25; // rem 단위

  // 현재 경로의 slug 추출 (/memos/[slug] 형태)
  const currentSlug = pathname?.replace("/memos/", "") || "";
  const isActive = hasFileName && menu.fileName === currentSlug;

  useEffect(() => {
    // 하위 메뉴 중에 활성화된 항목이 있는지 재귀적으로 확인
    // 파일은 항상 리프 노드에 있으므로, 이 함수가 현재 메뉴와 하위 메뉴 모두 확인
    const hasActiveChild = (menuItem: MemoTreeMenu): boolean => {
      if (menuItem.fileName === currentSlug) {
        return true;
      }
      return menuItem.subTreeMenus.some((subMenu) => hasActiveChild(subMenu));
    };

    // 하위 메뉴 중에 활성화된 항목이 있으면 열기
    const shouldBeOpen = hasActiveChild(menu);
    setIsOpen(shouldBeOpen);
  }, [pathname, menu, currentSlug]);

  const handleClick = (e: React.MouseEvent) => {
    // fileName이 있으면 라우팅만 하고, 없으면 토글만 수행
    if (hasFileName) {
      // Link가 처리하므로 여기서는 아무것도 하지 않음
      return;
    }
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const menuContent = (
    <div
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200
        ${
          hasChildren || hasFileName
            ? "cursor-pointer hover:bg-zinc-800/50"
            : "cursor-default"
        }
        ${level === 0 ? "font-medium" : ""}
        ${isActive ? "bg-zinc-800/70 text-zinc-100" : ""}
      `}
      style={{ paddingLeft: `${paddingLeft}rem` }}
      onClick={handleClick}
    >
      {/* 화살표 아이콘 */}
      {hasChildren ? (
        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          )}
        </div>
      ) : (
        <div className="flex-shrink-0 w-4 h-4" />
      )}

      {/* 메뉴 이름 */}
      <span
        className={`
          text-sm transition-colors duration-200
          ${
            isActive
              ? "text-zinc-100 font-medium"
              : level === 0
              ? "text-zinc-200"
              : "text-zinc-400"
          }
          ${hasChildren || hasFileName ? "hover:text-zinc-200" : ""}
        `}
      >
        {menu.name}
      </span>
    </div>
  );

  return (
    <li>
      {hasFileName ? (
        <Link
          href={`/memos/${menu.fileName}`}
          className="block"
          onClick={(e) => {
            // fileName이 있으면 하위 메뉴 토글 방지
            if (hasChildren) {
              e.stopPropagation();
            }
          }}
        >
          {menuContent}
        </Link>
      ) : (
        menuContent
      )}

      {/* 하위 메뉴 */}
      {hasChildren && isOpen && (
        <ul className="mt-1">
          {menu.subTreeMenus.map((subMenu) => (
            <TreeMenuItem key={subMenu.name} menu={subMenu} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
