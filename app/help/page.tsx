import Image from "next/image";
import { FaGithubSquare } from "react-icons/fa";

export default async function Help() {
  "use server";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center border-4 border-yellow-300 p-12 rounded-md">
        <h1 className="text-4xl mb-4 text-neutral-100">
          Finding Your Course Number
        </h1>
        <ol className="list-decimal text-neutral-300 flex flex-col gap-2">
          <li>Visit your class schedule (or Atlas) and select WN 24</li>
          <li>Find the classes you want to add</li>
          <li>
            <p className="mb-2">Identify the course number as shown</p>
            <Image
              src="/info.jpg"
              alt="course info"
              width={300}
              height={200}
              priority
            />
          </li>
        </ol>
        <a href="/" className="mt-4 text-yellow-300 hover:text-[#FFCB05]">
          Back to home
        </a>
      </div>
      <a
        href="https://github.com/jobin-b/coursing"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="github link"
      >
        <FaGithubSquare
          className="h-12 w-12 absolute bottom-2 right-2 text-neutral-300 hover:text-[#FFCB05] hover:opacity-100 transition-all opacity-50"
          alt="github link"
        />
      </a>
    </main>
  );
}
