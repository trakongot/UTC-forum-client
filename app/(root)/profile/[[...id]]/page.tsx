"use client";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getUserById } from "@/apis/user";
import { getThreadsByUser } from "@/apis/threads";
import ThreadCard from "@/components/cards/ThreadCard";
import ThreadCardSekeleton from "@/components/cards/ThreadCardSekeleton";
import { useEffect, useRef, useState } from "react";
import { throttle } from "@/lib/utils";

const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "repost", label: "Repost", icon: "/assets/tag.svg" },
];

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  const pageSize = 3;
  const currentUser = useUserStore((state) => state.user);
  const profileId = params.id;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [threads, setThreads] = useState<any[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useQuery({
    queryKey: ["user", profileId],
    queryFn: () => getUserById({ id: profileId }),
    onError: (error) => {
      console.error("Error fetching  data:", error);
    },
    enabled: !!profileId,
  });
  const { data: threadsData, isLoading: isLoadingThreadsData } = useQuery({
    queryKey: ["threadsById", profileId, pageNumber],
    queryFn: () => getThreadsByUser({ id: profileId, pageNumber, pageSize }),
    onError: (error) => {
      console.error("Error fetching  data:", error);
    },
    enabled: !!profileId,
  });
  const handleScroll = throttle(() => {
    if (loaderRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = loaderRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100 && !isLoadingMore) {
        setIsLoadingMore(true);
        setPageNumber((prev) => prev + 1);
      }
    }
  }, 200);
  useEffect(() => {
    if (threadsData?.threads) {
      setThreads((prevThreads) => [...prevThreads, ...threadsData.threads]);
      setIsLoadingMore(false);
    }
  }, [threadsData]);
  useEffect(() => {
    const divRef = loaderRef.current;
    divRef?.addEventListener("scroll", handleScroll);

    return () => {
      divRef?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  if (currentUser?.onboarded === false) {
    router.push("/onboarding");
  }
  if (!userData) return <>ko tìm thấy user</>;
  return (
    <section>
      <ProfileHeader data={userData} />
      <div
        ref={loaderRef}
        className="no-scrollbar mt-9 max-h-[80vh] overflow-auto"
      >
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center justify-evenly gap-3 bg-light-1 text-primary shadow-md data-[state=active]:shadow-none dark:bg-dark-4 dark:text-light-2 dark:data-[state=active]:bg-[#0e0e12]">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="ml-1 rounded-none hover:bg-none focus:bg-none data-[state=active]:border-b-2 data-[state=active]:border-b-black dark:text-light-2 "
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={23}
                  height={23}
                  className="object-contain"
                />
                <p className="text-base text-primary max-sm:hidden ">
                  {tab.label}
                </p>

                {tab.label === "Threads" && (
                  <p className="ml-2 rounded-sm px-2 py-1 dark:bg-light-4 dark:text-light-2">
                    {threadsData?.threads.length ?? 0}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full dark:text-light-1"
            >
              <ThreadsTab
                currentUserId={userData?._id ?? ""}
                accountId={userData?._id ?? ""}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="my-4">
          {isLoadingThreadsData && threads?.length === 0 ? (
            Array(5)
              .fill(0)
              .map(() => <ThreadCardSekeleton key={uuidv4()} />)
          ) : threads?.length === 0 ? (
            <p className="no-result">No comments found</p>
          ) : (
            threads?.map((thread) => (
              <ThreadCard
                threadUrl={`http://localhost:3000/thread/${thread?._id}`}
                className="mt-2"
                key={thread._id}
                data={thread}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
