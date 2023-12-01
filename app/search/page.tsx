import { Suspense } from "react";
import search from "./search";
import { Course, Error, SearchResult, isError } from "./types";

export default function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const query = searchParams.q ? searchParams.q : "";
  const courses = query.replace(/\s/g, "").split(",");
  const results: SearchResult[] = search(courses);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {results.map((result: SearchResult) => {
        if (isError(result)) {
          return <NotFound key={result.query} error={result} />;
        } else {
          return <Course key={result.query} course={result} />;
        }
      })}
    </main>
  );
}

function Course({ course }: { course: Course }) {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-400 p-12 rounded-md">
      <h1 className="text-lg mb-4">{course.query}</h1>
    </div>
  );
}

function NotFound({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-400 p-12 rounded-md">
      <h1 className="text-lg mb-4">{error.query} Not Found</h1>
    </div>
  );
}
