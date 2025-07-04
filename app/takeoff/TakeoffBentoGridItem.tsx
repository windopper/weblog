import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export default function TakeoffBentoGridItem({
  icon,
  title,
  href,
  description,
  className,
  background,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  description: string;
  className?: string;
  background?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className={`group relative flex flex-col-reverse border border-zinc-700 rounded-lg overflow-hidden
cursor-pointer backdrop-blur-sm
${className}
        `}
      ref={containerRef}
      transition={{
        duration: 0.1,
      }}
      onClick={() => window.open(href, "_blank")}
    >
      <div className="relative flex flex-col gap-1 p-6 top-8 group-hover:top-0 transition-all duration-300">
        <span className="w-12 h-12 group-hover:w-8 group-hover:h-8 transition-all duration-300 text-zinc-400">
          {icon}
        </span>
        <h3 className="text-lg font-bold text-zinc-200">{title}</h3>
        <p className="text-zinc-400 text-sm font-semibold leading-relaxed">
          {description}
        </p>
        <motion.div className="relative opacity-0 group-hover:opacity-100 flex w-fit items-center transition-all duration-300">
          <span className=" text-zinc-200 text-sm font-semibold">
            이동하기
          </span>
          <ArrowRightIcon className="w-4 h-4 text-zinc-200" />
          <span className="absolute -bottom-[2px] left-0 w-0 group-hover:w-full transition-all duration-300 border-b-[1px] border-zinc-200" />
        </motion.div>
      </div>

      <div className="-z-50 absolute top-0 left-0 w-full h-full transition-all duration-300">
        <div
          className="absolute top-0 left-0 w-full h-full 
        bg-gradient-to-b from-zinc-900/20 from-40% to-zinc-950 to-90% z-50
        group-hover:from-zinc-900/10 transition-all duration-300
        "
        />
        {background}
      </div>
    </motion.div>
  );
}
