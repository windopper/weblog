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
  // 측정값을 보여 줄 표입니다. 첫 줄은 머리글이고 없으면 표를 그리지 않습니다.
  metrics?: { caption: string; head: string[]; rows: string[][] };
  code: CodeSample;
  result: string[];
};

export const project = {
  name: "Green The Unknown",
  subtitle: "황폐한 땅을 되살리는 1인칭 액션 협동 어드벤처",
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
    id: "grass-streaming",
    index: "02",
    title: "잔디 스트리밍",
    tagline: "월드 전체에 깔던 HISM 잔디를 플레이어 주변 격자만 올리는 방식으로 바꾸기",
    tags: ["HISM", "Streaming", "Landscape Grass", "Profiling"],
    problem:
      "잔디 후보는 약 1,423만 개이고, 처음에는 시작할 때 월드 전체에 한 번에 깔았습니다. 인스턴스 상한에 닿으면 격자 순서상 뒤쪽에는 잔디가 생기지 않았고, 시작도 느렸습니다.",
    approach: [
      "2000cm 격자를 모두 만들어 두고, 플레이어 반경 안의 격자만 HISM을 가집니다.",
      "반경은 품종의 끝 컬링 거리에 여유 1000cm를 더한 값입니다. 내릴 때는 1000cm 더 멀어져야 해서 경계에서 로드와 언로드가 반복되지 않습니다.",
      "첫 반경은 예산 없이 한 번에 올리고, 이후는 프레임당 2ms 안에서 가까운 격자부터 올립니다.",
      "삽으로 판 자리는 격자에 기록해 두고, 다시 올릴 때 되살아나지 않게 합니다.",
      "토글 하나로 기존 방식과 바꿀 수 있고, stat 그룹과 Insights 이벤트로 두 방식을 같은 위치에서 비교했습니다.",
    ],
    metrics: {
      caption: "시작 시 실행 로그. 스트리밍 값은 시작 위치에 따라 달라집니다.",
      head: ["", "스트리밍 끔", "스트리밍 켬"],
      rows: [
        ["로드한 격자", "12,500개 (전체)", "100~115개 (약 0.9%)"],
        ["인스턴스", "2,000,000", "약 1.4만 ~ 8.8만"],
        ["초기화", "7,865ms", "6~14ms"],
        ["시작 적재", "초기화에 포함", "305~411ms"],
      ],
    },
    code: {
      title: "앵커 거리로 로드와 언로드 대상 고르기",
      file: "Grass/DynamicLandscapeGrassStreaming.cpp",
      lang: "cpp",
      code: `for (int32 GridIndex = 0; GridIndex < Grids.Num(); ++GridIndex)
{
    const FDynamicGrassGrid& Grid = Grids[GridIndex];
    const FVector2D GridMax = Grid.Min + Grid.Size;
    double Distance = TNumericLimits<double>::Max();
    for (const FVector2D& Anchor : Anchors) Distance = FMath::Min(Distance, DistanceToRect(Anchor, Grid.Min, GridMax));
    if (Grid.bLoaded)
    {
        if (Distance > Grid.LoadRadius + StreamUnloadHysteresis) UnloadGrid(GridIndex);
    }
    else if (Distance <= Grid.LoadRadius)
    {
        Loads.Emplace(Distance, GridIndex);
    }
}

// 가까운 격자가 맨 뒤에 오도록 멀리 있는 순서로 정렬합니다. 뒤에서부터 꺼내 씁니다.
Loads.Sort([](const TPair<double, int32>& A, const TPair<double, int32>& B) { return A.Key > B.Key; });
PendingLoads.Reset(Loads.Num());
for (const TPair<double, int32>& Load : Loads) PendingLoads.Add(Load.Value);`,
    },
    result: [
      "시작 시간이 7.9초에서 약 0.3~0.4초로 줄었습니다.",
      "인스턴스 상한이 월드 전체가 아니라 올라와 있는 격자의 합계에만 적용됩니다.",
      "남은 비용은 시작할 때 한 번 생기는 동기 적재입니다.",
    ],
  },
  {
    id: "crow-state-tree",
    index: "03",
    title: "까마귀 StateTree: 열매 먹기와 수레 탑승",
    tagline: "행동 세 개를 한 트리에 합치면서 서로 굶기지 않고, 끊겨도 자원이 새지 않게 만들기",
    tags: ["StateTree", "Custom Task", "Transition Priority", "Resource Ownership"],
    problem:
      "까마귀는 열매를 먹고, 수레에 앉아 쪼고, 땅에서 쉽니다. 한 트리에 합치려면 셋이 동시에 가능할 때 무엇이 이기는지, 맞았을 때 어디서 도망 상태로 들어가는지, 중간에 끊긴 행동이 잡아 둔 열매와 수레 자리를 어떻게 돌려주는지를 정해야 했습니다.",
    approach: [
      "Transition은 날고 있는 상태의 자손에만 걸고, 순서로 우선순위를 정합니다. 열매, 수레, 땅 착지 순입니다.",
      "서로 굶기지 않게 쿨다운은 C++에 둡니다. 먹은 뒤, 내린 뒤, 도망친 뒤에 각각 다시 하기까지 기다리는 시간이 있습니다.",
      "맞았을 때 도망 플래그는 C++ 이벤트가 활성화하고, 트리는 플래그를 읽는 조건으로 도망 상태에 들어갑니다.",
      "도망 전이를 완료 전이보다 위에 둡니다. 순서가 반대면 같은 틱에 실패 전이가 먼저 걸려 도망 상태를 건너뜁니다.",
      "모든 태스크의 ExitState가 자기가 잡은 열매 예약, 수레 자리, 소켓 부착을 돌려줍니다.",
    ],
    code: {
      title: "수레 위에 앉아 있는 태스크",
      file: "Crow/StateTree/CrowStateTreeTasks.cpp",
      lang: "cpp",
      code: `EStateTreeRunStatus FCrowRideWagonTask::Tick(FStateTreeExecutionContext& Context, const float DeltaTime) const
{
    FInstanceDataType& Data = Context.GetInstanceData(*this);
    ACrow* Crow = Data.Crow;
    if (!IsValid(Crow)) return EStateTreeRunStatus::Failed;
    // 공격받아 이미 떠났다면(도망 시작) 실패로 끝내 도망 상태로 넘깁니다.
    if (Crow->IsFleeing()) return EStateTreeRunStatus::Failed;
    if (Crow->UpdateWagonRide(DeltaTime)) return EStateTreeRunStatus::Running;
    // 머무는 시간이 끝났거나 수레가 사라졌습니다. 날아올라 떠납니다.
    if (Crow->IsOnWagon()) Crow->LeaveWagon();
    return EStateTreeRunStatus::Succeeded;
}

void FCrowRideWagonTask::ExitState(FStateTreeExecutionContext& Context, const FStateTreeTransitionResult& Transition) const
{
    // 앉은 채 다른 이유로 끊겼다면(경직 해제 전이 등) 허공에 붙은 채 남지 않게 날아오르며 떠납니다.
    FInstanceDataType& Data = Context.GetInstanceData(*this);
    if (IsValid(Data.Crow) && Data.Crow->IsOnWagon()) Data.Crow->LeaveWagon();
}`,
    },
    result: [
      "노드는 태스크 8개, 조건 5개, 평가자 1개이고, 트리 연결은 에디터에서 합니다.",
      "행동 빈도는 BP 수치(EatCooldown, BoardInterval 등)로 조정하고 트리는 그대로 둡니다.",
      "어느 상태에서 어디로 전이해도, 경직이 풀려 재개돼도 예약이 남지 않습니다.",
    ],
  },
  {
    id: "seed-laser",
    index: "04",
    title: "충전 레이저 VFX와 네트워크 재생",
    tagline: "모았다가 떼면 쏘는 레이저를 소유자에게는 지연 없이, 다른 플레이어에게는 같은 세기로 보여 주기",
    tags: ["Niagara", "Client Prediction", "Cosmetic Event", "Python Authoring"],
    problem:
      "충전 시간과 광선 판정은 서버가 정합니다. 소유자 화면이 서버 응답을 기다리면 발사 연출이 왕복 지연만큼 늦고, 다른 플레이어에게는 충전하는 모습과 충전량이 따로 전달되어야 합니다.",
    approach: [
      "소유자는 버튼을 떼는 순간 로컬 트레이스로 광선과 피격을 먼저 그립니다. 서버 결과가 와도 소유자 화면에서는 다시 그리지 않습니다.",
      "다른 플레이어는 충전 시작과 종료, 발사 이벤트로 재생합니다. 발사 이벤트의 플래그 윗 7비트에 충전량을 실어 같은 세기로 그립니다.",
      "충전 종료 통지가 유실돼도 8초 뒤 스스로 사라집니다.",
      "시스템은 충전, 총구, 광선, 피격 네 개이고 충전량에 따라 층이 하나씩 켜집니다.",
      "메시는 Blender CLI, 텍스처 마스크는 NumPy, 시스템은 Python 커맨드렛으로 만듭니다. 시간표와 크기는 spec 파일 하나를 Niagara 스크립트와 미리보기가 함께 읽습니다.",
      "효과 크기, 광선 굵기, 불빛 세기는 BP 속성으로 열어 두어 Niagara를 다시 조립하지 않고 조정합니다.",
    ],
    code: {
      title: "발사 이벤트: 소유자는 이미 그렸으므로 건너뜀",
      file: "Tools/SeedLauncherTool.cpp",
      lang: "cpp",
      code: `if (Event.Kind == static_cast<uint8>(EToolCosmeticKind::LaserFire))
{
    const bool bHit = (Event.Flags & ToolCosmetic::LaserFlag::Hit) != 0;
    // 소유자는 이미 발사 연출과 VFX를 예측해서 재생했으므로 다른 플레이어의 화면에서만 몸과 무기 몽타주, VFX를 재생합니다.
    if (!IsOwnerLocal())
    {
        PlayBodyFireMontage(GetOwnerCharacter(), ThirdPersonFireMontage);
        PlayFireMontage(this, WeaponFireMontage, TEXT("weapon"));
        PlayLaserFireEffects(Muzzle->GetComponentLocation(), Event.Location, bHit, Event.Normal,
            ToolCosmetic::LaserFlag::UnpackCharge(Event.Flags), Event.Seed, nullptr);
    }
    OnLaserFired(Muzzle->GetComponentLocation(), Event.Location, bHit);
    return;
}`,
    },
    result: [
      "소유자는 서버 응답을 기다리지 않고 발사 연출을 봅니다.",
      "다른 플레이어 화면에서도 충전량에 따라 같은 세기로 그려집니다.",
      "머티리얼 컴파일 결과(인스트럭션 수)와 Niagara 컴파일 결과가 리포트 파일로 남습니다.",
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
