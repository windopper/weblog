import { getMemoFile, getMemoFiles } from "@/app/action/memo";
import { Memo } from "@/app/types/memo";
import { Metadata } from "next";
import { BlogPosting, WithContext } from "schema-dts";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const memoFiles = await getMemoFiles();

  return memoFiles.map((file: Memo & { name?: string }) => ({
    slug: file.name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getMemoFile(slug);

  return {
    title: result?.title || "",
    description: result?.slicedContent || result?.description || "",
    openGraph: {
      title: result?.title || "",
      description: result?.slicedContent || result?.description || "",
    },
    keywords: result?.tags || [],
  };
}

export default async function MemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getMemoFile(slug);

  const jsonLdData: WithContext<BlogPosting> = {
    "@id": "https://kamilereon.net/memos/" + slug,
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: result?.title || "",
    description: result?.slicedContent || result?.description || "",
    url: "https://kamilereon.net/memos/" + slug,
    datePublished: result?.createdAt?.toString() || "",
    dateModified: (result?.updatedAt ?? result?.createdAt)?.toString() || "",
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
        url: "https://kamilereon.net/image/weblog.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://kamilereon.net/memos/" + slug,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": "https://kamilereon.net/memos",
      name: "kamilereon 메모",
      description: "개발 메모/정리",
    },
    keywords: result?.tags || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}


