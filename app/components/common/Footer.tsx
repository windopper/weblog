import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative py-8 flex flex-row justify-center items-center text-zinc-400 z-[999]">
      <p>© kamilereon 2025. All rights reserved.</p>
      <p className="border-r-[0.5px] border-zinc-400 mx-4 h-4" />
      <div className="flex flex-row gap-4">
        <Link href="https://github.com/windopper" title="GitHub">GitHub</Link>
      </div>
    </footer>
  );
}