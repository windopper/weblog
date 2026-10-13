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

export const metadata: Metadata = {
  title: "Portfolio | kamilereon",
  description: `${project.name} - ${project.subtitle}. ${project.role}`,
  openGraph: {
    title: `Portfolio | kamilereon`,
    description: `${project.name} - ${project.subtitle}`,
    url: "https://kamilereon.net/portfolio",
    siteName: "kamilereon",
  },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 mt-24 text-center text-2xl font-sb-aggro-b font-normal text-zinc-100 print:mt-12 print:break-after-avoid">
      {children}
    </h2>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-300">
      {children}
    </span>
  );
}

async function CaseStudySection({ study }: { study: CaseStudy }) {
  return (
    <Reveal className="mb-24 print:mb-12">
      <article id={study.id} className="flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <span className="font-mono text-sm text-zinc-500">
            Case Study {study.index}
          </span>
          <h3 className="text-3xl font-sb-aggro-b font-normal text-zinc-100">{study.title}</h3>
          <p className="text-lg text-zinc-300">{study.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <MediaSlot media={study.media} />

        <section className="flex flex-col gap-3">
          <h4 className="text-lg font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">문제</h4>
          {study.problem.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-zinc-300">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h4 className="text-lg font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">설계와 구현</h4>
          <ol className="flex flex-col gap-4">
            {study.approach.map((step, index) => (
              <li
                key={step.heading}
                className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 print:break-inside-avoid"
              >
                <span className="font-mono text-zinc-500">{index + 1}</span>
                <div className="flex flex-col gap-1">
                  <strong className="font-sb-aggro-b font-normal text-zinc-100">{step.heading}</strong>
                  <p className="leading-relaxed text-zinc-300">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <h4 className="text-lg font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">코드 발췌</h4>
          {study.code.map((sample) => (
            <CodeBlock key={sample.title} sample={sample} />
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h4 className="text-lg font-sb-aggro-b font-normal text-zinc-100 print:break-after-avoid">결과</h4>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-zinc-300 marker:text-zinc-500">
            {study.result.map((line) => (
              <li key={line} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </section>
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
          <h1 className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-5xl font-sb-aggro-b font-normal text-transparent print:bg-none print:text-zinc-100">
            {project.name}
          </h1>
          <p className="max-w-2xl text-xl text-zinc-300">{project.subtitle}</p>
          <p className="max-w-2xl leading-relaxed text-zinc-400">
            {project.description}
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

        {/* 요약 수치 */}
        <Reveal className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
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

        {/* 담당 범위 */}
        <SectionTitle>담당 범위 (1인 개발)</SectionTitle>
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

        {/* 케이스 스터디 */}
        <SectionTitle>케이스 스터디</SectionTitle>
        {caseStudies.map((study) => (
          <CaseStudySection key={study.id} study={study} />
        ))}

        {/* 그 외 구현 */}
        <SectionTitle>그 외 구현</SectionTitle>
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
          {techStack.map((group) => (
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
