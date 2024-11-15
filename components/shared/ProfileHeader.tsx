import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/userType";

function ProfileHeader({ data }: Readonly<{ data: User }>) {
  return (
    <div className="flex w-full flex-col justify-start rounded-xl border bg-light-1 px-4 py-5 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-20 object-cover">
            <Image
              src={data?.profilePic ?? ""}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-lg dark:text-light-1">{data.name}</h2>
            <p className="dark:text-gray-1">@{data.username}</p>
          </div>
        </div>
        <Link href="/settings/profile">
          <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
            <Image src="/assets/edit.svg" alt="logout" width={16} height={16} />
            <p className="text-light-2  max-sm:hidden">Edit</p>
          </div>
        </Link>
      </div>

      <p className="mt-6 max-w-lg dark:text-light-2">{data.bio}</p>

      <div className="mt-12 h-0.5 w-full dark:bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
