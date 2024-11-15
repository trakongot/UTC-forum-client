import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "../custom/carousel";
import Carousel2 from "../custom/carousel2";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { Thread } from "@/types/threadType";

export function ThreadCard({
  data,
  displayType = 1,
}: Readonly<{ data: Thread; displayType?: 1 | 2 }>) {
  return (
    <article
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`dark:bg-dark-2" flex w-full flex-col 
        rounded-xl bg-light-1 p-7 shadow-lg brightness-105
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${data?.postedBy._id}`}
              className="relative size-11"
            >
              <Image
                src={data.postedBy.profilePic}
                alt="avatar_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-slate-300 dark:bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <Link
                href={`/profile/${data._id}`}
                className="flex w-fit items-center"
              >
                <h4 className="cursor-pointer text-2xl font-semibold  dark:text-light-1">
                  {data?.postedBy?.name}
                </h4>
                <span className="ml-3 text-xs  text-dark-4">12 days</span>
              </Link>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="flex items-center rounded-full p-2 transition-all duration-150  hover:bg-[#e1e1e1] active:scale-95 data-[state=open]:bg-[#e1e1e1]">
                    <Image
                      src="/assets/threedots.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <p className="mt-2 pb-3 text-sm dark:text-light-2">{data?.text}</p>
            {data?.imgs?.length > 0 ? (
              displayType === 1 ? (
                <Carousel images={data.imgs} />
              ) : (
                <Carousel2 images={data.imgs} />
              )
            ) : (
              <div>No images available</div>
            )}
            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <button className="flex items-center rounded-full px-2 py-1 transition-all duration-150 hover:bg-[#e1e1e1] active:scale-95">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-px mt-px cursor-pointer object-contain"
                  />
                  <span className="ml-1 text-sm text-light-4">
                    {data?.likeCount}
                  </span>
                </button>

                <button className="flex items-center rounded-full px-2 py-1 transition-all duration-150 hover:bg-[#e1e1e1] active:scale-95">
                  {displayType !== 1 ? (
                    <Link href={`/thread/${data._id}`}>
                      <Image
                        src="/assets/reply.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="mr-px mt-px cursor-pointer object-contain"
                      />
                    </Link>
                  ) : (
                    <div>
                      <Image
                        src="/assets/reply.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="mr-px mt-px object-contain"
                      />
                    </div>
                  )}
                  <span className="ml-1 text-sm text-light-4">
                    {data?.commentCount}
                  </span>
                </button>
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1]">
                  <Image
                    src="/assets/repost.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-px mt-px cursor-pointer object-contain"
                  />
                  <span className="ml-1 text-sm text-light-4">
                    {data?.repostCount}
                  </span>
                </button>
                <button className="flex items-center rounded-full p-2 transition-all duration-150 hover:bg-[#e1e1e1] active:scale-95">
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-px mt-px  cursor-pointer object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default ThreadCard;
