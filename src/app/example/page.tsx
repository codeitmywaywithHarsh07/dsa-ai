// pages/dsa-tracker.tsx
'use client'
import DSATable from '@/components/Table';
import { useState } from 'react';

const DSATrackerPage = () => {
  const [problems, setProblems] = useState<DSAProblem[]>([
    {
      id: 1,
      problemName: 'Two Sum',
      difficulty: 'Easy',
      notes: 'Use hash map for O(n) solution',
      leetcodeLink: 'https://leetcode.com/problems/two-sum/',
      gfgLink: 'https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/',
      status: 'Completed',
      lastRevised: '2023-10-15',
      isBookmarked: true,
    },
    {
      id: 2,
      problemName: 'Reverse Linked List',
      difficulty: 'Easy',
      notes: '',
      leetcodeLink: 'https://leetcode.com/problems/reverse-linked-list/',
      status: 'In Progress',
      lastRevised: '2023-10-10',
      isBookmarked: false,
    },
    {
      id: 3,
      problemName: 'Merge Intervals',
      difficulty: 'Medium',
      notes: 'Sort first, then merge overlapping',
      leetcodeLink: 'https://leetcode.com/problems/merge-intervals/',
      status: 'Completed',
      lastRevised: '2023-09-28',
      isBookmarked: false,
    },
    {
      id: 4,
      problemName: 'Word Break',
      difficulty: 'Medium',
      notes: 'DP approach with memoization',
      leetcodeLink: 'https://leetcode.com/problems/word-break/',
      status: 'Revisited',
      lastRevised: '2023-10-05',
      isBookmarked: true,
    },
    {
      id: 5,
      problemName: 'Trapping Rain Water',
      difficulty: 'Hard',
      notes: 'Two pointer approach works best',
      leetcodeLink: 'https://leetcode.com/problems/trapping-rain-water/',
      gfgLink: 'https://www.geeksforgeeks.org/trapping-rain-water/',
      status: 'Not Started',
      isBookmarked: false,
    },
  ]);

  const handleNotesUpdate = (id: number, notes: string) => {
    setProblems(prev =>
      prev.map(problem =>
        problem.id === id ? { ...problem, notes } : problem
      )
    );
  };

  const handleStatusUpdate = (id: number, status: ProblemStatus) => {
    setProblems(prev =>
      prev.map(problem =>
        problem.id === id ? { 
          ...problem, 
          status,
          lastRevised: status === 'Completed' || status === 'Revisited' 
            ? new Date().toISOString().split('T')[0] 
            : problem.lastRevised 
        } : problem
      )
    );
  };

  const handleBookmarkToggle = (id: number, isBookmarked: boolean) => {
    setProblems(prev =>
      prev.map(problem =>
        problem.id === id ? { ...problem, isBookmarked } : problem
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          DSA Practice Tracker
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <DSATable
            data={problems}
            onNotesUpdate={handleNotesUpdate}
            onStatusUpdate={handleStatusUpdate}
            onBookmarkToggle={handleBookmarkToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default DSATrackerPage;