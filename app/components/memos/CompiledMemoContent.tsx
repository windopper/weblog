import { compileMDX } from "next-mdx-remote/rsc";
import { getMdxOptions, getMdxComponents } from "../../libs/mdx";
import fs from "fs";
import path from "path";
import { Memo } from "@/app/types/memo";
import { extractTOC } from "@/app/libs/toc";

interface FrontMatter {
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
  thumbnail?: string;
}

export default async function CompiledMemoContent({ slug }: { slug: string }) {
  try {
    // slug 디코딩 (URL 인코딩된 경우 처리)
    const decodedSlug = decodeURIComponent(slug);

    // MDX 파일 읽기 (posts 폴더 우선, 없으면 legacy 폴더 확인)
    // .mdx와 .md 확장자 모두 확인
    const extensions = [".mdx", ".md"];
    const folders = ["posts", "legacy"];

    let source: string | null = null;

    for (const folder of folders) {
      for (const ext of extensions) {
        const filePath = path.join(
          process.cwd(),
          "public",
          "markdown-memo",
          folder,
          `${decodedSlug}${ext}`
        );
        if (fs.existsSync(filePath)) {
          source = fs.readFileSync(filePath, "utf8");
          break;
        }
      }
      if (source) break;
    }

    if (!source) {
      throw new Error(
        `MDX 파일을 찾을 수 없습니다: ${slug} (디코딩: ${decodedSlug})`
      );
    }

    // HTML 주석을 MDX 주석으로 변환 (MDX는 HTML 주석을 지원하지 않음)
    source = source.replace(/<!--([\s\S]*?)-->/g, (match, content) => {
      return `{/*${content}*/}`;
    });

    // 수식 블록($$...$$) 내의 중괄호를 이스케이프 (MDX가 JavaScript 표현식으로 해석하지 않도록)
    source = source.replace(/\$\$([\s\S]*?)\$\$/g, (match, content) => {
      const escaped = content.replace(/\{/g, "\\{").replace(/\}/g, "\\}");
      return `$$${escaped}$$`;
    });

    // 인라인 수식($...$) 내의 중괄호도 이스케이프
    source = source.replace(/\$([^$\n]+?)\$/g, (match, content) => {
      // 이미 이스케이프된 중괄호는 제외
      if (content.includes("\\{") || content.includes("\\}")) {
        return match;
      }
      const escaped = content.replace(/\{/g, "\\{").replace(/\}/g, "\\}");
      return `$${escaped}$`;
    });

    // MDX 컴파일
    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source,
      options: getMdxOptions() as any,
      components: getMdxComponents(slug),
    });

    // Memo 객체 생성
    const memo: Memo = {
      title: frontmatter.title,
      description: frontmatter.description,
      tags: frontmatter.tags,
      createdAt: frontmatter.date ? new Date(frontmatter.date) : undefined,
      updatedAt: frontmatter.date ? new Date(frontmatter.date) : undefined,
      name: slug,
      path: `/memos/${slug}`,
      thumbnail: frontmatter.thumbnail || "/image/weblog.png",
    };

    const toc = extractTOC(source);

    return {
      memo,
      content,
      toc,
    };
  } catch (error) {
    console.error(`Memo MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
}
