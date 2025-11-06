'use cache';

import { StarsBackground } from "../components/ui/stars-background";
import { ShootingStars } from "../components/ui/shooting-stars";
import Header from "../components/common/Header";
import MemoList from "../components/memos/MemoList";
import { getMemoFiles } from "../action/memo";

export default async function MemosPage() {
  const memos = await getMemoFiles();

  return (
    <div>
      <Header />
      <div className="px-4 max-w-4xl mx-auto py-16">
        <MemoList memos={memos} />
      </div>
    </div>
  );
}
