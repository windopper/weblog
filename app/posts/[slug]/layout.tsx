import { getMarkdownFiles, getMDXContent } from '@/app/action/markdown';
import MdxLayout from '@/app/components/mdx-layout'
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const markdownFiles = await getMarkdownFiles();
  return markdownFiles.map((file) => ({
    slug: file.name
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getMDXContent(slug);
  return {
    title: result?.frontmatter.title,
    openGraph: {
      title: result?.frontmatter.title,
    },
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return <MdxLayout>{children}</MdxLayout>
} 