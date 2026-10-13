// AI 협업 방식 콘텐츠입니다. 프로젝트의 AGENTS.md, 메모리, 스킬, 대화 기록에서 확인한 사실만 적습니다.

export const headline = {
  sub: "AI 에이전트에게 일을 맡기는 방식과 작업 흐름을 정리했습니다.",
};

export const layers: { name: string; role: string; detail: string }[] = [
  {
    name: "AGENTS.md",
    role: "항상 적용하는 규칙",
    detail:
      "한국어 주석, 테스트 작성과 실행 금지, 수정 후 빌드, 영어 커밋 메시지를 적어 두었습니다.",
  },
  {
    name: "장기 메모리 (91)",
    role: "결정과 함정",
    detail:
      "결정의 이유와 다음에 적용할 방법을 남겨, 같은 지적을 반복하지 않게 합니다.",
  },
  {
    name: "설계 문서 (35)",
    role: "기능 명세",
    detail: "구현 전에 결정을 확정해 문서로 남기고, 코드와 함께 갱신합니다.",
  },
  {
    name: "위키 결정서",
    role: "작업 약속",
    detail: "설계 결정 19개와 데이터 형식을 한 문서에 모아 작업이 어긋나지 않게 합니다.",
  },
];

export const engineAccess: { title: string; detail: string }[] = [
  {
    title: "라이브 에디터 MCP",
    detail: "실행 중인 에디터에서 Niagara 등을 바로 수정합니다.",
  },
  {
    title: "에디터 모듈과 Python",
    detail:
      "Niagara, Widget, Landscape 작업을 Python에서 부르도록 감쌌고, 커맨드렛으로도 실행합니다.",
  },
  {
    title: "Blender 스크립트",
    detail: "에셋별 생성 스크립트를 두고 send2ue로 엔진에 보냅니다.",
  },
  {
    title: "외부 생성 도구",
    detail: "영상(Higgsfield)과 3D(Tripo) 결과는 재료로만 쓰고 직접 편집합니다.",
  },
];

export const uassetNote =
  ".uasset을 텍스트로 고치면 에셋이 깨지므로, 에이전트가 엔진 API만 거치게 했습니다.";

export type Pipeline = {
  index: string;
  title: string;
  summary: string;
  steps: string[];
  gate: string;
};

export const pipelines: Pipeline[] = [
  {
    index: "01",
    title: "문서 → C++ → 빌드 → 미검증 목록",
    summary: "시스템 기능의 기본 흐름입니다. 확인한 것과 못 한 것을 기록으로 남깁니다.",
    steps: [
      "질문으로 결정 확정",
      "설계 문서 작성",
      "C++ 구현",
      "빌드",
      "미검증 항목 기록",
    ],
    gate: "AI는 빌드까지 확인하고, 플레이 검증은 제가 합니다. 예: 빌드 OK, PIE 미검증.",
  },
  {
    index: "02",
    title: "Blender → 에셋 → Niagara → 수치 노출",
    summary: "메시, 절차적 머티리얼, 데칼을 겹쳐 만드는 방식을 VFX 기준으로 삼았습니다.",
    steps: [
      "Blender로 메시 생성",
      "머티리얼 스크립트",
      "Niagara 커맨드렛",
      "미리보기로 검토",
      "수치를 파라미터로 공개",
    ],
    gate: "높이, 크기, 시간 같은 수치는 BP와 Niagara 파라미터로 열어 둡니다.",
  },
  {
    index: "03",
    title: "레퍼런스 영상 → 마커 추적 → 리그 키",
    summary: "영상에서 읽은 궤적을 키포즈로 옮깁니다. 프레임별 베이크는 하지 않습니다.",
    steps: [
      "마커 영상 생성",
      "프레임에서 마커 추적",
      "3D 궤적으로 풀기",
      "리그에 키 입력",
      "영상과 비교하며 보정",
    ],
    gate: "이 기준을 메모리에 남겨 같은 지적을 반복하지 않게 했습니다.",
  },
];

export const skills: { name: string; summary: string }[] = [
  {
    name: "anim-from-video",
    summary: "마커가 있는 영상을 추적해 리그에 키를 굽고, 영상과 나란히 비교해 보정합니다.",
  },
  {
    name: "wiki-update",
    summary: "게임 커밋과 위키 커밋을 비교해 낡은 부분을 갱신합니다.",
  },
];

export const gates: { title: string; detail: string }[] = [
  {
    title: "테스트는 사람이 한다",
    detail: "AI의 테스트 작성과 실행을 막고, 검증은 직접 합니다.",
  },
  {
    title: "미검증은 표기한다",
    detail: "어디까지 확인했는지 보고에 항상 남깁니다.",
  },
  {
    title: "하나를 확인한 뒤 확대한다",
    detail: "에셋은 대표 1개를 승인받은 뒤 변형을 만듭니다.",
  },
  {
    title: "단계를 나눠 맡긴다",
    detail: "조사와 제작을 먼저 시키고, 코드 수정과 export는 따로 허락합니다.",
  },
];

export const failures: { title: string; detail: string }[] = [
  {
    title: "곰 보스 1차 폐기",
    detail: "접근이 실패해 버리고, Tripo 원본을 직접 편집하는 2차로 바꿨습니다.",
  },
  {
    title: "엔진 함정은 메모리로",
    detail: "Niagara의 smoothstep 미지원, 포트 충돌 같은 함정을 기록해 반복하지 않습니다.",
  },
  {
    title: "긴 세션은 나눈다",
    detail: "컨텍스트가 길어지면 새 세션이나 서브 에이전트로 작업을 나눕니다.",
  },
];

export const aiTools: { group: string; items: string[] }[] = [
  {
    group: "Agent",
    items: ["Claude Code", "AGENTS.md", "프로젝트 스킬", "서브 에이전트"],
  },
  {
    group: "Bridge",
    items: [
      "unreal-mcp",
      "Blender MCP",
      "Higgsfield MCP",
      "Tripo",
      "send2ue",
      "UE 커맨드렛 + Python",
    ],
  },
];
