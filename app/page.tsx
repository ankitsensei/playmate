"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import Data from "@/app/shared/Data";
import GetPost from "@/app/shared/GetPost";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-full">
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
      <div className="grid grid-cols-3 gap-10 mt-10">
        {Data.map((item) => (
          <div key={item.id} onClick={() => console.log(item.name)}>
            <Image
              src={item.image}
              alt="item"
              width={50}
              height={50}
              className="hover:scale-125"
            />
          </div>
        ))}
      </div>
      <div>
        <GetPost />
      </div>
    </div>
  );
}
