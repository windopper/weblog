import { prefixUrl } from "../libs/constants";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { extractTOC } from "../libs/toc";
import TableOfContents from "./posts/TableOfContents";
import CompiledMDXImage from "./mdx/CompiledMDXImage";
import CompiledMDXPre from "./mdx/CompiledMDXPre";
import fs from "fs";
import path from "path";

interface FrontMatter {
  title: string;
  tags: string[];
  date: string;
}

export default async function CompiledMDXContent({ slug }: { slug: string }) {
  /** @type {import('rehype-pretty-code').Options} */
  const prettyCodeOptions = {
    keepBackground: false,
    theme: "github-dark",
    defaultLang: "text",
  };

  /** @type {import('rehype-autolink-headings').Options} */
  const autolinkHeadingsOptions = {
    behavior: "append",
    properties: {
      className: ["anchor"],
      ariaLabel: "Link to section",
    },
  };

  try {
    // MDX 파일 읽기
    const source = fs.readFileSync(path.join(process.cwd(), "public", "markdown-posts", `${slug}.mdx`), "utf8");
    // const source = await fetch(`${prefixUrl}/markdown-posts/${slug}.mdx`).then(
    //   (res) => res.text()
    // );

    // MDX 컴파일
    const { content, frontmatter } = await compileMDX<FrontMatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, autolinkHeadingsOptions],
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      },
      components: {
        img: CompiledMDXImage,
        pre: CompiledMDXPre,
      },
    });

    // table of contents 추출
    const toc = extractTOC(source);

    return (
      <div className="relative">
        <TableOfContents toc={toc} />
        <article
          className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert 
    max-w-none w-full px-4 lg:px-0"
        >
          {content}
        </article>
      </div>
    );
  } catch (error) {
    console.error(`MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
}
