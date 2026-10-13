// 포트폴리오 콘텐츠 데이터입니다. 문구와 링크는 여기서만 고치면 됩니다.
// 링크(href)와 미디어(src)가 빈 문자열이면 화면에서 자동으로 숨기거나 "준비 중" 자리표시로 보입니다.

export type CodeSample = {
  title: string;
  file: string;
  lang: "cpp" | "ts";
  code: string;
};

export type MediaItem = {
  // YouTube 주소 또는 /public 기준 이미지 경로입니다. 비워 두면 자리표시가 나옵니다.
  src: string;
  kind: "youtube" | "image";
  alt: string;
  caption: string;
};

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  tags: string[];
  problem: string;
  approach: string[];
  code: CodeSample;
  result: string[];
};

export const project = {
  name: "Green The Unknown",
  subtitle: "씨앗을 쏘아 황폐한 대지를 되살리는 멀티플레이 1인칭 액션",
  role: "클라이언트 프로그래머, 1인 개발",
  period: "2026.09.18 ~ 진행 중",
  engine: "Unreal Engine 5.8, C++",
};

// 비워 둔 항목은 화면에 나오지 않습니다. 준비되면 href만 채우세요.
export const links: { label: string; href: string }[] = [
  { label: "GitHub 저장소", href: "" },
  { label: "플레이 영상", href: "" },
  { label: "플레이어 위키", href: "" },
];

export const heroMedia: MediaItem = {
  src: "",
  kind: "youtube",
  alt: "Green The Unknown 플레이 영상",
  caption: "플레이 영상 (3분 이내) 자리",
};

export const stats: { value: string; label: string }[] = [
  { value: "약 6.2만 줄", label: "C++ 코드 (352개 파일)" },
  { value: "150+", label: "UCLASS" },
  { value: "57", label: "네트워크 RPC" },
];

export const scope: { area: string; detail: string }[] = [
  {
    area: "게임플레이",
    detail:
      "도구와 스킬 슬롯, 업그레이드와 개조 선반, 상점, 수레 운전, 사망과 부활, 상태 이상",
  },
  {
    area: "월드와 네트워크",
    detail:
      "녹화 마스크와 식물 성장, 스테이지 동기화, 레벨 전환, 잔디 스트리밍",
  },
  {
    area: "AI와 전투",
    detail: "엔티티 베이스 클래스, StateTree 보스와 까마귀 AI, 노티파이 기반 타격 판정",
  },
  {
    area: "툴링",
    detail: "Blender, Niagara, 머티리얼을 코드로 만드는 Python 스크립트 100여 개",
  },
  {
    area: "아트와 VFX (보조)",
    detail: "로우폴리 모델링, 애니메이션, Niagara 이펙트를 직접 제작",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "stage-sync",
    index: "01",
    title: "멀티플레이 스테이지 동기화",
    tagline: "큰 녹화 마스크와 수만 그루의 식물을 클라이언트에 안전하게 보내기",
    tags: ["Replication", "Reliable RPC", "Flow Control", "zlib"],
    problem:
      "녹화 상태는 1024x1024 마스크 3장과 최대 2만 그루의 식물입니다. Reliable RPC를 그대로 쏘면 신뢰성 버퍼가 넘쳐 연결이 끊어지고, 프로퍼티 복제에 맡기기에는 배열이 너무 큽니다.",
    approach: [
      "더티 타일로 바뀐 영역만 전송",
      "바이트 예산과 누적 ACK 흐름 제어",
      "늦게 접속한 클라이언트는 전체 동기화",
      "식물은 서버 시각 기준으로 연출",
    ],
    code: {
      title: "전송 큐: 바이트 예산과 ACK 창",
      file: "Planting/StageSyncComponent.cpp",
      lang: "cpp",
      code: `void UStageSyncComponent::PumpQueue()
{
    if (!bClientSyncRequested) return;
    const double Now = FPlatformTime::Seconds();
    if (Now - WindowStartTime >= WindowSeconds)
    {
        WindowStartTime = Now;
        WindowBytes = 0;
    }
    const int32 Budget = FMath::Max(1024, MaxBytesPerWindow);
    const int32 MaxUnacked = FMath::Clamp(MaxUnackedChunks, 1, 32);
    while (QueueHead < Queue.Num())
    {
        // 신뢰성 버퍼가 넘치지 않도록 ACK되지 않은 메시지 수와 이번 창의 바이트 예산을 함께 제한합니다.
        if (LastSentSeq - LastAckedSeq >= MaxUnacked || WindowBytes >= Budget) break;
        const FQueuedEntry& Entry = Queue[QueueHead++];
        FStageNetMessage Message;
        if (!BuildMessage(Entry, Message)) continue;
        Message.Seq = ++LastSentSeq;
        WindowBytes += Message.Payload.Num() + MessageOverheadBytes;
        Client_StageChunk(Message);
    }
    // ... 큐를 다 비웠으면 초기화, 앞부분이 256개를 넘으면 압축
}`,
    },
    result: [
      "클라이언트당 대역폭이 최대 약 320KB/s로 제한됩니다.",
      "전송을 기다리는 동안 같은 영역이 여러 번 바뀌어도 한 번만 보냅니다.",
    ],
  },
  {
    id: "greening",
    index: "02",
    title: "녹화 확산 시스템",
    tagline: "마스크 전체가 아니라 새로 닿은 고리 구간만 칠하는 확산 파도",
    tags: ["Landscape", "Render Target", "Algorithm", "Performance"],
    problem:
      "보스를 쓰러뜨리면 녹지가 스테이지 전체로 퍼집니다. 마스크는 약 100만 픽셀이고 파도는 수 초간 이어지므로, 프레임마다 전체를 다시 계산하면 비용이 큽니다.",
    approach: [
      "이미 칠한 안쪽은 건너뛰고 고리 구간만 훑기",
      "거친 흙 가중치로 픽셀별 속도 조절",
      "한 번의 변경을 렌더 타깃, 네트워크, 집계에 전달",
    ],
    code: {
      title: "고리 구간만 칠하는 줄 단위 루프",
      file: "Planting/PlantingGreeningWave.cpp",
      lang: "cpp",
      code: `for (int32 Y = MinY; Y < MaxY; ++Y)
{
    const double DY = ActiveWorldMin.Y + (Y + 0.5) / Resolution * ActiveWorldSize.Y - Wave.Origin.Y;
    const double AbsDY = FMath::Abs(DY);
    if (AbsDY >= OuterRadius) continue;
    const double OuterHalf = FMath::Sqrt(OuterRadius * OuterRadius - DY * DY);
    if (AbsDY >= InnerRadius)
    {
        PaintRange(Y, DY, Wave.Origin.X - OuterHalf, Wave.Origin.X + OuterHalf);
        continue;
    }
    // 이 줄에서는 안쪽 원이 지나가므로 왼쪽과 오른쪽 고리 구간만 훑습니다.
    const double InnerHalf = FMath::Sqrt(InnerRadius * InnerRadius - DY * DY);
    PaintRange(Y, DY, Wave.Origin.X - OuterHalf, Wave.Origin.X - InnerHalf);
    PaintRange(Y, DY, Wave.Origin.X + InnerHalf, Wave.Origin.X + OuterHalf);
}
GreeningNetDirty.Mark(NetChanged);
Wave.SaturatedRadius = static_cast<float>(FMath::Max(InnerRadius, NextSaturatedRadius));`,
    },
    result: [
      "프레임당 비용이 마스크 전체가 아니라 새로 닿은 고리 면적에 비례합니다.",
      "서버만 파도를 계산하고 클라이언트에는 결과만 전달됩니다.",
    ],
  },
  {
    id: "entity-ai",
    index: "03",
    title: "엔티티 베이스와 StateTree AI",
    tagline: "보스와 까마귀가 공통 규칙을 공유하고 각자 확장되게 만들기",
    tags: ["StateTree", "Class Design", "Animation Notify", "Replication"],
    problem:
      "보스 다음으로 까마귀를 만들면서, 체력과 상태 이상과 사망 연출처럼 똑같아야 하는 부분이 보스 클래스 안에 갇혀 있다는 것을 알았습니다.",
    approach: [
      "공통 부분을 베이스로 추출하고 사망 확장점 3개 제공",
      "StateTree는 흐름만 정하고 동작은 서버 함수가 수행",
      "노티파이 구간과 캡슐 스윕으로 타격 판정",
      "서버는 판정, 클라이언트는 연출",
    ],
    code: {
      title: "관절 캡슐 스윕 판정",
      file: "Boss/BossPawn.cpp",
      lang: "cpp",
      code: `for (int32 Index = 0; Index < Capsules.Num(); ++Index)
{
    const FBossHitCapsule& Capsule = Capsules[Index];
    const FCollisionShape Shape = Capsule.GetShape();
    const FQuat Rotation = Capsule.GetRotation();
    const FVector Center = Capsule.GetCenter();

    TArray<FOverlapResult> Overlaps;
    World->OverlapMultiByObjectType(Overlaps, Center, Rotation, Objects, Shape, Query);
    for (const FOverlapResult& Overlap : Overlaps) TryHit(Overlap.GetActor(), Center);

    // 지난 프레임 자리에서 지금 자리까지 쓸어, 빠른 휘두르기가 프레임 사이로 대상을 건너뛰지 않게 합니다.
    if (Active.PreviousCapsules.IsValidIndex(Index))
    {
        const FVector PreviousCenter = Active.PreviousCapsules[Index].GetCenter();
        if (FVector::DistSquared(PreviousCenter, Center) > FMath::Square(BossPawnHit::MinSweepDistance))
        {
            TArray<FHitResult> Hits;
            World->SweepMultiByObjectType(Hits, PreviousCenter, Center, Rotation, Objects, Shape, Query);
            for (const FHitResult& Hit : Hits) TryHit(Hit.GetActor(), Hit.ImpactPoint);
        }
    }
}`,
    },
    result: [
      "새 엔티티는 베이스 상속, 사망 확장점, StateTree 지정만으로 만들 수 있습니다.",
      "공격 타이밍이 애니메이션 에셋에 있어, 몽타주를 고쳐도 코드는 그대로입니다.",
    ],
  },
];

export const otherWork: { title: string; detail: string }[] = [
  {
    title: "도구와 스킬",
    detail: "도구별 스킬 슬롯, 쿨타임, 도구 인스턴스, 버리기와 줍기",
  },
  {
    title: "업그레이드와 개조 선반",
    detail: "도구에 귀속되는 데이터 주도 업그레이드, 팀 공유 해금",
  },
  {
    title: "수레",
    detail: "전진 4단과 조향, 연료, 까마귀 탑승과 도망",
  },
  {
    title: "사망과 부활",
    detail: "랙돌 연출, 부활 컴포넌트, 사망 UI",
  },
  {
    title: "상태 이상",
    detail: "경직과 젖음, 재면역 시간, 보스 상한 처리",
  },
  {
    title: "잔디 스트리밍",
    detail: "거리 기반 잔디 로딩과 삽질 복원 규칙",
  },
  {
    title: "발소리와 Foot IK",
    detail: "AnimNotify 박자, 지면 재질 구분, Foot Placement",
  },
  {
    title: "VFX 파이프라인",
    detail: "Blender에서 Niagara까지 Python으로 생성하고 수치는 BP로 노출",
  },
];

export const techStack: { group: string; items: string[] }[] = [
  {
    group: "Engine",
    items: [
      "Unreal Engine 5.8",
      "C++",
      "Enhanced Input",
      "StateTree",
      "Niagara",
      "PCG",
      "Animation Warping",
    ],
  },
  {
    group: "Network",
    items: ["Listen Server", "Reliable/Unreliable RPC", "OnRep", "ACK 흐름 제어", "zlib 압축"],
  },
  {
    group: "Tools",
    items: ["Blender (Python)", "UE Python / Commandlet", "Git", "PureRef", "Cascadeur"],
  },
];

// 블로그 포스트 슬러그입니다. 같은 Unreal Engine 경험을 보여 주는 글을 하단에 링크합니다.
export const relatedPosts: { slug: string; title: string }[] = [
  {
    slug: "ampliare-unreal-mcp-bridge-development",
    title: "Unreal Editor와 MCP를 연결하는 Ampliare 개발기",
  },
  {
    slug: "tps-fps-ads-recoil",
    title: "TPS/FPS 전환과 ADS, Recoil 구현 정리",
  },
  {
    slug: "weapon-holster-switching-drop-procedural-pickup",
    title: "UE5 무기 홀스터 전환과 Drop, Procedural Pickup 구현",
  },
];
