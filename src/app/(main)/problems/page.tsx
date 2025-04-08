"use client";
import Container from "@/components/Container";
import {
  FiLayers,
  FiCode,
  FiBarChart2,
  FiGitBranch,
  FiActivity,
  FiBox,
  FiShuffle,
  FiZap,
  FiCpu,
  FiCommand,
  FiTarget,
  FiTrendingUp,
  FiGrid,
  FiRepeat,
  FiArrowRightCircle,
  FiKey,
  FiMap,
  FiSearch,
} from "react-icons/fi";

import TopicCard from "./_components/topic-card";
import { useState } from "react";

const topics = [
  {
    slug: "arrays",
    name: "Arrays",
    description: "Master basic to advanced array manipulations and algorithms",
    totalQuestions: 25,
    completedQuestions: 20,
    icon: FiLayers,
  },
  {
    slug: "strings",
    name: "Strings",
    description: "Pattern matching, manipulations, and string algorithms",
    totalQuestions: 18,
    completedQuestions: 5,
    icon: FiCode,
  },
  {
    slug: "linked-lists",
    name: "Linked Lists",
    description: "Single, double and circular linked list operations",
    totalQuestions: 15,
    completedQuestions: 2,
    icon: FiBarChart2,
  },
  {
    slug: "stacks",
    name: "Stacks",
    description:
      "LIFO data structure problems including next greater, valid parentheses, etc.",
    totalQuestions: 12,
    completedQuestions: 4,
    icon: FiBox,
  },
  {
    slug: "queues",
    name: "Queues",
    description: "FIFO data structures, circular queues, priority queues, etc.",
    totalQuestions: 10,
    completedQuestions: 3,
    icon: FiArrowRightCircle,
  },
  {
    slug: "trees",
    name: "Trees",
    description: "Binary trees, traversals, BSTs, and tree-based recursion",
    totalQuestions: 20,
    completedQuestions: 6,
    icon: FiGitBranch,
  },
  {
    slug: "graphs",
    name: "Graphs",
    description: "BFS, DFS, shortest path, topological sort, and more",
    totalQuestions: 22,
    completedQuestions: 7,
    icon: FiActivity,
  },
  {
    slug: "recursion",
    name: "Recursion",
    description: "Master recursion with backtracking and decision trees",
    totalQuestions: 10,
    completedQuestions: 4,
    icon: FiRepeat,
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    description:
      "Memoization, tabulation, and optimization of recursive solutions",
    totalQuestions: 28,
    completedQuestions: 6,
    icon: FiZap,
  },
  {
    slug: "greedy",
    name: "Greedy",
    description: "Solve optimization problems using the greedy paradigm",
    totalQuestions: 14,
    completedQuestions: 3,
    icon: FiTrendingUp,
  },
  {
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    description: "Solve problems using bitwise operators and tricks",
    totalQuestions: 8,
    completedQuestions: 1,
    icon: FiCpu,
  },
  {
    slug: "heaps",
    name: "Heaps & Priority Queue",
    description: "Binary heaps, priority queues, and heap-based algorithms",
    totalQuestions: 9,
    completedQuestions: 2,
    icon: FiCommand,
  },
  {
    slug: "trie",
    name: "Trie",
    description:
      "Prefix tree problems, autocomplete, dictionary word match, etc.",
    totalQuestions: 6,
    completedQuestions: 1,
    icon: FiTarget,
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    description:
      "Efficient problems for subarrays and substrings using windowing technique",
    totalQuestions: 7,
    completedQuestions: 2,
    icon: FiGrid,
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    description: "Use dual pointers to solve problems in linear time",
    totalQuestions: 8,
    completedQuestions: 4,
    icon: FiArrowRightCircle,
  },
  {
    slug: "hashing",
    name: "Hashing",
    description: "Hash maps, sets, and hashing techniques to optimize lookups",
    totalQuestions: 13,
    completedQuestions: 5,
    icon: FiKey,
  },
  {
    slug: "matrix",
    name: "Matrix",
    description:
      "2D arrays, traversal, search, and dynamic programming on matrix",
    totalQuestions: 11,
    completedQuestions: 3,
    icon: FiMap,
  },
];

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            DSA Problems
          </h1>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[#596d7d] focus:border-transparent"
            />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Select a topic to practice problems and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </Container>
  );
}
