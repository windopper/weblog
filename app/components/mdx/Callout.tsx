import { PropsWithChildren } from "react";
import { CiWarning } from "react-icons/ci";
import { TiWarning } from "react-icons/ti";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { HiOutlineXCircle } from "react-icons/hi2";
import { HiOutlineCheckCircle } from "react-icons/hi2";

interface CalloutProps extends PropsWithChildren {
    type?: "info" | "warning" | "error" | "success";
}

const typeConfig = {
    info: {
        icon: <HiOutlineInformationCircle className="text-zinc-500 w-4 h-4" />,
        bgColor: "bg-zinc-50 dark:bg-zinc-900",
        borderColor: "border-zinc-200 dark:border-zinc-700",
        leftBorderColor: "border-l-zinc-400 dark:border-l-zinc-500",
        iconBg: "bg-zinc-100 dark:bg-zinc-800"
    },
    warning: {
        icon: <TiWarning className="text-amber-500 w-4 h-4" />,
        bgColor: "bg-amber-50 dark:bg-amber-950/20",
        borderColor: "border-amber-200 dark:border-amber-800/50",
        leftBorderColor: "border-l-amber-500 dark:border-l-amber-400",
        iconBg: "bg-amber-100 dark:bg-amber-900/30"
    },
    error: {
        icon: <HiOutlineXCircle className="text-red-500 w-4 h-4" />,
        bgColor: "bg-red-50 dark:bg-red-950/20",
        borderColor: "border-red-200 dark:border-red-800/50",
        leftBorderColor: "border-l-red-500 dark:border-l-red-400",
        iconBg: "bg-red-100 dark:bg-red-900/30"
    },
    success: {
        icon: <HiOutlineCheckCircle className="text-emerald-500 w-4 h-4" />,
        bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
        borderColor: "border-emerald-200 dark:border-emerald-800/50",
        leftBorderColor: "border-l-emerald-500 dark:border-l-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30"
    }
};

export default function Callout({ children, type = "info" }: CalloutProps) {
    const config = typeConfig[type];
    
    return (
      <div
        className={`relative overflow-hidden rounded-lg border-l-4 border my-2
             ${config.bgColor} ${config.borderColor} ${config.leftBorderColor} shadow-sm`}
      >
        <div className="flex gap-3 p-4">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
          >
            {config.icon}
          </div>
          <div className="flex items-center text-sm leading-relaxed text-zinc-700
           dark:text-zinc-300 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    );
}