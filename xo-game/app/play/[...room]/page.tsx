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
      <p className="text-center text-3xl p-4">{room}</p>
      <div className="border border-white h-screen justify-center items-center flex">
        <Board size={9} />
      </div>
    </div>
  );
}
