import { MarkdownFile } from "@/app/types/weblog";
import Link from "next/link";

interface MarkdownItemProps {
  file: MarkdownFile;
}

export default function MarkdownItem({ file }: MarkdownItemProps) {
  return (
    <Link
      key={file.name}
      href={file.path}
      className="block p-6 border border-zinc-700 rounded-lg hover:border-zinc-600 
      transition-colors duration-200 hover:bg-zinc-900/50 backdrop-blur-sm"
    >
      <div className="flex flex-col justify-start gap-2">
        <h2 className="text-md font-semibold text-zinc-100 mb-2">{file.title}</h2>
        
        {file.description && (
          <p className="text-zinc-300 text-sm mb-2">{file.description}</p>
        )}
        
        {file.tags.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {file.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-md border border-zinc-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-zinc-400 text-xs">
          <span>작성일: {file.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
