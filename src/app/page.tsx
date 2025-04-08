import FeatureCard from "./_components/feature-card"
import HeroSection from "./_components/hero-section"

export default function LandingPage() {
  const features = [
    {
      title: "Problem Tracker",
      description: "Track your progress on DSA problems",
      href: "/dashboard/problems",
      icon: "📊",
    },
    {
      title: "Progress Analytics",
      description: "View your solving statistics and patterns",
      href: "/dashboard/analytics",
      icon: "📈",
    },
    {
      title: "Study Plans",
      description: "Follow structured learning paths",
      href: "/dashboard/plans",
      icon: "🗓️",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  )
}