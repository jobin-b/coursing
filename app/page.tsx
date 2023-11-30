export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-6xl font-semibold font-mono text-yellow-300">
        Coursing
      </h1>
      <p className="mb-8 text-md text-mono text-neutral-300 flex-wrap text-center">
        Import your courses to Google Calendar.
        <br /> For U of M students.
      </p>
      <form action={`/query`} className="w-full h-full flex justify-center">
        <input
          type="text"
          name="courseNumber"
          className="w-1/4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-gray-600 placeholder-gray-400"
          placeholder="Eg: 13503, 13602, 13706"
          required
        />
        <button
          type="submit"
          className="border-b border-gray-500 text-gray-300"
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
        className="mt-4 text-sm text-yellow-200 hover:text-yellow-400"
      >
        How to find your course number?
      </a>
    </main>
  );
}
