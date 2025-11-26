import fs from "fs";
import path from "path";

/**
 * 문자열을 파일명으로 사용할 수 있는 slug로 변환합니다.
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Rich text 배열을 마크다운 문자열로 변환합니다.
 */
function richTextToMarkdown(richText) {
  if (!richText || !Array.isArray(richText)) {
    return "";
  }

  return richText
    .map((item) => {
      let text = "";
      if (item.type === "text") {
        text = item.text?.content || item.plain_text || "";
      } else if (item.type === "equation") {
        text = `$${item.equation?.expression || ""}$`;
      } else {
        text = item.plain_text || "";
      }

      // 어노테이션 적용
      if (item.annotations) {
        const { bold, italic, strikethrough, code, underline } =
          item.annotations;
        if (code) {
          text = `\`${text}\``;
        }
        if (bold) {
          text = `**${text}**`;
        }
        if (italic) {
          text = `*${text}*`;
        }
        if (strikethrough) {
          text = `~~${text}~~`;
        }
        if (underline) {
          text = `<u>${text}</u>`;
        }
      }

      // 링크 처리
      if (item.text?.link?.url) {
        return `[${text}](${item.text.link.url})`;
      }
      if (item.href) {
        return `[${text}](${item.href})`;
      }

      return text;
    })
    .join("");
}

/**
 * Notion 블록을 마크다운으로 변환합니다.
 */
function blockToMarkdown(block, indent = 0, imageMap = null) {
  const indentStr = "  ".repeat(indent);
  const { type } = block;

  switch (type) {
    case "heading_1": {
      const text = richTextToMarkdown(block.heading_1?.rich_text);
      return `${indentStr}# ${text}\n\n`;
    }
    case "heading_2": {
      const text = richTextToMarkdown(block.heading_2?.rich_text);
      return `${indentStr}## ${text}\n\n`;
    }
    case "heading_3": {
      const text = richTextToMarkdown(block.heading_3?.rich_text);
      return `${indentStr}### ${text}\n\n`;
    }
    case "paragraph": {
      const text = richTextToMarkdown(block.paragraph?.rich_text);
      if (!text.trim()) {
        return "\n";
      }
      return `${indentStr}${text}\n\n`;
    }
    case "bulleted_list_item": {
      const text = richTextToMarkdown(block.bulleted_list_item?.rich_text);
      return `${indentStr}- ${text}\n`;
    }
    case "numbered_list_item": {
      const text = richTextToMarkdown(block.numbered_list_item?.rich_text);
      return `${indentStr}1. ${text}\n`;
    }
    case "to_do": {
      const text = richTextToMarkdown(block.to_do?.rich_text);
      const checked = block.to_do?.checked ? "x" : " ";
      return `${indentStr}- [${checked}] ${text}\n`;
    }
    case "toggle": {
      const text = richTextToMarkdown(block.toggle?.rich_text);
      return `${indentStr}<details>\n${indentStr}<summary>${text}</summary>\n\n`;
    }
    case "code": {
      const text = richTextToMarkdown(block.code?.rich_text);
      const language = block.code?.language || "";
      return `${indentStr}\`\`\`${language}\n${indentStr}${text}\n${indentStr}\`\`\`\n\n`;
    }
    case "quote": {
      const text = richTextToMarkdown(block.quote?.rich_text);
      return `${indentStr}> ${text}\n\n`;
    }
    case "callout": {
      const text = richTextToMarkdown(block.callout?.rich_text);
      const emoji = block.callout?.icon?.emoji || "💡";
      return `${indentStr}> ${emoji} ${text}\n\n`;
    }
    case "divider": {
      return `${indentStr}---\n\n`;
    }
    case "bookmark": {
      const url = block.bookmark?.url || "";
      const caption = richTextToMarkdown(block.bookmark?.caption);
      return `${indentStr}[${caption || url}](${url})\n\n`;
    }
    case "image": {
      const imageData = block.image;
      const fileData = imageData?.file;
      const expiryTime = fileData?.expiry_time;
      let url = "";

      // expiry_time이 있는 경우 이미지 매핑에서 로컬 경로 찾기
      if (expiryTime && imageMap && imageMap[block.id]) {
        url = imageMap[block.id];
      } else if (fileData?.url && !expiryTime) {
        // expiry_time이 없는 경우 원본 URL 사용
        url = fileData.url;
      } else if (imageData?.external?.url) {
        // 외부 URL 사용
        url = imageData.external.url;
      } else {
        // 이미지를 찾을 수 없는 경우
        url = "[이미지 없음]";
      }

      const caption = richTextToMarkdown(imageData?.caption);
      if (caption) {
        return `${indentStr}![${caption}](${url})\n\n`;
      }
      return `${indentStr}![](${url})\n\n`;
    }
    case "table_of_contents": {
      // 목차는 마크다운에서 자동 생성되므로 스킵하거나 주석으로 표시
      return `${indentStr}<!-- Table of Contents -->\n\n`;
    }
    case "equation": {
      const expression = block.equation?.expression || "";
      return `${indentStr}$$\n${indentStr}${expression}\n${indentStr}$$\n\n`;
    }
    default:
      // 알 수 없는 블록 타입은 주석으로 표시
      console.warn(`알 수 없는 블록 타입: ${type}`);
      return `${indentStr}<!-- Unknown block type: ${type} -->\n\n`;
  }
}

/**
 * Notion 페이지를 MDX 파일로 변환합니다.
 */
function convertPageToMDX(page, imageMap = null) {
  // Frontmatter 데이터 추출
  const properties = page.properties || {};
  const title =
    properties["이름"]?.title?.[0]?.plain_text ||
    properties["이름"]?.title?.[0]?.text?.content ||
    "Untitled";
  const dateProperty = properties["Date"]?.date;
  const date = dateProperty?.start
    ? new Date(dateProperty.start).toISOString().split("T")[0]
    : page.created_time
    ? new Date(page.created_time).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const tags = properties["Tags"]?.multi_select?.map((tag) => tag.name) || [];
  const description =
    properties["Description"]?.rich_text?.[0]?.plain_text || "";

  // 본문에서 첫 번째 이미지 찾기 (images 폴더에 있는 것만)
  const content = page.content || [];
  let thumbnail = "";
  for (const block of content) {
    if (block.type === "image") {
      const imageData = block.image;
      const fileData = imageData?.file;
      const expiryTime = fileData?.expiry_time;

      // expiry_time이 있고 imageMap에 있는 경우만 사용 (images 폴더에 있는 이미지)
      if (expiryTime && imageMap && imageMap[block.id]) {
        thumbnail = imageMap[block.id];
        break;
      }
    }
  }

  // 본문 변환
  let markdown = "";
  let toggleDepth = 0;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    const isToggle = block.type === "toggle";
    const nextBlock = content[i + 1];

    if (isToggle) {
      toggleDepth++;
    }

    markdown += blockToMarkdown(block, toggleDepth > 0 ? 1 : 0, imageMap);

    // Toggle 블록이 끝나는 경우 (다음 블록이 같은 레벨이거나 더 낮은 레벨)
    if (isToggle && (!nextBlock || nextBlock.type !== "toggle")) {
      markdown += "  ".repeat(Math.max(0, toggleDepth - 1)) + "</details>\n\n";
      toggleDepth = 0;
    }
  }

  // 남은 toggle 닫기
  while (toggleDepth > 0) {
    markdown += "  ".repeat(Math.max(0, toggleDepth - 1)) + "</details>\n\n";
    toggleDepth--;
  }

  // Frontmatter 생성
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
tags: ${JSON.stringify(tags)}
date: "${date}"
thumbnail: "${thumbnail}"
---

`;

  return frontmatter + markdown;
}

/**
 * 메인 변환 함수
 */
function convertNotionToMarkdown() {
  const notionDataPath = path.join(process.cwd(), "public", "notion-data.json");
  const outputDir = path.join(
    process.cwd(),
    "public",
    "markdown-memo",
    "legacy"
  );

  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 이미지 매핑 파일 읽기 (있는 경우)
  const imageMapPath = path.join(
    process.cwd(),
    "public",
    "markdown-memo",
    "legacy",
    "image-map.json"
  );
  let imageMap = null;
  if (fs.existsSync(imageMapPath)) {
    try {
      imageMap = JSON.parse(fs.readFileSync(imageMapPath, "utf8"));
      console.log(
        `[Notion Converter] 이미지 매핑 로드: ${
          Object.keys(imageMap).length
        }개 이미지`
      );
    } catch (error) {
      console.warn(
        `[Notion Converter] 이미지 매핑 파일 읽기 실패: ${error.message}`
      );
    }
  }

  // Notion 데이터 읽기
  console.log(`[Notion Converter] ${notionDataPath} 읽는 중...`);
  const notionData = JSON.parse(fs.readFileSync(notionDataPath, "utf8"));

  if (!Array.isArray(notionData)) {
    console.error(
      "[Notion Converter] 오류: notion-data.json이 배열 형식이 아닙니다."
    );
    process.exit(1);
  }

  console.log(`[Notion Converter] ${notionData.length}개 페이지 발견`);

  let successCount = 0;
  let errorCount = 0;

  // 각 페이지를 MDX로 변환
  for (const page of notionData) {
    try {
      const mdxContent = convertPageToMDX(page, imageMap);
      const properties = page.properties || {};
      const title =
        properties["이름"]?.title?.[0]?.plain_text ||
        properties["이름"]?.title?.[0]?.text?.content ||
        "Untitled";
      const slug = slugify(title);
      const filename = `${slug}.mdx`;
      const filepath = path.join(outputDir, filename);

      fs.writeFileSync(filepath, mdxContent, "utf8");
      console.log(`[Notion Converter] ✓ ${filename} 생성 완료`);
      successCount++;
    } catch (error) {
      console.error(`[Notion Converter] ✗ 페이지 변환 실패:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n[Notion Converter] 완료!`);
  console.log(`  성공: ${successCount}개`);
  console.log(`  실패: ${errorCount}개`);
}

// 스크립트 실행
convertNotionToMarkdown();
