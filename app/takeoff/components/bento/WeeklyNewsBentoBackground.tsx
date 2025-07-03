import Takeoff from "@/app/components/icon/Takeoff";
import ShaderBackground from "@/app/components/ui/shader-background";
import { AnimatePresence, motion, useTime, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useId, useState } from "react";

const NEON_DURATION = 500;

export default function WeeklyNewsBentoBackground() {
  const time = useTime();
  const [consoleStep, setConsoleStep] = useState(0);

  useEffect(() => {
    const length = 20000;
    const offset = 4000;
    time.on("change", (value) => {
      const step = Math.floor((value % length) / offset);
      setConsoleStep(step);
    });
  }, []);

  return (
    <div className="relative flex flex-row items-center justify-center w-full h-full">
      <div
        className="flex items-center justify-center w-24 h-24 p-4 bg-gradient-to-bl from-zinc-900 via-zinc-800 to-zinc-850
        ring-8 ring-zinc-900
       rounded-lg"
      >
        <Takeoff color="white" />
      </div>
      <div className="relative w-16 h-16 overflow-hidden">
        <NeonLine width={8} top={2} delay={0} />
        <NeonLine width={8} top={2} delay={0.25} />
        <NeonLine width={8} top={2} delay={0.5} />
        <NeonLine width={8} top={2} delay={0.75} />

        <NeonLine width={16} top={32} delay={0} />
        <NeonLine width={16} top={32} delay={0.5} />

        <NeonLine width={24} top={62} delay={0} />
        <NeonLine width={8} top={62} delay={0.5} />
      </div>
      <div className="flex flex-col h-full w-32 pt-2">
        <div className="bg-gradient-to-bl from-zinc-900 via-zinc-800 to-zinc-850 h-full w-full rounded-lg p-2 flex flex-col gap-2
         overflow-hidden">
          <AnimatePresence>
            {consoleStep > 0 && (
              <ConsoleOrganize
                preText="게시글 정리 중..."
                postText="게시글 정리 완료"
                key={`0-console-organize`}
              />
            )}
            {consoleStep > 1 && (
              <ConsoleOrganize
                preText="뉴스 선택 중..."
                postText="뉴스 선택 완료"
                key={`1-console-organize`}
              />
            )}
            {consoleStep > 2 && (
              <ConsoleOrganize
                preText="주간 뉴스 생성 중..."
                postText="주간 뉴스 생성 완료"
                key={`2-console-organize`}
              />
            )}
            {consoleStep > 3 && (
              <PublishWeeklyNews key={`3-publish-weekly-news`} />
            )}
            {/* <PublishWeeklyNews /> */}
          </AnimatePresence>
        </div>
      </div>

      
    </div>
  );
}

function NeonLine({
  width,
  top,
  delay,
}: {
  width: number;
  top: number;
  delay: number;
}) {
  const time = useTime();
  const [hidden, setHidden] = useState(false);
  const x = useTransform(time, (value) => {
    const t = (value - delay * NEON_DURATION) % NEON_DURATION;
    return (t / NEON_DURATION) * 64;
  });

  useEffect(() => {
    time.on("change", (value) => {
      if (value < delay * NEON_DURATION) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    });
  }, [delay]);

  if (!hidden) {
    return null;
  }

  return (
    <motion.div
      className="absolute w-4 h-0.5 left-2 shadow-[0_0_10px_rgba(255,255,255,1)]
        bg-gradient-to-l from-white to-white/10 rounded-full -z-50
        "
      style={{ width, top, x }}
    />
  );
}

function ConsoleText({ text }: { text: string }) {
  return (
    <motion.div
      className="flex flex-row w-full gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Takeoff className="w-4 h-4" />
      <div className="text-white text-xs font-light">{text}</div>
    </motion.div>
  );
}

function ConsoleOrganize({ preText, postText }: { preText: string; postText: string }) {
  const id = useId();
  const time = useTime();
  const [done, setDone] = useState(false);

  useEffect(() => {
    time.on("change", (value) => {
      setDone(value > 3000);
    });
  }, []);

  return (
    <motion.div
      className="flex flex-col w-full gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row gap-2">
        <AnimatePresence mode="wait">
          {!done && (
            <>
              <Takeoff className="w-4 h-4" />
              <motion.div
                key={`${id}-loading-text`}
                className="text-zinc-300 text-xs font-light italic"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {preText}
              </motion.div>
            </>
          )}
          {done && (
            <>
              <Check className="w-4 h-4 text-green-400 stroke-2" />
              <motion.div
                key="done-text"
                className="text-zinc-300 text-xs font-light italic"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {postText}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!done && (
          <motion.div
            key="loading-content"
            className="flex flex-row gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* 수직선 */}
            <div className="relative h-full w-[1px] ml-1.5">
              <div className="absolute top-0 left-0 w-full h-full bg-zinc-700" />
            </div>

            {/* 로딩 인디케이터 */}
            <div className="flex flex-col gap-2 w-full">
              <motion.div
                className="bg-gradient-to-l from-zinc-750/70 via-zinc-600 to-zinc-750/70
      h-2 w-full rounded-lg flex flex-col gap-2"
                style={{
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 0%",
                }}
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "200% 0%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="flex flex-row gap-2">
                <motion.div
                  className="bg-gradient-to-l from-zinc-750/70 via-zinc-600 to-zinc-750/70
      h-2 w-1/4 rounded-lg flex flex-col gap-2"
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                  initial={{ backgroundPosition: "0% 0%" }}
                  animate={{ backgroundPosition: "200% 0%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="bg-gradient-to-l from-zinc-750/70 via-zinc-600 to-zinc-750/70
      h-2 w-full rounded-lg flex flex-col gap-2"
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                  initial={{ backgroundPosition: "0% 0%" }}
                  animate={{ backgroundPosition: "200% 0%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PublishWeeklyNews() {
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPublished(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col w-full gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!isPublished ? (
          <motion.div
            key="publishing"
            className="relative p-[1px] rounded-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* 애니메이션 그라데이션 테두리 */}
            <motion.div
              className="absolute inset-0 rounded-sm"
              style={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06d6a0, #3b82f6)",
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* 내부 컨텐츠 */}
            <div className="relative bg-zinc-900 m-[1px] rounded-sm p-1 flex flex-row items-center gap-2">              
              <motion.div
                className="text-white text-xs font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                주간 뉴스 발행 중...
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="published"
            className="relative p-[1px] rounded-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* 성공 상태 그라데이션 테두리 */}
            <div
              className="absolute inset-0 rounded-sm bg-gradient-to-r from-green-400 via-emerald-500 to-green-400"
            />
            
            {/* 내부 컨텐츠 */}
            <div className="relative bg-zinc-900 m-[1px] rounded-sm p-1 flex flex-row items-center gap-2">
              <motion.div
                className="text-green-400 text-xs font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                주간 뉴스 발행 완료
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
