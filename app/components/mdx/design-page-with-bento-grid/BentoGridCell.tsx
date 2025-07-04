'use client';

import TakeoffBentoGridItem from "@/app/takeoff/TakeoffBentoGridItem";
import { Home } from "lucide-react";

export default function BentoGridCell() {
    return (
      <div className="mx-auto w-fit">
        <div className="aspect-square w-64">
          <TakeoffBentoGridItem
            icon={<Home className="w-full h-full" />}
            href={`#`}
            title="테스트 입니다."
            description="테스트 입니다."
            className="w-full h-full [&_h3]:m-0 [&_p]:m-0"
            background={<div></div>}
          />
        </div>
      </div>
    );
}