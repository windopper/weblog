"use client";

import BenchmarkBackground from "@/app/takeoff/components/bento/BenchmarkBackground";
import AutoOrganizeBentoBackground from "@/app/takeoff/components/bento/AutoOrganizeBentoBackground";
import TimelineBentoBackground from "@/app/takeoff/components/bento/TimelineBentoBackground";
import NotificationBentoBackground from "@/app/takeoff/components/bento/NotificationBentoBackground";
import WeeklyNewsBentoBackground from "@/app/takeoff/components/bento/WeeklyNewsBentoBackground";

export default function BentoBackgrounds({
  type,
}: {
  type:
    | "weekly-news"
    | "benchmark"
    | "auto-organize"
    | "timeline"
    | "notification";
}) {
  if (type === "weekly-news") {
    return (
      <div className="w-[526px] h-[198px] relative mx-auto">
        <WeeklyNewsBentoBackground />
      </div>
    );
  }

  if (type === "benchmark") {
    return (
      <div className="w-[526px] h-[414px] relative overflow-hidden mx-auto">
        <BenchmarkBackground />
      </div>
    );
  }

  if (type === "auto-organize") {
    return (
      <div className="w-[417px] h-[254px] relative overflow-hidden mx-auto">
        <AutoOrganizeBentoBackground />
      </div>
    );
  }

  if (type === "timeline") {
    return (
      <div className="w-[254px] h-[417px] relative overflow-hidden mx-auto">
        <TimelineBentoBackground />
      </div>
    );
  }

  if (type === "notification") {
    return (
      <div className="w-[254px] h-[417px] relative overflow-hidden mx-auto
       [&_h1]:text-sm [&_h3]:text-sm [&_h1]:m-0 [&_h3]:m-0 [&_p]:m-0 [&_p]:text-xs [&_p]:text-zinc-400">
        <NotificationBentoBackground />
      </div>
    );
  }

  return null;
}