"use client";
import { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import AuthModal from "../_components/auth-modal";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuthenticated) {
      setOpenAuthModal(true);
    }
  }, []);

  const hideSidebar = /^\/problems\/[^\/]+\/[^\/]+$/.test(pathname);
  return (
    <div className="flex relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
      {openAuthModal && (
        <div className="flex absolute items-center justify-center min-h-screen">
          <AuthModal
            show={openAuthModal}
            type="in"
            onClose={() => setOpenAuthModal(false)} // Redirect if closed
           />
        </div>
      )}
    </div>
  );
}

// #232c33
