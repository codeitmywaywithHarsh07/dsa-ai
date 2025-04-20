"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import AuthModal from "./auth-modal";
// import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-950 to-blue-800 dark:from-blue-800 dark:to-blue-700 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Master DSA with <span className="text-blue-200">Confidence</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Track your progress, solve problems efficiently, and ace your coding
            interviews with our comprehensive platform.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            onClick={() => {
              setShowAuthModal(true);
            }}
          >
            <button className="px-8 py-3 flex items-center font-semibold bg-white text-blue-600 hover:bg-blue-50 rounded-lg text-lg">
              Get Started
              <FiArrowRight className="ml-2" />
            </button>
            <button className="px-8 py-3 bg-transparent border-white text-white hover:bg-white/10 font-medium rounded-lg text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl"></div>
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
