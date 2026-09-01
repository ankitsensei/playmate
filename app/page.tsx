import GetPost from "@/app/shared/GetPost";
import SearchBar from "@/app/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ game?: string; q?: string }>;
}) {
  const { game, q } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SearchBar />
      <GetPost game={game} search={q} />
    </div>
  );
}
