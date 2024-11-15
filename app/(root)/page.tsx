"use client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Pagination from "@/components/shared/Pagination";
import ThreadCard from "@/components/cards/ThreadCard";
import { getThreads } from "@/apis/threads";
import { useQuery } from "react-query";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import ThreadCardSekeleton from "@/components/cards/ThreadCardSekeleton";

export default function Home({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | undefined };
}>) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user?.onboarded === false) {
      router.push("/onboarding");
    }
  }, [user]);
  // api react query
  const { data, isLoading } = useQuery({
    queryKey: ["threads", pageNumber],
    queryFn: () => getThreads({ pageNumber, pageSize }),
    keepPreviousData: true,
    onError: (err) => {
      console.error("Error fetching threads:", err);
    },
  });
  // end api react query
  return (
    <>
      <h1 className="head-text text-left text-2xl font-bold text-dark-1 dark:text-light-1">
        Trending Threads
      </h1>

      <section className="mt-9 flex flex-col gap-10">
        {(() => {
          if (isLoading) {
            return Array(5)
              .fill(0)
              .map(() => <ThreadCardSekeleton key={uuidv4()} />);
          }

          if (data?.threads.length === 0) {
            return <p className="no-result">No threads found</p>;
          }

          return data?.threads.map((thread) => (
            <ThreadCard displayType={2} key={thread._id} data={thread} />
          ));
        })()}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={data?.isNext ?? false}
      />
    </>
  );
}
