'use client';

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function MoveToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-zinc-800 text-zinc-100 p-3 rounded-full
         hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
        onClick={handleClick}
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
        }}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}