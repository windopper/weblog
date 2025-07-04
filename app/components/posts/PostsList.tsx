import MarkdownItem from "./MarkdownItem";
import { MarkdownFile } from "@/app/types/weblog";

export type PostListViewType = "small" | "large" | "only-content";

interface PostsListProps {
  markdownFiles: MarkdownFile[];
  type: PostListViewType;
}

export default function PostsList({ markdownFiles, type = "large" }: PostsListProps) {
  if (type === "small") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-4">
        {markdownFiles.filter((file) => !file.isPrivate).map((file) => (
          <MarkdownItem key={file.name} file={file} />
        ))}
      </div>
    );
  }

  if (type === "large") {
    return (
      <div className="grid grid-cols-1 max-w-4xl gap-4">
        {markdownFiles.filter((file) => !file.isPrivate).map((file) => (
          <MarkdownItem key={file.name} file={file} />
        ))}
      </div>
    );
  }

  if (type === "only-content") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-4">
        {markdownFiles.filter((file) => !file.isPrivate).map((file) => (
          <MarkdownItem key={file.name} file={file} hideThumbnail={true} />
        ))}
      </div>
    );
  }
}
