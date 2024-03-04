import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu></Menu>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar></Sidebar>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidbar;
