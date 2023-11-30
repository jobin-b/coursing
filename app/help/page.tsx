import Image from "next/image";

export default function Help() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center border-4 border-gray-400 p-12 rounded-md">
        <h1 className="text-4xl mb-4">Finding Your Course Number</h1>
        <ol className="list-decimal text-neutral-300 flex flex-col gap-2">
          <li>Visit your class schedule (or Atlas) and select WN 24</li>
          <li>Find the classes you want to add</li>
          <li>
            <p className="mb-2">Identify the course number as shown</p>
            <Image
              src="/info.jpg"
              alt="course info"
              width={391}
              height={262}
              priority
            />
          </li>
        </ol>
        <a href="/" className="mt-4 text-yellow-200 hover:text-yellow-400">
          Back to home
        </a>
      </div>
    </main>
  );
}
