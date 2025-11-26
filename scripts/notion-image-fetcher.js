import fs from "fs";
import path from "path";

/**
 * URL에서 파일 확장자를 추출합니다.
 */
function getFileExtension(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    if (match) {
      return match[1].toLowerCase();
    }
    // Content-Type 헤더를 확인할 수 없으므로 기본값으로 png 사용
    return "png";
  } catch {
    return "png";
  }
}

/**
 * 이미지를 다운로드합니다.
 */
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (error) {
    console.error(
      `[Image Fetcher] 이미지 다운로드 실패 (${url}):`,
      error.message
    );
    return false;
  }
}

/**
 * Notion 데이터에서 expiry_time이 있는 이미지를 찾아 다운로드합니다.
 */
async function fetchNotionImages() {
  const notionDataPath = path.join(process.cwd(), "public", "notion-data.json");
  const imagesDir = path.join(
    process.cwd(),
    "public",
    "markdown-memo",
    "legacy",
    "images"
  );

  // 이미지 디렉토리 생성
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Notion 데이터 읽기
  console.log(`[Image Fetcher] ${notionDataPath} 읽는 중...`);
  const notionData = JSON.parse(fs.readFileSync(notionDataPath, "utf8"));

  if (!Array.isArray(notionData)) {
    console.error(
      "[Image Fetcher] 오류: notion-data.json이 배열 형식이 아닙니다."
    );
    process.exit(1);
  }

  // 이미지 매핑: block.id -> 로컬 파일 경로
  const imageMap = new Map();
  const imagesToDownload = [];

  // 모든 페이지의 콘텐츠를 순회하며 이미지 블록 찾기
  for (const page of notionData) {
    const content = page.content || [];
    for (const block of content) {
      if (block.type === "image") {
        const imageData = block.image;
        const fileData = imageData?.file;
        const expiryTime = fileData?.expiry_time;

        // expiry_time이 있는 이미지만 다운로드 대상으로 추가
        if (expiryTime && fileData?.url) {
          const blockId = block.id;
          const extension = getFileExtension(fileData.url);
          const filename = `${blockId}.${extension}`;
          const localPath = path.join(imagesDir, filename);
          const relativePath = `/markdown-memo/legacy/images/${filename}`;

          imagesToDownload.push({
            blockId,
            url: fileData.url,
            localPath,
            relativePath,
          });

          imageMap.set(blockId, relativePath);
        }
      }
    }
  }

  console.log(`[Image Fetcher] ${imagesToDownload.length}개 이미지 발견`);

  if (imagesToDownload.length === 0) {
    console.log("[Image Fetcher] 다운로드할 이미지가 없습니다.");
    return imageMap;
  }

  // 이미지 다운로드
  let successCount = 0;
  let errorCount = 0;

  for (const image of imagesToDownload) {
    // 이미 존재하는 파일은 스킵
    if (fs.existsSync(image.localPath)) {
      console.log(
        `[Image Fetcher] ⏭ ${path.basename(image.localPath)} (이미 존재)`
      );
      successCount++;
      continue;
    }

    console.log(
      `[Image Fetcher] 다운로드 중: ${path.basename(image.localPath)}...`
    );
    const success = await downloadImage(image.url, image.localPath);
    if (success) {
      successCount++;
      console.log(
        `[Image Fetcher] ✓ ${path.basename(image.localPath)} 다운로드 완료`
      );
    } else {
      errorCount++;
    }
  }

  console.log(`\n[Image Fetcher] 완료!`);
  console.log(`  성공: ${successCount}개`);
  console.log(`  실패: ${errorCount}개`);

  // 이미지 매핑을 JSON 파일로 저장 (변환기에서 사용)
  const imageMapPath = path.join(
    process.cwd(),
    "public",
    "markdown-memo",
    "legacy",
    "image-map.json"
  );
  const imageMapObj = Object.fromEntries(imageMap);
  fs.writeFileSync(imageMapPath, JSON.stringify(imageMapObj, null, 2), "utf8");
  console.log(`[Image Fetcher] 이미지 매핑 저장: ${imageMapPath}`);

  return imageMap;
}

// 스크립트 실행
fetchNotionImages()
  .then(() => {
    console.log("[Image Fetcher] 모든 작업 완료");
    process.exit(0);
  })
  .catch((error) => {
    console.error("[Image Fetcher] 오류 발생:", error);
    process.exit(1);
  });
