"use server";

import { MarkdownFile } from "../types/weblog";
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
      tags: Array.isArray(file.tags) ? file.tags : [],
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
  if (!file) return null;
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
    return await getMarkdownFile(file);
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};
