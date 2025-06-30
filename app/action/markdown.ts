"use server";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { extractTOC, TOCItem } from "../libs/toc";
import { MarkdownFile } from "../types/weblog";
import matter from "gray-matter";
import { ReactNode } from "react";
import { prefixUrl } from "../libs/constants";
import fs from "fs";
import path from "path";

export const getMarkdownFiles = async (): Promise<MarkdownFile[]> => {
  "use cache";

  try {
    const jsonFile = fs.readFileSync(path.join(process.cwd(), "public", "markdown-lists.json"), "utf8");
    const markdownLists = JSON.parse(jsonFile);
    // convert createdAt to Date
    return markdownLists.map((file: MarkdownFile) => ({
      ...file,
      createdAt: new Date(file.createdAt),
    }));
  } catch (error) {
    console.error("마크다운 파일 읽기 오류:", error);
    return [];
  }
};

const extractMetadataFromMarkdown = (
  fileName: string,
  fileContent: string
): MarkdownFile | null => {
  let title = "";
  let createdAt: Date = new Date();
  let tags: string[] = [];
  let description: string | undefined;
  let isPrivate: boolean = false;

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

  return {
    name: fileName,
    title,
    path: `/posts/${fileName}`,
    createdAt,
    tags,
    description,
    isPrivate,
  };
};

export const getMarkdownFile = async (file: string) => {
  const fileName = file.replace(/\.(mdx|md)$/, "");

  try {
    const markdownLists = await getMarkdownFiles();
    const file = markdownLists.find((file: MarkdownFile) => file.name === fileName);
    if (file) {
      return file;
    }
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};

export const getMarkdownFileWithFetch = async (file: string) => {
  try {
    const fileContent = await fetch(`${prefixUrl}/markdown-lists.json`).then(
      (res) => res.json()
    );
    const markdownMetadata = fileContent.find((markdownFile: MarkdownFile) => markdownFile.name === file);
    if (markdownMetadata) {
      return {
        ...markdownMetadata,
        createdAt: new Date(markdownMetadata.createdAt),
      }
    }
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};

interface FrontMatter {
  title: string;
  tags: string[];
  date: string;
}

// 개별 마크다운 파일 내용을 읽는 캐시된 함수
export const getMDXContent = async (
  slug: string
): Promise<{
  content: ReactNode;
  frontmatter: FrontMatter;
  toc: TOCItem[];
} | null> => {
  /** @type {import('rehype-pretty-code').Options} */
  const prettyCodeOptions = {
    keepBackground: false,
    theme: "github-dark",
    defaultLang: "text",
  };

  /** @type {import('rehype-autolink-headings').Options} */
  const autolinkHeadingsOptions = {
    behavior: "append",
    properties: {
      className: ["anchor"],
      ariaLabel: "Link to section",
    },
  };

  try {
    // MDX 파일 읽기
    const source = fs.readFileSync(path.join(process.cwd(), "public", "markdown-posts", `${slug}.mdx`), "utf8");

    // MDX 컴파일
    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, autolinkHeadingsOptions],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      },
    });

    // table of contents 추출
    const toc = extractTOC(source);

    return { content, frontmatter, toc };
  } catch (error) {
    console.error(`MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
};
