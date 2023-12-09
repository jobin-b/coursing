import search from "./search";
import { Course, Error, SearchResult, isError } from "./types";
// import { convert2sqlite } from "../convert2sqlite";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  "use server";
  const query = searchParams.q ? searchParams.q : "";
  const courses = query.replace(/\s/g, "").split(",");
  let results: Course[] = [];
  try {
    results = await search(courses);
  } catch (e) {
    console.log(e);
  }
  console.log(results[0].classNbr);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      {/* <div className="top">
        <a href="/">
          <h1 className="text-[#FFCB05] text-4xl font-semibold">Coursing</h1>
        </a>
        searrch
      </div> */}
      <div className="border-2 border-[#FFCB05] w-3/4 rounded-md">
        {results.map((result: Course, index) => {
          return <Course key={result.classNbr} course={result} />;
        })}
      </div>
    </main>
  );
}

function Course({ course }: { course: Course }) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-lg mb-4">{course.classNbr}</h1>
    </div>
  );
}
