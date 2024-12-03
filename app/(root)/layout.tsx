"use client";
import React, { useContext, useEffect } from "react";
import type { Metadata } from "next";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import useUserStore from "@/store/useUserStore";
import { CreateThreadCard } from "@/components/cards/CreateThreadCard";
import { Toaster } from "@/components/ui/toaster";
import { followOrUnfollowThread } from "@/apis/user";
import { User } from "@/types/userType";
import { useMutation } from "react-query";
import { FollowContext, FollowProvider } from "../../Context/Context";

export const metadata: Metadata = {
  title: "Threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const {isLoading, mutate: followingOrUnfollowingThread } = useMutation({
  //   mutationFn: followOrUnfollowThread ,
  //   onSuccess: (data: { user: User }) => {
  //   },
  //   onError: (error: any) => {
  //     console.error("Error updating user:", error);
  //     const errMessage =
  //       error?.response?.data?.error ||
  //       "Server error, please try again later";
  //     console.log(errMessage); // Set error message from API
  //   },
  // })


  // const onFollowOrUnfollowSubmit = (id) => {
  //   followingOrUnfollowingThread({
  //     id:id ,
  //   })
  // }; 
  // const {test} = useContext(FollowContext); 
  // console.log(test);
  const hydrateUser = useUserStore((state) => state.hydrateUser);
  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);
  return (
    <FollowProvider>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="no-scrollbar flex min-h-screen flex-1 flex-col items-center bg-light-2 px-6 pb-10 pt-28 dark:bg-dark-1 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-3xl">{children}</div>
        </section>
        <RightSidebar/>
        <CreateThreadCard />
        <Toaster />
      </main>
      <Bottombar />
      </FollowProvider>
  );
}
