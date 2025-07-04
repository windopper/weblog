export default function BentoGrid() {
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 aspect-square max-w-md mx-auto">
          <div className="bg-zinc-800 rounded-lg col-span-2 p-4">
            <div className="text-2xl font-bold">1</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold">2</div>
          </div>
          <div className="bg-zinc-800 rounded-lg row-span-2 p-4">
            <div className="text-2xl font-bold">3</div>
          </div>
          <div className="bg-zinc-800 rounded-lg col-span-2 p-4">
            <div className="text-2xl font-bold">4</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold">5</div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-bold">6</div>
          </div>
        </div>
      </div>
    );
};