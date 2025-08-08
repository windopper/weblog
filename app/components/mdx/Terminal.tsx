"use client";

import { useState } from "react";
import { LucideCopy } from "lucide-react";
import { FaCheck } from "react-icons/fa";

interface TerminalProps {
  terminal: string;
  title?: string;
  maxHeightPx?: number;
}

export default function Terminal({ terminal, title = "Terminal", maxHeightPx = 420 }: TerminalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(terminal ?? "");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1600);
    } catch (_) {
      // noop
    }
  };

  return (
    <div className="relative group w-full my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border border-zinc-800 border-b-0 rounded-t-xl bg-zinc-950/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs font-medium text-zinc-400 select-none">
          {title}
        </div>
        <button
          onClick={handleCopy}
          title={isCopied ? "복사됨!" : "내용 복사"}
          className="inline-flex items-center justify-center p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 border border-transparent hover:border-zinc-700/50 hover:bg-zinc-900/40 transition-colors"
        >
          {isCopied ? <FaCheck className="w-4 h-4" /> : <LucideCopy className="w-4 h-4" />}
        </button>
      </div>

      {/* Body */}
      <div
        style={{ maxHeight: `${maxHeightPx}px` }}
        className="border border-zinc-800 rounded-b-xl bg-zinc-950/40 text-zinc-200 p-4 font-mono text-[13px] leading-6 overflow-auto thin-scrollbar whitespace-pre-wrap break-words"
      >
        {terminal}
      </div>
    </div>
  );
}