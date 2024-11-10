import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="rounded-xl bg-light-1 p-10 shadow-md">
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </section>
  );
}

export default Page;
