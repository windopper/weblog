import { notFound } from "next/navigation";
import TableOfContents from '../../components/posts/TableOfContents';
import { getMDXContent } from "@/app/action/markdown";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getMDXContent(slug);

  if (!result) {
    notFound();
  }

  const { content, toc } = result;

  return (
    <div className="relative">
      <TableOfContents toc={toc} />
      <article  className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert 
      max-w-none w-full px-4 lg:px-0">
        {content}
      </article>
    </div>
  );
} 