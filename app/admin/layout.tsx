import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="space-x-4">
        <Link href={"/admin"} className="text-xl">
          Admin
        </Link>
        <Link href={"/"} target="_blank" className="opacity-50">
          Main page
        </Link>
      </nav>

      <div>{children}</div>
    </>
  );
}
