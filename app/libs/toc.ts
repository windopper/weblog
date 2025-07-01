export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(mdxSource: string): TOCItem[] {
  // 코드 블럭과 인라인 코드를 임시로 제거한 텍스트 생성
  const removeCodeBlocks = (text: string): string => {
    // 1. 코드 블럭 (```...```) 제거
    let result = text.replace(/```[\s\S]*?```/g, '');
    
    // 2. 인라인 코드 (`...`) 제거
    result = result.replace(/`[^`\n]*`/g, '');
    
    return result;
  };

  const cleanedSource = removeCodeBlocks(mdxSource);
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(cleanedSource)) !== null) {
    const level = match[1].length; // #의 개수 (1, 2, 3)
    const text = match[2].trim();
    
    // rehype-slug와 동일한 방식으로 ID 생성
    const id = text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u00C0-\u024F\u1E00-\u1EFF가-힣]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
} 