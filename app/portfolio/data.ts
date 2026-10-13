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
  problem: string[];
  approach: { heading: string; body: string }[];
  code: CodeSample[];
  result: string[];
  media: MediaItem;
};

export const project = {
  name: "Green The Unknown",
  subtitle: "씨앗을 쏘아 황폐한 대지를 되살리는 멀티플레이 1인칭 액션",
  role: "클라이언트 프로그래머 · 1인 개발",
  period: "2026.09.18 ~ 진행 중",
  engine: "Unreal Engine 5.8 · C++",
  description:
    "씨앗 발사기, 삽, 물뿌리개로 황폐한 땅을 녹화(Greening)하고, 지역의 보스를 쓰러뜨려 대지를 되살리는 게임입니다. 서버가 월드 상태를 소유하는 리슨 서버 멀티플레이를 전제로 처음부터 설계했습니다.",
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
    area: "게임플레이 · 시스템",
    detail:
      "도구(삽·물뿌리개·씨앗 발사기 등)와 스킬 슬롯, 업그레이드·개조 선반, 상점·자판기, 수레 운전, 사망·부활, 상태 이상",
  },
  {
    area: "월드 · 네트워크",
    detail:
      "녹화 마스크와 식물 성장, 스테이지 상태 동기화, 레벨 전환과 로딩 동기화, 랜드스케이프 잔디 스트리밍",
  },
  {
    area: "AI · 전투",
    detail:
      "엔티티 베이스 클래스, StateTree 기반 보스·까마귀 AI, 몽타주 노티파이 기반 타격 판정",
  },
  {
    area: "툴링 · 파이프라인",
    detail:
      "Blender·Niagara·머티리얼을 코드로 생성하는 Python 자동화 스크립트 100여 개, 기능별 설계 문서",
  },
  {
    area: "아트 · VFX (보조)",
    detail:
      "스타일라이즈드 로우폴리 모델링, 애니메이션, Niagara 이펙트. 프로그래밍 협업 이해를 위해 직접 제작",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "stage-sync",
    index: "01",
    title: "멀티플레이 스테이지 동기화",
    tagline:
      "수백만 픽셀의 녹화 마스크와 수만 그루의 식물을 신뢰성 버퍼를 넘치지 않게 클라이언트에 흘려 보내기",
    tags: ["Replication", "Reliable RPC", "Flow Control", "zlib"],
    problem: [
      "녹화 상태는 1024×1024 마스크 3장(녹화·수분·거친 흙)과 최대 2만 그루의 식물입니다. 변경은 한 프레임에 수천 픽셀씩 일어나고, 중간에 접속하는 플레이어도 같은 월드를 봐야 합니다.",
      "Reliable RPC를 그대로 쏘면 UE의 신뢰성 번치 버퍼(256개)가 넘쳐 연결이 끊어집니다. 반대로 UPROPERTY 복제에 맡기기에는 배열이 너무 큽니다.",
    ],
    approach: [
      {
        heading: "더티 타일 + 전송 시점 읽기",
        body: "서버는 변경 영역을 128×128 타일 단위로 모으되, 타일마다 실제로 바뀐 픽셀의 경계만 합칩니다. 큐에는 데이터가 아니라 \"무엇을 보낼지\"(관리자·계층·영역)만 넣고, 보내는 순간에 원본 배열을 읽습니다. 그래서 큐에서 기다리는 동안의 반복 수정이 한 번으로 합쳐지고 낡은 값은 나가지 않습니다.",
      },
      {
        heading: "바이트 예산 + 누적 ACK 흐름 제어",
        body: "클라이언트마다 0.1초 창에 32KB 바이트 예산을 두고, ACK를 받지 못한 채 날아가 있는 메시지를 최대 4개로 제한합니다. 신뢰성 채널이 순서를 보장하므로 ACK는 누적 번호 하나면 충분합니다. 타일은 zlib으로 압축하고, 이득이 없으면 원본 그대로 보냅니다.",
      },
      {
        heading: "늦은 접속자와 전체 동기화",
        body: "클라이언트가 월드와 모든 스테이지 관리자의 초기화를 마친 뒤 한 번만 동기화를 요청합니다. 서버는 그 전에 쌓인 변경을 버리고(전체 상태가 덮음) 마스크 전체 → 식물 그룹 → 식물 상태 → 완료 표시 순으로 큐에 넣습니다. 로딩 화면은 완료 표시를 받아야 걷히며, 서버가 응답하지 않아도 30초 뒤에는 통과시킵니다.",
      },
      {
        heading: "식물은 서버 시각으로 연출",
        body: "식물 성장·시듦은 ID와 서버 월드 시간(시작 시각 = 현재 − 경과)만 보내고, 각 클라이언트가 매 프레임 크기를 다시 계산합니다. 지연이 달라도 같은 진행도가 나오고, 중간 접속자는 진행 중인 성장 연출을 이어서 봅니다. 메시지 순서는 그룹 정의 → 추가 → 시듦 → 제거로 고정해 대상이 항상 존재하게 했습니다.",
      },
    ],
    code: [
      {
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
      {
        title: "더티 타일: 타일마다 바뀐 픽셀 경계만 합침",
        file: "Planting/StageNetTypes.h",
        lang: "cpp",
        code: `// 타일마다 바뀐 픽셀의 경계만 합쳐 두므로 서로 멀리 떨어진 두 곳을 고쳐도 그 사이 타일을 보내지 않습니다.
void Mark(const FIntRect& Bounds)
{
    if (!IsEnabled() || StageNet::IsEmptyRect(Bounds)) return;
    // ... Bounds를 [0, Resolution]로 클램프
    for (int32 TileY = MinY / StageNet::TileSize; TileY <= (MaxY - 1) / StageNet::TileSize; ++TileY)
        for (int32 TileX = MinX / StageNet::TileSize; TileX <= (MaxX - 1) / StageNet::TileSize; ++TileX)
        {
            // ... 타일 경계와 겹친 부분(Overlap)을 계산
            const int32 TileIndex = TileY * TilesPerRow + TileX;
            if (StageNet::IsEmptyRect(TileRects[TileIndex])) DirtyTiles.Add(TileIndex);
            StageNet::UnionRect(TileRects[TileIndex], Overlap);
        }
}`,
      },
      {
        title: "서버 시각 기준 성장 연출",
        file: "Planting/PlantingNetPlants.cpp",
        lang: "cpp",
        code: `if (bGrowing)
{
    State.bGrowing = true;
    State.StartScale = Growth.StartScale;
    State.EndScale = Growth.EndScale;
    State.Duration = Growth.Duration;
    // 성장이 시작된 서버 시각입니다(현재 시각 - 경과 시간).
    State.StartTime = GetNetPlantTime() - Growth.Age;
    State.Curve = Growth.Curve.Get();
}`,
      },
    ],
    result: [
      "마스크 1장의 변경은 타일(원본 최대 16KB) 단위로 합쳐져 흐르며, 클라이언트당 대역폭은 최대 약 320KB/s로 상한이 잡힙니다.",
      "전송 중에 같은 영역이 반복 수정돼도 큐 항목 하나로 합쳐집니다. 동기화를 요청하기 전의 변경은 아예 쌓지 않습니다.",
      "리슨 호스트는 원본을 이미 갖고 있어 받지 않고 원격 클라이언트에게만 보내며, 싱글플레이에서는 동기화 컴포넌트의 틱이 꺼집니다.",
    ],
    media: {
      src: "",
      kind: "youtube",
      alt: "호스트와 클라이언트의 녹화 확산이 동시에 보이는 화면",
      caption: "리슨 서버 호스트·클라이언트 화면 나란히 보기 (영상 준비 중)",
    },
  },
  {
    id: "greening",
    index: "02",
    title: "녹화 확산 시스템",
    tagline:
      "매 프레임 마스크 전체를 훑지 않고, 새로 닿은 고리 구간만 칠하는 확산 파도",
    tags: ["Landscape", "Render Target", "Algorithm", "Performance"],
    problem: [
      "보스를 쓰러뜨리면 그 자리에서 녹지가 스테이지 전체로 퍼집니다. 마스크는 1024×1024(약 100만 픽셀)이고 파도는 수 초 동안 이어지므로, 프레임마다 전체를 다시 계산하면 비용이 큽니다.",
      "거친 흙 위에서는 확산이 느려지고, 삽으로 파낸 자리는 다시 칠하면 안 됩니다. 또 변경 영역은 렌더 타깃, 잔디 컴포넌트, 네트워크 델타, 녹화율 집계 네 곳이 각자 필요로 합니다.",
    ],
    approach: [
      {
        heading: "고리 구간만 훑기",
        body: "바깥 반지름은 시간에 비례해 자라고, 이미 완전히 칠해진 안쪽 반지름(SaturatedRadius)은 다음 프레임부터 건너뜁니다. 한 줄(Y)마다 원의 교차 구간을 계산해, 안쪽 원이 지나는 줄은 왼쪽·오른쪽 고리 두 구간만 훑습니다.",
      },
      {
        heading: "픽셀별 속도와 매끄러운 가장자리",
        body: "거친 흙 가중치에 따라 픽셀마다 확산 속도가 다르므로, 가장 느린 픽셀이 다 찰 때까지 파도의 수명(CompletionDuration)을 늘립니다. 가장자리는 smoothstep 곡선으로 0~255 농도를 만들고, 기존 값보다 클 때만 덮어씁니다.",
      },
      {
        heading: "한 번의 변경을 네 곳에 흘리기",
        body: "칠한 픽셀의 경계 하나를 렌더 타깃 갱신용 DirtyMaskBounds와 네트워크용 GreeningNetDirty에 동시에 기록합니다. 두 표는 독립이라, 렌더 타깃 플러시가 네트워크 변경을 지우지 않습니다. 녹화율 합계는 바뀐 만큼의 차이만 더해 O(변경량)으로 갱신합니다.",
      },
    ],
    code: [
      {
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
    // 이 줄에서는 안쪽 원이 지나가므로 왼쪽·오른쪽 고리 구간만 훑습니다.
    const double InnerHalf = FMath::Sqrt(InnerRadius * InnerRadius - DY * DY);
    PaintRange(Y, DY, Wave.Origin.X - OuterHalf, Wave.Origin.X - InnerHalf);
    PaintRange(Y, DY, Wave.Origin.X + InnerHalf, Wave.Origin.X + OuterHalf);
}
GreeningNetDirty.Mark(NetChanged);
Wave.SaturatedRadius = static_cast<float>(FMath::Max(InnerRadius, NextSaturatedRadius));`,
      },
      {
        title: "가장자리 곡선과 합계의 차이 갱신",
        file: "Planting/PlantingGreeningWave.cpp",
        lang: "cpp",
        code: `const double Edge = FMath::Clamp((1.0 - Distance / LocalRadius) / GreeningWaveEdgeWidth, 0.0, 1.0);
const uint8 NewCoverage = static_cast<uint8>(FMath::RoundToInt(255.0 * Edge * Edge * (3.0 - 2.0 * Edge)));
uint8& Existing = MaskCoverage[PixelIndex];
if (NewCoverage <= Existing) continue;
// 픽셀별 최대 농도만 합계에 반영하며, 구멍 영역은 마스크에만 기록합니다.
if (IsGreeningAreaPixel(PixelIndex)) CoverageSum += NewCoverage - Existing;
Existing = NewCoverage;`,
      },
    ],
    result: [
      "프레임당 비용이 마스크 전체가 아니라 그 프레임에 새로 닿은 고리 면적에 비례합니다.",
      "서버만 파도를 계산하고 결과 마스크가 델타로 클라이언트에 흘러, 클라이언트에는 확산 로직이 없습니다.",
      "삽으로 파낸 자리와 랜드스케이프 구멍 영역은 녹화율 집계에서 빠지며, 이 영역은 에디터에서 베이크해 패키징에 포함합니다.",
    ],
    media: {
      src: "",
      kind: "youtube",
      alt: "보스 처치 후 녹지가 퍼지는 장면",
      caption: "처치 후 녹지 확산 (영상 준비 중)",
    },
  },
  {
    id: "entity-ai",
    index: "03",
    title: "엔티티 베이스와 StateTree AI",
    tagline:
      "보스와 까마귀가 체력·경직·사망 연출·네트워크 규칙을 공유하되, 각자 다른 방식으로 확장되게 만들기",
    tags: ["StateTree", "Class Design", "Animation Notify", "Replication"],
    problem: [
      "먼저 보스를 만들었고, 곧이어 까마귀(날아다니며 열매를 먹는 몹)가 필요해졌습니다. 체력, 상태 이상, 몽타주 복제, 씨앗 피격, 사망 연출은 두 쪽이 똑같아야 하는데, 보스 클래스에 갇혀 있었습니다.",
      "보스의 공격 타이밍을 프레임 번호나 타이머로 정하면 애니메이션을 고칠 때마다 코드가 어긋나고, 빠른 휘두르기가 프레임 사이로 대상을 건너뛰기도 합니다.",
    ],
    approach: [
      {
        heading: "AGreenEntity 추출과 확장점 3개",
        body: "공통 흐름을 추상 APawn 베이스로 올리고, 사망 처리를 서버 전용 → 모든 머신(연출 직전) → 모든 머신(연출 직후) 세 확장점으로 쪼갰습니다. 보스는 팀 공유 상태 정리와 부활 처리를, 까마귀는 문 열매를 놓는 일을 해당 지점에 덧붙입니다. 기존 프로퍼티·BP 이벤트 이름은 유지해 레벨과 블루프린트에 저장된 값이 그대로 남도록 했습니다.",
      },
      {
        heading: "StateTree는 흐름만, 동작은 서버 함수로",
        body: "까마귀의 이륙·배회·착지·섭취는 StateTree 태스크로 만들되, 이동과 열매 처리는 ACrow의 서버 전용 함수가 하고 노드는 \"언제 무엇을 할지\"만 정합니다. 전역 이밸류에이터가 먹을 열매와 올라탈 수레를 주기적으로 찾아 두고, 조건 노드가 그 결과를 읽습니다. 이륙과 착지에는 타임아웃을 두어 막힌 경우에도 상태가 끝나게 했습니다.",
      },
      {
        heading: "노티파이로 정하는 타격 판정",
        body: "공격의 조준 구간, 타격 구간, 후속타는 몽타주 노티파이가 정합니다. 타격 구간에서는 뿌리 관절 체인 사이를 캡슐로 이어 휘는 부위도 모양대로 판정하고, 지난 프레임 캡슐 위치에서 지금 위치까지 쓸어(sweep) 빠른 휘두르기가 대상을 건너뛰지 않게 합니다. 구간 하나에서 대상당 한 번만 맞습니다.",
      },
      {
        heading: "서버는 판정, 클라이언트는 연출",
        body: "AI, 공격 판정, 대미지는 서버(리슨 호스트 포함)만 하고, 몽타주 재생·피격 이펙트·상흔·카메라 흔들림은 멀티캐스트나 복제 상태를 받은 각 머신이 재생합니다. 카메라 흔들림은 각 머신이 자기 플레이어와의 거리로 세기를 정해 한 번씩만 흔듭니다.",
      },
    ],
    code: [
      {
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
      {
        title: "사망 처리 확장점 3개",
        file: "Entity/GreenEntity.h",
        lang: "cpp",
        code: `// 처치 처리의 확장점입니다. HandleHealthDepleted가 이 순서로 부릅니다.
// 1) 서버에서만: 기본 구현은 무적을 걸고 AI를 멈춥니다. 오버라이드는 Super를 먼저 부른 뒤 서버 전용 후처리를 덧붙입니다.
virtual void HandleDefeatServer(AActor* Killer);
// 2) 모든 머신, PlayDefeat 직전: 스태거·경직 자세가 이미 풀린 뒤입니다.
virtual void HandleDefeatBeforePlay();
// 3) 모든 머신, PlayDefeat 직후: 기본 구현은 블루프린트 OnEntityDefeated를 부릅니다.
virtual void HandleDefeatAfterPlay();`,
      },
      {
        title: "StateTree 노드는 흐름만 정함",
        file: "Crow/StateTree/CrowStateTreeTasks.h",
        lang: "cpp",
        code: `// 지면에서 웅크렸다 박차고(도약) 비스듬히 급상승하며 최저 고도(MinAltitude)에 도달하면 성공합니다.
// 이미 높이 떠 있으면 바로 성공합니다.
USTRUCT(meta=(DisplayName="Crow Take Off", Category="Crow"))
struct GREENTHEUNKNOWN_API FCrowTakeOffTask : public FStateTreeTaskCommonBase
{
    GENERATED_BODY()
    using FInstanceDataType = FCrowTakeOffTaskInstanceData;

    virtual EStateTreeRunStatus EnterState(FStateTreeExecutionContext& Context, const FStateTreeTransitionResult& Transition) const override;
    virtual EStateTreeRunStatus Tick(FStateTreeExecutionContext& Context, const float DeltaTime) const override;
    virtual void ExitState(FStateTreeExecutionContext& Context, const FStateTreeTransitionResult& Transition) const override;
};`,
      },
    ],
    result: [
      "보스(고목)와 까마귀가 같은 베이스를 쓰고, 새 엔티티는 \"베이스 상속 + 사망 확장점 + StateTree 지정\"만으로 만들 수 있습니다. 설계 문서에 절차를 남겼습니다.",
      "공격 타이밍은 애니메이션 에셋에 있으므로, 애니메이터가 몽타주를 고쳐도 코드를 건드릴 필요가 없습니다.",
      "리슨 서버 구성에서 서버 전용 로직과 모든 머신 연출이 한 클래스 안에서 함수 단위로 분리됩니다.",
    ],
    media: {
      src: "",
      kind: "youtube",
      alt: "고목 보스 전투와 까마귀 AI",
      caption: "보스 전투 / 까마귀 이착륙 (영상 준비 중)",
    },
  },
];

export const otherWork: { title: string; detail: string }[] = [
  {
    title: "도구와 스킬 시스템",
    detail: "도구별 슬롯 1~4 스킬 틀, 쿨타임 비복제 + 결과 RPC, 도구 인스턴스·버리기·줍기",
  },
  {
    title: "업그레이드 · 개조 선반",
    detail: "도구에 귀속되는 데이터 주도 업그레이드와 카드형 개조 선반, 팀 공유 해금",
  },
  {
    title: "수레 (운전 · 연료)",
    detail: "전진 4단·조향 규칙, 까마귀 탑승·도망 연동, 도구 걸이 모듈",
  },
  {
    title: "사망 · 부활",
    detail: "랙돌 연출, 부활 컴포넌트, 사망 UI와 마커, 보스 어그로 초기화",
  },
  {
    title: "상태 이상",
    detail: "경직·젖음. 경직 후 재면역 시간과 보스 상한 처리, 보스 AI 일시정지",
  },
  {
    title: "랜드스케이프 잔디 스트리밍",
    detail: "거리 기반 잔디 로딩 토글과 삽질 복원 규칙",
  },
  {
    title: "발소리와 Foot IK",
    detail: "AnimNotify 박자, PhysicalMaterial 지면 구분, Foot Placement 연동",
  },
  {
    title: "VFX 파이프라인",
    detail: "Blender → Niagara를 커맨드렛과 Python으로 생성하고, 수치는 BP·Niagara 파라미터로 노출",
  },
];

export const techStack: { group: string; items: string[] }[] = [
  {
    group: "Engine",
    items: [
      "Unreal Engine 5.8",
      "C++ (Gameplay Framework)",
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
