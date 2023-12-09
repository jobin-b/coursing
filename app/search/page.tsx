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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {results.map((result: Course, index) => {
        return <Course key={result.classNbr} course={result} />;
      })}
    </main>
  );
}

function Course({ course }: { course: Course }) {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-400 h-60 w-60 rounded-md">
      <h1 className="text-lg mb-4">{course.classNbr}</h1>
    </div>
  );
}

function NotFound({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-400 p-12 rounded-md">
      <h1 className="text-lg mb-4">Not Found</h1>
    </div>
  );
}
