import { cn } from "@/app/libs/utils";

type YouTubeProps = {
  url: string;
  title?: string;
  caption?: string;
  start?: number;
  className?: string;
};

const YOUTUBE_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function getVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");
    const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);

    if (hostname === "youtu.be") {
      return pathSegments[0];
    }

    if (hostname === "youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      if (pathSegments[0] === "embed" || pathSegments[0] === "shorts") {
        return pathSegments[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getSafeHttpUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.toString();
    }
  } catch {
    return null;
  }

  return null;
}

function getStartParam(start?: number) {
  if (typeof start !== "number" || !Number.isFinite(start) || start <= 0) {
    return "";
  }

  return `?start=${Math.floor(start)}`;
}

export default function YouTube({
  url,
  title = "YouTube video",
  caption,
  start,
  className,
}: YouTubeProps) {
  const videoId = getVideoId(url);

  if (!videoId || !VIDEO_ID_PATTERN.test(videoId)) {
    const safeUrl = getSafeHttpUrl(url);

    return (
      <figure className={cn("my-6 w-full", className)}>
        <div className="rounded-lg border border-zinc-200/20 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-300">
          {safeUrl ? (
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-100 underline decoration-zinc-500 underline-offset-4 hover:text-white"
            >
              YouTube 영상 열기
            </a>
          ) : (
            <span>유효하지 않은 YouTube URL입니다.</span>
          )}
        </div>
        {caption && (
          <figcaption className="mt-2 text-sm text-zinc-400">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}${getStartParam(
    start
  )}`;

  return (
    <figure className={cn("my-6 w-full", className)}>
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-zinc-200/20 bg-zinc-900">
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow={YOUTUBE_ALLOW}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
