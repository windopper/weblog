import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const notifications = [
  {
    title: "새로운 뉴스",
    description: "새로운 뉴스가 추가되었습니다.",
    date: "2025-01-03"
  },
  {
    title: "LLM 평가의 새로운 기준",
    description: "과학 분야 대규모 언어 모델 평가 벤치마크 공개",
    date: "2025-06-26"
  },
  {
    title: "양자 AI 알고리즘, 슈퍼컴퓨너 성능 능가",
    description: "커널 기반 머신러닝에서 양자 속도 향상 성공적 시연",
    date: "2025-07-03"
  },
  {
    title: "AI 시대의 새로운 핵심 역량: 컨텍스트 엔지니어링",
    description: "프롬프트 엔지니어링에서 컨텍스트 엔지니어링으로 논의의 초점 이동",
    date: "2025-07-05"
  }
];

export default function NotificationBentoBackground() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [removingItems, setRemovingItems] = useState<number[]>([]);

  useEffect(() => {
    const animationLoop = () => {
      // 모든 아이템을 순차적으로 보이게 하기
      notifications.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 800); // 0.8초 간격으로 순차적으로 나타남
      });

      // 모든 아이템이 보인 후 2초 후에 순차적으로 제거 시작
      setTimeout(() => {
        // 순차적으로 제거 애니메이션 시작
        notifications.forEach((_, index) => {
          setTimeout(() => {
            setRemovingItems(prev => [...prev, index]);
          }, index * 400); // 0.4초 간격으로 순차적으로 제거
        });

        // 모든 제거 애니메이션이 완료된 후 실제로 아이템들을 제거
        setTimeout(() => {
          setVisibleItems([]);
          setRemovingItems([]);
        }, notifications.length * 400 + 600); // 제거 애니메이션 시간 + 여유시간
      }, notifications.length * 800 + 2000);
    };

    // 초기 애니메이션 시작
    animationLoop();

    // 루프를 위한 인터벌 설정 (전체 사이클 시간 계산)
    const totalCycleTime = notifications.length * 800 + 2000 + notifications.length * 400 + 1200; // 나타나는 시간 + 대기 시간 + 제거 시간 + 여유시간
    const interval = setInterval(animationLoop, totalCycleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-start justify-center w-full h-full gap-1
    bg-radial to-zinc-950 from-black
    ">
      <AnimatePresence mode="popLayout">
        {visibleItems.map((index) => {
          const isRemoving = removingItems.includes(index);
          return (
            <motion.div
              className="w-full"
              key={`notification-${index}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ 
                opacity: isRemoving ? 0 : 1, 
                y: isRemoving ? -200 : 0, 
                scale: 1
              }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
              layout
            >
            <NotificationItem
              title={notifications[index].title}
              description={notifications[index].description}
              date={notifications[index].date}
            />
          </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function NotificationItem({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="flex flex-row gap-2 p-2 mx-2 items-start justify-start
    bg-gradient-to-bl from-zinc-950/50 via-zinc-900/50 to-zinc-950/50 rounded-lg
    ">
      <Image
        src="/image/takeoff.png"
        alt="Takeoff"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-sm font-medium text-zinc-100">Takeoff.</h3>
          <p className="text-xs font-bold text-center text-zinc-400 bg-indigo-500 rounded-md px-1.5 py-0.5">
            앱
          </p>
          <p className="text-xs text-zinc-400">{date}</p>
        </div>

        {/* embed */}
        <div className="flex flex-col border-l-2 rounded-l-sm border-blue-500 pl-2">
          <h1 className="text-sm font-medium text-zinc-100">{title}</h1>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
