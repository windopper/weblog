import getPostThumbnailImage from "@/app/action/image";
import {
  getMarkdownFile,
  getMarkdownFileWithFetch,
} from "@/app/action/markdown";
import { prefixUrl } from "@/app/libs/constants";
import { readFileSync } from "fs";
import { ImageResponse } from "next/og";
import { join } from "path";

const size = {
  width: 1200,
  height: 630,
};

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = await getMarkdownFile(slug);

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = await getMarkdownFileWithFetch(slug);
  const { title, tags } = file || { title: "", tags: [] };
  const image = await fetch(
    `${prefixUrl}/api/post/thumbnail?title=${encodeURIComponent(
      title
    )}&tags=${tags.map(encodeURIComponent).join(",")}`
  );

  return image;
}
