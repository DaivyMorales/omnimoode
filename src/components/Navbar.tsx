import { useState, ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import ProfileDropDown from "./ProfileDropDown";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";

interface NavbarProps {
  children: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  console.log(openProfile)


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
      <div className="relative ">
        {openSearch && <SearchBar openSearch={openSearch} setOpenSearch={setOpenSearch} />}
        <nav className="flex justify-between items-center py-2 px-10">
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

          <div className="flex items-center gap-3 w-16">
            <div
              className=" cursor-pointer"
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            >
              <BsPerson size={20} />
            </div>
            {openProfile && <ProfileDropDown openProfile={openProfile} setOpenProfile={setOpenProfile}/>}
            <AiOutlineShoppingCart size={20} />
          </div>
        </nav>

        {/* <ol
        className={`text-white bg-black flex justify-center items-center py-5 gap-5 font-semibold ${open ? "hidden md:flex" : "flex md:hidden"
      }`}
      >
      <li className="cursor-pointer hover:text-gray-500">Nosotros</li>
      <li className="cursor-pointer hover:text-gray-500">Lo nuevo</li>
      <li className="cursor-pointer hover:text-gray-500">Colecciones</li>
    </ol> */}


        {children}
      </div>
    </>
  );
}
