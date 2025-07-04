import getPostThumbnailImage from "@/app/action/image";
import { prefixUrl } from "@/app/libs/constants";
import { NextRequest } from "next/server";

async function loadSeouAlrimFont(font: string) {
    const data = await fetch(`${prefixUrl}/fonts/${font}.ttf`).then(
      (res) => res.arrayBuffer()
    );
  
    if (!data) {
      throw new Error(`Font file not found: ${font}.ttf`);
    }
  
    return data;
  }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const tags = searchParams.get("tags")?.split(",");

  if (!title || !tags) {
    return new Response("Title and tags are required", { status: 400 });
  }

  const size = {
    width: 1200,
    height: 630,
  };

  const imageOptions: any = {
    ...size,
    fonts: [
        {
            name: "SeoulAlrimTTF-Medium",
            data: await loadSeouAlrimFont("SeoulAlrimTTF-Medium"),
            style: "normal",
            weight: 400,
        },
        {
            name: "SeoulAlrimTTF-Heavy",
            data: await loadSeouAlrimFont("SeoulAlrimTTF-Heavy"),
            style: "normal",
            weight: 700,
        },
    ]
}

  const image = await getPostThumbnailImage({ title, tags, imageOptions });
  return image;
}