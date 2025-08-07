'use client';

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CELL_SIZE = 10;
const GRID_COLOR = "#3f3f46";
const DEAD_COLOR = "#09090b";
const ALIVE_COLOR = "#a1a1aa";

// 특수 패턴들 정의
const PATTERNS = {
  glider: {
    name: "글라이더",
    cells: [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2]
    ]
  },
  spaceshipSmall: {
    name: "소형 우주선",
    cells: [
      [0, 1],
      [0, 4],
      [1, 0],
      [2, 0],
      [2, 4],
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3]
    ]
  },
  gun: {
    name: "글라이더 총",
    cells: [
      [0, 24],
      [1, 22],
      [1, 24],
      [2, 12],
      [2, 13],
      [2, 20],
      [2, 21],
      [2, 34],
      [2, 35],
      [3, 11],
      [3, 15],
      [3, 20],
      [3, 21],
      [3, 34],
      [3, 35],
      [4, 0],
      [4, 1],
      [4, 10],
      [4, 16],
      [4, 20],
      [4, 21],
      [5, 0],
      [5, 1],
      [5, 10],
      [5, 14],
      [5, 16],
      [5, 17],
      [5, 22],
      [5, 24],
      [6, 10],
      [6, 16],
      [6, 24],
      [7, 11],
      [7, 15],
      [8, 12],
      [8, 13]
    ]
  },
  locomotive: {
    name: "기관차",
    cells: [
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 1],
      [1, 3],
      [1, 4],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3]
    ]
  },
  beacon: {
    name: "비콘",
    cells: [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 3],
      [3, 2],
      [3, 3]
    ]
  },
  toad: {
    name: "두꺼비",
    cells: [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 0],
      [2, 1],
      [2, 2]
    ]
  },
  acorn: {
    name: "도토리",
    cells: [
      [0, 1],
      [1, 3],
      [2, 0],
      [2, 1],
      [2, 4],
      [2, 5],
      [2, 6]
    ]
  },
  diehard: {
    name: "다이하드",
    cells: [
      [0, 6],
      [1, 0],
      [1, 1],
      [2, 1],
      [2, 5],
      [2, 6],
      [2, 7]
    ]
  }
};

function WasmConwaysGameComponent() {
    const [universe, setUniverse] = useState<any | null>(null);
    const [Cell, setCell] = useState<any | null>(null);
    const [memory, setMemory] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const animationRef = useRef<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 84, height: 54 });
    const [speed, setSpeed] = useState(60);
    const tickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [renderTrigger, setRenderTrigger] = useState(0);

    useEffect(() => {
        const loadWasm = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const wasmModule = await import("@/examples/conway-wasm/pkg/conway_wasm");
                const wasmMemoryModule = await import("@/examples/conway-wasm/pkg/conway_wasm_bg.wasm");
                setCell(wasmModule.Cell);
                setMemory(wasmMemoryModule.memory);
                const uni = await wasmModule.Universe.new(dimensions.width, dimensions.height);
                setUniverse(uni);
                setGeneration(0);
            } catch (err) {
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        loadWasm();
    }, [dimensions.width, dimensions.height]);

    // 캔버스 렌더링
    useEffect(() => {
        if (!universe || !canvasRef.current || !Cell || !memory) return;
        const width = universe.width();
        const height = universe.height();
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        
        ctx.imageSmoothingEnabled = false;
        
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // 배경
        ctx.fillStyle = DEAD_COLOR;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // 셀 먼저 그리기
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = row * width + col;
                ctx.fillStyle = cells[idx] === Cell.Alive ? ALIVE_COLOR : DEAD_COLOR;
                ctx.fillRect(
                    col * CELL_SIZE,
                    row * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
        
        // 그리드 선
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 0.2;
        
        // 수평선
        for (let y = 0; y <= height; y++) {
            const yPos = y * CELL_SIZE;
            ctx.beginPath();
            ctx.moveTo(0, yPos);
            ctx.lineTo(width * CELL_SIZE, yPos);
            ctx.stroke();
        }
        
        // 수직선
        for (let x = 0; x <= width; x++) {
            const xPos = x * CELL_SIZE;
            ctx.beginPath();
            ctx.moveTo(xPos, 0);
            ctx.lineTo(xPos, height * CELL_SIZE);
            ctx.stroke();
        }
    }, [universe, generation, Cell, memory, renderTrigger]);

    // 애니메이션 루프
    useEffect(() => {
        if (!isRunning) {
            if (tickTimeoutRef.current) {
                clearTimeout(tickTimeoutRef.current);
                tickTimeoutRef.current = null;
            }
            return;
        }
        const step = () => {
            if (universe) {
                universe.tick();
                setGeneration((g) => g + 1);
            }
            tickTimeoutRef.current = setTimeout(step, speed);
        };
        tickTimeoutRef.current = setTimeout(step, speed);
        return () => {
            if (tickTimeoutRef.current) {
                clearTimeout(tickTimeoutRef.current);
                tickTimeoutRef.current = null;
            }
        };
    }, [isRunning, universe, speed]);

    // 셀 클릭 토글
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!universe || !canvasRef.current || !Cell || !memory) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX / CELL_SIZE);
        const y = Math.floor((e.clientY - rect.top) * scaleY / CELL_SIZE);
        if (x < 0 || y < 0 || x >= universe.width() || y >= universe.height()) return;
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, universe.width() * universe.height());
        const idx = y * universe.width() + x;
        const current = cells[idx];
        universe.set_cell(y, x, current === Cell.Alive ? Cell.Dead : Cell.Alive);
        setGeneration((g) => g + 1);
    };

    // 컨트롤 버튼
    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = async () => {
        setIsRunning(false);
        setIsLoading(true);
        setError(null);
        try {
            const wasmModule = await import("@/examples/conway-wasm/pkg/conway_wasm");
            const uni = await wasmModule.Universe.new(dimensions.width, dimensions.height);
            setUniverse(uni);
            setGeneration(0);
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 다음 틱
    const handleNextTick = () => {
        if (universe) {
            universe.tick();
            setGeneration((g) => g + 1);
        }
    };

    // 패턴 삽입 함수
    const insertPattern = (patternKey: keyof typeof PATTERNS) => {
        if (!universe || !Cell) return;
        
        const pattern = PATTERNS[patternKey];
        const width = universe.width();
        const height = universe.height();
        
        // 먼저 모든 셀을 죽음 상태로 초기화
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                universe.set_cell(row, col, Cell.Dead);
            }
        }
        
        // 중앙에 패턴 배치
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        
        // 패턴 크기 계산
        const maxRow = Math.max(...pattern.cells.map(cell => cell[0]));
        const maxCol = Math.max(...pattern.cells.map(cell => cell[1]));
        const minRow = Math.min(...pattern.cells.map(cell => cell[0]));
        const minCol = Math.min(...pattern.cells.map(cell => cell[1]));
        
        const patternWidth = maxCol - minCol + 1;
        const patternHeight = maxRow - minRow + 1;
        
        // 패턴 시작 위치
        const startX = centerX - Math.floor(patternWidth / 2);
        const startY = centerY - Math.floor(patternHeight / 2);
        
        // 패턴 셀들을 유니버스에 설정
        pattern.cells.forEach(([row, col]) => {
            const x = startX + col - minCol;
            const y = startY + row - minRow;
            
            // 경계 체크
            if (x >= 0 && x < width && y >= 0 && y < height) {
                universe.set_cell(y, x, Cell.Alive);
            }
        });
        
        setGeneration(0);
        setRenderTrigger(prev => prev + 1);
    };

    return (
      <div className="bg-zinc-950 text-zinc-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* 컨트롤 패널 */}
          <div className="bg-zinc-900/50 rounded-lg p-4 mb-4 border border-zinc-800/50">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="flex gap-2">
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isRunning
                      ? "bg-zinc-600 hover:bg-zinc-500 text-white"
                      : "bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={isRunning ? handlePause : handleStart}
                  disabled={isLoading || !!error}
                >
                  {isRunning ? "일시정지" : "시작"}
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  초기화
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-zinc-600 hover:bg-zinc-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNextTick}
                  disabled={isRunning || isLoading}
                >
                  다음 세대
                </button>
              </div>

              {/* 속도 컨트롤 */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-zinc-400 text-sm">속도</span>
                <div className="flex items-center gap-2 bg-zinc-800/30 px-3 py-1 rounded">
                  <span className="text-zinc-500 text-xs">빠름</span>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-24 h-1 bg-zinc-700 rounded appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #a1a1aa 0%, #a1a1aa ${
                        ((speed - 20) / 480) * 100
                      }%, #52525b ${
                        ((speed - 20) / 480) * 100
                      }%, #52525b 100%)`,
                    }}
                  />
                   <span className="text-zinc-500 text-xs">느림</span>
                </div>
                <div className="text-zinc-300 text-xs font-mono bg-zinc-800/30 px-2 py-1 rounded">
                  {(1000 / speed).toFixed(1)} gen/s
                </div>
              </div>

              {/* 세대 정보 */}
              <div className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded border border-zinc-700/50">
                <span className="text-zinc-400 text-sm">세대:</span>
                <span className="text-zinc-100 font-mono font-semibold">
                  {generation.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* 패턴 툴바 */}
          <div className="bg-zinc-900/30 rounded-lg p-3 mb-4 border border-zinc-800/30">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-zinc-400 text-sm font-medium mr-2">패턴:</span>
              {Object.entries(PATTERNS).map(([key, pattern]) => (
                <button
                  key={key}
                  className="px-3 py-1.5 rounded-md bg-zinc-800/50 hover:bg-zinc-700/70 text-zinc-200 text-xs font-medium transition-colors border border-zinc-700/30 hover:border-zinc-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => insertPattern(key as keyof typeof PATTERNS)}
                  disabled={isLoading || !!error}
                  title={`${pattern.name} 패턴을 중앙에 삽입합니다`}
                >
                  {pattern.name}
                </button>
              ))}
              <div className="ml-auto text-zinc-500 text-xs">
                클릭하여 패턴을 중앙에 삽입
              </div>
            </div>
          </div>

          {/* 게임 보드 */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="rounded-lg border border-zinc-800/50 overflow-hidden bg-zinc-950"
                style={{
                  background: `linear-gradient(135deg, ${DEAD_COLOR} 0%, #18181b 100%)`,
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={dimensions.width * CELL_SIZE}
                  height={dimensions.height * CELL_SIZE}
                  onClick={handleCanvasClick}
                  className="block cursor-crosshair select-none"
                  style={{
                    imageRendering: "pixelated",
                    background: DEAD_COLOR,
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>

              {/* 인터랙션 힌트 */}
              {!isRunning && !isLoading && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-zinc-500 text-xs">
                    클릭하여 셀을 토글할 수 있습니다
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 로딩 및 에러 상태 */}
          {isLoading && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded">
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin"></div>
                <span className="text-zinc-300 text-sm">
                  WebAssembly 모듈을 로딩 중...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 bg-red-950/50 px-4 py-2 rounded border border-red-900/50">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #a1a1aa;
            cursor: pointer;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }
          .slider::-webkit-slider-thumb:hover {
            background: #d4d4d8;
            transform: scale(1.1);
          }
          .slider::-moz-range-thumb {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #a1a1aa;
            cursor: pointer;
            border: none;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    );
}

const WasmConwaysGame = dynamic(() => Promise.resolve(WasmConwaysGameComponent), {
    ssr: false,
});

export default WasmConwaysGame;