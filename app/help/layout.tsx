export default function LogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="/">
        <h1 className="fixed left-8 top-6 text-[#FFCB05] text-4xl font-semibold">
          Coursing
        </h1>
      </a>
      {children}
    </>
  );
}
