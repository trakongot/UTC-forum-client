import Image from "next/image";
import Link from "next/link";

async function Page() {
  return (
    <div className="rounded-xl bg-light-1 p-10 shadow-md">
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {/* {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )} */}
      </section>
    </div>
  );
}

export default Page;
