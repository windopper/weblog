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
  SiCplusplus,
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

export default function Preferences() {
  return (
    <div className="flex flex-col w-full max-w-4xl">
      <div className="flex flex-row justify-between items-center text-sm ">
        <span className="font-bold py-4">선호 기술</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <PreferenceItem
          icon={<SiTypescript className="w-8 h-8 text-blue-500" />}
          title="TypeScript"
        />
        <PreferenceItem
          icon={<FaPython className="w-8 h-8 text-blue-400" />}
          title="Python"
        />
        <PreferenceItem
          icon={<SiCplusplus className="w-8 h-8 text-blue-600" />}
          title="C++"
        />

        <PreferenceItem
          icon={<FaReact className="w-8 h-8 text-cyan-500" />}
          title="React"
        />
        <PreferenceItem
          icon={<SiNextdotjs className="w-8 h-8 text-white" />}
          title="Next.js"
        />
        <PreferenceItem
          icon={<SiUnrealengine className="w-8 h-8 text-white" />}
          title="Unreal Engine"
        />
      </div>
    </div>
  );
}

function PreferenceItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return <div className="flex flex-col items-center gap-2 p-3">{icon}</div>;
}
