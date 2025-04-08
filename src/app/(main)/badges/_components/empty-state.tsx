// src/app/(main)/badges/_components/empty-state.tsx
'use client'

import { motion } from 'framer-motion'
import { FiAward, FiCode, FiStar } from 'react-icons/fi'

export default function BadgesEmptyState() {
  return (
    <div className="text-center py-12 max-w-md mx-auto mt-20 ">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8"
      >
        <div className="relative inline-block">
          <FiAward className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
          
          {/* Floating stars animation */}
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              y: [0, -5, 5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2"
          >
            <FiStar className="text-yellow-400" />
          </motion.div>
          
          <motion.div
            animate={{ 
              rotate: [0, -15, 15, 0],
              y: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-2 -left-2"
          >
            <FiStar className="text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          No Badges Yet? Keep Coding!
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Badges will appear here as you conquer DSA problems. 
          Every solved problem brings you closer to your next achievement!
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
      >
        <FiCode className="mr-2 text-blue-600 dark:text-blue-400" />
        <span className="font-medium">Solve problems to earn badges</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 text-xs text-gray-400 dark:text-gray-500"
      >
        <p>Pro tip: Consistency beats intensity</p>
        <p className="mt-1">(But intensity with consistency is unbeatable)</p>
      </motion.div>
    </div>
  )
}