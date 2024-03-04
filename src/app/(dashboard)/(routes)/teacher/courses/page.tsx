import { Button } from "@/components/ui/button";
import Link from "next/link";

const Coursesage = () => {
  return (
    <div className="p-6">
      <Link href={"/teacher/create"}>
        <Button>Create</Button>
      </Link>
    </div>
  );
};
export default Coursesage;
