import { FileTextIcon, Folder } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";

interface FolderStructureItem {
  name: string;
  type: "file" | "directory" | "dots";
  highlight?: boolean;
  description?: string;
  children?: FolderStructureItem[];
}

interface FolderStructureProps {
  folderStructure: FolderStructureItem[];
  level?: number;
}

export default function FolderStructure({
  folderStructure,
  level = 0,
}: FolderStructureProps) {
  return (
    <div className="p-2 bg-zinc-900 rounded-md my-2">
      <RecursiveFolderStructure
        folderStructure={folderStructure}
        level={level}
      />
    </div>
  );
}

function RecursiveFolderStructure({
  folderStructure,
  level = 0,
}: FolderStructureProps) {
  return (
    <div className="font-mono text-sm">
      {folderStructure.map((item, index) => (
        <div key={`${item.name}-${index}`}>
          <div
            className={`flex items-center gap-2 transition-colors p-1 ${
              item.highlight ? "bg-indigo-800/50 border-l-2 border-indigo-500" : "hover:bg-zinc-800"
            }`}
            style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          >
            {/* 폴더/파일 아이콘 */}
            <div className="flex-shrink-0">
              {item.type === "directory" ? (
                <Folder className="w-4 h-4 text-zinc-400" />
              ) : item.type === "dots" ? (
                <BsThreeDots className="w-4 h-4 text-zinc-400" />
              ) : (
                <FileTextIcon className="w-4 h-4 text-zinc-400" />
              )}
            </div>

            {/* 파일/폴더 이름 */}
            <span
              className={`${
                item.type === "directory"
                  ? "text-zinc-300 font-medium"
                  : "text-zinc-300"
              }`}
            >
              {item.name}
            </span>

            {/* 폴더인 경우 슬래시 추가 */}
            {item.type === "directory" && (
              <span className="text-zinc-400">/</span>
            )}

            {item.description && (
              <span className="text-zinc-400 text-xs">{item.description}</span>
            )}
          </div>

          {/* 하위 항목들 */}
          {item.children && item.children.length > 0 && (
            <div className="relative">
              <RecursiveFolderStructure
                folderStructure={item.children}
                level={level + 1}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
