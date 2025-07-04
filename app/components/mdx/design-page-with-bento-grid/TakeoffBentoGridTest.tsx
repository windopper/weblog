"use client";

import TakeoffBentoGridItem from "@/app/takeoff/TakeoffBentoGridItem";
import { Home } from "lucide-react";

export default function TakeoffBentoGridTest() {
  return (
    <div className="flex flex-col gap-12 p-4 [&_h3]:m-0 [&_p]:m-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,200px)]">
        <div className="md:col-span-2 lg:col-span-2">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full"
            background={<div />}
          />
        </div>

        <div className="md:col-span-1 lg:col-span-1 row-span-2">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full"
            background={<div />}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2 row-span-2">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full"
            background={<div />}
          />
        </div>

        <div className="md:row-span-2">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full"
            background={<div />}
          />
        </div>

        <div className="md:col-span-2">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full"
            background={<div />}
          />
        </div>
      </div>
    </div>
  );
}
