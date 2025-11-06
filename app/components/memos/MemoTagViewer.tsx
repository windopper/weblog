interface MemoTagViewerProps {
  tags: string[];
}

export default function MemoTagViewer({ tags }: MemoTagViewerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="px-2 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-md border border-zinc-700">
          #{tag}
        </span>
      ))}
    </div>
  );
}