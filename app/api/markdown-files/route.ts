import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET() {
  try {
    const markdownDir = path.join(process.cwd(), "public", "markdown-posts");
    const fileNames = fs.readdirSync(markdownDir);
    const markdownFiles = fileNames.filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md")
    );

    return NextResponse.json({ files: markdownFiles });
  } catch (error) {
    console.error("파일 목록 조회 오류:", error);
    return NextResponse.json({ error: "파일 목록을 가져올 수 없습니다" }, { status: 500 });
  }
} 