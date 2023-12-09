import Link from "next/link";
import search from "./search";
import { Course, Error, SearchResult, isError } from "./types";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { createCalendarLink } from "../utils/util";
import Image from "next/image";
import { redirect } from "next/navigation";

// import { convert2sqlite } from "../convert2sqlite";
async function searchForm(formData: FormData) {
  "use server";
  redirect(`/search?q=${formData.get("courseNumber")}`);
}
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
  let notFound = null;
  if (results.length === 0 || results.length != courses.length) {
    notFound = courses.filter(
      (course) => !results.find((result) => result.classNbr === course)
    );
  }
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start text-[#00274C]">
      <div className="w-full h-[25vh] flex gap-8 pl-48 justify-start items-center">
        <Link href="/">
          <h1 className="text-[#FFCB05] text-5xl font-extrabold">Coursing</h1>
        </Link>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="courseNumber"
            className="mr-2 text-white ml-4 text-lg"
          >
            Course Numbers:
          </label>
          <form
            action={searchForm}
            className="flex justify-center items-center border-2 px-3 py-2 rounded-full bg-neutral-100 text-[#00274C]"
          >
            <input
              type="text"
              name="courseNumber"
              pattern="^\s*\d+\s*(?:,\s*\d+\s*)*$"
              className="w-96 text-lg bg-transparent focus:outline-none placeholder-[#00274C] text-[#00274C]"
              placeholder="Eg: 13503, 13602, 13706"
              defaultValue={query}
              required
            />
            <button type="submit" className="text-lg text-[#00274C]">
              -&gt;
            </button>
          </form>
        </div>
      </div>
      <div className="w-full bg-white min-h-[75vh] flex flex-col gap-8 justify-start items-start py-8 pl-48">
        {notFound ? (
          <p className="font-bold text-xl">
            Could Not Find Courses: {notFound.join(", ")}
          </p>
        ) : null}
        {results.map((result: Course, index) => {
          return <Course key={result.classNbr} course={result} />;
        })}
      </div>
    </main>
  );
}

function Course({ course }: { course: Course }) {
  let days = course.M + course.T + course.W + course.F + course.S;
  days = days.split("").join(",");
  if (course.SU !== "") {
    days = days + "," + course.SU;
  }
  const link = course.startTime != "TBA" ? createCalendarLink(course) : "";
  return (
    <section className="flex flex-col justify-center items-start gap-4 ">
      <div>
        <a
          href={`https://atlas.ai.umich.edu/course/${course.name}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-start items-center gap-2 hover:underline"
        >
          <h2 className="text-xl font-bold ">
            {course.name}: {course.courseTitle} (
            {course.classType ? course.classType : course.component})
          </h2>
          <FaExternalLinkAlt className="" />
        </a>
        <hr className="border-t-2 mb-2" />
        <h3>
          <pre className="flex">
            Section: {course.section} |{" "}
            <a
              href={`https://www.ratemyprofessors.com/search/professors/1258?q=${course.instructor}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-start gap-1 items-center hover:underline"
            >
              Instructor: {course.instructor}
              <FiExternalLink />
            </a>
          </pre>
        </h3>
        <pre className="flex">
          Credits: {course.units} | Location: {course.location}
        </pre>
        <pre className="flex">
          {course.startTime === "TBA"
            ? course.startTime
            : `${course.startTime} - ${course.endTime}`}
          <span> | {days ? days : "Days TBA"}</span>
        </pre>
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-2 border-2 border-[#00274C] rounded-lg p-2"
        >
          <Image
            src="/gmail.png"
            alt="gmail icon"
            width={25}
            height={25}
            priority
          />
          <p className="text-lg">Import to Google Calendar</p>
        </a>
      ) : (
        <p>No times available to import.</p>
      )}
    </section>
  );
}
