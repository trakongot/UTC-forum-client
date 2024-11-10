import Image from "next/image";
import Link from "next/link";
import React from "react";

export function FeedThreadCard() {
  return (
    <article
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
            <Link href={`/profile/`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold dark:text-light-1">
                Lê đ.tú
              </h4>
            </Link>
            <time></time>
            <p className="mt-2 text-small-regular dark:text-light-2">
              xin chào
            </p>

            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1]">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <span className="text-sm ml-1">12</span>
                </button>
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1]">
                  <Link href={`/thread/`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  <span className="text-sm ml-1">12</span>
                </button>
                <button className="flex items-center rounded-full px-2 py-1 hover:bg-[#e1e1e1]">
                  <Image
                    src="/assets/repost.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <span className="text-sm ml-1">12</span>
                </button>
                <button className="flex items-center justify-center rounded-full p-2 hover:bg-[#e1e1e1]">
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
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
