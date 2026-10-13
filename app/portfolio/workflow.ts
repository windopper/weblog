// AI 협업 방식 콘텐츠입니다. 프로젝트의 AGENTS.md, 메모리, 스킬, 대화 기록에서 확인한 사실만 적습니다.

export const headline = {
  sub: "",
};

export const layers: { name: string; role: string; detail: string }[] = [
  {
    name: "AGENTS.md",
    role: "항상 적용하는 규칙",
    detail:
      "한국어 주석, 테스트 작성과 실행 금지, 수정 후 빌드, 영어 커밋 메시지를 적어 두었습니다.",
  },
  {
    name: "장기 메모리",
    role: "결정",
    detail:
      "결정의 이유와 다음에 적용할 방법을 남겨, 같은 실수를 반복하지 않게 합니다.",
  },
  {
    name: "설계 문서",
    role: "기능 명세",
    detail: "구현 전에 결정을 확정해 문서로 남기고, 코드와 함께 업데이트 합니다.",
  },
  {
    name: "위키 결정서",
    role: "작업",
    detail: "설계와 데이터 형식을 한 문서에 모아 작업이 어긋나지 않게 합니다.",
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
    detail: "영상(Omni Flash 1.1)과 3D(Tripo) 결과는 재료로만 쓰고 직접 편집합니다.",
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
    title: "Blender → NumPy 텍스처 → Niagara → 수치 노출",
    summary:
      "메시, 절차적 머티리얼, 데칼을 겹쳐 만들고 모든 단계를 스크립트로 둡니다. 에디터를 닫은 상태에서 커맨드렛으로 실행합니다.",
    steps: [
      "Blender CLI로 메시 생성",
      "NumPy로 텍스처 마스크 생성",
      "머티리얼 HLSL과 NumPy 미리보기",
      "Niagara 커맨드렛으로 조립",
      "수치를 BP로 공개",
    ],
    gate: "텍스처는 명암 값만 담고 색은 머티리얼이 입혀서, 같은 텍스처를 흙, 금빛, 물에 다시 씁니다. 높이, 크기, 시간은 User 파라미터와 BP 속성으로 열어 둡니다.",
  },
  {
    index: "03",
    title: "레퍼런스 영상 → 마커 추적 → 리그 키",
    summary:
      "영상 모델이 만든 레퍼런스에서 다리와 손가락 같은 세부 움직임을 수치로 읽어 리그에 옮깁니다.",
    steps: [
      "Blender에서 부위별 색을 입혀 렌더",
      "측면과 정면 분할 영상 생성",
      "프레임에서 마커 추적",
      "3D 궤적으로 풀기",
      "리그에 키 입력",
      "영상과 나란히 비교하며 보정",
    ],
    gate: "AI 영상은 좌우 패널의 박자가 따로 노는 경우가 많아서, 다리별로 시간을 맞춰 푸는 모드를 스킬에 추가했습니다.",
  },
  {
    index: "04",
    title: "NumPy 생성기 → 임포트 → 위젯 블루프린트",
    summary:
      "UI 텍스처는 위젯마다 생성기를 두고, 생성기끼리 그리기 도구를 공유해 UI 전체가 같은 질감을 가지게 합니다. 시드를 고정해 다시 실행해도 같은 결과가 나옵니다.",
    steps: [
      "NumPy로 텍스처 생성",
      "밝은 배경과 어두운 배경에서 가독성 확인",
      "커맨드렛으로 임포트",
      "위젯 블루프린트 생성",
      "위젯 이름으로 C++ 연결",
    ],
    gate: "C++는 위젯 이름과 이벤트만 정하고 모양은 블루프린트에서 고칩니다. 글자는 프로젝트 폰트에 있는 문자만 씁니다.",
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
      "Omni Flash 1.1",
      "GPT Image 2.5",
      "Tripo",
      "send2ue",
      "UE 커맨드렛 + Python",
    ],
  },
];
