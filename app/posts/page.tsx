'use cache';

import PostsListWithTagFilter from "../components/posts/PostsListWithTagFilter";
import { getMarkdownFiles } from "../action/markdown";
import BackButton from "../components/common/BackButton";

export default async function PostsPage() {
  const markdownFiles = await getMarkdownFiles();
  const publicMarkdownFiles = markdownFiles.filter((file) => !file.isPrivate);

  return (
    <div className="px-4 max-w-4xl mx-auto py-16">
      <BackButton />
      <PostsListWithTagFilter markdownFiles={publicMarkdownFiles} />
    </div>
  );
}
