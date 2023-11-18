import React, { useRef, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/api/cotegoryApi";
import CategoryCard from "./Category/CategoryCard";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({
  openSearch,
  setOpenSearch,
}: SearchBarProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, isFetching, data, error } = useGetCategoriesQuery(null);

  //ON_SUBMIT
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenSearch(false);

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);

  };

  //CLOSE SEARCH BAR
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  return (
    <div
      ref={searchBarRef}
      className="absolute z-50 w-full h-full flex justify-center items-start"
      style={{ backdropFilter: "blur(5px) brightness(80%)" }}
    >
      <div className="container sm:px-10 lg:px-30 xl:px-52 p-2 flex gap-2 justify-center items-start md:mt-20 mt-5">
        <div className="w-full">
          <div className="w-full bg-white ring-1 ring-gray-200 rounded-t-md shadow-lg text-gray-400 px-3 py-2 flex justify-start items-center gap-3 cursor-pointer text-xl hover:ring-gray-300 hover:text-gray-500">
            <div>
              <AiOutlineSearch size={20} />
            </div>
            <form onSubmit={onSearch}>
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
                type="text"
                className="text-lg text-black"
                placeholder="¿Qué estas buscando?"
              />
            </form>
          </div>
          <div className="bg-white ring-1 ring-gray-200 w-full rounded-b-md flex flex-col justify-start gap-y-1 p-3">
            <h3 className="text-gray-600">Categorias</h3>
            {error ? (
              <div>Hubo un error</div>
            ) : (
              data?.map((category) => (
                <CategoryCard
                  category={category}
                  key={category.id}
                  setOpenSearch={setOpenSearch}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
