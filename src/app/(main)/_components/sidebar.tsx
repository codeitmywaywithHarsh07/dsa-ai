"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaNoteSticky } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems1 = [
    { name: "Dashboard", href: "/dashboard", icon: TbLayoutDashboardFilled },
    { name: "Problems", href: "/problems", icon: FaBook },
    { name: "Blogs", href: "/blogs", icon: CgWebsite },
    { name: "Bookmarks", href: "/bookmarks", icon: BsBookmarkFill },
    { name: "Notes", href: "/notes", icon: FaNoteSticky },
  ];

  const navItems2 = [{ name: "Badges", href: "/badges", icon: MdStars }];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed">
      <div className="p-4 flex flex-col gap-8">
        <div className="flex gap-2 items-center w-full justify-center -ml-4">
          <img src="/logo-new.png" alt="Dsai" className="size-12" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            DSAi
          </h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems1.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                    pathname === item.href || pathname.startsWith(item.href)
                      ? "bg-gray-200 text-gray-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="mr-3 size-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            <div className="h-[2px] bg-gray-200 my-6"></div>

            {navItems2.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="mr-3 size-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
