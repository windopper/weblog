import BackButton from "@/app/components/common/BackButton";
import Header from "@/app/components/common/Header";
import MemoPage from "@/app/components/memos/MemoPage";
import CompiledMemoContent from "@/app/components/memos/CompiledMemoContent";

export default async function MemoPageRoute({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const memoData = await CompiledMemoContent({ slug });

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
            <div className="px-4 max-w-4xl mx-auto py-4">
                <BackButton />
                <MemoPage memo={memoData.memo} content={memoData.content} />
            </div>
        </div>
    );
}