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
    // MDX 파일 읽기
    const source = fs.readFileSync(
      path.join(process.cwd(), "public", "markdown-memo", "posts", `${slug}.mdx`),
      "utf8"
    );

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

