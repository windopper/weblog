export default function ArchitectureElement({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <div className="p-1 bg-zinc-800 border-[1px] border-zinc-700 rounded-md w-fit h-fit">
      <div className="bg-zinc-900 rounded-md p-2 w-fit h-fit">{icon}</div>
    </div>
  );
}
