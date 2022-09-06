import { Show } from "@prisma/client";
import { trpc } from "../utils/trpc";

export default function Schedule({ shows }: { shows: Show[] }) {
  const context = trpc.useContext();
  const mutation = trpc.useMutation(["schedule.remove"], {
    onSuccess() {
      context.invalidateQueries(["schedule.getAll"]);
    },
  });

  return (
    <div className="my-4">
      <div className="shadow-md mb-4 p-4 flex text-sm text-gray-300">
        <h3 className="w-full font-bold">Channel</h3>
        <div className="w-60 text-right font-bold">Start at</div>
        <div className="w-40 ml-8 text-center font-bold">Remove</div>
      </div>
      {shows.map((show) => (
        <div key={show.id} className="border mb-2 p-4 flex text-gray-300">
          <h3 className="w-full">{show.channel}</h3>
          <div className="w-60 text-right">{show.startTime}</div>
          <div className="w-40 ml-8 text-center">
            <span
              onClick={() => {
                mutation.mutate(show.id);
              }}
              className="cursor-pointer inline-block w-6 h-6 rounded-full bg-red-800 text-white font-bold"
            >
              -
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
