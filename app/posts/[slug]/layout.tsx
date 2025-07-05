import { getMarkdownFile, getMarkdownFiles } from '@/app/action/markdown';
import MdxLayout from '@/app/components/mdx-layout'
import { MarkdownFile } from '@/app/types/weblog';
import { Metadata } from 'next';
import Head from 'next/head';
import { BlogPosting, WithContext } from 'schema-dts';

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
    description: result?.slicedContent || "",
    openGraph: {
      title: result?.title || "",
      description: result?.slicedContent || "",
    },
    keywords: result?.tags || [],
  };
}

export default async function PostLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const result = await getMarkdownFile(slug);

  const jsonLdData: WithContext<BlogPosting> = {
    "@id": "https://kamilereon.net/posts/" + slug,
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: result?.title || "",
    description: result?.slicedContent || "",
    url: "https://kamilereon.net/posts/" + slug,
    datePublished: result?.createdAt.toString() || "",
    dateModified: result?.createdAt.toString() || "",
    author: {
      "@type": "Person",
      name: "kamilereon",
      url: "https://github.com/windopper",
    },
    publisher: {
      "@type": "Organization",
      name: "kamilereon",
      logo: {
        "@type": "ImageObject",
        url: "https://kamilereon.net/image/weblog.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://kamilereon.net/posts/" + slug
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://kamilereon.net/posts",
      name: "kamilereon 기술 블로그",
      description: "웹 개발, AI 기술, 소프트웨어 아키텍처 기술 블로그"
    },
    keywords: result?.tags || []
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <MdxLayout>{children}</MdxLayout>
    </>
  );
} 