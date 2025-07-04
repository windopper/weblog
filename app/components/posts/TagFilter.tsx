"use client";

import { useEffect, useState } from "react";

interface TagFilterProps {
  allTags: string[];
  tagCounts: Record<string, number>;
  selectedTags: string[];  // 부모에서 전달받는 선택된 태그들
  onTagFilter: (selectedTags: string[]) => void;
}

export default function TagFilter({ allTags, tagCounts, selectedTags, onTagFilter }: TagFilterProps) {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(selectedTags);

  // 부모에서 전달받은 selectedTags가 변경되면 로컬 상태 업데이트
  useEffect(() => {
    setLocalSelectedTags(selectedTags);
  }, [selectedTags]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = localSelectedTags.includes(tag)
      ? localSelectedTags.filter(t => t !== tag)
      : [...localSelectedTags, tag];
    
    setLocalSelectedTags(newSelectedTags);
    onTagFilter(newSelectedTags);
  };

  const clearAllTags = () => {
    setLocalSelectedTags([]);
    onTagFilter([]);
  };

  if (allTags.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-200">태그별 보기</h2>
        {localSelectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
          >
            모든 태그 해제
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = localSelectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                isSelected
                  ? "text-zinc-100 bg-blue-600 border-blue-500 hover:bg-blue-700"
                  : "text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-600"
              }`}
            >
              #{tag} ({tagCounts[tag]})
            </button>
          );
        })}
      </div>
      
      {localSelectedTags.length > 0 && (
        <div className="mt-3 text-sm text-zinc-400">
          선택된 태그: {localSelectedTags.map(tag => `#${tag}`).join(", ")}
        </div>
      )}
    </div>
  );
} 