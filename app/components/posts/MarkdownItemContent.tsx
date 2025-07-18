import { MarkdownFile } from "@/app/types/weblog";
import Image from "next/image";

interface MarkdownItemContentProps {
  file: MarkdownFile;
  hideThumbnail?: boolean;
}

export default function MarkdownItemContent({
  file,
  hideThumbnail = false,
}: MarkdownItemContentProps) {
  const thumbnail = file.thumbnail
    ? file.thumbnail
    : `/api/post/thumbnail?title=${file.title}&tags=${file.tags.join(",")}`;

  return (
    <div className="relative flex flex-col justify-start gap-2">
      <div className="relative w-full aspect-video">
        {!hideThumbnail && (
          <Image
            src={thumbnail}
            alt={file.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        )}
      </div>
      <h2 className="text-md font-semibold text-zinc-100 my-2">{file.title}</h2>

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
  );
}
