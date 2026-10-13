import { codeToHtml } from "shiki";
import type { CodeSample } from "../data";

// 서버 컴포넌트에서 shiki로 미리 하이라이트한 코드 발췌 블록입니다.
// 하이라이트 결과가 정적 HTML이라 클라이언트로 shiki를 보내지 않습니다.
export default async function CodeBlock({ sample }: { sample: CodeSample }) {
  const html = await codeToHtml(sample.code, {
    lang: sample.lang,
    theme: "github-dark",
  });

  return (
    <figure className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 print:break-inside-avoid">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-zinc-700 bg-zinc-800/60 px-4 py-2">
        <span className="text-sm font-sb-aggro-b font-normal text-zinc-100">{sample.title}</span>
        <span className="font-mono text-xs text-zinc-400">{sample.file}</span>
      </figcaption>
      <div
        className="portfolio-code text-sm [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent print:[&_pre]:!whitespace-pre-wrap print:[&_pre]:break-words"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
