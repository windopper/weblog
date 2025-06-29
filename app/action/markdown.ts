"use server";

import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { MarkdownFile } from "../types/weblog";

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  const markdownDir = path.join(process.cwd(), "app", "markdown");

  try {
    const files = fs.readdirSync(markdownDir);
    const markdownFiles = files.filter(
      (file) => file.endsWith(".mdx") || file.endsWith(".md")
    );

    return markdownFiles.map((file) => {
      const fileName = file.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(markdownDir, file);

      // 파일 내용 읽기 및 frontmatter 파싱
      let title = fileName;
      let createdAt: Date = new Date();
      let tags: string[] = [];
      let description: string | undefined;
      let isPrivate: boolean = false;

      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        // frontmatter에서 메타데이터 추출
        if (data.title) {
          title = data.title;
        } else {
          // frontmatter에 title이 없으면 첫 번째 줄에서 제목 추출 시도
          const firstLine = content.split("\n")[0];
          if (firstLine.startsWith("# ")) {
            title = firstLine.replace("# ", "");
          }
        }

        // 태그 추출
        if (data.tags && Array.isArray(data.tags)) {
          tags = data.tags;
        }

        if (data.date) {
          createdAt = new Date(data.date);
        }

        // 설명 추출 (선택사항)
        if (data.description) {
          description = data.description;
        }

        // 비공개 여부 추출
        if (data.isPrivate) {
          isPrivate = data.isPrivate;
        }
      } catch (error) {
        console.error(`메타데이터 추출 오류 - ${file}:`, error);
      }

      return {
        name: fileName,
        title,
        path: `/posts/${fileName}`,
        createdAt,
        tags,
        description,
        isPrivate,
      };
    });
  } catch (error) {
    console.error("마크다운 파일 읽기 오류:", error);
    return [];
  }
}
