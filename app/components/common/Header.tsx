import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="flex flex-row gap-6 items-center max-w-4xl mx-auto px-6 py-4 text-lg
      backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl ring-1 ring-white/20
      border border-white/30 hover:bg-white/30 transition-all duration-300
      bg-gradient-to-r from-white/10 to-white/20">
        <h1 className="font-bold text-gray-800 hover:text-gray-900 transition-colors duration-200">
          Home
        </h1>
        <span className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
          <Link href="/posts" className="hover:underline">Posts</Link>
        </span>
      </div>
    </div>
  );
}
