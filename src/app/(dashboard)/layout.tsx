import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="w-full h-[80px] md:pl-56 fixed inset-y-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="fixed hidden md:flex flex-col w-56 h-full inset-y-0 z-50">
        <Sidebar></Sidebar>
      </div>
      <main className="md:pl-56 h-full">{children}</main>
    </div>
  );
};
export default DashboardLayout;
