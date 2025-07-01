export default function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags.map((tag) => (
        <div key={tag} className="md:text-lg text-sm font-bold text-zinc-200 px-4 py-2 rounded-full bg-zinc-900">
          #{tag}
        </div>
      ))}
    </div>
  );
}