import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function FeatureCard({
  title,
  description,
  href,
  icon,
  color,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Link href={href}>
      <div className="group relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:underline">
            <span className="text-sm font-medium">Explore feature</span>
            <FiArrowRight className="ml-1 w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}