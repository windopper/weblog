    import { SiClaude, SiCloudflareworkers, SiGithub, SiGooglegemini, SiMysql, SiNextdotjs, SiSqlite, SiVercel } from "react-icons/si";
import ArchitectureElement from "./ArchitectureElement";
import ArchitecturePath from "./ArchitecturePath";
import { useRef } from "react";
import { TbWorldSearch } from "react-icons/tb";
import { Webhook } from "lucide-react";

export default function Architecture() {
  const cloudflare = useRef<HTMLDivElement>(null);
  const nextjs = useRef<HTMLDivElement>(null);
  const sqlite = useRef<HTMLDivElement>(null);
  const ai = useRef<HTMLDivElement>(null);
  const worldSearch = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const webhook = useRef<HTMLDivElement>(null);
  const vercel = useRef<HTMLDivElement>(null);
  const github = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="flex flex-col gap-16 w-full relative">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-center gap-16">
          <div ref={sqlite}>
            <ArchitectureElement icon={<SiSqlite size={32} />} />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-16">
          <div ref={worldSearch} className="flex justify-center">
            <ArchitectureElement icon={<TbWorldSearch size={32} />} />
          </div>
          <div ref={cloudflare} className="flex justify-center">
            <ArchitectureElement icon={<SiCloudflareworkers size={32} />} />
          </div>
          <div ref={ai} className="flex justify-center">
            <ArchitectureElement
              icon={
                <div className="flex flex-row gap-2">
                  <SiGooglegemini size={32} />
                  <SiClaude size={32} />
                </div>
              }
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-16">
          <div ref={github}>
            <ArchitectureElement icon={<SiGithub size={32} />} />
          </div>
          <div ref={vercel}>
            <ArchitectureElement icon={<SiVercel size={32} />} />
          </div>
          <div ref={webhook}>
            <ArchitectureElement icon={<Webhook size={32} />} />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-16">
          <div ref={nextjs}>
            <ArchitectureElement icon={<SiNextdotjs size={32} />} />
          </div>
        </div>
      </div>
      <ArchitecturePath
        containerRef={containerRef}
        from={worldSearch}
        to={cloudflare}
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={vercel}
      />
      <ArchitecturePath containerRef={containerRef} from={vercel} to={nextjs} />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={webhook}
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={sqlite}
        to={cloudflare}
        reverse
      />
      <ArchitecturePath containerRef={containerRef} from={cloudflare} to={ai} />
      <ArchitecturePath
        containerRef={containerRef}
        from={cloudflare}
        to={ai}
        reverse
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={github}
        to={vercel}
      />
      <ArchitecturePath
        containerRef={containerRef}
        from={github}
        to={cloudflare}
        reverse
        curvature={-45}
      />
    </div>
  );
}
