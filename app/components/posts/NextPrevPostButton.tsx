import { MarkdownFile } from "@/app/types/weblog";
import Link from "next/link";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function NextPrevPostButton({
  nextPost,
  prevPost,
}: {
  nextPost: MarkdownFile | null;
  prevPost: MarkdownFile | null;
}) {
  return (
    <div className="flex justify-between gap-4 mt-12 mb-8">
      {prevPost ? (
        <Link 
          href={`/posts/${prevPost?.name}`} 
          className="group flex-1 max-w-sm"
        >
          <div className="relative p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/70 hover:bg-gradient-to-br hover:from-zinc-800/60 hover:to-zinc-700/40 hover:shadow-lg hover:shadow-zinc-900/25 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-3">
              <div className="flex-shrink-0 p-2 rounded-lg bg-zinc-700/50 group-hover:bg-zinc-600/50 transition-colors duration-300">
                <IoIosArrowDropleft className="text-zinc-300 group-hover:text-white transition-colors duration-300" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                  이전 포스트
                </div>
                <div className="text-zinc-200 group-hover:text-white font-medium leading-snug mb-2 line-clamp-2 transition-colors duration-300">
                  {prevPost?.title}
                </div>
                <div className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {prevPost?.createdAt.toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1 max-w-sm" />
      )}
      
      {nextPost ? (
        <Link 
          href={`/posts/${nextPost?.name}`} 
          className="group flex-1 max-w-sm"
        >
          <div className="relative p-6 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600/70 hover:bg-gradient-to-br hover:from-zinc-800/60 hover:to-zinc-700/40 hover:shadow-lg hover:shadow-zinc-900/25 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-start gap-3">
              <div className="flex-1 min-w-0 text-right">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
                  다음 포스트
                </div>
                <div className="text-zinc-200 group-hover:text-white font-medium leading-snug mb-2 line-clamp-2 transition-colors duration-300">
                  {nextPost?.title}
                </div>
                <div className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {nextPost?.createdAt.toLocaleDateString('ko-KR')}
                </div>
              </div>
              <div className="flex-shrink-0 p-2 rounded-lg bg-zinc-700/50 group-hover:bg-zinc-600/50 transition-colors duration-300">
                <IoIosArrowDropright className="text-zinc-300 group-hover:text-white transition-colors duration-300" size={20} />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1 max-w-sm" />
      )}
    </div>
  );
}
