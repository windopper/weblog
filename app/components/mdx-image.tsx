"use client";

import Image from "next/image";
import { useState } from "react";

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function MDXImage({
  src,
  alt,
  width = 100,
  height = 300,
  className = "",
  priority = false,
}: MDXImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 경로 정리 함수
  const cleanImagePath = (imagePath: string): string => {
    // @/app/public/ 패턴 처리
    if (imagePath.startsWith("@/app/public/")) {
      return imagePath.replace("@/app/public", "");
    }
    // @/public/ 패턴 처리
    if (imagePath.startsWith("@/public/")) {
      return imagePath.replace("@/public", "");
    }
    // 상대 경로 처리
    if (imagePath.startsWith("./")) {
      return "/" + imagePath.substring(2);
    }
    // 이미 올바른 절대 경로인 경우
    if (imagePath.startsWith("/")) {
      return imagePath;
    }
    // 그 외의 경우 / 추가
    return "/" + imagePath;
  };

  const cleanedSrc = cleanImagePath(src);

  if (hasError) {
    return (
      <span
        className={`inline-block w-full ${className}`}
        style={{
          display: "block",
          width: "100%",
          height: "300px",
          backgroundColor: "var(--tw-color-gray-200)",
          borderRadius: "0.5rem",
          // margin: "1rem 0",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            color: "var(--tw-color-gray-500)",
          }}
        >
          <span>
            <p>이미지를 불러올 수 없습니다</p>
            <p style={{ fontSize: "0.875rem" }}>{src}</p>
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block w-full overflow-hidden rounded-lg ${className}`}
      style={{ display: "block" }}
    >
      {isLoading && (
        <span
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--tw-color-gray-200)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          <span style={{ color: "var(--tw-color-gray-500)" }}>로딩 중...</span>
        </span>
      )}
      <Image
        src={cleanedSrc}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100" 
        }`}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </span>
  );
}
