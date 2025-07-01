'use client';

import { useState } from 'react';

export default function PreviewWeb({ src, width, height }: { src: string, width?: number, height?: number }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200/20 bg-gradient-to-br from-zinc-50 to-zinc-100/50 shadow-lg shadow-zinc-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/10 dark:border-zinc-800/50 dark:from-zinc-900 dark:to-zinc-800/30 dark:shadow-zinc-900/20">
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-zinc-200/30 bg-white/60 px-4 py-3 backdrop-blur-sm dark:border-zinc-800/30 dark:bg-zinc-900/60">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400/70"></div>
            <div className="h-3 w-3 rounded-full bg-green-400/70"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
              웹 미리보기
            </span>
          </div>
        </div>
        
        {/* URL 표시 영역 */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex rounded-md bg-zinc-100/80 px-3 py-1 dark:bg-zinc-800/80">
            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              {src.length > 30 ? `${src.substring(0, 30)}...` : src}
            </span>
          </div>
          <button 
            onClick={() => window.open(src, '_blank')}
            className="cursor-pointer rounded-md bg-zinc-900 px-3 py-1 text-xs font-medium
             text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            새 탭에서 열기
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-50/80 dark:bg-zinc-900/80">
            <div className="flex flex-col items-center space-y-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400"></div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">로딩 중...</span>
            </div>
          </div>
        )}

        {/* 에러 상태 */}
        {hasError && (
          <div className="flex min-h-[400px] items-center justify-center bg-zinc-50 dark:bg-zinc-900">
            <div className="flex flex-col items-center space-y-3 text-center">
              <svg 
                className="h-12 w-12 text-zinc-400 dark:text-zinc-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L4.084 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                  페이지를 불러올 수 없습니다
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                  URL을 확인하거나 나중에 다시 시도해주세요
                </p>
              </div>
              <button 
                onClick={() => window.open(src, '_blank')}
                className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                새 탭에서 열기
              </button>
            </div>
          </div>
        )}

        {/* iframe */}
        <iframe 
          src={src} 
          width={width || "100%"} 
          height={height || "600px"}
          onLoad={handleLoad}
          onError={handleError}
          className="w-full transition-opacity duration-300"
          style={{ 
            opacity: isLoading ? 0 : 1,
            minHeight: height || '600px'
          }}
        />
      </div>

      {/* 하단 그라데이션 오버레이 (호버 시 표시) */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-100/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-900/80"></div>
    </div>
  );
}