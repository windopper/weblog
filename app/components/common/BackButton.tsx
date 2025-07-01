'use client';

import useBack from "@/app/hooks/useBack";
import { ArrowLeftIcon } from "lucide-react";

export default function BackButton() {
  const { handleBack } = useBack();

  return (
    <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={handleBack}>
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm">돌아가기</span>
    </div>
  );
}