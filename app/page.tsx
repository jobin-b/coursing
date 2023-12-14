import { join } from "path";
import { FaGithubSquare } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

export default async function Home() {
  "use server";
  return (
    <main className="flex px-4 h-[90vh] flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-6xl font-semibold font-mono text-[#FFCB05]">
        Coursing
      </h1>
      <p className="mb-8 w-48 sm:w-full text-md text-mono text-neutral-100 flex-wrap text-center">
        Import your courses to Google Calendar.
        <br /> For University of Michigan students.
      </p>
      <form
        action="/search"
        className="flex justify-center items-center border-2 px-3 py-2 rounded-full bg-neutral-100 text-[#00274C]"
      >
        <input
          type="text"
          name="q"
          pattern="^\s*\d+\s*(?:,\s*\d+\s*)*$"
          className="w-64 md:w-96 sm:text-lg bg-transparent focus:outline-none placeholder-[#00274C] text-[#00274C]"
          placeholder="Eg: 13503, 13602, 13706"
          required
        />
        <button type="submit" className="text-2xl text-[#00274C]">
          <IoMdSearch />
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-300 text-center">
        Enter course number
        <br /> or a comma separated list of course numbers
      </p>
      <a
        href="/help"
        className="mt-4 text-center text-sm text-yellow-300 hover:text-[#FFCB05]"
      >
        How to find your course number?
      </a>
    </main>
  );
}
