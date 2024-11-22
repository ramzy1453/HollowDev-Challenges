import Board from "@/components/Board";
import Navbar from "@/components/Navbar";

export default async function Home({
  params,
}: {
  params: Promise<{
    room: string;
  }>;
}) {
  const room = await params.then(({ room }) => room);
  return (
    <div>
      <Navbar />
      <div className="space-y-6 my-8">
        <p className="text-center text-3xl">{room}</p>
        <div className="justify-center items-center flex">
          <Board size={9} />
        </div>
      </div>
    </div>
  );
}
