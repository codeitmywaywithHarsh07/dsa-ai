"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaNoteSticky } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsBookmarkFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
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
    <>
      {/* Overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={clsx(
          "fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen && onClose,
            "md:translate-x-0": true,
          }
        )}
      >
        <div className="p-4 flex flex-col gap-8 h-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center w-full justify-center -ml-4">
              <img src="/logo-new.png" alt="Dsai" className="size-12" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                DSAi
              </h1>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden text-gray-600 dark:text-white"
              >
                <IoClose className="size-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems1.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
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
                    onClick={onClose}
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
    </>
  );
}
