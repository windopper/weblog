import Link from "next/link";

export default function Header() {
  return (
    <div className="top-0 left-0 right-0 z-50 py-6 px-6">
      <div className="flex flex-row gap-6 items-center max-w-4xl mx-auto">
        <Link
          href="/"
          className="font-bold text-zinc-100 hover:text-zinc-200 transition-colors duration-200"
        >
          kamilereon
        </Link>
        <span className="text-zinc-100 hover:text-zinc-200 transition-colors duration-200">
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
        </span>
      </div>
    </div>
  );
}
