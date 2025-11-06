import Link from "next/link";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import { getMarkdownFiles } from "./action/markdown";
import PostsList from "./components/posts/PostsList";

import Preferences from "./components/main/Preferences";
import { FaGithub } from "react-icons/fa";
import TakeoffButton from "./components/main/TakeoffButton";
import { Blog, WithContext } from "schema-dts";
import PleroButton from "./components/main/PleroButton";

const jsonLdData: WithContext<Blog> = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://kamilereon.net",
  mainEntityOfPage: "https://kamilereon.net",
  name: "kamilereon 기술 블로그",
  description: "웹 개발, AI 기술, 소프트웨어 아키텍처에 대한 기술 블로그입니다. React, Next.js, AI 기술 등 다양한 개발 경험을 공유합니다.",
  url: "https://kamilereon.net",
  author: {
    "@type": "Person",
    name: "kamilereon",
    url: "https://github.com/windopper",
    sameAs: [
      "https://github.com/windopper"
    ]
  },
  publisher: {
    "@type": "Organization",
    name: "kamilereon",
    logo: {
      "@type": "ImageObject",
      url: "https://kamilereon.net/image/weblog.png",
      width: "512",
      height: "512"
    }
  },
  inLanguage: "ko-KR"
}

export default async function Home() {
  const markdownFiles = await getMarkdownFiles();
  const publicMarkdownFiles = markdownFiles.filter((file) => !file.isPrivate);
  const latest4PublicMarkdownFiles = publicMarkdownFiles.slice(0, 4);

  return (
    <div className="flex flex-col gap-4 py-32 px-8 items-center justify-center min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      {/* Profile */}
      <div className="flex flex-col gap-5 items-center justify-center z-50">
        <h1 className="text-4xl font-bold">kamilereon</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href="https://github.com/windopper" title="GitHub">
            <FaGithub className="w-8 h-8" />
          </Link>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col z-50 w-full max-w-4xl">
        <div className="flex flex-row justify-between items-center text-sm ">
          <span className="font-bold py-4">최근 게시물</span>
          <Link href="/posts" title="최근 게시물">더보기</Link>
        </div>
        <PostsList markdownFiles={latest4PublicMarkdownFiles} type="small" />
      </div>

      {/* 토이 프로젝트 */}
      <div className="flex flex-col w-full z-50 max-w-4xl">
        <div className="flex flex-row justify-between items-center text-sm ">
          <span className="font-bold py-4">토이 프로젝트</span>
        </div>
        <div className="flex flex-col gap-4">
          <TakeoffButton />
          <PleroButton />
        </div>
      </div>

      {/* Preferences */}
      <Preferences />

      <div className="fixed top-0 left-0 w-full h-full z-10 overflow-hidden">
        <StarsBackground />
        <ShootingStars />
      </div>
    </div>
  );
}
