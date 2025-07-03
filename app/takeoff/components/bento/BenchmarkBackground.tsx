import { AnimatePresence, motion, useTime, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TbArrowRight } from "react-icons/tb";

const benchmarks = [
  "Aider Polyglot",
  "Fiction Live Bench",
  "VPCT",
  "GPQA Diamond",
  "Frontier Math",
  "Math Level 5",
  "Otis Mock AIME",
  "SWE Bench Verified",
  "Weird ML",
  "Balrog",
  "Factorio",
  "Geo Bench",
  "Simple Bench",
];

const legends = [
  {
    name: "openai",
    color: "rgba(34, 197, 94, 0.8)",
    label: "OpenAI",
  },
  {
    name: "google",
    color: "rgba(59, 130, 246, 0.8)",
    label: "Google",
  },
  {
    name: "meta",
    color: "rgba(168, 85, 247, 0.8)",
    label: "Meta",
  },
  {
    name: "deepseek",
    color: "rgba(249, 115, 22, 0.8)",
    label: "DeepSeek",
  },
  {
    name: "anthropic",
    color: "rgba(239, 68, 68, 0.8)",
    label: "Anthropic",
  },
];

export default function BenchmarkBackground() {
  const duplicatedBenchmarks = [...benchmarks, ...benchmarks];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const canvasContainer = canvasContainerRef.current;
      if (!canvasContainer) return;

      const rect = container.getBoundingClientRect();

      // is in rect
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        canvasContainer.style.transform = "rotateX(0deg) rotateY(0deg)";
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const normalizedX = (x / containerWidth) * 2 - 1; // -1 ~ 1
      const normalizedY = (y / containerHeight) * 2 - 1; // -1 ~ 1

      const maxOffset = 10;

      const transformX = -normalizedY * maxOffset;
      const transformY = normalizedX * maxOffset;

      canvasContainer.style.transform = `perspective(1000px) rotateX(${transformX}deg) rotateY(${transformY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col w-full h-full relative">
      <motion.div
        className="flex flex-row items-center justify-center gap-3 absolute mt-2 whitespace-nowrap"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedBenchmarks.map((benchmark, index) => (
          <div
            key={`${benchmark}-${index}`}
            className="bg-zinc-900 px-3 py-2 rounded-xl text-sm font-semibold text-nowrap flex-shrink-0
             font-stretch-50% tracking-wider border-[1px] border-zinc-800
             bg-[radial-gradient(circle_at_center,var(--color-zinc-900)_0%,var(--color-zinc-850)_100%)]
             "
          >
            {benchmark}
          </div>
        ))}
      </motion.div>
      <div
        ref={canvasContainerRef}
        className="flex flex-col gap-2 justify-center items-center m-auto p-3 rounded-2xl shadow-xl transform-3d
        bg-gradient-to-bl from-zinc-950/50 via-zinc-900/50 to-zinc-950/50
        "
      >
        <SvgGraph />
      </div>
    </div>
  );
}

function SvgGraph() {
  const [hide, setHide] = useState(false);
  const time = useTime();
  const progress = useTransform(time, (value) => {
    return (value % 14000) / 14000;
  });

  useEffect(() => {
    progress.on("change", (value) => {
      if (value < 0.8) {
        setHide(false);
      } else {
        setHide(true);
      }
    });
  }, []);

  const gridX = 90;
  const gridY = 50;
  const width = 450;
  const height = 250;
  const points = [
    { x: width * 0.1, y: height * 0.7, name: "google" },
    { x: width * 0.2, y: height * 0.8, name: "meta" },
    { x: width * 0.3, y: height * 0.3, name: "google" },
    { x: width * 0.4, y: height * 0.4, name: "meta" },
    { x: width * 0.5, y: height * 0.5, name: "deepseek" },
    { x: width * 0.6, y: height * 0.45, name: "meta" },
    { x: width * 0.7, y: height * 0.1, name: "anthropic" },
    { x: width * 0.8, y: height * 0.2, name: "deepseek" },
    { x: width * 0.9, y: height * 0.1, name: "openai" },
  ];

  return (
    <>
      <AnimatePresence>
        {!hide && (
          <div className="flex flex-row items-center justify-center gap-2">
            {legends.map((legend, index) => (
              <motion.div
                key={legend.name}
                className="flex flex-row items-center justify-center gap-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.3,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: legend.color }}
                />
                <div className="text-white text-sm font-semibold">
                  {legend.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
      <svg width={width} height={height}>
        {/* 그리드 */}
        <AnimatePresence propagate>
          {!hide && (
            <>
              {[...Array(Math.floor(width / gridX))].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M ${i * gridX + 10} 0 L ${i * gridX + 10} ${height}`}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {[...Array(Math.floor(height / gridY))].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M 0 ${i * gridY + 10} L ${width} ${i * gridY + 10}`}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Human baseline */}
              <motion.g>
                <motion.path
                  d={`M 0 70 L ${width} 70`}
                  fill="none"
                  stroke="rgba(200, 200, 200, 0.9)"
                  strokeWidth="0.8"
                  strokeDasharray="10 10"
                  initial={{ d: `M 0 70 L 0 70` }}
                  animate={{ d: `M 0 70 L ${width} 70` }}
                  exit={{ d: `M 0 70 L 0 70` }}
                  transition={{
                    delay: 0.5,
                    duration: 0.3,
                  }}
                />
                <motion.text
                  x={60}
                  y={60}
                  textAnchor="middle"
                  fill="rgba(200, 200, 200, 0.5)"
                  fontSize="12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.3,
                  }}
                >
                  Human Baseline
                </motion.text>
              </motion.g>

              {/* 점 */}
              {points.map((point, index) => (
                <>
                  <motion.circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={3}
                    fill={
                      legends.find((legend) => legend.name === point.name)
                        ?.color || "rgba(255, 255, 255, 0.8)"
                    }
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      delay: index * 0.1 + 0.8,
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                  <AnimatePresence>
                  {point.y < height * 0.3 && (
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={3}
                      fill="none"
                      stroke={
                        legends.find((legend) => legend.name === point.name)
                          ?.color || "rgba(255, 255, 255, 0.8)"
                      }
                      strokeWidth="0.4"
                      initial={{
                        r: 3,
                        opacity: 0,
                      }}
                      animate={{
                        r: 10,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.1 + 0.8,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    />
                  )}
                  </AnimatePresence>
                </>
              ))}
            </>
          )}
        </AnimatePresence>
      </svg>
    </>
  );
}
