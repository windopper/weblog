'use cache';

import { notFound } from "next/navigation";

import TableOfContents from '../../components/posts/TableOfContents';
import { getMarkdownFiles, getMDXContent } from "@/app/action/markdown";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function generateMetadata({ params }: PageProps) {
  'use cache';
  const { slug } = await params;
  const result = await getMDXContent(slug);
  return {
    title: result?.frontmatter.title
  };
}

export async function generateStaticParams() {
  const markdownFiles = await getMarkdownFiles();
  return markdownFiles.map((file) => ({
    slug: file.name
  }));
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