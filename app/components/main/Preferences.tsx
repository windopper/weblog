import { FaGithub, FaReact, FaPython, FaJs, FaNodeJs } from "react-icons/fa";
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
  SiGithubactions,
  SiUnrealengine,
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
        <div className="flex flex-col items-center gap-2 p-3">
          <SiTypescript className="w-8 h-8 text-blue-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <FaPython className="w-8 h-8 text-blue-400" />
        </div>

        <div className="flex flex-col items-center gap-2 p-3">
          <FaJs className="w-8 h-8 text-yellow-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <FaReact className="w-8 h-8 text-cyan-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiNextdotjs className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiRedux className="w-8 h-8 text-purple-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <TbBrandThreejs className="w-8 h-8 text-green-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiSwr className="w-8 h-8 text-gray-400" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiFastapi className="w-8 h-8 text-[#009688]" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiTailwindcss className="w-8 h-8 text-cyan-400" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiD3Dotjs className="w-8 h-8 text-orange-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiGithubactions className="w-8 h-8" color="#2088FF" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiCloudflare className="w-8 h-8 text-orange-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiGooglecloud className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiVercel className="w-8 h-8 text-white" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiDrizzle className="w-8 h-8" color="#C5F74F" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiDocker className="w-8 h-8 text-blue-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiGit className="w-8 h-8 text-red-500" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiLangchain className="w-8 h-8" color="#1C3C3C" />
        </div>
        <div className="flex flex-col items-center gap-2 p-3">
          <SiUnrealengine className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
