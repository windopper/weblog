"use client";

import { useState, useMemo, useEffect, ButtonHTMLAttributes } from "react";
import TagFilter from "./TagFilter";
import { MarkdownFile } from "@/app/types/weblog";
import { useRouter, useSearchParams } from "next/navigation";
import PostsList, { PostListViewType } from "./PostsList";
import { AlignJustify, FileText, Grid, LayoutGrid, Square } from "lucide-react";

interface PostsListProps {
  markdownFiles: MarkdownFile[];
}

/**
 * 포스트 리스트 컴포넌트.
 *
 * @param markdownFiles
 * @returns
 */
export default function PostsListWithTagFilter({
  markdownFiles,
}: PostsListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewType, setViewType] = useState<PostListViewType>("small");
  const router = useRouter();
  const searchParams = useSearchParams();

  // 페이지 로드 시 URL에서 태그 정보 읽어오기
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    if (tagsParam) {
      const tags = decodeURIComponent(tagsParam)
        .split(",")
        .filter((tag) => tag.trim());
      setSelectedTags(tags);
    }
  }, [searchParams]);

  // 모든 태그와 각 태그별 포스트 개수 계산
  const { allTags, tagCounts } = useMemo(() => {
    const tags = Array.from(
      new Set(markdownFiles.flatMap((file) => file.tags))
    ).sort();
    const counts = tags.reduce((acc, tag) => {
      acc[tag] = markdownFiles.filter((file) => file.tags.includes(tag)).length;
      return acc;
    }, {} as Record<string, number>);

    return { allTags: tags, tagCounts: counts };
  }, [markdownFiles]);

  // 선택된 태그에 따라 포스트 필터링
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return markdownFiles;
    }

    return markdownFiles.filter((file) =>
      selectedTags.some((tag) => file.tags.includes(tag))
    );
  }, [markdownFiles, selectedTags]);

  // 최신순으로 정렬
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [filteredPosts]);

  const handleTagFilter = (tags: string[]) => {
    setSelectedTags(tags);

    // URL 매개변수 업데이트
    const params = new URLSearchParams(searchParams);

    if (tags.length > 0) {
      params.set("tags", encodeURIComponent(tags.join(",")));
    } else {
      params.delete("tags");
    }

    // URL 업데이트 (페이지 새로고침 없이)
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 모든 필터 초기화
  const clearAllFilters = () => {
    setSelectedTags([]);

    // URL에서 tags 매개변수 제거
    const params = new URLSearchParams(searchParams);
    params.delete("tags");

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-4">포스트 목록</h1>

        <TagFilter
          allTags={allTags}
          tagCounts={tagCounts}
          selectedTags={selectedTags}
          onTagFilter={handleTagFilter}
        />
      </div>

      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {selectedTags.length > 0
              ? "선택된 태그에 해당하는 포스트가 없습니다."
              : "아직 작성된 포스트가 없습니다."}
          </p>
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-md border border-zinc-700 hover:border-zinc-600 transition-colors duration-200"
            >
              모든 포스트 보기
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-zinc-400">
              {selectedTags.length > 0 && (
                <>
                  {sortedPosts.length}개의 포스트가 선택된 태그와 일치합니다.
                  <button
                    onClick={clearAllFilters}
                    className="ml-4 text-zinc-500 hover:text-zinc-300 underline"
                  >
                    필터 초기화
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <ViewTypeButton
                onClick={() => setViewType("large")}
                isActive={viewType === "large"}
              >
                <Square className="w-4 h-4" />
              </ViewTypeButton>
              <ViewTypeButton
                onClick={() => setViewType("small")}
                isActive={viewType === "small"}
              >
                <LayoutGrid className="w-4 h-4" />
              </ViewTypeButton>
              <ViewTypeButton
                onClick={() => setViewType("only-content")}
                isActive={viewType === "only-content"}
              >
                <FileText className="w-4 h-4" />
              </ViewTypeButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <PostsList markdownFiles={sortedPosts} type={viewType} />
          </div>
        </div>
      )}
    </div>
  );
}

function ViewTypeButton({
  children,
  isActive,
  ...params
}: ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }) {
  return (
    <button
      {...params}
      className={`px-2 py-2 text-sm text-zinc-300
       ${
         isActive
           ? "bg-zinc-700 border-zinc-600"
           : "bg-zinc-800 border-zinc-700"
       }
       hover:bg-zinc-700 rounded-md border border-zinc-700 hover:border-zinc-600
        transition-colors duration-200 cursor-pointer`}
    >
      {children}
    </button>
  );
}
