'use client';

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => router.back()}>
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm">돌아가기</span>
    </div>
  );
}