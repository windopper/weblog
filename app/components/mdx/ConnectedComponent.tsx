'use client';

import { cn } from "@/app/libs/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function ConnectedComponent({
  children,
  enableTab = false,
}: {
  children: React.ReactNode;
  enableTab?: boolean;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const [rendered, setRendered] = useState(false);  
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (enableTab) {
    return (
      <div className="relative">
        {/* Tabs */}
        <div className="flex flex-row gap-1 top-0 left-0 bg-zinc-900/50 rounded-t-lg p-1">
          <motion.div
            className="absolute bg-zinc-700/50 shadow-sm rounded-md -z-10 transition-all duration-200 ease-in-out"
            style={{
              x: buttonRefs.current[tabIndex]?.offsetLeft - 4,
              width: buttonRefs.current[tabIndex]?.offsetWidth,
              height: buttonRefs.current[tabIndex]?.offsetHeight,
            }}
          ></motion.div>
          {childrenArray.map((child: any, index: number) => (
            <button
              key={index}
              ref={(el) => {
                if (el) {
                  buttonRefs.current[index] = el;
                }
              }}
              onClick={() => setTabIndex(index)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out cursor-pointer"
                // "hover:bg-zinc-700/50 hover:text-zinc-200"
                // tabIndex === index
                //   ? "bg-zinc-700 text-zinc-100 shadow-sm"
                //   : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {child.props.title || `Tab ${index + 1}`}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="bg-zinc-900/50 rounded-b-lg border-t border-zinc-700/50 p-1">
          {childrenArray.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-opacity duration-200",
                tabIndex === index ? "block" : "hidden"
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full gap-2 p-1 bg-zinc-800 rounded-lg
    border-[1px] border-zinc-700
    "
    >
      {childrenArray.map((child, index) => (
        <div key={index}>
          {React.isValidElement(child) && (child.props as any).title && (
            <div className="text-sm p-2 text-zinc-200">{(child.props as any).title}</div>
          )}
          {child}
        </div>
      ))}
    </div>
  );
}

export function ConnectedComponentItem({
  children,
  diagonalLineColor = "var(--color-zinc-700)",
  containerClassName = "",
  innerClassName = "",
  enableDiagonalLine = true,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
  diagonalLineColor?: string;
  enableDiagonalLine?: boolean;
}) {
  return (
    <div className={cn("bg-zinc-900 rounded-lg p-2 border-[1px] border-zinc-700 relative", containerClassName)}>
      <div
        className={cn("relative w-full h-full z-10 p-4 rounded-lg", innerClassName)}
        style={{
          backgroundImage: enableDiagonalLine ? `repeating-linear-gradient(315deg, ${diagonalLineColor} 0, ${diagonalLineColor} 1px, transparent 0, transparent 50%)` : "none",
          backgroundSize: enableDiagonalLine ? "16px 16px" : "none",
          backgroundPosition: enableDiagonalLine ? "top left" : "none",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full
        bg-radial from-zinc-800/50 to-black/40 rounded-lg z-10
        " />

        <div className="relative z-20">{children}</div>
      </div>
    </div>
  );
}
