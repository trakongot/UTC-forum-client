import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  // if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto mt-20 flex max-w-3xl flex-col justify-start rounded-[24px] bg-light-1 px-10 py-20 shadow-form">
      <h1 className="head-text text-dark-1">Onboarding</h1>
      <p className="mt-3 text-base-regular text-dark-3">
        Complete your profile now, to use Threds.
      </p>
      <section className="mt-9">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
