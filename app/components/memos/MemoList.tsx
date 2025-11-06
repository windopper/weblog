import MemoItem from "./MemoItem";
import { Memo } from "@/app/types/memo";
interface MemoListProps {
  memos: Memo[];
}

export default function MemoList({ memos }: MemoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-4">
      {memos.map((memo) => (
        <MemoItem key={memo.title} memo={memo} />
      ))}
    </div>
  );
}