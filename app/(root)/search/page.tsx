import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

export default function Page({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | undefined };
}>) {
  return (
    <section className="rounded-xl bg-light-1 p-10 shadow-md">
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9 py-2">
        {/* {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
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
        )} */}
      </div>

      {/* <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </section>
  );
}
