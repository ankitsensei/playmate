import GetPost from "@/app/shared/GetPost";
import SearchBar from "@/app/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SearchBar />
      <GetPost />
    </div>
  );
}
