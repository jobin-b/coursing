import search from "./search";
import { Course, Error, SearchResult, isError } from "./types";
import { FaExternalLinkAlt, FaGithubSquare } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { createCalendarLink } from "../utils/util";
import Image from "next/image";
import Link from "next/link";

export default async function SearchResults({
  courses,
}: {
  courses: string[];
}) {
  "use server";

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
    <>
      <div className=" bg-white flex h-full flex-col gap-8 justify-between items-start py-8 px-4 md:pl-24 lg:pl-48">
        {notFound ? (
          <p className="font-bold text-xl">
            Could Not Find Courses: {notFound.join(", ")}
          </p>
        ) : null}
        {results.map((result: Course, index) => {
          return <Course key={result.classNbr} course={result} />;
        })}
        <Link href="#top">Scroll to top</Link>
      </div>
    </>
  );
}

async function Course({ course }: { course: Course }) {
  "use server";
  let daysArr = [
    course.M,
    course.T,
    course.W,
    course.TH,
    course.F,
    course.S,
    course.SU,
  ];
  const days = daysArr.filter((day) => day != "").join(",");
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
          <div className="">
            <h2 className="text-xl font-bold inline p-0">
              {course.name}: {course.courseTitle} (
              {course.classType ? course.classType : course.component}){" "}
            </h2>
            <FaExternalLinkAlt className="inline mb-1" />
          </div>
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
