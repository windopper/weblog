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
import InteractiveButton from "./mdx/InteractiveButton";
import PostTags from "./posts/PostTags";
import NextPrevPostButton from "./posts/NextPrevPostButton";
import { getMarkdownFiles } from "../action/markdown";
import ConditionalPostHeader from "./posts/ConditionalPostHeader";
import PreviewWeb from "./mdx/PreviewWeb";
import TakeoffPostFlag from "./takeoff/TakeoffPostFlag";
import MDXComponentWrapper from "./mdx/MDXComponentWrapper";
import ConnectedComponent, { ConnectedComponentItem } from "./mdx/ConnectedComponent";
import MDXToComponent from "./mdx/MDXToComponent";

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
    const markdownLists = await getMarkdownFiles();
    const currentIndex = markdownLists.findIndex((file) => file.name === slug);
    const nextPost = markdownLists[currentIndex - 1];
    const prevPost = markdownLists[currentIndex + 1];

    // 커스텀 컴포넌트 파일 들 동적으로 임포트
    // 존재하는 경우만 임포트
    const checkCustomComponentDir = fs.existsSync(path.join(process.cwd(), "app/components/mdx", slug));
    let customComponents: Record<string, React.ComponentType<any>> = {};
    if (checkCustomComponentDir) {
      const customComponentList = fs.readdirSync(path.join(process.cwd(), "app/components/mdx", slug));
      customComponents = customComponentList.reduce((acc, file) => {
        const component = require(`../components/mdx/${slug}/${file}`).default;
        acc[file.replace(".tsx", "")] = component;
        return acc;
      }, {} as Record<string, React.ComponentType<any>>);
    }

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
        InteractiveButton,
        PreviewWeb,
        MDXComponentWrapper,
        ConnectedComponent,
        ConnectedComponentItem,
        MDXToComponent,
        ...customComponents,
      },
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
        <article
          className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert 
    max-w-none w-full px-4 lg:px-0 [&_figure]:m-0 [&_img]:m-0"
        >
          {content}
        </article>
        {hasTakeoffTag && <TakeoffPostFlag />}
        <NextPrevPostButton nextPost={nextPost} prevPost={prevPost} />
      </div>
    );
  } catch (error) {
    console.error(`MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
}
