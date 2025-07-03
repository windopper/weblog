import { PackageSearch, Table, Bell, Calendar, Globe } from "lucide-react";
import TakeoffBentoGridItem from "./TakeoffBentoGridItem";
import { TbTimeline } from "react-icons/tb";
import Image from "next/image";
import AutoOrganizeBentoBackground from "./components/bento/AutoOrganizeBentoBackground";
import NotificationBentoBackground from "./components/bento/NotificationBentoBackground";
import TimelineBentoBackground from "./components/bento/TimelineBentoBackground";
import BenchmarkBackground from "./components/bento/BenchmarkBackground";
import WeeklyNewsBentoBackground from "./components/bento/WeeklyNewsBentoBackground";

const prefix = "https://ai-takeoff.dev"

export default function TakeoffBentoGrid() {
  return (
    <div className="flex flex-col gap-12 mb-16 p-8">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
        {/* 메인 기능 - 콘텐츠 정리 (큰 카드) */}
        <TakeoffBentoGridItem
          icon={<PackageSearch className="w-full h-full" />}
          href={`${prefix}/`}
          title="콘텐츠 자동 정리"
          description="Hackernews/Reddit에서 인기있는 AI 관련 글들을 자동으로 수집하고 정리하여 게시합니다."
          className="md:col-span-2 lg:col-span-2"
          background={<AutoOrganizeBentoBackground />}
        />

        {/* AI 타임라인 */}
        <TakeoffBentoGridItem
          icon={<TbTimeline className="w-full h-full" />}
          href={`${prefix}/timeline`}
          title="AI 타임라인"
          description="2015-2025년 AI 발전사"
          className="md:col-span-1 lg:col-span-1 row-span-2"
          background={<TimelineBentoBackground />}
        />

        <TakeoffBentoGridItem
          icon={<Table className="w-full h-full" />}
          href={`${prefix}/benchmarking`}
          title="LLM 벤치마크"
          description="13종의 벤치마크 결과 정리"
          className="md:col-span-2 lg:col-span-2 row-span-2"
          background={<BenchmarkBackground />}
        />

        {/* Discord Webhook */}
        <TakeoffBentoGridItem
          icon={<Bell className="w-full h-full" />}
          href={`${prefix}/webhook`}
          title="실시간 알림"
          description="Discord Webhook으로 새로운 글 업로드마다 실시간 알림을 받을 수 있습니다."
          className="md:row-span-2"
          background={<NotificationBentoBackground />}
        />

        {/* 주간 뉴스 */}
        <TakeoffBentoGridItem
          icon={<Calendar className="w-full h-full" />}
          href={`${prefix}/weeklynews`}
          title="AI 주간 뉴스"
          description="AI가 일주일에 한 번 주간 뉴스를 정리하여 게시합니다."
          className="md:col-span-2"
          background={<WeeklyNewsBentoBackground />}
        />

        {/* 다국어 지원 */}
        {/* <TakeoffBentoGridItem
          icon={<Globe size={36} className="text-zinc-700" />}
          title="다국어 지원"
          description="한국어, 영어 지원"
          background={
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-2 py-1 bg-teal-500/20 text-teal-300 rounded">
                🇰🇷 KR
              </span>
              <span className="text-xs px-2 py-1 bg-teal-500/20 text-teal-300 rounded">
                🇺🇸 EN
              </span>
            </div>
          }
        /> */}
      </div>
    </div>
  );
}
