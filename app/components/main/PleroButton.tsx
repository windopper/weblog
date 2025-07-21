import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa";

export default function PleroButton() {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Link href="/plerosvg" className="flex flex-row items-center gap-4">
        <PleroSvg className="w-8 h-8 p-1" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Plero</span>
          <span className="text-xs">
            wiki for everyone.
          </span>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link href="https://github.com/windopper/plero" title="GitHub">
          <FaGithub className="w-8 h-8" />
        </Link>
        <Link href="https://plero.kamilereon.net" title="Takeoff. 바로가기">
          <FaArrowRight className="w-8 h-8 opacity-80" />
        </Link>
      </div>
    </div>
  );
}

function PleroSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 300 300"
    {...props}
  >
    <g transform="matrix(1.29924 0 0 1.70886 -44.886 -106.193)">
      <rect
        width={31.255}
        height={132.052}
        fill="#6366f1"
        rx={0}
        ry={0}
        transform="matrix(.64923 0 0 1.32484 111.672 62.526)"
      />
      <rect
        width={31.255}
        height={132.052}
        fill="#6366f1"
        rx={0}
        ry={0}
        transform="matrix(.64923 0 0 1.09262 139.755 93.191)"
      />
      <rect
        width={31.255}
        height={132.052}
        fill="#9395f1"
        rx={0}
        ry={0}
        transform="matrix(.64923 0 0 .156 139.854 62.143)"
      />
      <rect
        width={31.255}
        height={132.052}
        fill="#6366f1"
        rx={0}
        ry={0}
        transform="matrix(.64923 0 0 .55413 168.036 164.3)"
      />
      <rect
        width={31.255}
        height={132.052}
        fill="#9395f1"
        rx={0}
        ry={0}
        transform="matrix(.64923 0 0 .68126 168.036 62.526)"
      />
    </g>
  </svg>
    );
}
