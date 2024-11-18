"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchSuggestions } from "@/apis/search"; // Import API tìm kiếm gợi ý
import { Input } from "../ui/input";

interface Props {
  routeType: string;
  onSearch: (query: string) => void;
}



function Searchbar({ routeType, onSearch }: Readonly<Props>) {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]); // Dữ liệu gợi ý
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(search); // Gọi hàm onSearch khi nhấn Enter
    }
  };


  // Query sau khi 0.3s không nhập liệu
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search) {
        const fetchedSuggestions = await getSearchSuggestions(search); // Gọi API
        setSuggestions(fetchedSuggestions); // Cập nhật danh sách gợi ý
      } else {
        setSuggestions([]); // Xóa gợi ý khi không có từ khóa tìm kiếm
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Dọn dẹp timeout
  }, [search]);
  
  return (
    <div className="relative w-full">
      {/* Thanh tìm kiếm */}
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
          onKeyDown={handleKeyDown} // Xử lý sự kiện nhấn phím
          placeholder={`${
            routeType !== "/search"
              ? "Search user or thread"
              : "Search creators"
          }`}
          className="no-focus border-none bg-light-2 text-base-regular outline-none dark:bg-dark-3 dark:text-light-4"
        />
      </div>

      {/* Hiển thị danh sách gợi ý nếu có */}
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white bg-opacity-80 shadow-none rounded-md z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
            >
              <Image
                src={suggestion.profilePic || "/img/avatar.png"}
                alt={suggestion.username}
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span>{suggestion.name}</span> {/* Tên người dùng */}
                <span className="text-gray-500">
                  @{suggestion.username}
                </span>{" "}
                {/* Tên người dùng */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Searchbar;
