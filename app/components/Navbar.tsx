import Image from "next/image";
import logo from "@/public/logo_light.jpg";
import dp from "@/public/dp.jpeg";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";

import DisplayUser from "@/app/components/DisplayUser";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="border rounded-full"
        />
      </Link>
      <div className="flex items-center justify-center gap-4">
        <div className="flex gap-2">
          <Link
            href="/create-post"
            className="bg-white text-black px-3 py-2 rounded-full hover:bg-zinc-200 flex items-center gap-2"
          >
            <span className="hidden md:block">Create Post</span> <IoCreate />
          </Link>
        </div>
        <DisplayUser />
      </div>
    </div>
  );
};

export default Navbar;
