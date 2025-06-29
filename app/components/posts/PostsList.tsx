import MarkdownItem from "./MarkdownItem";
import { MarkdownFile } from "@/app/types/weblog";

interface PostsListProps {
  markdownFiles: MarkdownFile[];
}

export default function PostsList({ markdownFiles }: PostsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-4">
      {markdownFiles.filter((file) => !file.isPrivate).map((file) => (
        <MarkdownItem key={file.name} file={file} />
      ))}
    </div>
  );
}
