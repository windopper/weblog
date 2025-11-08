'use cache';

import Header from "../components/common/Header";
import MemoLayout from "../components/memos/MemoLayout";
import { getMemoFiles, getMemoTree } from "../action/memo";

export default async function MemosPage() {
  const memos = await getMemoFiles();
  const memoTree = await getMemoTree();

  return (
    <div>
      <Header />
      <MemoLayout menus={memoTree} memos={memos} />
    </div>
  );
}
