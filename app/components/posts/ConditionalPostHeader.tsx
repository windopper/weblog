'use client';

import useBack from "@/app/hooks/useBack";
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react";

export default function ConditionalPostHeader({ title }: { title: string }) {
  const [showHeader, setShowHeader] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { handleBack } = useBack();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
      setShowHeader(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-sm border
     border-zinc-800 rounded-b-lg p-4 w-full transition-all duration-300 ${showHeader ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-row items-center gap-2">
        <ChevronLeft size={24} onClick={handleBack} className="cursor-pointer" />
        <h1 className="text-zinc-200 md:text-xl text-sm font-bold">{title}</h1>
      </div>

      {/* Progress scoll bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
        <div className="h-full bg-zinc-200" style={{ width: `${scrollY}%` }} />
      </div>
    </div>
  );
}