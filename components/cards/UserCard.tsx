"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className="flex flex-col justify-between gap-4 max-xs:rounded-xl dark:max-xs:bg-dark-3 max-xs:bg-light-3 max-xs:p-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold dark:text-light-1 text-primary">
            {name}
          </h4>
          <p className="text-small-medium dark:text-gray-1 text-gray-500">
            @{username}
          </p>
        </div>
      </div>

      <Button
        className="user-h-auto min-w-[74px] rounded-lg dark:bg-primary-500 bg-dark-4 text-[12px] text-light-1 "
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
