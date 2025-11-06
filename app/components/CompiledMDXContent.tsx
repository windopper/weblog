import { compileMDX } from "next-mdx-remote/rsc";
import { extractTOC } from "../libs/toc";
import { getMdxOptions, getMdxComponents } from "../libs/mdx";
import TableOfContents from "./posts/TableOfContents";
import fs from "fs";
import path from "path";
import PostTags from "./posts/PostTags";
import NextPrevPostButton from "./posts/NextPrevPostButton";
import { getMarkdownFiles } from "../action/markdown";
import ConditionalPostHeader from "./posts/ConditionalPostHeader";
import TakeoffPostFlag from "./takeoff/TakeoffPostFlag";
import MoveToTopButton from "./common/MoveToTopButton";

interface FrontMatter {
  title: string;
  tags: string[];
  date: string;
}

export default async function CompiledMDXContent({ slug }: { slug: string }) {
  try {
    // MDX 파일 읽기
    const source = fs.readFileSync(
      path.join(process.cwd(), "public", "markdown-posts", `${slug}.mdx`),
      "utf8"
    );
    const markdownLists = await getMarkdownFiles();
    
    const currentIndex = markdownLists.findIndex((file) => file.name === slug);
    const nextPost = markdownLists[currentIndex - 1];
    const prevPost = markdownLists[currentIndex + 1];

    // MDX 컴파일
    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source,
      options: getMdxOptions() as any,
      components: getMdxComponents(slug),
    });

    // table of contents 추출
    const toc = extractTOC(source);

    // check has takeoff tag
    const hasTakeoffTag = frontmatter.tags.includes("takeoff");

    return (
      <div className="relative">
        <ConditionalPostHeader title={frontmatter.title} />
        <TableOfContents toc={toc} />
        <PostTags tags={frontmatter.tags} />
        <div
          className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert 
    max-w-none w-full px-4 lg:px-0 [&_figure]:m-0 [&_img]:m-0"
        >
          {content}
        </div>
        {hasTakeoffTag && <TakeoffPostFlag />}
        <NextPrevPostButton nextPost={nextPost} prevPost={prevPost} />
        <MoveToTopButton />
      </div>
    );
  } catch (error) {
    console.error(`MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
}
