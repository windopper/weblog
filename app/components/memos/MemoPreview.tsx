import { Memo } from "@/app/types/memo";
import Image from "next/image";
import MemoTagViewer from "./MemoTagViewer";

interface MemoPreviewProps {
  memo: Memo;
}

function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatRelativeTime(date: Date | undefined): string {
  if (!date) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

export default function MemoPreview({ memo }: MemoPreviewProps) {
  const tags = memo.tags ? memo.tags : [];
  const displayContent = memo.slicedContent || memo.description || "";
  const hasContent = displayContent.length > 0;
  const isUpdated =
    memo.updatedAt &&
    memo.createdAt &&
    memo.updatedAt.getTime() !== memo.createdAt.getTime();

  return (
    <div className="relative bg-zinc-900/95 rounded-lg border border-zinc-700 shadow-xl w-80 overflow-hidden backdrop-blur-sm">
      {/** Header Image */}
      <div className="relative w-full h-40">
        <Image
          src={memo.thumbnail || "/image/weblog.png"}
          alt={memo.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
      </div>

      {/** Content */}
      <div className="p-5 space-y-4">
        {/** Title */}
        <div>
          <h3 className="text-xl font-bold text-zinc-100 leading-tight mb-1 line-clamp-2">
            {memo.title}
          </h3>
        </div>

        {/** Description/Content */}
        {hasContent && (
          <div className="space-y-2">
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
              {displayContent}
            </p>
          </div>
        )}

        {/** Tags */}
        {tags.length > 0 && (
          <div className="pt-1">
            <MemoTagViewer tags={tags} />
          </div>
        )}

        {/** Metadata Footer */}
        {(memo.createdAt || memo.updatedAt) && (
          <div className="pt-2 border-t border-zinc-800/50">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              {memo.createdAt && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  {formatRelativeTime(memo.createdAt)}
                </span>
              )}
              {isUpdated && memo.updatedAt && (
                <span className="text-zinc-600">수정됨</span>
              )}
            </div>
            {(memo.createdAt || memo.updatedAt) && (
              <div className="mt-1.5 text-xs text-zinc-600">
                {memo.createdAt && formatDate(memo.createdAt)}
                {isUpdated && memo.updatedAt && (
                  <span className="ml-2">
                    · 수정: {formatDate(memo.updatedAt)}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
