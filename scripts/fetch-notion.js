import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

// 환경 변수 로드
dotenv.config({ path: path.join(process.cwd(), ".env") });

/**
 * Notion 데이터베이스에서 데이터를 가져옵니다.
 * @param {string} databaseId - Notion 데이터베이스 ID
 * @param {object} options - 추가 옵션 (필터, 정렬 등)
 * @returns {Promise<Array>} 데이터베이스 항목 배열
 */
export const fetchNotionDatabase = async (databaseId, options = {}) => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다.");
  }

  if (!databaseId) {
    throw new Error("데이터베이스 ID가 제공되지 않았습니다.");
  }

  try {
    const results = [];
    let hasMore = true;
    let startCursor = undefined;

    console.log(`[Fetch Notion] 데이터베이스 ID: ${databaseId}`);
    console.log(`[Fetch Notion] 데이터 가져오는 중...`);

    // 페이지네이션을 통해 모든 결과 가져오기
    while (hasMore) {
      const requestBody = {
        ...options,
      };

      if (startCursor) {
        requestBody.start_cursor = startCursor;
      }

      const response = await fetch(
        `https://api.notion.com/v1/databases/${databaseId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Notion API 오류: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      results.push(...data.results);
      hasMore = data.has_more;
      startCursor = data.next_cursor;

      console.log(`[Fetch Notion] ${results.length}개 항목 가져옴...`);
    }

    console.log(`[Fetch Notion] 총 ${results.length}개 항목을 가져왔습니다.`);
    return results;
  } catch (error) {
    console.error("[Fetch Notion] 오류 발생:", error);
    throw error;
  }
};

/**
 * Notion 페이지의 내용을 가져옵니다.
 * @param {string} pageId - Notion 페이지 ID
 * @returns {Promise<Array>} 페이지 블록 배열
 */
export const fetchNotionPageContent = async (pageId) => {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY 환경 변수가 설정되지 않았습니다.");
  }

  try {
    const blocks = [];
    let hasMore = true;
    let startCursor = undefined;

    console.log(`[Fetch Notion] 페이지 ID: ${pageId}`);
    console.log(`[Fetch Notion] 페이지 내용 가져오는 중...`);

    while (hasMore) {
      const url = new URL(
        `https://api.notion.com/v1/blocks/${pageId}/children`
      );
      if (startCursor) {
        url.searchParams.set("start_cursor", startCursor);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Notion API 오류: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      blocks.push(...data.results);
      hasMore = data.has_more;
      startCursor = data.next_cursor;
    }

    console.log(`[Fetch Notion] 총 ${blocks.length}개 블록을 가져왔습니다.`);
    return blocks;
  } catch (error) {
    console.error("[Fetch Notion] 오류 발생:", error);
    throw error;
  }
};

/**
 * Notion 데이터베이스의 모든 페이지와 내용을 가져와서 JSON 파일로 저장합니다.
 * @param {string} databaseId - Notion 데이터베이스 ID
 * @param {string} outputPath - 출력 파일 경로 (기본값: public/notion-data.json)
 * @param {object} options - 쿼리 옵션
 */
export const fetchAndSaveNotionDatabase = async (
  databaseId,
  outputPath = "public/notion-data.json",
  options = {}
) => {
  try {
    const pages = await fetchNotionDatabase(databaseId, options);

    // 각 페이지의 내용도 가져오기 (선택사항)
    const pagesWithContent = await Promise.all(
      pages.map(async (page) => {
        try {
          const content = await fetchNotionPageContent(page.id);
          return {
            ...page,
            content,
          };
        } catch (error) {
          console.warn(
            `[Fetch Notion] 페이지 ${page.id}의 내용을 가져오는 중 오류 발생:`,
            error.message
          );
          return page;
        }
      })
    );

    const outputFilePath = path.join(process.cwd(), outputPath);
    const outputDir = path.dirname(outputFilePath);

    // 출력 디렉토리가 없으면 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`[Fetch Notion] 데이터를 ${outputPath}에 저장하는 중...`);
    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(pagesWithContent, null, 2),
      "utf8"
    );
    console.log(`[Fetch Notion] 저장 완료!`);
  } catch (error) {
    console.error("[Fetch Notion] 실행 중 오류 발생:", error);
    process.exit(1);
  }
};

// 스크립트가 직접 실행될 때
const databaseId = process.env.NOTION_DATABASE_ID || process.argv[2];

if (!databaseId) {
  console.error(
    "사용법: node scripts/fetch-notion.js [DATABASE_ID]\n또는 .env.local 파일에 NOTION_DATABASE_ID를 설정하세요."
  );
  process.exit(1);
}

const outputPath = process.env.NOTION_OUTPUT_PATH || "public/notion-data.json";
const filter = process.env.NOTION_FILTER
  ? JSON.parse(process.env.NOTION_FILTER)
  : undefined;
const sorts = process.env.NOTION_SORTS
  ? JSON.parse(process.env.NOTION_SORTS)
  : undefined;

fetchAndSaveNotionDatabase(databaseId, outputPath, {
  filter,
  sorts,
});
