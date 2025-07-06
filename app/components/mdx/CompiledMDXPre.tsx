'use client';

import { LucideCopy } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

interface CompiledMDXPreProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function CompiledMDXPre({ children, ...props }: CompiledMDXPreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  
  // data-language 추출
  const language = props["data-language"] || "text";
  
  // 재귀적으로 코드 텍스트 추출
  const getCodeText = (node: any): string => {
    if (typeof node === 'string') {
      return node;
    }
    
    if (typeof node === 'number') {
      return String(node);
    }
    
    if (Array.isArray(node)) {
      return node.map(getCodeText).join('');
    }
    
    if (node && typeof node === 'object') {
      if (node.props && node.props.children) {
        return getCodeText(node.props.children);
      }
      if (node.children) {
        return getCodeText(node.children);
      }
    }
    
    return '';
  };

  // 스크롤 여부 확인
  useEffect(() => {
    const checkScrollable = () => {
      if (preRef.current) {
        const isScrollable = preRef.current.scrollHeight > 500; // 500px는 maxHeight
        setShowExpandButton(isScrollable);
      }
    };

    checkScrollable();
    
    // 창 크기 변경 시에도 다시 확인
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = async () => {
    try {
      const codeText = getCodeText(children);
      await navigator.clipboard.writeText(codeText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-[10px] border-zinc-800 border-[1px] border-b-0 rounded-t-xl bg-zinc-950/50">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {language}
        </span>
        
        {/* 복사 버튼 */}
        <button
          onClick={copyToClipboard}
          className="group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-md 
                   hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50
                   text-zinc-400 hover:text-zinc-200"
          title={isCopied ? "복사됨!" : "코드 복사"}
        >
          {isCopied ? (
            <FaCheck className="w-4 h-4" />
          ) : (
            <LucideCopy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 코드 영역 */}
      <pre
        ref={preRef}
        {...props}
        style={{
          maxHeight: isExpanded ? "none" : "500px",
          overflowY: isExpanded ? "visible" : "auto",
          borderRadius: showExpandButton ? "0 0 0px 0px" : "0 0 12px 12px",
          margin: 0,
        }}
        className="p-4 text-wrap bg-zinc-950/30 backdrop-blur-sm thin-scrollbar
        "
      >
        {children}
      </pre>

      {/* 하단 확장/축소 버튼 - 스크롤이 필요할 때만 표시 */}
      {showExpandButton && (
        <div
          className="flex items-center justify-center gap-1 px-4 py-[10px] border-zinc-800 border-[1px] border-t-0 rounded-b-xl
          cursor-pointer hover:bg-zinc-900/50 transition-all duration-200 bg-zinc-950/30 backdrop-blur-sm
          group-hover:border-zinc-700/50"
          onClick={toggleExpanded}
        >
          <div className="flex items-center w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors"></div>
          <div className="flex items-center w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors"></div>
          <div className="flex items-center w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-colors"></div>
        </div>
      )}
    </div>
  );
}