---
name: markdown-post-writer
description: Writes new MDX blog posts in the repository's established style. Use when creating a new post under public/markdown-posts, drafting technical blog content, or asking to follow existing markdown-posts conventions.
---

# Markdown Post Writer

## 목적
`public/markdown-posts`에 새 글을 작성할 때, 기존 포스트의 형식과 톤을 일관되게 따릅니다.

## 적용 시점
- 사용자가 새 블로그 포스트 작성을 요청한 경우
- 특정 주제로 MDX 포스트 초안을 요청한 경우
- 기존 글 스타일에 맞춘 리라이트를 요청한 경우

## 파일 위치와 이름 규칙
- 새 포스트 파일은 `public/markdown-posts/<slug>.mdx`에 생성합니다.
- `<slug>`는 영어 kebab-case를 기본으로 사용합니다.
- 파일명과 이미지 경로의 slug를 일치시킵니다.

## Frontmatter 규칙
기본적으로 아래 3개 필드를 사용합니다.

```yaml
---
title: "포스트 제목"
tags: ["tag1", "tag2", "tag3"]
date: "YYYY-MM-DD"
---
```

- `title`: 본문 `#` 제목과 동일하게 맞춥니다.
- `tags`: 기술 키워드 위주로 3~6개를 권장합니다.
- `date`: `YYYY-MM-DD` 형식 문자열을 사용합니다.
- 썸네일이 필요한 경우에만 `thumbnail`을 추가합니다.

```yaml
thumbnail: /markdown/<slug>/0.png
```

## 본문 작성 규칙
- 첫 줄에 `# 제목`을 두고 frontmatter `title`과 맞춥니다.
- 한국어 기술 블로그 톤으로 작성하되, 라이브러리/API 명칭은 원문 표기를 유지합니다.
- `##`/`###` 중심으로 내용을 단계적으로 전개합니다.
- 코드 블록은 언어 태그를 반드시 명시합니다(`tsx`, `ts`, `bash`, `rust` 등).
- 필요한 경우 표/불릿을 사용해 비교나 체크리스트를 명확히 보여줍니다.
- 외부 문서/레퍼런스는 마크다운 링크(`[텍스트](URL)`)로 연결합니다.
- 긴 글은 `---` 구분선을 사용해 섹션을 나눌 수 있습니다.

## 이미지/컴포넌트 사용 규칙
- 이미지 경로는 기본적으로 `/markdown/<slug>/<index>.png`를 사용합니다.
- 설명이 필요한 시각 자료는 `![alt]()` 또는 `MDXComponentWrapper`를 사용합니다.
- 인터랙티브 예시나 코드 비교가 필요하면 `ConnectedComponent` 계열 컴포넌트를 사용할 수 있습니다.
- 컴포넌트 사용은 레포에 이미 존재하는 MDX 컴포넌트 네이밍을 우선 사용합니다.

## 권장 본문 아웃라인
주제에 맞게 조정하되, 기본적으로 아래 흐름을 따릅니다.

```mdx
# 제목

도입: 왜 이 주제를 다루는지, 문제 맥락

## 배경 또는 요구사항
핵심 맥락 정리

## 구현/적용 과정
단계별 설명 + 코드/이미지/표

## 결과와 관찰
무엇이 개선됐는지, 한계는 무엇인지

## 마무리
다음 액션 또는 참고 링크
```

## 작성 체크리스트
- [ ] 파일 경로가 `public/markdown-posts/<slug>.mdx` 형식인가?
- [ ] frontmatter에 `title`, `tags`, `date`가 모두 있는가?
- [ ] 본문 `#` 제목이 `title`과 일치하는가?
- [ ] 코드 블록에 언어 태그가 지정되어 있는가?
- [ ] 이미지 경로 slug가 파일명 slug와 일치하는가?
- [ ] 링크/표/불릿이 가독성 있게 정리되어 있는가?
- [ ] 문체가 기존 한국어 기술 포스트 톤과 일치하는가?

## 주의사항
- `description`, `author`, `slug` 같은 미사용 frontmatter 필드는 기본적으로 추가하지 않습니다.
- 태그 표기는 기존 글에서 혼용이 있으므로, 새 글에서는 가능한 한 일관된 casing을 유지합니다.
- 불필요하게 장문으로 늘리지 말고, 코드와 설명의 균형을 맞춥니다.

## 추가 예시
- 더 구체적인 작성 예시는 [examples.md](examples.md)를 확인합니다.
