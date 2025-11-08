import BackButton from "@/app/components/common/BackButton";
import Header from "@/app/components/common/Header";
import MemoPage from "@/app/components/memos/MemoPage";
import CompiledMemoContent from "@/app/components/memos/CompiledMemoContent";
import TableOfContents from "@/app/components/posts/TableOfContents";
import MemoTreeMenu from "@/app/components/memos/MemoTreeMenu";
import { getMemoTree } from "@/app/action/memo";

export default async function MemoPageRoute({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const memoData = await CompiledMemoContent({ slug });
    const memoTree = await getMemoTree();

    if (!memoData) {
        return (
            <div>
                <Header />
                <div className="px-4 max-w-4xl mx-auto py-4">
                    <BackButton />
                    <div className="text-center py-16">
                        <p className="text-zinc-400">메모를 찾을 수 없습니다.</p>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <Header />

            <div className="px-4 max-w-7xl mx-auto py-16">
                <div className="flex gap-8">
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <MemoTreeMenu menus={memoTree} />
                    </aside>
                    <div className="flex-1 w-full lg:w-auto">
                        <BackButton />
                        <TableOfContents toc={memoData.toc} />
                        <MemoPage memo={memoData.memo} content={memoData.content} />
                    </div>
                </div>
            </div>
        </div>
    );
}