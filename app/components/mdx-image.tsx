'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function MDXImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className = '',
  priority = false 
}: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 경로 정리 함수
  const cleanImagePath = (imagePath: string): string => {
    // @/app/public/ 패턴 처리
    if (imagePath.startsWith('@/app/public/')) {
      return imagePath.replace('@/app/public', '')
    }
    // @/public/ 패턴 처리  
    if (imagePath.startsWith('@/public/')) {
      return imagePath.replace('@/public', '')
    }
    // 상대 경로 처리
    if (imagePath.startsWith('./')) {
      return '/' + imagePath.substring(2)
    }
    // 이미 올바른 절대 경로인 경우
    if (imagePath.startsWith('/')) {
      return imagePath
    }
    // 그 외의 경우 / 추가
    return '/' + imagePath
  }

  const cleanedSrc = cleanImagePath(src)

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-zinc-800 rounded-lg ${className}`} 
           style={{ width: '100%', height: '300px' }}>
        <div className="text-center text-gray-500 dark:text-zinc-400">
          <p>이미지를 불러올 수 없습니다</p>
          <p className="text-sm">{src}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-zinc-800 animate-pulse">
          <div className="text-gray-500 dark:text-zinc-400">로딩 중...</div>
        </div>
      )}
      <Image
        src={cleanedSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
} 