import { Dispatch, SetStateAction } from "react";
import { HoverType } from "./Architecture";
import { motion } from "motion/react";

export default function ArchitectureElement({
  icon,
  ref,
  hover,
  setHover,
  currentHover,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  icon: React.ReactNode;
  hover: HoverType;
  setHover: Dispatch<SetStateAction<HoverType>>;
  currentHover: HoverType;
}) {
  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHover(hover)}
      onMouseLeave={() => setHover("none")}
      className="flex justify-center"
    >
      <div className="group p-1 bg-zinc-800 border-[1px] border-zinc-700 rounded-md w-fit h-fit">
        <div className="bg-zinc-900 rounded-md p-2 w-fit h-fit">{icon}</div>
      </div>
    </motion.div>
  );
}
