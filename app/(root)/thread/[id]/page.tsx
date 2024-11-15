"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import ThreadCardSekeleton from "@/components/cards/ThreadCardSekeleton";
import { getRepliesThread, getThreadById } from "@/apis/threads";
import ThreadCard from "@/components/cards/ThreadCard";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const threadId = params.id;

  useEffect(() => {
    if (currentUser?.onboarded === false) {
      router.push("/onboarding");
    }
  }, [currentUser, router]);

  const { data: threadData, isLoading: isLoadingThreadData } = useQuery({
    queryKey: ["thread", threadId],
    queryFn: () => getThreadById({ id: threadId }),
    onError: (error) => {
      console.error("Error fetching thread data:", error);
    },
    enabled: !!threadId,
  });

  const { data: commentsData, isLoading: isLoadingCommentsData } = useQuery({
    queryKey: ["comments", threadId, currentPage],
    queryFn: () =>
      getRepliesThread({ id: threadId, pageNumber: currentPage, pageSize }),
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching comments data:", error);
    },
    enabled: !!threadId,
  });
  // console.log(threadData);
  // console.log(commentsData);
  if (!threadData || !commentsData) {
    return <p className="no-result">Loading...</p>;
  }

  if (!threadData) {
    return <p className="no-result">No threads found</p>;
  }

  return (
    <section className="relative">
      {isLoadingThreadData ? (
        <ThreadCardSekeleton />
      ) : (
        <ThreadCard key={threadData._id} data={threadData} />
      )}

      <div className="mt-10">
        {isLoadingCommentsData ? (
          Array(5)
            .fill(0)
            .map(() => <ThreadCardSekeleton key={uuidv4()} />)
        ) : commentsData?.threads?.length === 0 ? (
          <p className="no-result">No comments found</p>
        ) : (
          commentsData?.threads?.map((comment) => (
            <ThreadCard key={comment._id} data={comment} />
          ))
        )}
      </div>
    </section>
  );
}
