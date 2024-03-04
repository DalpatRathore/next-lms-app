"use client";

import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidbar from "./MobileSidbar";

const Navbar = () => {
  return (
    <div className="w-full h-full border-b p-4 flex items-center bg-white shadow-sm">
      <MobileSidbar></MobileSidbar>
      <NavbarRoutes></NavbarRoutes>
    </div>
  );
};
export default Navbar;
