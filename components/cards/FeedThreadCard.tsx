import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "../custom/carousel";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";

export function FeedThreadCard() {
  const images = [
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/465283193_457605337349000_6541091319638188556_n.jpg?stp=c263.132.434.433a_dst-jpg_r90_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH4XHVOr0Cui-if5H632vJgLGuaiLU8k20sa5qItTyTbQfIWapJMxOyz86BGEP2LKs2lJl0SKK8IKGWD5sleI8g&_nc_ohc=nrMfpXerhiUQ7kNvgHi_maB&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=AHcfbtwVzUTaAnIezWhMqDE&oh=00_AYBvXXnEWMvyJdFMdFy-GJCUwFr6tl6uSQQ_RVaI9ejAQA&oe=6736125D",
    "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/448190682_442916138495710_7837849995761651973_n.jpg?stp=c16.0.533.533a_dst-jpg_s200x200&_nc_cat=109&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFvz6kiebPbW8RCP3-dBaW4pg6uiyWptIKmDq6LJam0gtYsjyKKdWosmk0cBntr1w94HmJtagSz4E4Os6DHNfF_&_nc_ohc=srhbRlKE7-MQ7kNvgGCGOvi&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=A9QigW3y8CKIEqZmtnRGmFZ&oh=00_AYBStSGqEsV_vaXHPCCdabyGoHChaB_J5Ac0H7_hfKrPpw&oe=6736557F",
  ];
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
            <Link href={`/profile/`} className="relative h-11 w-11">
              <Image
                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/465283193_457605337349000_6541091319638188556_n.jpg?stp=c263.132.434.433a_dst-jpg_r90_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH4XHVOr0Cui-if5H632vJgLGuaiLU8k20sa5qItTyTbQfIWapJMxOyz86BGEP2LKs2lJl0SKK8IKGWD5sleI8g&_nc_ohc=nrMfpXerhiUQ7kNvgHi_maB&_nc_zt=24&_nc_ht=scontent.fhan17-1.fna&_nc_gid=AHcfbtwVzUTaAnIezWhMqDE&oh=00_AYBvXXnEWMvyJdFMdFy-GJCUwFr6tl6uSQQ_RVaI9ejAQA&oe=6736125D"
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-slate-300 dark:bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <Link href={`/profile/`} className="w-fit flex items-center">
                <h4 className="cursor-pointer font-semibold text-2xl  dark:text-light-1">
                  Lê đ.tú
                </h4>
                <span className="text-xs ml-3  text-dark-4">12 days</span>
              </Link>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="flex items-center rounded-full p-2 hover:bg-[#e1e1e1] active:scale-95 transition-all duration-150">
                    <Image
                      src="/assets/threedots.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </MenubarTrigger>
                  <MenubarContent>
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
            <p className="mt-2 pb-3 text-small-regular dark:text-light-2">
              xin chào
            </p>
            <Carousel images={images} />
            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1] active:scale-95 transition-all duration-150">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-[1px] mt-[1px] cursor-pointer object-contain"
                  />
                  <span className="text-sm ml-1 text-light-4">12</span>
                </button>

                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1] active:scale-95 transition-all duration-150">
                  <Link href={`/thread/`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="mr-[1px] mt-[1px] cursor-pointer object-contain"
                    />
                  </Link>
                  <span className="text-sm ml-1 text-light-4">12</span>
                </button>
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1]">
                  <Image
                    src="/assets/repost.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-[1px] mt-[1px] cursor-pointer object-contain"
                  />
                  <span className="text-sm ml-1 text-light-4">12</span>
                </button>
                <button className="flex items-center rounded-full p-2 hover:bg-[#e1e1e1] active:scale-95 transition-all duration-150">
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="mr-[1px] mt-[1px]  cursor-pointer object-contain"
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
export default FeedThreadCard;
