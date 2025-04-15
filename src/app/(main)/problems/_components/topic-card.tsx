'use client'
import Link from 'next/link'
import ProgressBar from '@/components/progress-bar'

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
}

export default function TopicCard({ topic }: {
  topic: {
    slug: string
    name: string
    description: string
    totalQuestions: number
    completedQuestions: number
    icon: React.ComponentType<{ className?: string }>
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
  }
}) {
  const progress = Math.round((topic.completedQuestions / topic.totalQuestions) * 100)
  const Icon = topic.icon

    function cn(arg0: string, arg1: string): string | undefined {
        throw new Error('Function not implemented.')
    }

  return (
    <div 
      className="group relative overflow-hidden hover:-translate-y-2 ease-in-out duration-300"
    >
      <Link href={`/problems/${topic.slug}`} className="block h-full">
        <div className="h-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-shadow duration-300">
          
          {/* Header */}
          <div className="p-5 pb-4 bg-gradient-to-tr from-gray-600 to-gray-900 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl">
            <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-gray-400 text-gray-800 shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-white dark:text-white">{topic.name}</h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              {topic.description}
            </p>

            {/* Progress */}
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span className='text-md'>Progress</span>
                <span className='text-gray-800 font-bold text-md'>{topic.completedQuestions}/{topic.totalQuestions} solved</span>
              </div>
              <ProgressBar value={progress} />
            </div>

        
          </div>

          {/* Fancy Hover Border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 dark:group-hover:border-blue-800/50 rounded-2xl pointer-events-none transition-all duration-300" />
        </div>
      </Link>
    </div>
  )
}