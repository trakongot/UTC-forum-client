"use client";
import useTriggerStore from "@/store/useTriggerStore";

export default function RightSidebar() {
  const { LeftSidebarOpened } = useTriggerStore();

  return (
    <>
      {LeftSidebarOpened && (
        <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-light-6 dark:border-l-dark-4 dark:bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden">
          <div className="flex flex-1 flex-col justify-start">
            <h3 className="text-heading4-medium dark:text-light-1">
              Suggested Communities
            </h3>

            <div className="mt-7 flex w-[350px] flex-col gap-9">
              <p className="!text-base-regular dark:text-light-3">
                No communities yet
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-start">
            <h3 className="text-heading4-medium dark:text-light-1">
              Similar Minds
            </h3>
            <div className="mt-7 flex w-[350px] flex-col gap-10">
              <p className="!text-base-regular dark:text-light-3">
                No users yet
              </p>
              {/* {similarMinds.users.length > 0 ? (
              <>
                {similarMinds.users.map((person) => (
                  <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType="User"
                  />
                ))}
              </>
            ) : (
              <p className="!text-base-regular dark:text-light-3">No users yet</p>
            )}*/}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
