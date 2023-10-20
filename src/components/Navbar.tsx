import { useState, ReactNode } from "react";
import { PiUserBold } from "react-icons/pi";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { PiMoonBold, PiSunDimBold } from "react-icons/pi";
import ProfileDropDown from "./ProfileDropDown";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import useColorMode from "@/hooks/useColorMode";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const [colorMode, setColorMode] = useColorMode();

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  const router = useRouter();

  const navbarClass = openSearch ? "blur-background" : "";

  return (
    <>
      <div className="relative w-full h-full h-screen ">
        {openSearch && (
          <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />
        )}
        <nav className="flex justify-between items-center py-2 px-10 dark:bg-black dark:border-b-2 dark:border-gray-800">
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="images/logoGood.png" alt="Logo" className="w-39 h-16" />
          </div>

          <button
            onClick={() => setOpenSearch(true)}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            className="ring-1 ring-gray-200 w-64 rounded-md text-gray-400 px-3 py-2 flex justify-start items-center gap-3 cursor-pointer text-sm lg:w-64 xl:w-96 hover:ring-gray-300 hover:text-gray-500"
          >
            <div>
              <AiOutlineSearch
                size={20}
                className={`${isHovered && "text-gray-500"}`}
              />
            </div>
            Buscar...
          </button>

          <div className="flex items-center gap-3 ">
            <div
              className="p-1 cursor-pointer"
              onClick={() => {
                setColorMode(colorMode === "light" ? "dark" : "light");
              }}
            >
              {colorMode === "light" ? (
                <PiMoonBold size={20} color="black" />
              ) : (
                <PiSunDimBold size={20} color="white" />
              )}
            </div>
            <div
              className=" cursor-pointer"
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            >
              <PiUserBold
                size={20}
                color={`${colorMode === "dark" ? "white" : "black"}`}
                className={`${colorMode === "dark" ? "text-white" : "text-black"}`}
              />
            </div>
            {openProfile && (
              <ProfileDropDown
                openProfile={openProfile}
                setOpenProfile={setOpenProfile}
              />
            )}
            <AiOutlineShoppingCart
              size={20}
              color={`${colorMode === "dark" ? "white" : "black"}`}
            />
          </div>
        </nav>

        {children}
      </div>
    </>
  );
}
