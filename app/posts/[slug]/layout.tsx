import { getMarkdownFile, getMarkdownFiles } from '@/app/action/markdown';
import MdxLayout from '@/app/components/mdx-layout'
import { MarkdownFile } from '@/app/types/weblog';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const markdownFiles = await getMarkdownFiles();
  
  return markdownFiles.map((file: MarkdownFile) => ({
    slug: file.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getMarkdownFile(slug);

  return {
    title: result?.title || "",
    openGraph: {
      title: result?.title || "",
    },
    keywords: result?.tags || [],
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <MdxLayout>{children}</MdxLayout>
} 