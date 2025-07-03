import {
  useTime,
  useTransform,
  motion,
  cubicBezier,
  AnimatePresence,
} from "motion/react";
import { useCallback, useMemo, useState, useEffect } from "react";

export default function TimelineBentoBackground() {
  const time = useTime();

  const progress = useTransform(time, (latest) => {
    // return 0.8;
    const cycle = 10000; // 10초 사이클
    const cycleProgress = (latest % cycle) / cycle;
    return cycleProgress; // 0에서 1까지
  });

  const getCurrentStep = useCallback((prog: number) => {
    if (prog < 0.15) return -2;
    if (prog < 0.3) return 0;
    if (prog < 0.5) return 1;
    if (prog < 0.9) return 2;
    return -1;
  }, []);

  const currentStep = useTransform(progress, getCurrentStep);

  const stepData = useMemo(
    () => [
      {
        position: 0.1,
        year: "2016",
        title: "AlphaGo",
        description:
          "딥마인드의 알파고가 바둑 세계 챔피언 이세돌을 꺾으며, 많은 이들이 불가능하다고 여겼던 AI의 잠재력을 입증했습니다.",
      },
      {
        position: 0.35,
        year: "2022",
        title: "ChatGPT",
        description:
          "OpenAI는 'ChatGPT: 대화를 위한 언어 모델 최적화'라는 블로그 포스트를 발표했습니다. 처음에는 조용한 연구 미리보기였으나, ChatGPT는 곧 세계 최대 AI 제품이 되어 생성형 AI의 새 시대를 열었습니다.",
      },
      {
        position: 0.6,
        year: "2025",
        title: "Deepseek Panic",
        description:
          "중국 연구소 DeepSeek이 6710억 개 파라미터를 가진 오픈소스 모델 DeepSeek v3를 공개하였습니다. 이 모델은 굉장히 저렴한 비용으로 뛰어난 성능을 발휘했습니다.",
      },
    ],
    []
  );

  const [stepComponents, setStepComponents] = useState<
    Array<{
      position: number;
      year: string;
      title: string;
      description: string;
    }>
  >([]);

  useEffect(() => {
    const unsubscribe = currentStep.on("change", (currentStepValue) => {
      const newStepComponents = stepData.filter(
        (_, index) => index <= currentStepValue
      );
      setStepComponents(newStepComponents);
    });

    return () => unsubscribe();
  }, [currentStep, stepData]);

  // 각 스텝에 도달했을 때 잠시 멈추는 효과 + cleanup 단계
  const heightPercentage = useTransform(
    progress,
    [0, 0.15, 0.2, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75, 0.9, 0.95, 1.0],
    [
      "0%",
      "10%",
      "10%",
      "35%",
      "35%",
      "60%",
      "60%",
      "100%",
      "100%",
      "100%",
      "0%",
      "0%",
    ],
    { ease: cubicBezier(0.25, 0.1, 0.25, 1.0) }
  );

  return (
    <div className="flex flex-col items-center px-4 w-full h-full relative">
      {/* 타임라인 세로선 */}
      <div className="relative flex flex-col items-center h-full w-full">
        <motion.div
          className="w-0.5 bg-zinc-800 absolute top-0 left-12 -translate-x-1/2"
          style={{
            height: heightPercentage,
          }}
          initial={{ height: "0%" }}
        />

        {/* 각 스텝의 점들과 카드들 */}
        <AnimatePresence>
          {stepComponents.map((step, index) => {
            return (
              <motion.div
                key={index}
                className="absolute left-4"
                style={{ top: `${step.position * 100}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -400 }}
                layout
              >
                {/* 스텝 점 */}
                <motion.div
                  className="absolute w-3 h-3 bg-white rounded-full left-8 -translate-x-1/2 transform border-2 border-gray-800"
                  style={{
                    opacity: 1,
                    scale: 1,
                  }}
                />

                {/* 년도 */}
                <motion.div className="absolute left-0 -translate-y-1/4 -translate-x-1/2 text-sm font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                >
                  {step.year}
                </motion.div>

                {/* 타임라인 카드 */}
                <motion.div
                  className="absolute left-12 top-4 -translate-y-1/2 
                  backdrop-blur-sm rounded-2xl border-[1px] border-zinc-900 p-3 min-w-[160px] bg-[radial-gradient(circle_at_center,var(--color-zinc-950),var(--color-zinc-900))]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="text-white/80 text-sm font-bold mt-1">
                    {step.title}
                  </div>
                  <div className="text-white/80 text-xs mt-1">
                    {step.description.slice(0, 20)}...
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* 진행 중인 점 (세로선 끝에 있는 점) */}
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full left-12 -translate-x-1/2"
          style={{
            top: heightPercentage,
            opacity: useTransform(progress, (latest) => {
              return latest >= 0.85 ? 0 : 1;
            }),
            scale: useTransform(progress, (latest) => {
              return latest >= 0.85 ? 0 : 1;
            }),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          //   transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
