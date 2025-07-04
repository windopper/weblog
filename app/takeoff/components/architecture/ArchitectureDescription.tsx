import { motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HoverType } from "./Architecture";

interface TooltipPosition {
  x: number;
  y: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

interface TooltipContent {
  title: string;
  description: string;
}

const tooltipData: Record<HoverType, TooltipContent | null> = {
  sqlite: {
    title: "SQLite + Cloudflare D1",
    description: "가볍고 서버리스 데이터베이스로, 사용하기 쉽고 배포가 간단합니다. Cloudflare D1을 통해 전 세계적으로 분산된 SQLite 데이터베이스를 제공합니다."
  },
  cloudflare: {
    title: "Cloudflare Workers",
    description: `엣지에서 실행되는 서버리스 컴퓨팅 플랫폼입니다. 
    Cron 트리거를 통해 주기적으로 웹에서 AI 이슈를 가져오고 글을 작성합니다.`
  },
  ai: {
    title: "AI 서비스",
    description: "Google Gemini와 Claude를 사용하여 AI 이슈 필터링 및 글을 작성합니다."
  },
  worldSearch: {
    title: "웹 서치",
    description: "Hackernews와 Reddit에서 최신 AI 이슈를 가져옵니다."
  },
  github: {
    title: "GitHub",
    description: "코드 저장소 및 버전 관리 시스템입니다. 자동화된 배포와 CI/CD 파이프라인을 지원합니다."
  },
  vercel: {
    title: "Vercel",
    description: "Next.js 애플리케이션을 위한 최적화된 호스팅 플랫폼입니다. 자동 스케일링과 글로벌 CDN을 제공합니다."
  },
  nextjs: {
    title: "Next.js",
    description: "React 기반의 풀스택 웹 프레임워크입니다. 서버사이드 렌더링과 정적 사이트 생성을 지원합니다."
  },
  webhook: {
    title: "Webhook",
    description: `실시간 이벤트 알림 시스템입니다. 
    Discord 웹훅으로 새로운 글이 작성되면 알림을 받을 수 있습니다.`
  },
  none: null
};

export default function   ArchitectureDescription() {
  const [position, setPosition] = useState<TooltipPosition>({ 
    x: 0, 
    y: 0, 
    placement: 'bottom' 
  });
  const [isVisible, setIsVisible] = useState(false);
  const [currentHover, setCurrentHover] = useState<HoverType>("none");

  const calculatePosition = (mouseX: number, mouseY: number): TooltipPosition => {
    const tooltipWidth = 320; // 예상 툴팁 너비
    const tooltipHeight = 140; // 예상 툴팁 높이
    const offset = 16; // 마우스와 툴팁 사이의 거리
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = mouseX;
    let y = mouseY;
    let placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

    // 기본적으로 마우스 아래쪽에 표시
    y = mouseY + offset;
    
    // 오른쪽으로 넘어가는 경우
    if (mouseX + tooltipWidth > viewportWidth) {
      x = mouseX - tooltipWidth;
    }
    
    // 아래로 넘어가는 경우
    if (mouseY + tooltipHeight + offset > viewportHeight) {
      y = mouseY - tooltipHeight - offset;
      placement = 'top';
    }
    
    // 왼쪽으로 넘어가는 경우
    if (x < 0) {
      x = offset;
    }
    
    // 위로 넘어가는 경우
    if (y < 0) {
      y = mouseY + offset;
      placement = 'bottom';
    }

    return { x, y, placement };
  };

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest('[data-architecture-element]') as HTMLElement;
      if (element) {
        const hoverType = element.getAttribute('data-architecture-element') as HoverType;
        if (tooltipData[hoverType]) {
          setCurrentHover(hoverType);
          const newPosition = calculatePosition(e.clientX, e.clientY);
          setPosition(newPosition);
          setIsVisible(true);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isVisible) {
        const newPosition = calculatePosition(e.clientX, e.clientY);
        setPosition(newPosition);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest('[data-architecture-element]') as HTMLElement;
      if (element) {
        setIsVisible(false);
        setCurrentHover("none");
      }
    };

    // 마우스가 아키텍처 요소에 호버될 때만 툴팁 표시
    const architectureElements = document.querySelectorAll('[data-architecture-element]');
    
    architectureElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter as EventListener);
      element.addEventListener('mousemove', handleMouseMove as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      architectureElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        element.removeEventListener('mousemove', handleMouseMove as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, [isVisible]);

  if (!isVisible || !tooltipData[currentHover]) return null;

  const content = tooltipData[currentHover]!;

  return createPortal(
    <motion.div
      className="fixed flex flex-col w-[320px] h-fit gap-3 z-50
        bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-4 rounded-lg
        border-[1px] border-zinc-700/50 backdrop-blur-sm shadow-2xl"
      style={{ 
        left: position.x, 
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0.8, y: position.placement === 'top' ? 10 : -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: position.placement === 'top' ? 10 : -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* 화살표 표시 */}
      {/* <div 
        className={`absolute w-0 h-0 border-l-[8px] border-r-[8px] border-transparent
          ${position.placement === 'top' 
            ? 'border-t-[8px] border-t-zinc-700/50 -bottom-2 left-1/2 transform -translate-x-1/2' 
            : 'border-b-[8px] border-b-zinc-700/50 -top-2 left-1/2 transform -translate-x-1/2'
          }`}
      /> */}
      
      <h2 className="text-lg font-bold text-white">{content.title}</h2>
      <p className="text-sm text-zinc-300 leading-relaxed">
        {content.description}
      </p>
    </motion.div>,
    document.body
  );
}