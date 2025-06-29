
import PostsListWithTagFilter from "../components/posts/PostsListWithTagFilter";
import { getMarkdownFiles } from "../action/markdown";

export default async function PostsPage() {
  const markdownFiles = await getMarkdownFiles();
  const publicMarkdownFiles = markdownFiles.filter((file) => !file.isPrivate);

  return (
    <div className="px-4">
      <PostsListWithTagFilter markdownFiles={publicMarkdownFiles} />
    </div>
  );
}
