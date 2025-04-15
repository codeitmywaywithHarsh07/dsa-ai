"use client";
import { useState } from "react";
import AuthModal from "./auth-modal";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Master Data Structures</span>
            <span className="block text-blue-600 dark:text-blue-400">
              And Algorithms
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your progress, solve problems efficiently, and ace your coding
            interviews.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <div
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                onClick={() => {
                  setShowAuthModal(true);
                }}
              >
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="flex absolute items-center justify-center min-h-screen">
          <AuthModal
            show={showAuthModal}
            onClose={() => setShowAuthModal(false)} // Redirect if closed
            type="out"
            />
        </div>
      )}
    </div>
  );
}
