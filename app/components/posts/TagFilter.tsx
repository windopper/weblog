"use client";

import { useState } from "react";

interface TagFilterProps {
  allTags: string[];
  tagCounts: Record<string, number>;
  onTagFilter: (selectedTags: string[]) => void;
}

export default function TagFilter({ allTags, tagCounts, onTagFilter }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    onTagFilter(newSelectedTags);
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    onTagFilter([]);
  };

  if (allTags.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-200">태그별 보기</h2>
        {selectedTags.length > 0 && (
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
          const isSelected = selectedTags.includes(tag);
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
      
      {selectedTags.length > 0 && (
        <div className="mt-3 text-sm text-zinc-400">
          선택된 태그: {selectedTags.map(tag => `#${tag}`).join(", ")}
        </div>
      )}
    </div>
  );
} 