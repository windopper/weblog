import Header from "../components/common/Header";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 max-w-4xl mx-auto">
      <Header />
      {children}
    </div>
  );
}