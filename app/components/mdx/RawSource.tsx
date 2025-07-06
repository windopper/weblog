// 특정 경로 파일의 소스 코드를 보여주는 컴포넌트

import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { rehypePrettyCode } from "rehype-pretty-code";
import CompiledMDXPre from "./CompiledMDXPre";

interface FrontMatter {
  title: string;
  description: string;
  tags: string[];
}

export default async function RawSource({ src }: { src: string }) {
  /** @type {import('rehype-pretty-code').Options} */
  const prettyCodeOptions = {
    keepBackground: false,
    theme: "github-dark",
    defaultLang: "text",
  };

  const suffix = src.split(".").pop();
  const fileContent = fs.readFileSync(path.join(process.cwd(), src), "utf8");

  const { content } = await compileMDX<FrontMatter>({
    source: `\`\`\`${suffix}\n${fileContent}\n\`\`\``,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, prettyCodeOptions]
        ],
      },
    },
    components: {
        pre: CompiledMDXPre,
    }
  });

  return content;
}
