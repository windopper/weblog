import React from "react";
import fs from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import CompiledMDXImage from "../components/mdx/CompiledMDXImage";
import CompiledMDXPre from "../components/mdx/CompiledMDXPre";
import InteractiveButton from "../components/mdx/InteractiveButton";
import PreviewWeb from "../components/mdx/PreviewWeb";
import MDXComponentWrapper from "../components/mdx/MDXComponentWrapper";
import ConnectedComponent, { ConnectedComponentItem } from "../components/mdx/ConnectedComponent";
import MDXToComponent from "../components/mdx/MDXToComponent";
import FolderStructure from "../components/mdx/FolderStructure";
import RawSource from "../components/mdx/RawSource";
import Callout from "../components/mdx/Callout";
import Details from "../components/mdx/Details";
import Terminal from "../components/mdx/Terminal";
import UEBlueprintMDX from "../components/mdx/UEBlueprintMDX";

/** @type {import('rehype-pretty-code').Options} */
export const prettyCodeOptions = {
  keepBackground: false,
  theme: "github-dark",
  defaultLang: "text",
};

/** @type {import('rehype-autolink-headings').Options} */
export const autolinkHeadingsOptions = {
  behavior: "append",
  properties: {
    className: ["anchor"],
    ariaLabel: "Link to section",
  },
};

export function getMdxOptions() {
  return {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, autolinkHeadingsOptions],
        [rehypePrettyCode, prettyCodeOptions],
      ],
    },
  };
}

export const defaultComponents = {
  img: CompiledMDXImage,
  pre: CompiledMDXPre,
  InteractiveButton,
  PreviewWeb,
  MDXComponentWrapper,
  ConnectedComponent,
  ConnectedComponentItem,
  MDXToComponent,
  FolderStructure,
  RawSource,
  Callout,
  Details,
  Terminal,
  UEBlueprint: UEBlueprintMDX,
};

/**
 * slug에 해당하는 커스텀 컴포넌트를 동적으로 로드합니다.
 * @param slug - MDX 파일의 slug
 * @returns 로드된 커스텀 컴포넌트 객체
 */
function loadCustomComponents(slug: string): Record<string, React.ComponentType<any>> {
  const customComponentDir = path.join(process.cwd(), "app/components/mdx", slug);
  
  if (!fs.existsSync(customComponentDir)) {
    return {};
  }

  const customComponentList = fs.readdirSync(customComponentDir);
  
  return customComponentList.reduce((acc, file) => {
    const component = require(`../components/mdx/${slug}/${file}`).default;
    acc[file.replace(".tsx", "")] = component;
    return acc;
  }, {} as Record<string, React.ComponentType<any>>);
}

/**
 * 기본 컴포넌트와 slug에 해당하는 커스텀 컴포넌트를 병합하여 반환합니다.
 * @param slug - MDX 파일의 slug
 * @returns 병합된 컴포넌트 객체
 */
export function getMdxComponents(slug: string) {
  const customComponents = loadCustomComponents(slug);
  
  return {
    ...defaultComponents,
    ...customComponents,
  };
}

