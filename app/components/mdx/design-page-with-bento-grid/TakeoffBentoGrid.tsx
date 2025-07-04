"use client";

import AutoOrganizeBentoBackground from "@/app/takeoff/components/bento/AutoOrganizeBentoBackground";
import NotificationBentoBackground from "@/app/takeoff/components/bento/NotificationBentoBackground";
import WeeklyNewsBentoBackground from "@/app/takeoff/components/bento/WeeklyNewsBentoBackground";
import TakeoffBentoGridItem from "@/app/takeoff/TakeoffBentoGridItem";
import { Calendar, Home, PackageSearch, Table } from "lucide-react";
import TimelineBentoBackground from "@/app/takeoff/components/bento/TimelineBentoBackground";
import BenchmarkBackground from "@/app/takeoff/components/bento/BenchmarkBackground";
import { Bell } from "lucide-react";
import { TbTimeline } from "react-icons/tb";

export default function TakeoffBentoGrid() {
  return (
    <div className="flex flex-col gap-12 p-4 [&_h3]:m-0 [&_p]:m-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,200px)]">
        <div className="md:col-span-2 lg:col-span-2">
        <TakeoffBentoGridItem
            icon={<PackageSearch className="w-full h-full" />}
            href={`#`}
            title="콘텐츠 자동 정리"
            description="Hackernews/Reddit에서 인기있는 AI 관련 글들을 자동으로 수집하고 정리하여 게시합니다."
            className="w-full h-full"
            background={<AutoOrganizeBentoBackground />}
          />
        </div>

        <div className="md:col-span-1 lg:col-span-1 row-span-2">
        <TakeoffBentoGridItem
            icon={<TbTimeline className="w-full h-full" />}
            href={`#`}
            title="AI 타임라인"
            description="2015-2025년 AI 발전사"
            className="w-full h-full"
            background={<TimelineBentoBackground />}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2 row-span-2">
        <TakeoffBentoGridItem
            icon={<Table className="w-full h-full" />}
            href={`#`}
            title="LLM 벤치마크"
            description="13종의 벤치마크 결과 정리"
            className="w-full h-full"
            background={<BenchmarkBackground />}
          />
        </div>

        <div className="md:row-span-2">
        <TakeoffBentoGridItem
            icon={<Bell className="w-full h-full" />}
            href={`#`}
            title="실시간 알림"
            description="Discord Webhook으로 새로운 글 업로드마다 실시간 알림을 받을 수 있습니다."
            className="w-full h-full [&_h3]:text-sm [&_h3]:m-0 [&>div>h3]:text-lg
             [&_p]:m-0 [&_p]:text-xs [&_p]:text-zinc-400"
            background={<NotificationBentoBackground />}
          />
        </div>

        <div className="md:col-span-2">
        <TakeoffBentoGridItem
            icon={<Calendar className="w-full h-full" />}
            href={`#`}
            title="AI 주간 뉴스"
            description="AI가 일주일에 한 번 주간 뉴스를 정리하여 게시합니다."
            className="w-full h-full"
            background={<WeeklyNewsBentoBackground />}
          />
        </div>
      </div>
    </div>
  );
}
