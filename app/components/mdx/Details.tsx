'use client';

import { PropsWithChildren, useState } from "react";

interface DetailsProps extends PropsWithChildren {
    title: string;
}

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Details({ children, title }: DetailsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-full my-6">
        <div
          className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-600 
          rounded-lg px-4 py-2 transition-all duration-200 
          hover:border-zinc-400 dark:hover:border-zinc-500 
          hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-zinc-100 dark:bg-zinc-700">
                {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {title}
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {isOpen ? "접기" : "펼치기"}
            </span>
          </div>
          {isOpen && <div className="mt-4">
            {children}
          </div>}
        </div>
      </div>
    );
}