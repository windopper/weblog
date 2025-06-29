export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(mdxSource: string): TOCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(mdxSource)) !== null) {
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