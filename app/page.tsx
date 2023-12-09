import { redirect } from "next/navigation";

export default async function Home() {
  "use server";
  async function search(formData: FormData) {
    "use server";
    redirect(`/search?q=${formData.get("courseNumber")}`);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-6xl font-semibold font-mono text-[#FFCB05]">
        Coursing
      </h1>
      <p className="mb-8 text-md text-mono text-neutral-100 flex-wrap text-center">
        Import your courses to Google Calendar.
        <br /> For University of Michigan students.
      </p>
      <form action={search} className="w-full h-full flex justify-center">
        <input
          type="text"
          name="courseNumber"
          pattern="^\s*\d+\s*(?:,\s*\d+\s*)*$"
          className="w-1/4 bg-transparent border-b border-neutral-100 focus:outline-none  text-neutral-100 placeholder-neutral-300"
          placeholder="Eg: 13503, 13602, 13706"
          required
        />
        <button
          type="submit"
          className="border-b border-neutral-100 text-neutral-100"
        >
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
