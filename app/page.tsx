import { redirect } from "next/navigation";

export async function searchForm(formData: FormData) {
  "use server";
  redirect(`/search?q=${formData.get("courseNumber")}`);
}

export default async function Home() {
  "use server";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-6xl font-semibold font-mono text-[#FFCB05]">
        Coursing
      </h1>
      <p className="mb-8 text-md text-mono text-neutral-100 flex-wrap text-center">
        Import your courses to Google Calendar.
        <br /> For University of Michigan students.
      </p>
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
          required
        />
        <button type="submit" className="text-lg text-[#00274C]">
          -&gt;
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-300 text-center">
        Enter course number
        <br /> or a comma separated list of course numbers
      </p>
      <a
        href="/help"
        className="mt-4 text-sm text-yellow-300 hover:text-[#FFCB05]"
      >
        How to find your course number?
      </a>
    </main>
  );
}
