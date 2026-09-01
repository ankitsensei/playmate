"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Data from "@/app/shared/Data";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeGame = searchParams.get("game");

  const handleFilter = (gameName: string) => {
    if (gameName === "All") {
      router.push("/");
    } else if (activeGame === gameName) {
      router.push("/");
    } else {
      router.push(`/?game=${gameName}`);
    }
  };

  return (
    <>
      <div className="text-center text-4xl mt-20 font-bold">
        <h1>Find & Discover Players</h1>
        <h1 className="text-blue-500">Near You</h1>
      </div>
      <div className="mt-5 text-center text-zinc-300">
        <p>Best Free Website to find and Discover game</p>
        <p>partner/player near you for your fav game</p>
      </div>
      <div className="mt-5">
        <div className="relative w-100 ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border rounded-lg border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body outline-none"
            placeholder="Search"
            onChange={(e) => console.log(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute end-1.5 bottom-1.5 bg-blue-500 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-10">
        {Data.map((item) => {
          const isActive = item.name === "All" ? !activeGame : activeGame === item.name;

          return (
            <div
              key={item.id}
              onClick={() => handleFilter(item.name)}
              className={`cursor-pointer transition-all duration-200 rounded-full ${
                isActive
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-110"
                  : "hover:scale-125"
              } ${item.image ? "p-1" : "px-3 py-1 text-sm font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/30"}`}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              ) : (
                <span>{item.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
