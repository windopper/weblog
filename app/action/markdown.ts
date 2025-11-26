"use server";

import { MarkdownFile } from "../types/weblog";
import { prefixUrl } from "../libs/constants";
import fs from "fs";
import path from "path";

export const getMarkdownFiles = async (): Promise<MarkdownFile[]> => {
  "use cache";

  try {
    const jsonFile = fs.readFileSync(
      path.join(process.cwd(), "public", "markdown-lists.json"),
      "utf8"
    );
    const markdownLists = JSON.parse(jsonFile);
    // convert createdAt to Date
    const sortedMarkdownLists = markdownLists.map((file: MarkdownFile) => ({
      ...file,
      createdAt: new Date(file.createdAt),
    }));
    return sortedMarkdownLists.sort(
      (a: MarkdownFile, b: MarkdownFile) =>
        b.createdAt.getTime() - a.createdAt.getTime()
    );
  } catch (error) {
    console.error("마크다운 파일 읽기 오류:", error);
    return [];
  }
};

export const getMarkdownFile = async (file: string) => {
  const fileName = file.replace(/\.(mdx|md)$/, "");

  try {
    const markdownLists = await getMarkdownFiles();
    const file = markdownLists.find(
      (file: MarkdownFile) => file.name === fileName
    );
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
    const markdownMetadata = fileContent.find(
      (markdownFile: MarkdownFile) => markdownFile.name === file
    );
    if (markdownMetadata) {
      return {
        ...markdownMetadata,
        createdAt: new Date(markdownMetadata.createdAt),
      };
    }
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};
