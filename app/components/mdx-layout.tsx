import BackButton from "./common/BackButton";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // 여기에서 모든 공유 레이아웃 또는 스타일을 생성하세요
  return (
    <div className="relative flex flex-col md:max-w-4xl max-w-2xl mx-auto py-16 px-4 overflow-y-auto">
      <BackButton />
      <div>{children}</div>
    </div>
  );
}
