// AI 협업 방식 콘텐츠입니다. 모든 항목은 프로젝트의 AGENTS.md, 메모리, 스킬 설명, 대화 기록에서 확인한 사실만 담습니다.
// 비율 주장은 하지 않고 "누가 무엇을 맡았는가"로 서술합니다.

export type Quote = {
  text: string;
  date: string;
};

export const headline = {
  title: "AI에게 코드를 시키는 사람이 아니라, AI가 일할 수 있는 시스템을 만드는 개발자",
  sub: "사람은 의도·결정·검증을, AI는 구현과 반복을 맡는 분업으로 Green The Unknown을 1인 개발했습니다.",
};

// 기록이 남아 있는 구간의 집계입니다. 사용자 발화는 문자열 메시지만 센 하한값입니다.
export const workflowStats: { value: string; label: string }[] = [
  { value: "382", label: "에이전트 세션" },
  { value: "약 2.2만", label: "에이전트 도구 호출" },
  { value: "91", label: "장기 메모리 항목" },
  { value: "35편", label: "기능 설계 문서" },
  { value: "104", label: "재현 가능한 Python 스크립트" },
  { value: "2", label: "프로젝트 전용 스킬" },
];

export const statsNote =
  "세션·도구 호출은 기록이 남아 있는 2026.09.23 ~ 10.13 구간의 집계입니다.";

export const roleSplit: { who: string; items: string[] }[] = [
  {
    who: "내가 정하는 것",
    items: [
      "무엇을 왜 만드는지: 기능의 의도와 게임 디자인 결정",
      "완성의 기준: 연출 품질, 수치를 노출하는 방식",
      "되돌리기 어려운 단계의 승인: 임포트, export, 대량 생산",
    ],
  },
  {
    who: "AI가 하는 것",
    items: [
      "C++·Python·Blender 스크립트 구현과 반복 수정",
      "코드베이스 조사, 설계안 비교, 문서화",
      "빌드와 에디터 호출을 통한 에셋 생성",
    ],
  },
  {
    who: "내가 검증하는 것",
    items: [
      "플레이 테스트(PIE)와 실제 화면 확인",
      "미검증 목록을 항목별로 직접 확인",
      "AI가 남긴 결정·함정 기록의 정정",
    ],
  },
];

export const layers: {
  name: string;
  role: string;
  detail: string;
  example: string;
}[] = [
  {
    name: "AGENTS.md",
    role: "바뀌지 않는 규칙",
    detail:
      "세션마다 다시 말하지 않아도 되는 규칙입니다. 짧고 명령형으로 씁니다.",
    example:
      "한국어 주석 · 테스트 작성과 실행 금지 · 코드 수정 후 반드시 빌드 · 영어 Conventional Commits",
  },
  {
    name: "장기 메모리 (91)",
    role: "결정, 함정, 거부된 접근",
    detail:
      "사실이 아니라 \"왜\"와 \"다음에 어떻게 적용할지\"를 남깁니다. 같은 지적을 두 번 하지 않게 하는 장치입니다.",
    example:
      "Idle은 가만히 · 프레임별 베이크 금지, 키포즈+브레이크다운 · 위젯 글자는 ASCII만",
  },
  {
    name: "기능 설계 문서 (35)",
    role: "구현의 명세",
    detail:
      "구현 전에 질문으로 결정을 확정하고, 그 결과를 문서로 남깁니다. 구현은 문서를 따르고, 문서는 코드와 같이 갱신합니다.",
    example: "ModShelf · Skills · StatusEffects · UpgradeSystem · Crow …",
  },
  {
    name: "위키 결정서",
    role: "작업 계약",
    detail:
      "설계 결정 19개와 디렉터리·데이터 형식·슬러그 계약을 한 문서에 둡니다. 여러 작업자가 동시에 일해도 어긋나지 않게 하는 용도입니다.",
    example: "Wiki/docs/DECISIONS.md",
  },
];

export const engineAccess: { title: string; detail: string }[] = [
  {
    title: "라이브 에디터 MCP",
    detail:
      "unreal-mcp를 로컬에 설치해 실행 중인 에디터에서 Niagara 등을 부분 수정합니다.",
  },
  {
    title: "에디터 모듈 + Python + 커맨드렛",
    detail:
      "Niagara·Widget·Landscape Authoring 모듈이 엔진 작업을 Python에서 부를 수 있게 감쌉니다. 에디터를 열지 않고 커맨드렛으로도 실행합니다.",
  },
  {
    title: "Blender: MCP와 CLI 스크립트",
    detail:
      "에셋별 생성 스크립트 폴더를 두고, 화면 확인이 어려운 부분은 numpy 래스터 미리보기로 검토합니다. send2ue로 엔진에 보냅니다.",
  },
  {
    title: "외부 생성 도구는 재료로만",
    detail:
      "영상 생성(Higgsfield MCP)과 3D 생성(Tripo) 결과를 그대로 쓰지 않고 후속 편집을 거칩니다. 곰 보스 2차는 Tripo 원본을 직접 편집했습니다.",
  },
];

export const uassetNote =
  ".uasset은 텍스트처럼 직접 고치면 에셋 손상과 에디터 크래시로 이어질 수 있어서, 엔진 API를 호출하는 길만 열어 둡니다. 같은 문제를 먼저 풀어 본 경험은 블로그에 정리했습니다. 결과는 재실행 가능한 스크립트로 남습니다.";

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
    summary:
      "필드 몹 스포너, 스테이지 동기화 같은 시스템 기능의 기본 흐름입니다. 구현이 끝나면 \"무엇을 확인했고 무엇을 못 했는지\"를 기록으로 남깁니다.",
    steps: [
      "질문으로 결정 확정",
      "설계 문서 작성",
      "C++ 구현",
      "빌드 실행",
      "메모리에 미검증·사용자 몫 기록",
    ],
    gate: "빌드까지만 AI가 확인하고, 플레이 검증은 제가 합니다. 예: \"빌드 OK, PIE 미검증, 사용자 몫(StateTree 연결·소켓·DataTable)\".",
  },
  {
    index: "02",
    title: "Blender → 에셋 → Niagara 커맨드렛 → 미리보기 → 수치 노출",
    summary:
      "VFX는 메시, 절차적 머티리얼, 데칼, 다층 시간표로 구성한 방식을 기준으로 합니다. 기준 자체를 한 번 승인받아 메모리에 남겼고 이후 작업이 그것을 따릅니다.",
    steps: [
      "Blender CLI로 메시 생성",
      "에셋·머티리얼 스크립트",
      "Niagara 커맨드렛 빌드",
      "미리보기로 검토",
      "튜닝 수치를 BP·Niagara 파라미터로 공개",
    ],
    gate: "높이·크기·시간 같은 수치는 스크립트 상수에 묻지 않고 UPROPERTY와 Niagara User 파라미터로 열어 둡니다. 튜닝은 코드 수정 없이 에디터에서 합니다.",
  },
  {
    index: "03",
    title: "레퍼런스 영상 → 색 마커 추적 → 리그 키",
    summary:
      "애니메이션을 프레임별로 구워 내지 않고, 영상에서 읽은 궤적을 키포즈와 브레이크다운으로 옮깁니다. 이 흐름은 스킬(anim-from-video)로 굳혔습니다.",
    steps: [
      "측면·정면 분할 + 색 마커 영상 생성",
      "프레임에서 마커 추적",
      "3D 궤적으로 풀기",
      "리그 컨트롤러에 키",
      "영상과 나란히 비교·보정",
    ],
    gate: "\"프레임별 베이크 금지\"와 \"Idle은 가만히\" 같은 기준은 메모리 규칙으로 남겨, 다음 애니메이션에서도 반복 지적하지 않아도 됩니다.",
  },
];

export const skills: {
  name: string;
  summary: string;
  quotes: Quote[];
}[] = [
  {
    name: "anim-from-video",
    summary:
      "AI 영상 생성 도구로 측면·정면 분할 화면과 부위별 색 마커 영상을 만들고, 프레임에서 마커를 추적해 3D 궤적으로 풀어 리그에 키를 굽고, 영상과 나란히 비교하며 보정합니다.",
    quotes: [
      {
        text: "이번 작업으로 개선할 점을 스킬에 반영하고 다리 모션 뿐만 아니라 다양한 모션에 적용할 수 있도록 이를 일반화하려고 합니다.",
        date: "2026-10-08",
      },
    ],
  },
  {
    name: "wiki-update",
    summary:
      "마지막 동기화 지점의 UE 커밋과 현재 게임을 비교해 낡은 위키 수치·본문·항목을 찾아 갱신합니다.",
    quotes: [
      {
        text: "일단 하지 말고 위키 업데이트 스킬을 제작합시다. 이 스킬은 게임 커밋과 위키 커밋을 비교하여 최신화되지 않은 부분에 대해 위키를 업데이트하는 스킬입니다.",
        date: "2026-10-08",
      },
    ],
  },
];

export const gates: { title: string; detail: string }[] = [
  {
    title: "테스트와 PIE는 사람이 한다",
    detail:
      "AGENTS.md로 AI의 테스트 작성·실행을 막고, 검증은 직접 합니다. 그래서 완료 보고에서 \"됐다\"와 \"확인했다\"가 구분됩니다.",
  },
  {
    title: "미검증은 숨기지 않고 표기한다",
    detail:
      "메모리와 보고에 미검증 목록과 사용자 몫을 남겨, 어디까지 확인된 상태인지 항상 보이게 합니다.",
  },
  {
    title: "하나를 확인한 뒤 확대한다",
    detail:
      "에셋은 대표 1개를 만들어 승인한 뒤에 변형을 만듭니다. 잘못된 방향으로 대량 생산하는 비용을 막습니다.",
  },
  {
    title: "단계를 잘라서 맡긴다",
    detail:
      "조사만, 제작만 시키고 코드 수정이나 export는 따로 허락합니다. 되돌리기 어려운 단계가 의도치 않게 실행되지 않게 합니다.",
  },
];

export const gateQuotes: Quote[] = [
  {
    text: "먼저 대표 cliff, rock 하나씩 만들고 컨펌시에 여러 variation으로 만들어주세요",
    date: "2026-10-07",
  },
  { text: "애니메이션만 제작하세요. export 하지 마세요", date: "2026-09-30" },
  { text: "일단 코드 수정하지 마세요", date: "2026-10-05" },
];

export const failures: { title: string; detail: string }[] = [
  {
    title: "곰 보스 1차 폐기",
    detail:
      "녹이기와 QuadriFlow 접근이 실패해 폐기했고, Tripo 원본을 직접 편집하는 2차로 전환했습니다. 폐기 이유도 메모리에 남겼습니다.",
  },
  {
    title: "엔진 함정은 메모리로",
    detail:
      "Niagara VM의 smoothstep 미지원, send2ue(6777)와 unreal-mcp(6776)의 포트 충돌, Live Coding 중 빌드 대기 같은 함정을 기록해 같은 시행착오를 반복하지 않습니다.",
  },
  {
    title: "긴 세션은 쪼갠다",
    detail:
      "컨텍스트가 길어지면 품질이 떨어지므로 새 세션으로 인수인계하거나 서브 에이전트에 작업을 나눕니다.",
  },
];

export const failureQuote: Quote = {
  text: "새로 세션을 파서 물줄기가 넓은 반투명 천으로 보이는 문제를 해결하고 비주얼을 강화하기 위한 프롬프트를 작성해주세요. 아니면 본인이 서브 에이전트를 만들어서 작업을 부여하세요. 컨텍스트가 너무 길어져서 그렇습니다.",
  date: "2026-10-05",
};

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
