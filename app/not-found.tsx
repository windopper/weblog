'use client';

import { ShootingStars } from "@/app/components/ui/shooting-stars";
import { StarsBackground } from "@/app/components/ui/stars-background";
import { ChevronLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-2xl mx-auto px-6">
        {/* 404 Number with glow effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-500 select-none">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-zinc-400/20 blur-2xl select-none">
            404
          </div>
        </div>
        
        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-3">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mx-auto">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.push("/")}
            className="group relative px-8 py-4 bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 
                     border border-zinc-700 hover:border-zinc-600 rounded-xl text-zinc-100 font-medium
                     transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-zinc-900/25
                     min-w-[200px] cursor-pointer"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              홈으로 돌아가기
            </span>
          </button>
          
          <button
            onClick={() => router.back()}
            className="group relative px-8 py-4 bg-transparent hover:bg-zinc-800/50 
                     border border-zinc-700 hover:border-zinc-600 rounded-xl text-zinc-300 hover:text-zinc-100 font-medium
                     transition-all duration-300 transform hover:scale-105
                     min-w-[200px] cursor-pointer"
          >
            <span className="relative flex items-center justify-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              이전 페이지로
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}