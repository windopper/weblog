import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/common/Header";
import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";
import CodeBlock from "./components/CodeBlock";
import MediaSlot from "./components/MediaSlot";
import Reveal from "./components/Reveal";
import {
  caseStudies,
  heroMedia,
  links,
  otherWork,
  project,
  relatedPosts,
  scope,
  stats,
  techStack,
  type CaseStudy,
} from "./data";
import {
  aiTools,
  engineAccess,
  failureQuote,
  failures,
  gateQuotes,
  gates,
  headline,
  layers,
  pipelines,
  roleSplit,
  skills,
  statsNote,
  uassetNote,
  workflowStats,
  type Quote,
} from "./workflow";

export const metadata: Metadata = {
  title: "Portfolio | kamilereon",
  description: `${project.name} - ${headline.title}`,
  openGraph: {
    title: `Portfolio | kamilereon`,
    description: `${project.name} - ${headline.title}`,
    url: "https://kamilereon.net/portfolio",
    siteName: "kamilereon",
  },
};

function SectionTitle({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-8 mt-24 text-center text-2xl font-sb-aggro-b font-normal text-zinc-100 print:mt-12 print:break-after-avoid print:break-inside-avoid">
      {index && (
        <span className="mb-1 block font-mono text-sm text-zinc-500">{index}</span>
      )}
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto -mt-4 mb-8 max-w-2xl text-center leading-relaxed text-zinc-400">
      {children}
    </p>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-300">
      {children}
    </span>
  );
}

// 실제 대화에서 가져온 발화입니다. 이름·경로·링크는 지우고 날짜만 남깁니다.
function QuoteBlock({ quote }: { quote: Quote }) {
  return (
    <figure className="rounded-r-lg border-l-2 border-zinc-500 bg-zinc-900/40 px-4 py-3 print:break-inside-avoid">
      <blockquote className="leading-relaxed text-zinc-200">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <figcaption className="mt-1 font-mono text-xs text-zinc-500">
        실제 지시 · {quote.date}
      </figcaption>
    </figure>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 print:break-inside-avoid">
      {children}
    </div>
  );
}

function PipelineCard({ pipeline }: { pipeline: (typeof pipelines)[number] }) {
  return (
    <Reveal className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 print:break-inside-avoid">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <span className="font-mono text-sm text-zinc-500">
            Pipeline {pipeline.index}
          </span>
          <h3 className="text-xl font-sb-aggro-b font-normal text-zinc-100">
            {pipeline.title}
          </h3>
          <p className="leading-relaxed text-zinc-300">{pipeline.summary}</p>
        </header>
        <ol className="flex flex-wrap items-center gap-2">
          {pipeline.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-zinc-700 bg-zinc-800/60 px-2.5 py-1 text-sm text-zinc-200">
                {step}
              </span>
              {i < pipeline.steps.length - 1 && (
                <span aria-hidden className="text-zinc-600">
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="border-t border-zinc-800 pt-3 text-sm leading-relaxed text-zinc-400">
          <strong className="mr-2 font-sb-aggro-b font-normal text-zinc-200">
            사람이 선을 긋는 곳
          </strong>
          {pipeline.gate}
        </p>
      </div>
    </Reveal>
  );
}

// 산출물 섹션용 압축 케이스입니다. 문제 첫 문단, 설계 소제목, 대표 코드 1개, 결과만 보여 줍니다.
async function CompactCase({ study }: { study: CaseStudy }) {
  const [firstCode] = study.code;
  return (
    <Reveal className="mb-10 print:mb-6">
      <article id={study.id} className="flex flex-col gap-4">
        <header className="flex flex-col gap-2 print:break-after-avoid print:break-inside-avoid">
          <span className="font-mono text-sm text-zinc-500">
            Deliverable {study.index}
          </span>
          <h3 className="text-2xl font-sb-aggro-b font-normal text-zinc-100">
            {study.title}
          </h3>
          <p className="text-zinc-300">{study.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <p className="leading-relaxed text-zinc-300">{study.problem[0]}</p>

        <ul className="flex flex-wrap gap-2">
          {study.approach.map((step) => (
            <li
              key={step.heading}
              className="rounded-md border border-zinc-700 bg-zinc-900/60 px-2.5 py-1 text-sm text-zinc-300"
            >
              {step.heading}
            </li>
          ))}
        </ul>

        {firstCode && <CodeBlock sample={firstCode} />}

        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-zinc-300 marker:text-zinc-500">
          {study.result.map((line) => (
            <li key={line} className="leading-relaxed">
              {line}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function PortfolioPage() {
  // href가 빈 링크는 아직 준비되지 않은 것이므로 숨깁니다.
  const visibleLinks = links.filter((link) => link.href);

  return (
    <div className="relative mx-auto min-h-screen max-w-4xl [-webkit-print-color-adjust:exact] [print-color-adjust:exact] print:max-w-none">
      <div className="print:hidden">
        <Header />
        <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
          <StarsBackground />
          <ShootingStars />
        </div>
      </div>

      <main className="px-4 pb-24 pt-12 sm:px-6 print:pt-0">
        {/* Hero */}
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="text-sm text-zinc-400">{project.role}</p>
          <h1 className="max-w-3xl text-3xl font-sb-aggro-b font-normal leading-snug text-zinc-100 sm:text-4xl">
            {headline.title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
            {headline.sub}
          </p>
          <p className="max-w-2xl leading-relaxed text-zinc-400">
            {project.name} &mdash; {project.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-zinc-400">
            <Tag>{project.period}</Tag>
            <Tag>{project.engine}</Tag>
          </div>
          {visibleLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {visibleLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-zinc-800 px-5 py-2 transition-colors hover:bg-zinc-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-4 w-full">
            <MediaSlot media={heroMedia} />
          </div>
        </Reveal>

        {/* 한눈에 보기 */}
        <SectionTitle index="01">한눈에 보기</SectionTitle>
        <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {workflowStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-center print:break-inside-avoid"
            >
              <div className="text-2xl font-sb-aggro-b font-normal text-zinc-100">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </Reveal>
        <p className="mt-3 text-center text-xs text-zinc-500">{statsNote}</p>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {roleSplit.map((role) => (
            <Card key={role.who}>
              <h3 className="mb-2 font-sb-aggro-b font-normal text-zinc-100">
                {role.who}
              </h3>
              <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm text-zinc-300 marker:text-zinc-500">
                {role.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Reveal>

        {/* 지침 계층 */}
        <SectionTitle index="02">에이전트에게 주는 지침의 계층</SectionTitle>
        <Lead>
          같은 말을 두 번 하지 않도록, 지침을 수명에 따라 네 층으로 나눠 둡니다.
        </Lead>
        <Reveal>
          <ol className="flex flex-col gap-4">
            {layers.map((layer, i) => (
              <li key={layer.name}>
                <Card>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-sb-aggro-b font-normal text-zinc-100">
                      <span className="mr-2 font-mono text-zinc-500">{i + 1}</span>
                      {layer.name}
                    </h3>
                    <span className="text-sm text-zinc-400">{layer.role}</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-zinc-300">{layer.detail}</p>
                  <p className="mt-2 text-sm text-zinc-500">예: {layer.example}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* 엔진 접근 */}
        <SectionTitle index="03">에이전트가 엔진을 만질 수 있게 길 내기</SectionTitle>
        <Lead>{uassetNote}</Lead>
        <Reveal className="grid gap-4 sm:grid-cols-2">
          {engineAccess.map((item) => (
            <Card key={item.title}>
              <h3 className="font-sb-aggro-b font-normal text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{item.detail}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-4">
          <Link
            href={`/posts/${relatedPosts[0].slug}`}
            className="block rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-sm transition-colors hover:bg-zinc-800/60 print:break-inside-avoid"
          >
            <span className="mr-2 text-zinc-500">먼저 풀어 본 경험</span>
            {relatedPosts[0].title}
          </Link>
        </Reveal>

        {/* 파이프라인 */}
        <SectionTitle index="04">작업 유형별 파이프라인</SectionTitle>
        <div className="flex flex-col gap-6">
          {pipelines.map((pipeline) => (
            <PipelineCard key={pipeline.index} pipeline={pipeline} />
          ))}
        </div>

        <h3 className="mb-4 mt-14 text-center text-xl font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">
          반복되는 흐름은 스킬로 굳힙니다
        </h3>
        <div className="flex flex-col gap-6">
          {skills.map((skill) => (
            <Reveal key={skill.name}>
              <Card>
                <h4 className="font-mono text-zinc-100">{skill.name}</h4>
                <p className="mt-2 leading-relaxed text-zinc-300">{skill.summary}</p>
                <div className="mt-3 flex flex-col gap-3">
                  {skill.quotes.map((quote) => (
                    <QuoteBlock key={quote.text} quote={quote} />
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* 사람이 선을 긋는 곳 */}
        <SectionTitle index="05">사람이 선을 긋는 곳</SectionTitle>
        <Reveal className="grid gap-4 sm:grid-cols-2">
          {gates.map((gate) => (
            <Card key={gate.title}>
              <h3 className="font-sb-aggro-b font-normal text-zinc-100">{gate.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{gate.detail}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-6 flex flex-col gap-3">
          {gateQuotes.map((quote) => (
            <QuoteBlock key={quote.text} quote={quote} />
          ))}
        </Reveal>

        {/* 실패와 교정 */}
        <SectionTitle index="06">실패와 교정</SectionTitle>
        <Reveal className="grid gap-4 sm:grid-cols-3">
          {failures.map((failure) => (
            <Card key={failure.title}>
              <h3 className="font-sb-aggro-b font-normal text-zinc-100">{failure.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{failure.detail}</p>
            </Card>
          ))}
        </Reveal>
        <Reveal className="mt-6">
          <QuoteBlock quote={failureQuote} />
        </Reveal>

        {/* 산출물 */}
        <SectionTitle index="07">산출물</SectionTitle>
        <Lead>
          이 방식으로 만든 결과물입니다. 세 시스템의 핵심만 줄여 보여 드립니다.
        </Lead>
        <Reveal className="mb-12 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 text-center print:break-inside-avoid"
            >
              <div className="text-xl font-sb-aggro-b font-normal text-zinc-100">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </Reveal>

        {caseStudies.map((study) => (
          <CompactCase key={study.id} study={study} />
        ))}

        <h3 className="mb-4 mt-12 text-center text-xl font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">
          담당 범위 (1인 개발)
        </h3>
        <Reveal>
          <dl className="divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-900/40">
            {scope.map((row) => (
              <div
                key={row.area}
                className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-6 print:break-inside-avoid"
              >
                <dt className="font-sb-aggro-b font-normal text-zinc-100">{row.area}</dt>
                <dd className="leading-relaxed text-zinc-300">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <h3 className="mb-4 mt-12 text-center text-xl font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">
          그 외 구현
        </h3>
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {otherWork.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 print:break-inside-avoid"
              >
                <strong className="font-sb-aggro-b font-normal text-zinc-100">{item.title}</strong>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 기술 스택 */}
        <SectionTitle>기술 스택</SectionTitle>
        <Reveal className="flex flex-col gap-5">
          {[...aiTools, ...techStack].map((group) => (
            <div
              key={group.group}
              className="flex flex-col items-center gap-2 print:break-inside-avoid"
            >
              <h3 className="text-sm font-sb-aggro-b font-normal text-zinc-400">{group.group}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* 관련 글 */}
        <SectionTitle>같은 엔진으로 쓴 글</SectionTitle>
        <Reveal>
          <ul className="flex flex-col gap-3">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:bg-zinc-800/60 print:break-inside-avoid"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </main>
    </div>
  );
}
