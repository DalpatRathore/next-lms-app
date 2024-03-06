import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const Coursesage = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const data = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default Coursesage;
