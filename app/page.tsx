import Link from "next/link";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import PostsListWithTagFilter from "./components/posts/PostsListWithTagFilter";
import { getMarkdownFiles } from "./action/markdown";
import PostsList from "./components/posts/PostsList";


import { TbBrandThreejs } from "react-icons/tb";
import Image from "next/image";
import Preferences from "./components/main/Preferences";
import { FaGithub } from "react-icons/fa";
import TakeoffButton from "./components/main/TakeoffButton";

export default async function Home() {
  const markdownFiles = await getMarkdownFiles();
  const publicMarkdownFiles = markdownFiles.filter((file) => !file.isPrivate);
  const latest4PublicMarkdownFiles = publicMarkdownFiles.slice(0, 4);

  return (
    <div className="flex flex-col gap-4 py-32 px-8 items-center justify-center min-h-screen">
      {/* Profile */}
      <div className="flex flex-col gap-5 items-center justify-center z-50">
        <h1 className="text-4xl font-bold">kamilereon</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <Link href="https://github.com/windopper">
            <FaGithub className="w-8 h-8" />
          </Link>
        </div>
        <p className="text-sm text-center">
          love to code and build things ✨
          <br />
          proficient in React and Next.js
        </p>
      </div>
      {/* Content */}
      <div className="flex flex-col z-50 w-full max-w-4xl">
        <div className="flex flex-row justify-between items-center text-sm ">
          <span className="font-bold py-4">최근 게시물</span>
          <Link href="/posts">더보기</Link>
        </div>
        <PostsList markdownFiles={latest4PublicMarkdownFiles} />
      </div>

      {/* 토이 프로젝트 */}
      <div className="flex flex-col w-full z-50 max-w-4xl">
        <div className="flex flex-row justify-between items-center text-sm ">
          <span className="font-bold py-4">토이 프로젝트</span>
        </div>
        <TakeoffButton />
      </div>

      {/* Preferences */}
      <Preferences />

      <div className="fixed top-0 left-0 w-full h-full z-10 overflow-hidden">
        <ShootingStars />
        <StarsBackground />
      </div>
    </div>
  );
}
