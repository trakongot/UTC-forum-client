// app/search/searchResult/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import ThreadCardSekeleton from "@/components/cards/ThreadCardSekeleton"; 
import { getThreadsBySearch } from "@/apis/search";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; 

  const [threads, setThreads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchThreads = async () => {
      if (query) {
        setIsLoading(true); 
        const data = await getThreadsBySearch({query});
        setThreads(data.threads);
        setIsLoading(false); 
      }
    };

    fetchThreads();
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Search Results for `{query}`</h1>
      <div>
        {isLoading ? (
          Array(5)
            .fill(0)
            .map((_, index) => <ThreadCardSekeleton key={index} />)
        ) : threads.length === 0 ? (
          <p>No threads found.</p>
        ) : (
          <ul>
      {threads.map((thread) => (
        <li key={thread._id} className="p-4 border-b rounded-md shadow-md bg-white dark:bg-dark-2">
          <ThreadCard
            threadUrl={`/thread/${thread._id}`} // Đường dẫn chi tiết của thread
            data={{
              ...thread,
              postedBy: {
                ...thread.postedBy,
                profilePic: thread.postedBy?.profilePic || "/img/avatar.png", // Đảm bảo profilePic luôn có giá trị
              },
              imgs: thread.imgs || [], // Đảm bảo truyền danh sách ảnh
              isliked: thread.isLiked || false, // Trạng thái like
              likeCount: thread.likeCount || 0, // Số lượt like
              commentCount: thread.commentCount || 0, // Số lượt bình luận
              repostCount: thread.repostCount || 0, // Số lượt repost
            }}
            displayType={2}
          />
          
        </li>
      ))}
    </ul>
        )}
      </div>
    </div>
  );
}

