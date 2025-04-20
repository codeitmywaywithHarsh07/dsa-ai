import FeatureCard from "./_components/feature-card";
import HeroSection from "./_components/hero-section";
import { FiArrowRight, FiBarChart2, FiBook, FiCalendar, FiCode, FiBookmark, FiAward } from "react-icons/fi";

export default function LandingPage() {
  const features = [
    {
      title: "Problem Tracker",
      description: "Track your progress on DSA problems with visual analytics",
      href: "/problems",
      icon: <FiCode className="w-6 h-6" />,
      color: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Dashboard",
      description: "Your personalized progress analytics and insights",
      href: "/dashboard",
      icon: <FiBarChart2 className="w-6 h-6" />,
      color: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Learning Paths",
      description: "Structured roadmaps for mastering DSA",
      href: "/blogs",
      icon: <FiBook className="w-6 h-6" />,
      color: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
    },
    {
      title: "Notes",
      description: "Save and organize your study notes",
      href: "/notes",
      icon: <FiBookmark className="w-6 h-6" />,
      color: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    },
    {
      title: "Badges",
      description: "Earn achievements for your progress",
      href: "/badges",
      icon: <FiAward className="w-6 h-6" />,
      color: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
    },
    {
      title: "Bookmarks",
      description: "Save important problems and articles",
      href: "/bookmarks",
      icon: <FiCalendar className="w-6 h-6" />,
      color: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Master Data Structures & Algorithms
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your all-in-one platform to track, analyze, and improve your problem-solving skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 dark:bg-blue-800/90 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to boost your coding skills?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are improving their problem-solving abilities daily.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Get Started
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300">Problems Solved</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-300">Learning Paths</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}