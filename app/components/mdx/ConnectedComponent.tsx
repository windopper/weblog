import { cn } from "@/app/libs/utils";

export default function ConnectedComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col w-full gap-2 p-1 bg-zinc-800 rounded-lg
    border-[1px] border-zinc-700
    "
    >
      {children}
    </div>
  );
}

export function ConnectedComponentItem({
  children,
  diagonalLineColor = "var(--color-zinc-700)",
  containerClassName = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  containerClassName?: string;
  innerClassName?: string;
  diagonalLineColor?: string;
}) {
  return (
    <div className={cn("bg-zinc-900 rounded-lg p-2 border-[1px] border-zinc-700 relative", containerClassName)}>
      <div
        className={cn("relative w-full h-full z-10 p-8 rounded-lg", innerClassName)}
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, ${diagonalLineColor} 0, ${diagonalLineColor} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "16px 16px",
          backgroundPosition: "top left",
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
