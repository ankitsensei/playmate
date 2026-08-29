import Image from "next/image";
import logo from "@/public/logo_light.jpg";
import dp from "@/public/dp.jpeg";
import { IoCreate } from "react-icons/io5";
import SignInButton from "@/app/components/SignInButton";
import DisplayUser from "@/app/components/DisplayUser";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <Image
        src={logo}
        alt="logo"
        width={50}
        height={50}
        className="border rounded-full"
      />
      <div className="flex items-center justify-center gap-4">
        <div className="flex gap-2">
          <button className="bg-white text-black px-3 py-2 rounded-full hover:bg-zinc-200 flex items-center gap-2">
            <span className="hidden md:block">CREATE POST</span> <IoCreate />
          </button>
          <SignInButton />
        </div>
        {/* <Image
          src={dp}
          alt="user dp"
          width={50}
          height={50}
          className="border rounded-full"
        /> */}
        <DisplayUser />
      </div>
    </div>
  );
};

export default Navbar;
