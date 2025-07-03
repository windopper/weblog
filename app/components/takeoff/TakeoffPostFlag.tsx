import Image from "next/image";

export default function TakeoffPostFlag() {
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-100 my-4
         dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 shadow-sm">
            <div className="relative w-5 h-5">
                <Image 
                    src="/image/takeoff.png" 
                    alt="Takeoff" 
                    fill
                    className="object-contain"
                />
            </div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                이 게시글은 Takeoff 프로젝트의 포스트입니다.
            </span>
        </div>
    )
}