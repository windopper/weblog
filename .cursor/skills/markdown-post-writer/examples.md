# Examples

## 예시 1: 새 포스트 생성 요청

입력:

```text
RAG 캐시 전략에 대한 포스트를 기존 블로그 스타일로 작성해줘.
```

출력 구조(요약):

```mdx
---
title: "RAG 캐시 전략 적용기"
tags: ["rag", "llm", "cache", "nextjs"]
date: "2026-04-03"
---
# RAG 캐시 전략 적용기

도입 문단...

## 왜 캐시가 필요한가
...

## 적용 방법
코드 블록 예시(ts):
[코드 샘플]

## 결과
...
```

## 예시 2: 이미지 포함 포스트

입력:

```text
시각화 글이라 이미지 2장을 포함해서 작성해줘.
```

출력 포인트:
- frontmatter는 기본 3필드(`title`, `tags`, `date`)를 유지
- 이미지 경로는 `/markdown/<slug>/0.png`, `/markdown/<slug>/1.png` 사용
- 필요 시 `thumbnail: /markdown/<slug>/0.png` 추가

```mdx
![preview](/markdown/rag-cache-strategy/0.png)
![architecture](/markdown/rag-cache-strategy/1.png)
```

## 예시 3: 비교형 글

입력:

```text
Redis 캐시와 메모리 캐시를 비교하는 글을 작성해줘.
```

출력 포인트:
- `## 1.`, `## 2.`처럼 번호 섹션 사용 가능
- 표를 활용해 차이점을 간결하게 정리
- 결론에서 선택 기준을 명확히 제시

```mdx
| 항목 | Redis | In-memory |
| --- | --- | --- |
| 공유성 | 높음 | 낮음 |
| 지연시간 | 낮음 | 매우 낮음 |
| 운영 복잡도 | 중간 | 낮음 |
```
