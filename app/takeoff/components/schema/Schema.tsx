export default function Schema({
  title,
  properties,
}: {
  title: string;
  properties: { name: string; type: string }[];
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg overflow-hidden
    bg-radial from-zinc-900 to-zinc-900/50
    border-[1px] border-zinc-700/50">
      <h2 className="text-lg font-bold text-zinc-100 bg-zinc-700/50 w-full py-1 px-2 text-center
      break-all">{title}</h2>
      {properties.map((property, index) => (
        <div key={property.name} className="flex justify-between w-full gap-4 py-1 px-2">
          <h3 className="text-xs font-bold text-zinc-100">{property.name}</h3>
          <p className="text-xs text-zinc-100">{property.type}</p>
        </div>
      ))}
    </div>
  );
}
