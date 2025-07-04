'use client';

import { cn } from "@/app/libs/utils";

export default function MDXComponentWrapper({
  children,
  className,
  topDescription = "",
  bottomDescription = "",
}: {
  children: React.ReactNode;
  className?: string;
  topDescription?: string;
  bottomDescription?: string;
}) {
  return (
    <div className={cn("w-full h-full p-2", className)}>
      {topDescription && <div className="text-sm text-zinc-400 mb-1">{topDescription}</div>}
      {children}
      {bottomDescription && <div className="text-sm text-zinc-400 mt-1">{bottomDescription}</div>}
    </div>
  );
}