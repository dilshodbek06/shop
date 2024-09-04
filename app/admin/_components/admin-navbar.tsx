import Logo from "@/app/_components/logo";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dynamic from "next/dynamic";

const SidebarRoutes = dynamic(() => import("./sidebar-routes"), { ssr: false });

const AdminNavbar = () => {
  return (
    <div className="p-3 border-b h-full flex justify-between items-center">
      <div className="hidden md:flex justify-between items-center md:animate-marquee md:w-full">
        <h2>
          Hello, this website is in test mode, I will ask you to add less
          information.
        </h2>
        <h2>
          Hello, this website is in test mode, I will ask you to add less
          information.
        </h2>
      </div>
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="flex gap-x-2">
        <Sheet>
          <SheetTrigger>
            <div className="rounded-full p-2 hover:bg-gray-50 transition md:hidden">
              <Menu className="w-6 h-6 cursor-pointer" />
            </div>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <div className="flex flex-col w-full mt-8">
              <SidebarRoutes />
            </div>
            <div className="h-full  flex flex-col justify-end py-3 items-center">
              © 2024 ZD.
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AdminNavbar;
