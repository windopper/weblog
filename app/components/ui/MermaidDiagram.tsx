'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      import('mermaid').then((mermaid) => {
        mermaid.default.initialize({ 
          startOnLoad: true,
          theme: 'dark',
          securityLevel: 'loose',
        });
        
        mermaid.default.run({
          nodes: [ref.current as HTMLElement]
        });
      });
    }
  }, [chart]);

  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  );
} 