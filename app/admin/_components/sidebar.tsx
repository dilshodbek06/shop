import Logo from "@/app/_components/logo";
import React from "react";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="py-5 px-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="h-full  flex flex-col justify-end py-3 items-center">
        © 2024 ZD.
      </div>
    </div>
  );
};

export default Sidebar;
