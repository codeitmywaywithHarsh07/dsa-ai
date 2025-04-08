'use client'

import { motion } from 'framer-motion'

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, type: 'spring' }}
        className={`h-full rounded-full ${
          // value < 30 ? 'bg-red-500' :
          // value < 70 ? 'bg-yellow-500' :
          // 'bg-green-500'
          "bg-gray-700"
        }`}
      />
    </div>
  )
}

export default ProgressBar