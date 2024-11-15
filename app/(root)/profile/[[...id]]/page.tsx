"use client";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getUserById } from "@/apis/user";
import { getThreadsByUser } from "@/apis/threads";

const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "repost", label: "Repost", icon: "/assets/tag.svg" },
];

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const profileId = params.id;
  const { data: userData } = useQuery({
    queryKey: ["user", profileId],
    queryFn: () => getUserById({ id: profileId }),
    onError: (error) => {
      console.error("Error fetching  data:", error);
    },
    enabled: !!profileId,
  });
  const { data: threadsData, isLoading: isLoadingThreadsData } = useQuery({
    queryKey: ["threadsById", profileId],
    queryFn: () => getThreadsByUser({ id: profileId }),
    onError: (error) => {
      console.error("Error fetching  data:", error);
    },
    enabled: !!profileId,
  });
  console.log(params);
  console.log(profileId);
  if (currentUser?.onboarded === false) {
    router.push("/onboarding");
  }
  if (!userData) return <>ko tìm thấy user</>;
  console.log(userData);
  console.log(threadsData);
  return (
    <section>
      <ProfileHeader data={userData} />
      <div className="mt-9">
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
      </div>
    </section>
  );
}
