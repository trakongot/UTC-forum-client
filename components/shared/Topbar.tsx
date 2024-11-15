"use client";
import Image from "next/image";
import Link from "next/link";
import { Slack as Logo } from "lucide-react";
import useTriggerStore from "@/store/useTriggerStore";

function Topbar() {
  const { LeftSidebarOpened } = useTriggerStore();

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-light-1 px-8 py-5 shadow-xl dark:bg-dark-2 lg:bg-transparent lg:shadow-none">
      <Link href="/" className="flex items-center gap-4">
        <Logo className="relative m-auto size-10" />
        {LeftSidebarOpened && (
          <p className="text-3xl font-semibold dark:text-light-1 max-xs:hidden">
            Threads
          </p>
        )}
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
