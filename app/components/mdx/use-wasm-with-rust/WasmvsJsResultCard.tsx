'use client';

type BenchmarkResult = {
    times: number[];
    average: number;
    min: number;
    max: number;
    median: number;
};

interface WasmvsJsResultCardProps {
    testName: string;
    description: string;
    wasmResult?: BenchmarkResult;
    jsResult?: BenchmarkResult;
    isLoading?: boolean;
    onRunTest?: () => void;
}

export default function WasmvsJsResultCard({ 
    testName, 
    description, 
    wasmResult, 
    jsResult,
    isLoading = false,
    onRunTest
}: WasmvsJsResultCardProps) {
    const hasResults = wasmResult && jsResult;
    
    const getSpeedupRatio = (wasmTime: number, jsTime: number) => {
        return jsTime / wasmTime;
    };

    const speedup = hasResults ? getSpeedupRatio(wasmResult.average, jsResult.average) : 0;
    const isWasmFaster = speedup > 1;

    const handleClick = () => {
        if (!hasResults && onRunTest && !isLoading) {
            onRunTest();
        }
    };

    // 임시 데이터 생성
    const getTempData = () => {
        const baseTime = Math.random() * 50 + 10; // 10-60ms
        const wasmTime = baseTime * (0.7 + Math.random() * 0.6); // 70%-130%
        const jsTime = baseTime * (0.8 + Math.random() * 0.8); // 80%-160%
        return {
            wasm: {
                median: wasmTime,
                average: wasmTime * (0.95 + Math.random() * 0.1),
                min: wasmTime * 0.9,
                max: wasmTime * 1.1
            },
            js: {
                median: jsTime,
                average: jsTime * (0.95 + Math.random() * 0.1),
                min: jsTime * 0.9,
                max: jsTime * 1.1
            }
        };
    };

    const tempData = !hasResults ? getTempData() : null;

    return (
        <div 
            className={`
                bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-lg transition-all duration-200 relative
                ${hasResults 
                    ? 'hover:shadow-xl' 
                    : 'hover:shadow-xl cursor-pointer hover:border-zinc-600 hover:bg-zinc-800/50'
                }
            `}
            onClick={handleClick}
        >
            {/* 제목 - 블러 제외 */}
            <div className="font-bold text-lg mb-3 text-zinc-100">{description}</div>
            
            {hasResults ? (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                            <div className="font-semibold text-zinc-300 flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                WASM
                            </div>
                            <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">중앙값:</span>
                                    <span className="font-mono font-medium text-zinc-100">{wasmResult.median.toFixed(2)}ms</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">평균:</span>
                                    <span className="font-mono font-medium text-zinc-100">{wasmResult.average.toFixed(2)}ms</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="font-semibold text-zinc-300 flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                JS
                            </div>
                            <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">중앙값:</span>
                                    <span className="font-mono font-medium text-zinc-100">{jsResult.median.toFixed(2)}ms</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">평균:</span>
                                    <span className="font-mono font-medium text-zinc-100">{jsResult.average.toFixed(2)}ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={`p-3 rounded-md ${
                        isWasmFaster 
                            ? 'bg-blue-900/20 border border-blue-700/50' 
                            : 'bg-emerald-900/20 border border-emerald-700/50'
                    }`}>
                        <p className="text-center font-semibold text-xs text-zinc-100">
                            <span className={`${isWasmFaster ? 'text-blue-400' : 'text-emerald-400'}`}>
                                {isWasmFaster ? 'WASM' : 'JS'} {Math.max(speedup, 1/speedup).toFixed(2)}x 빠름
                            </span>
                        </p>
                    </div>
                </>
            ) : (
                <>
                    {/* 임시 데이터 - 블러 처리 */}
                    <div className="blur-sm">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="space-y-2">
                                <div className="font-semibold text-zinc-300 flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    WASM
                                </div>
                                <div className="text-xs space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">중앙값:</span>
                                        <span className="font-mono font-medium text-zinc-100">{tempData?.wasm.median.toFixed(2)}ms</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">평균:</span>
                                        <span className="font-mono font-medium text-zinc-100">{tempData?.wasm.average.toFixed(2)}ms</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="font-semibold text-zinc-300 flex items-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    JS
                                </div>
                                <div className="text-xs space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">중앙값:</span>
                                        <span className="font-mono font-medium text-zinc-100">{tempData?.js.median.toFixed(2)}ms</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">평균:</span>
                                        <span className="font-mono font-medium text-zinc-100">{tempData?.js.average.toFixed(2)}ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-3 rounded-md bg-zinc-800/50 border border-zinc-600/50">
                            <p className="text-center font-semibold text-xs text-zinc-300">
                                <span className="text-zinc-400">
                                    클릭하여 실제 성능 측정
                                </span>
                            </p>
                        </div>
                    </div>
                    
                    {/* 클릭 안내 - absolute 중앙 배치 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-lg">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-6 h-6 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"></div>
                                <span className="text-zinc-400 text-sm">측정 중...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-zinc-400 text-sm">클릭하여 성능 비교</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
