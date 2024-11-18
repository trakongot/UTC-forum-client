// app/(root)/search/page.tsx
"use client";
import { useRouter } from "next/navigation";
import Searchbar from "@/components/shared/Searchbar";

export default function Page() {
  const router = useRouter();

  // Hàm khi người dùng nhấn Enter để tìm kiếm
  const handleSearchSubmit = (query: string) => {
    if (query) {
      // Chuyển hướng đến URL tìm kiếm với query
      router.push(`/search/searchResult?query=${query}`);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <section
        className="rounded-xl bg-light-1 p-10 shadow-md"
        style={{ height: "910px" }}
      >
        {/* Thanh tìm kiếm */}
        <Searchbar
          onSearch={handleSearchSubmit}
          routeType="search" // Hoặc tùy thuộc vào điều kiện nào đó
        />
      </section>
    </div>
  );
}
