"use client";

import { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import AuthModal from "../_components/auth-modal";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import clsx from "clsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();
  const hideSidebar = /^\/problems\/[^\/]+\/[^\/]+$/.test(pathname);

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenAuthModal(true);
    }
  }, []);

  return (
    <div className="flex relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {!hideSidebar && (
        <>
          {/* Mobile Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar isOpen />
          </div>
        </>
      )}

      <div className="flex-1 overflow-auto">
        {/* Hamburger for mobile */}
        {!hideSidebar && (
          <div className="p-4 md:hidden">
            <LuMenu className="size-7 cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
          </div>
        )}
        <main className="p-6">{children}</main>
      </div>

      {/* Auth Modal */}
      {openAuthModal && (
        <div className="flex absolute items-center justify-center min-h-screen w-full">
          <AuthModal
            show={openAuthModal}
            type="in"
            onClose={() => setOpenAuthModal(false)}
          />
        </div>
      )}
    </div>
  );
}
