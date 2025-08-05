"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function WasmAlertComponent() {
  const [greet, setGreet] = useState<Function | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // WASM 모듈을 동적으로 로드
        const greetModule = await import("@/examples/wasm/pkg/wasm");
        
        // greet 함수가 존재하는지 확인
        if (typeof greetModule.greet === 'function') {
          await greetModule.default();
          setGreet(() => greetModule.greet);
        } else {
          throw new Error("WASM greet 함수를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("WASM 로딩 오류:", err);
        setError(err instanceof Error ? err.message : "WASM 모듈 로딩에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWasm();
  }, []);

  const handleClick = () => {
    if (greet && typeof greet === 'function') {
      try {
        greet("world");
      } catch (err) {
        console.error("WASM 함수 실행 오류:", err);
        alert("WASM 함수 실행 중 오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-gray-500 bg-gray-100 rounded-lg p-2 flex items-center justify-center w-fit border-[1px] border-gray-300">
        WASM 로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-100 rounded-lg p-2 flex items-center justify-center w-fit border-[1px] border-red-300">
        오류: {error}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-blue-500 hover:text-blue-600 bg-blue-500/10 rounded-lg p-2
  flex items-center justify-center w-fit border-[1px] border-blue-500
  "
    >
      클릭하여 러스트 웹어셈블리 호출
    </div>
  );
}

const WasmAlert = dynamic(() => Promise.resolve(WasmAlertComponent), {
  ssr: false,
});

export default WasmAlert;