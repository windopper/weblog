import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { extractTOC } from '../../libs/toc';
import TableOfContents from '../../components/posts/TableOfContents';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface FrontMatter {
  title: string;
  tags: string[];
  date: string;
}

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  keepBackground: false,
  theme: 'github-dark',
  defaultLang: 'text',
};

/** @type {import('rehype-autolink-headings').Options} */
const autolinkHeadingsOptions = {
  behavior: 'append',
  properties: {
    className: ['anchor'],
    ariaLabel: 'Link to section',
  },
};

async function getMDXContent(slug: string) {
  const markdownDir = path.join(process.cwd(), "app", "markdown");
  const filePath = path.join(markdownDir, `${slug}.mdx`);
  
  // 파일이 존재하는지 확인
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    // MDX 파일 읽기
    const source = fs.readFileSync(filePath, 'utf8');
    
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
    });

    // table of contents 추출
    const toc = extractTOC(source);

    return { content, frontmatter, toc };
  } catch (error) {
    console.error(`MDX 로드 오류 - ${slug}:`, error);
    return null;
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getMDXContent(slug);

  if (!result) {
    notFound();
  }

  const { content, toc } = result;

  return (
    <div className="relative">
      <TableOfContents toc={toc} />
      <article  className="prose-zinc prose prose-sm md:prose-md lg:prose-lg prose-invert 
      max-w-none w-full px-4 lg:px-0">
        {content}
      </article>
    </div>
  );
} 