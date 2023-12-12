import Link from "next/link";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";
import SearchResults from "./courses";
import { FaGithubSquare } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  "use server";
  const query = searchParams.q ? searchParams.q : "";
  let courses = query.replace(/\s/g, "").split(",");
  if (courses.length > 10) {
    courses = courses.slice(0, 10);
  }
  return (
    <main className="flex min-h-screen w-screen flex-col justify-start bg-white text-[#00274C]">
      <div className="w-full h-[15vh] sm:h-[25vh] bg-[#00274C] flex gap-8 pl-4 sm:pl-48 justify-start items-center">
        <Link href="/">
          <h1 className="text-[#FFCB05] text-2xl sm:text-5xl font-extrabold">
            Coursing
          </h1>
        </Link>
        <div className="flex flex-col gap-1 sm:w-[35%]">
          <label
            htmlFor="courseNumber"
            className="mr-2 text-white ml-4 sm:text-lg"
          >
            Course Numbers:
          </label>
          <form
            action="/search"
            className="flex justify-between items-center border-2 px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-neutral-100 text-[#00274C]"
          >
            <input
              type="text"
              name="q"
              pattern="^\s*\d+\s*(?:,\s*\d+\s*)*$"
              className="w-full sm:text-lg bg-transparent focus:outline-none placeholder-[#00274C] text-[#00274C]"
              placeholder="Eg: 13503, 13602"
              defaultValue={query}
              required
            />
            <button type="submit" className="text-2xl text-[#00274C]">
              <IoMdSearch />
            </button>
          </form>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FadeLoader />
          </div>
        }
      >
        <SearchResults courses={courses} />
      </Suspense>
    </main>
  );
}
