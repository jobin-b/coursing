import Image from "next/image";

export default async function Help() {
  "use server";
  return (
    <main className="flex h-[81vh] flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center sm:border-4 border-[#FFCB05] p-12 rounded-md">
        <h1 className="text-4xl mb-4 text-white">Finding Your Course Number</h1>
        <ol className="list-decimal text-white flex flex-col gap-2">
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
    </main>
  );
}
