"use client";
import { cn } from "@/app/libs/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

const getStartPointToTarget = (targetX: number, targetY: number) => {
  const side = Math.floor(Math.random() * 4);
  let startX, startY, angle;

  switch (side) {
    case 0: // 위쪽에서 시작
      startX = Math.random() * window.innerWidth;
      startY = -50;
      angle = Math.atan2(targetY - startY, targetX - startX) * (180 / Math.PI);
      break;
    case 1: // 오른쪽에서 시작
      startX = window.innerWidth + 50;
      startY = Math.random() * window.innerHeight;
      angle = Math.atan2(targetY - startY, targetX - startX) * (180 / Math.PI);
      break;
    case 2: // 아래쪽에서 시작
      startX = Math.random() * window.innerWidth;
      startY = window.innerHeight + 50;
      angle = Math.atan2(targetY - startY, targetX - startX) * (180 / Math.PI);
      break;
    case 3: // 왼쪽에서 시작
      startX = -50;
      startY = Math.random() * window.innerHeight;
      angle = Math.atan2(targetY - startY, targetX - startX) * (180 / Math.PI);
      break;
    default:
      startX = 0;
      startY = 0;
      angle = 45;
  }

  return { x: startX, y: startY, angle };
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createStar = useCallback((targetX?: number, targetY?: number) => {
    const { x, y, angle } = targetX !== undefined && targetY !== undefined
      ? getStartPointToTarget(targetX, targetY)
      : getRandomStartPoint();
    
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    };
    
    setStars(prevStars => [newStar]);
  }, [minSpeed, maxSpeed]);

  useEffect(() => {
    const createStarContinuously = () => {
      createStar();
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = setTimeout(createStarContinuously, randomDelay);
    };
    createStarContinuously();
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [createStar, minDelay, maxDelay]);

  useEffect(() => {
    const moveStars = () => {
      setStars(prevStars => {
        return prevStars
          .map(star => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;
            const newScale = 1 + newDistance / 100;
            
            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            };
          })
          .filter(star => {
            return !(
              star.x < -100 ||
              star.x > window.innerWidth + 100 ||
              star.y < -100 ||
              star.y > window.innerHeight + 100
            );
          });
      });
    };

    const animationFrame = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(animationFrame);
  }, [stars]);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      createStar(clickX, clickY);
    }
  };

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
      // onClick={handleClick}
    >
      {stars.map(star => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
