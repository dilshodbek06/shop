"use client";

import {
  Home,
  LayoutDashboard,
  ListOrderedIcon,
  Settings2,
  SquareGanttChart,
  SquareMenu,
  UserCog,
  Users,
} from "lucide-react";
import SidebarItem from "./sidebar-item";

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: SquareMenu,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: SquareGanttChart,
    label: "Products",
    href: "/admin/products",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: ListOrderedIcon,
    label: "Orders",
    href: "/admin/orders",
  },
  {
    icon: UserCog,
    label: "Settings",
    href: "/admin/settings",
  },
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
];

const SidebarRoutes = () => {
  const routes = adminRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
