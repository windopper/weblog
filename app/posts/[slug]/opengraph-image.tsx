import getPostThumbnailImage from "@/app/action/image";
import { getMarkdownFileWithFetch } from "@/app/action/markdown";

const size = {
  width: 1200,
  height: 630,
};

async function loadSeoulAlrimFont(font: string) {
  const res = await fetch(
    new URL(`../../../public/fonts/${font}.ttf`, import.meta.url)
  );

  if (!res.ok) {
    throw new Error(`Font file not found: ${font}.ttf`);
  }

  return res.arrayBuffer();
}

function resolveSlug(params: { slug?: string; __metadata_id__?: string }) {
  // In Next.js, opengraph image routes may be invoked with __metadata_id__.
  return params.slug ?? params.__metadata_id__ ?? "";
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug?: string; __metadata_id__?: string }>;
}) {
  const p = await params;
  const slug = resolveSlug(p);
  if (!slug) return [];

  const file = await getMarkdownFileWithFetch(slug);

  return [
    {
      id: slug,
      size,
      contentType: "image/png",
      alt: file?.title || "",
    },
  ];
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug?: string; __metadata_id__?: string }>;
}) {
  const p = await params;
  const slug = resolveSlug(p);
  const file = slug ? await getMarkdownFileWithFetch(slug) : null;

  const title = file?.title ?? "";
  const tags = (file?.tags ?? []).filter(Boolean);

  const imageOptions: any = {
    ...size,
    fonts: [
      {
        name: "SeoulAlrimTTF-Medium",
        data: await loadSeoulAlrimFont("SeoulAlrimTTF-Medium"),
        style: "normal",
        weight: 400,
      },
      {
        name: "SeoulAlrimTTF-Heavy",
        data: await loadSeoulAlrimFont("SeoulAlrimTTF-Heavy"),
        style: "normal",
        weight: 700,
      },
    ],
  };

  return getPostThumbnailImage({ title, tags, imageOptions });
}
