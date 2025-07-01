import { 
    FaGithub, 
    FaReact, 
    FaPython, 
    FaJs, 
    FaNodeJs 
  } from "react-icons/fa";
  import { 
    SiTypescript, 
    SiNextdotjs, 
    SiRedux, 
    SiThreedotjs, 
    SiSwr, 
    SiTailwindcss, 
    SiCloudflare, 
    SiGooglecloud, 
    SiVercel, 
    SiDocker, 
    SiGit, 
    SiD3Dotjs,
    SiFastapi,
    SiDrizzle,
    SiLangchain,
    SiGithubactions
  } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

export default function Preferences() {
  return (
    <div className="flex flex-col w-full z-50 max-w-4xl">
      <div className="flex flex-row justify-between items-center text-sm ">
        <span className="font-bold py-4">선호 기술</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Frontend */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <SiTypescript className="w-8 h-8 text-blue-500" />
          <span className="text-xs">TypeScript</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-400/10 border border-blue-400/20">
          <FaPython className="w-8 h-8 text-blue-400" />
          <span className="text-xs">Python</span>
        </div>

        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <FaJs className="w-8 h-8 text-yellow-500" />
          <span className="text-xs">JavaScript</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <FaReact className="w-8 h-8 text-cyan-500" />
          <span className="text-xs">React</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-black/10 border border-gray-500/20">
          <SiNextdotjs className="w-8 h-8 text-white" />
          <span className="text-xs">Next.js</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <SiRedux className="w-8 h-8 text-purple-500" />
          <span className="text-xs">Redux</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <TbBrandThreejs className="w-8 h-8 text-green-500" />
          <span className="text-xs">Three.js</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-500/10 border border-gray-500/20">
          <SiSwr className="w-8 h-8 text-gray-400" />
          <span className="text-xs">SWR</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#009688]/10 border border-[#009688]/20">
          <SiFastapi className="w-8 h-8 text-[#009688]" />
          <span className="text-xs">FastAPI</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
          <SiTailwindcss className="w-8 h-8 text-cyan-400" />
          <span className="text-xs">Tailwind</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <SiD3Dotjs className="w-8 h-8 text-orange-500" />
          <span className="text-xs">D3.js</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#2088FF]/10 border border-[#2088FF]/20">
          <SiGithubactions className="w-8 h-8" color="#2088FF" />
          <span className="text-xs">Github Action</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <SiCloudflare className="w-8 h-8 text-orange-500" />
          <span className="text-xs">Cloudflare</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
          <SiGooglecloud className="w-8 h-8 text-blue-600" />
          <span className="text-xs">GCP</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-black/10 border border-gray-500/20">
          <SiVercel className="w-8 h-8 text-white" />
          <span className="text-xs">Vercel</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#C5F74F]/10 border border-[#C5F74F]/20">
          <SiDrizzle className="w-8 h-8" color="#C5F74F" />
          <span className="text-xs">Drizzle</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <SiDocker className="w-8 h-8 text-blue-500" />
          <span className="text-xs">Docker</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <SiGit className="w-8 h-8 text-red-500" />
          <span className="text-xs">Git</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#1C3C3C]/10 border border-[#1C3C3C]/20">
          <SiLangchain className="w-8 h-8" color="#1C3C3C" />
          <span className="text-xs">Langchain</span>
        </div>
      </div>
    </div>
  );
}