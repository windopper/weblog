import { RefObject, useEffect, useId, useState } from "react";
import { motion } from "motion/react";

export default function ArchitecturePath({
  containerRef,
  from,
  to,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  reverse = false,
  duration = 8,
  delay = 0,
  pathColor = "gray",
  pathWidth = 1,
  pathOpacity = 1,
  gradientStartColor = "white",
  gradientStopColor = "white",
  curvature = 0,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  from: RefObject<HTMLDivElement | null>;
  to: RefObject<HTMLDivElement | null>;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  curvature?: number;
}) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["90%", "-10%"],
        y2: ["100%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["10%", "110%"],
        y2: ["0%", "100%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && from.current && to.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = from.current.getBoundingClientRect();
        const rectB = to.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

          const controlY = startY - curvature;
          const d = `M ${startX},${startY} Q ${
            (startX + endX) / 2
          },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updatePath();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    from,
    to,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      className="absolute left-0 top-0 pointer-events-none transform-gpu -z-10"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        fill="none"
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        stroke={`url(#architecture-gradient-${id})`}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={`architecture-gradient-${id}`}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            repeatDelay: 0,
            delay: delay,
            ease: "easeInOut",
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
