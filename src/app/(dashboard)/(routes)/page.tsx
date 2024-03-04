import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <h1 className="mr-10">Dalpat Rathore</h1>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
