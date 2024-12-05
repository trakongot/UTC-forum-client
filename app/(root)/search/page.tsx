"use client"
import { fetchSearchSuggestions } from "@/apis/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
  const [search, setSearch] = useState("");
  const router = useRouter()
  const { data: suggestions = [], isFetching } = useQuery(
    ["searchSuggestions", search],
    () => fetchSearchSuggestions(search),
    {
      enabled: !!search, // Chỉ fetch khi search không rỗng
      staleTime: 1 * 60 * 1000, // Caching 1 phút
      refetchOnWindowFocus: false, // Không refetch khi focus lại cửa sổ
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Search term:", search);
      router.push(`/search/searchResult?query=${search}`);
    }
  };

  return (
    <section className="rounded-xl bg-light-1 p-10 shadow-md">
      <h1 className="head-text mb-10">Tìm kiếm</h1>
      <div className="relative w-full">
        <div className="flex gap-1 rounded-lg border bg-light-2 px-4 py-2 shadow-md dark:bg-dark-3 relative">
          <Image
            src="/assets/search-gray.svg"
            alt="search"
            width={24}
            height={24}
            className="object-contain"
          />
          <Input
            id="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search user or thread"
            className="no-focus border-none bg-light-2 text-base-regular outline-none dark:bg-dark-3 dark:text-light-4"
          />
        </div>
      </div>
              {/* Hiển thị danh sách gợi ý nếu có */}
              {isFetching ? (
          <div className="mt-4 w-full bg-white bg-opacity-80 shadow-none rounded-md z-10">
            <p className="p-2 text-gray-500">Đang tải...</p>
          </div>
        ) : (
          suggestions.length > 0 && (
            <ul className="mt-4 w-full bg-white bg-opacity-80 shadow-none rounded-md z-10">
              {suggestions.map((suggestion: any) => (
                <li
                  key={suggestion._id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                >
                  <Avatar className="size-7">
                    <AvatarImage  src={suggestion.profilePic} alt="avatar" />
                    <AvatarFallback>
                      <AvatarImage
                        src="https://res.cloudinary.com/muckhotieu/image/upload/v1731805369/l60Hf_ztxub0.png"
                        alt="avatar"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{suggestion.name}</span>
                    <span className="text-gray-500">@{suggestion.username}</span>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
    </section>
  );
}