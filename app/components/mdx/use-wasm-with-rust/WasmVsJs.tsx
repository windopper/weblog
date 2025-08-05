'use client';

import { useState, useEffect } from "react";
import WasmvsJsResultCard from "./WasmvsJsResultCard";

const N = 999999; // 더 작은 값으로 조정
const ITERATIONS = 10; // 측정 반복 횟수 증가
const WARMUP_ITERATIONS = 1; // 웜업 실행 횟수 증가

type BenchmarkResult = {
    times: number[];
    average: number;
    min: number;
    max: number;
    median: number;
};

type TestFunction = {
    name: string;
    wasmFn: (n: number) => any;
    jsFn: (n: number) => any;
    description: string;
};

type WasmModule = {
    forloop: (n: number) => any;
    complex_calculation: (n: number) => any;
    memory_intensive: (n: number) => any;
    float_calculation: (n: number) => any;
    string_processing: (n: number) => any;
    conditional_loop: (n: number) => any;
    default: () => Promise<any>;
};

export default function WasmVsJs() {
    const [results, setResults] = useState<{
        [key: string]: { wasm: BenchmarkResult; js: BenchmarkResult };
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentTest, setCurrentTest] = useState<string>('');
    const [wasmModule, setWasmModule] = useState<WasmModule | null>(null);
    const [isWasmLoading, setIsWasmLoading] = useState(true);
    const [wasmError, setWasmError] = useState<string | null>(null);

    // WASM 모듈 동적 로딩
    useEffect(() => {
        const loadWasm = async () => {
            try {
                setIsWasmLoading(true);
                setWasmError(null);
                
                // WASM 모듈을 동적으로 로드
                const wasmModule = await import("@/examples/wasm/pkg/wasm");
                
                // WASM 모듈 초기화
                await wasmModule.default();
                
                // 필요한 함수들이 존재하는지 확인
                const requiredFunctions = [
                    'forloop', 'complex_calculation', 'memory_intensive',
                    'float_calculation', 'string_processing', 'conditional_loop'
                ] as const;
                
                for (const funcName of requiredFunctions) {
                    if (typeof (wasmModule as any)[funcName] !== 'function') {
                        throw new Error(`WASM 함수 ${funcName}을 찾을 수 없습니다.`);
                    }
                }
                
                setWasmModule(wasmModule as unknown as WasmModule);
            } catch (err) {
                console.error("WASM 로딩 오류:", err);
                setWasmError(err instanceof Error ? err.message : "WASM 모듈 로딩에 실패했습니다.");
            } finally {
                setIsWasmLoading(false);
            }
        };
        
        loadWasm();
    }, []);

    // 테스트 함수들 정의 (WASM 모듈이 로드된 후에만 사용)
    const getTestFunctions = (): TestFunction[] => {
        if (!wasmModule) return [];
        
        return [
            {
                name: 'forloop',
                wasmFn: wasmModule.forloop,
                jsFn: (n: number) => {
                    let result = 0;
                    for (let i = 0; i < n; i++) {
                        result += 1;
                    }
                    return result;
                },
                description: '기본 반복문'
            },
            {
                name: 'complex_calculation',
                wasmFn: wasmModule.complex_calculation,
                jsFn: (n: number) => {
                    let result = 0;
                    for (let i = 0; i < n; i++) {
                        result += i * i;
                    }
                    return result;
                },
                description: '복잡한 수학 계산'
            },
            {
                name: 'memory_intensive',
                wasmFn: wasmModule.memory_intensive,
                jsFn: (n: number) => {
                    const arr = [];
                    for (let i = 0; i < n; i++) {
                        arr.push(i);
                    }
                    return arr.reduce((sum, val) => sum + val, 0);
                },
                description: '메모리 집약적 작업'
            },
            {
                name: 'float_calculation',
                wasmFn: wasmModule.float_calculation,
                jsFn: (n: number) => {
                    let sum = 0;
                    for (let i = 0; i < n; i++) {
                        sum += Math.sqrt(i);
                    }
                    return sum;
                },
                description: '부동소수점 계산'
            },
            {
                name: 'string_processing',
                wasmFn: wasmModule.string_processing,
                jsFn: (n: number) => {
                    let totalLength = 0;
                    for (let i = 0; i < n; i++) {
                        const s = `number_${i}`;
                        totalLength += s.length;
                    }
                    return totalLength;
                },
                description: '문자열 처리'
            },
            {
                name: 'conditional_loop',
                wasmFn: wasmModule.conditional_loop,
                jsFn: (n: number) => {
                    let count = 0;
                    for (let i = 0; i < n; i++) {
                        if (i % 2 === 0) {
                            count += i;
                        } else {
                            count += i * 2;
                        }
                    }
                    return count;
                },
                description: '조건부 분기'
            }
        ];
    };

    // 중앙값 계산 함수
    const calculateMedian = (numbers: number[]) => {
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
        return sorted[middle];
    };

    // 더 정확한 측정을 위한 함수
    const measureExecutionTime = async (fn: () => any, iterations: number, name: string) => {
        const times: number[] = [];
        
        // 가비지 컬렉션 힌트
        if (window.gc) {
            window.gc();
        }
        
        // 브라우저가 안정화될 때까지 대기
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        for (let i = 0; i < iterations; i++) {
            // 각 측정 전에 약간의 지연
            if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            
            const start = performance.now();
            const result = await fn();
            const end = performance.now();
            
            const duration = end - start;
            times.push(duration);
            
            console.log(`${name} 실행 ${i + 1}/${iterations}: ${duration.toFixed(2)}ms`);
        }
        
        const average = times.reduce((sum, time) => sum + time, 0) / times.length;
        const min = Math.min(...times);
        const max = Math.max(...times);
        const median = calculateMedian(times);
        
        return { times, average, min, max, median };
    };

    // 웜업 함수
    const warmup = async (fn: () => any, iterations: number, name: string) => {
        console.log(`${name} 웜업 시작...`);
        for (let i = 0; i < iterations; i++) {
            await fn();
            // 웜업 중에도 약간의 지연
            await new Promise(resolve => setTimeout(resolve, 5));
        }
        console.log(`${name} 웜업 완료`);
    };

    const runBenchmark = async (testFunction: TestFunction) => {
        if (!wasmModule) {
            console.error("WASM 모듈이 로드되지 않았습니다.");
            return;
        }

        setCurrentTest(testFunction.name);
        setIsLoading(true);
        
        try {
            // WASM 웜업 및 측정
            await warmup(async () => await testFunction.wasmFn(N), WARMUP_ITERATIONS, `Wasm ${testFunction.name}`);
            const wasmResults = await measureExecutionTime(async () => await testFunction.wasmFn(N), ITERATIONS, `Wasm ${testFunction.name}`);
            
            // JS 웜업 및 측정
            await warmup(() => testFunction.jsFn(N), WARMUP_ITERATIONS, `JS ${testFunction.name}`);
            const jsResults = await measureExecutionTime(() => testFunction.jsFn(N), ITERATIONS, `JS ${testFunction.name}`);
            
            setResults(prev => ({
                ...prev,
                [testFunction.name]: { wasm: wasmResults, js: jsResults }
            }));
            
            console.log(`${testFunction.name} 최종 결과:`, { wasm: wasmResults, js: jsResults });
        } catch (error) {
            console.error(`${testFunction.name} 실행 오류:`, error);
        } finally {
            setIsLoading(false);
            setCurrentTest('');
        }
    };

    const runAllBenchmarks = async () => {
        if (!wasmModule) {
            console.error("WASM 모듈이 로드되지 않았습니다.");
            return;
        }

        setIsLoading(true);
        const testFunctions = getTestFunctions();
        for (const testFunction of testFunctions) {
            await runBenchmark(testFunction);
        }
    };

    const getSpeedupRatio = (wasmTime: number, jsTime: number) => {
        return jsTime / wasmTime;
    };

    // WASM 로딩 중이거나 오류가 있는 경우 표시
    if (isWasmLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-zinc-400 bg-zinc-800 rounded-lg p-4 flex items-center gap-3 border border-zinc-700">
                    <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"></div>
                    WASM 모듈 로딩 중...
                </div>
            </div>
        );
    }

    if (wasmError) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-700">
                    <div className="font-semibold mb-2">WASM 로딩 오류</div>
                    <div className="text-sm">{wasmError}</div>
                </div>
            </div>
        );
    }

    const testFunctions = getTestFunctions();

    return (
        <div className="space-y-6">
            {/* 컨트롤 버튼들 */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button 
                    onClick={runAllBenchmarks}
                    disabled={isLoading || !wasmModule}
                    className={`
                        px-3 py-1 rounded-lg font-medium transition-all duration-200
                        ${isLoading || !wasmModule
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-zinc-600 text-zinc-100 hover:bg-zinc-500 active:bg-zinc-700'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg hover:shadow-xl shadow-zinc-900/50 cursor-pointer
                    `}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"></div>
                            모든 테스트 실행 중...
                        </span>
                    ) : (
                        '모든 테스트 실행'
                    )}
                </button>
            </div>
            
            {/* 결과 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testFunctions.map((testFunction) => {
                    const result = results[testFunction.name];
                    const isCurrentTest = currentTest === testFunction.name;
                    
                    return (
                        <WasmvsJsResultCard
                            key={testFunction.name}
                            testName={testFunction.name}
                            description={testFunction.description}
                            wasmResult={result?.wasm}
                            jsResult={result?.js}
                            isLoading={isCurrentTest}
                            onRunTest={() => runBenchmark(testFunction)}
                        />
                    );
                })}
            </div>
            
            {/* 전체 성능 요약 테이블 */}
            {Object.keys(results).length > 0 && (
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-lg">
                    <div className="font-bold text-xl mb-2 text-zinc-100">전체 성능 요약</div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-700">
                                    <th className="text-left p-3 font-semibold text-zinc-300">테스트</th>
                                    <th className="text-left p-3 font-semibold text-zinc-300">WASM (ms)</th>
                                    <th className="text-left p-3 font-semibold text-zinc-300">JS (ms)</th>
                                    <th className="text-left p-3 font-semibold text-zinc-300">속도 향상</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {testFunctions.map((testFunction) => {
                                    const result = results[testFunction.name];
                                    if (!result) return null;
                                    
                                    const speedup = getSpeedupRatio(result.wasm.average, result.js.average);
                                    const isWasmFaster = speedup > 1;
                                    
                                    return (
                                        <tr key={testFunction.name} className="hover:bg-zinc-800/50 transition-colors duration-150">
                                            <td className="p-3 text-zinc-100">{testFunction.description}</td>
                                            <td className="p-3 font-mono text-zinc-100">{result.wasm.median.toFixed(2)}</td>
                                            <td className="p-3 font-mono text-zinc-100">{result.js.median.toFixed(2)}</td>
                                            <td className="p-3 font-mono">
                                                <span className={`font-semibold ${
                                                    isWasmFaster ? 'text-blue-400' : 'text-emerald-400'
                                                }`}>
                                                    {speedup > 1 ? `${speedup.toFixed(2)}x` : `${(1/speedup).toFixed(2)}x`}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}