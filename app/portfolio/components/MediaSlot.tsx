import Image from "next/image";
import YouTube from "../../components/mdx/YouTube";
import type { MediaItem } from "../data";

// 영상·스크린샷 자리입니다. src가 비어 있으면 점선 자리표시를 보여 주므로,
// 자료가 준비되기 전에도 레이아웃을 확인할 수 있습니다.
export default function MediaSlot({ media }: { media: MediaItem }) {
  // 영상은 PDF(인쇄)에서 의미가 없으므로 인쇄 시 숨깁니다. 이미지만 PDF에 남습니다.
  if (!media.src) {
    return (
      <figure className="w-full print:hidden">
        <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-zinc-600 bg-zinc-900/40 px-6 text-center text-sm text-zinc-400">
          {media.caption}
        </div>
      </figure>
    );
  }

  if (media.kind === "youtube") {
    return (
      <div className="print:hidden">
        <YouTube
          url={media.src}
          title={media.alt}
          caption={media.caption}
          className="my-0"
        />
      </div>
    );
  }

  return (
    <figure className="w-full print:break-inside-avoid">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200/20 bg-zinc-900">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-sm text-zinc-400">
        {media.caption}
      </figcaption>
    </figure>
  );
}
