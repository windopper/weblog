'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

export default function CompareTranslation({ first, second }: { first: string, second: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(50);

  const updatePosition = useCallback((newPosition: number, animate = false) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      // Update divider line position
      if (dividerRef.current) {
        dividerRef.current.style.left = `${newPosition}%`;
        dividerRef.current.style.transition = animate ? 'left 0.3s ease' : 'none';
      }

      // Update text visibility
      if (firstTextRef.current) {
        firstTextRef.current.style.clipPath = `inset(0 ${100 - newPosition}% 0 0)`;
        firstTextRef.current.style.transition = animate ? 'clip-path 0.3s ease' : 'none';
      }

      if (secondTextRef.current) {
        secondTextRef.current.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
        secondTextRef.current.style.transition = animate ? 'clip-path 0.3s ease' : 'none';
      }

      // Update percentage display
      if (percentageRef.current) {
        percentageRef.current.textContent = `${Math.round(newPosition)}%`;
      }
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setPosition(newPosition);
    updatePosition(newPosition, false);
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setPosition(newPosition);
    updatePosition(newPosition, true);
  }, [updatePosition, isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
            Original
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
            Translation
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        </div>
      </div>

      {/* Comparison Container */}
      <div 
        ref={containerRef}
        className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200
         dark:border-zinc-800 rounded-lg overflow-hidden cursor-pointer"
        onClick={handleContainerClick}
      >
        {/* Content Area */}
        <div className="relative">
          {/* First Language (Original) */}
          <div 
            ref={firstTextRef}
            className="absolute inset-0 p-4 text-zinc-900 dark:text-zinc-100 leading-relaxed whitespace-pre-wrap"
            style={{ 
              clipPath: 'inset(0 50% 0 0)'
            }}
          >
            {first}
          </div>

          {/* Second Language (Translation) */}
          <div 
            ref={secondTextRef}
            className="absolute inset-0 p-4 text-zinc-900 dark:text-zinc-100 leading-relaxed whitespace-pre-wrap"
            style={{ 
              clipPath: 'inset(0 0 0 50%)'
            }}
          >
            {second}
          </div>

          {/* Hidden content for height calculation */}
          <div className="p-4 text-zinc-900 dark:text-zinc-100 leading-relaxed opacity-0 whitespace-pre-wrap">
            {first.length > second.length ? first : second}
          </div>

          {/* Divider Line */}
          <div 
            ref={dividerRef}
            className="absolute top-0 bottom-0 w-1 bg-zinc-300 dark:bg-zinc-700 z-10 cursor-col-resize hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors"
            style={{ 
              left: '50%'
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 rounded-full cursor-col-resize shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute inset-1 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-500">
            <span>Original</span>
            <span 
              ref={percentageRef}
              className="font-medium text-zinc-700 dark:text-zinc-300"
            >
              50%
            </span>
            <span>Translation</span>
          </div>
        </div>
      </div>
    </div>
  );
}