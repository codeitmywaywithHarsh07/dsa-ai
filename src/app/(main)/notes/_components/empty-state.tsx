
'use client'

import { FiBook, FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotesEmptyState() {
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <FiBook className="text-6xl text-gray-300 dark:text-gray-600 mx-auto" />
          <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xs font-bold">0</span>
          </div>
        </div>
      </motion.div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        No Notes Yet? That's Criminal!
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Your future interview-ready self is judging you right now. Better start taking some notes!
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/problems"
          className="inline-flex items-center px-4 py-2 bg-[#232c33] text-white rounded-lg  transition-colors"
        >
          <FiPlus className="mr-2" />
          Solve Problems & Take Notes
        </Link>
      </motion.div>

      <div className="mt-8 text-xs text-gray-400 dark:text-gray-500">
        <p>Pro tip: Notes are like cheat codes for interviews</p>
        <p className="mt-1">(Except they're actually allowed)</p>
      </div>
    </div>
  )
}