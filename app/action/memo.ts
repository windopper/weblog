"use server";

import { Memo } from "../types/memo";
import { prefixUrl } from "../libs/constants";
import fs from "fs";
import path from "path";

interface MemoFile extends Memo {
  name: string;
  path: string;
}

export const getMemoFiles = async (): Promise<MemoFile[]> => {
  "use cache";

  try {
    const jsonFile = fs.readFileSync(path.join(process.cwd(), "public", "memo-lists.json"), "utf8");
    const memoLists = JSON.parse(jsonFile);
    // convert createdAt and updatedAt to Date
    const sortedMemoLists = memoLists.map((file: MemoFile) => ({
      ...file,
      createdAt: file.createdAt ? new Date(file.createdAt) : undefined,
      updatedAt: file.updatedAt ? new Date(file.updatedAt) : undefined,
    }));
    return sortedMemoLists.sort((a: MemoFile, b: MemoFile) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error("메모 파일 읽기 오류:", error);
    return [];
  }
};

export const getMemoFile = async (file: string) => {
  const fileName = file.replace(/\.(mdx|md)$/, "");

  try {
    const memoLists = await getMemoFiles();
    const file = memoLists.find((file: MemoFile) => file.name === fileName);
    if (file) {
      return file;
    }
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};

export const getMemoFileWithFetch = async (file: string) => {
  try {
    const fileContent = await fetch(`${prefixUrl}/memo-lists.json`).then(
      (res) => res.json()
    );
    const memoMetadata = fileContent.find((memoFile: MemoFile) => memoFile.name === file);
    if (memoMetadata) {
      return {
        ...memoMetadata,
        createdAt: memoMetadata.createdAt ? new Date(memoMetadata.createdAt) : undefined,
        updatedAt: memoMetadata.updatedAt ? new Date(memoMetadata.updatedAt) : undefined,
      }
    }
  } catch (error) {
    console.error(`메타데이터 추출 오류 - ${file}:`, error);
    return null;
  }
};

