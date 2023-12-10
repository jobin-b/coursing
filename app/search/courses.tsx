import search from "./search";
import { Course, Error, SearchResult, isError } from "./types";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { createCalendarLink } from "../utils/util";
import Image from "next/image";

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
      (course) => !results.find((result) => result.classnbr === course)
    );
  }
  return (
    <div className="w-full bg-white min-h-[75vh] flex flex-col gap-8 justify-start items-start py-8 pl-48">
      {notFound ? (
        <p className="font-bold text-xl">
          Could Not Find Courses: {notFound.join(", ")}
        </p>
      ) : null}
      {results.map((result: Course, index) => {
        return <Course key={result.classnbr} course={result} />;
      })}
    </div>
  );
}

async function Course({ course }: { course: Course }) {
  "use server";
  let daysArr = [
    course.m,
    course.t,
    course.w,
    course.th,
    course.f,
    course.s,
    course.su,
  ];
  const days = daysArr.filter((day) => day != "").join(",");
  const link = course.starttime != "TBA" ? createCalendarLink(course) : "";
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
            {course.name}: {course.coursetitle} (
            {course.classtype ? course.classtype : course.component})
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
          {course.starttime === "TBA"
            ? course.starttime
            : `${course.starttime} - ${course.endtime}`}
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
