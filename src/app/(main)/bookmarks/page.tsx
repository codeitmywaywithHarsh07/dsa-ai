"use client";
import Container from "@/components/Container";
import { FiBookmark, FiX, FiExternalLink, FiFileText, FiCode, FiSearch } from "react-icons/fi";
import { useState } from "react";

type ProblemStatus = "Solved" | "Attempted" | "Not Started";

type DSAProblem = {
  id: number;
  problemName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  notes: string;
  leetcodeLink?: string;
  gfgLink?: string;
  status: ProblemStatus;
  lastRevised?: string;
  isBookmarked?: boolean;
};

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  tags: string[];
  isBookmarked?: boolean;
};

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState<"problems" | "blogs">("problems");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with your actual bookmarked items
  const bookmarkedProblems: DSAProblem[] = [
    {
      id: 1,
      problemName: "Two Sum",
      difficulty: "Easy",
      notes: "Use hashmap for O(n) solution",
      leetcodeLink: "https://leetcode.com/problems/two-sum",
      status: "Solved",
      lastRevised: "2023-05-15",
      isBookmarked: true,
    },
    {
      id: 2,
      problemName: "Reverse Linked List",
      difficulty: "Medium",
      notes: "Iterative and recursive approaches",
      gfgLink: "https://www.geeksforgeeks.org/reverse-a-linked-list",
      status: "Attempted",
      lastRevised: "2023-06-20",
      isBookmarked: true,
    },
  ];

  const bookmarkedBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Time Complexity",
      excerpt: "Deep dive into Big-O notation with practical examples",
      url: "https://example.com/time-complexity",
      tags: ["DSA", "Algorithms"],
      isBookmarked: true,
    },
    {
      id: 2,
      title: "React Hooks Explained",
      excerpt: "Complete guide to using React Hooks effectively",
      url: "https://example.com/react-hooks",
      tags: ["React", "Frontend"],
      isBookmarked: true,
    },
  ];

  const filteredProblems = bookmarkedProblems.filter(problem =>
    problem.problemName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBlogs = bookmarkedBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeBookmark = (id: number, type: "problem" | "blog") => {
    // Implement bookmark removal logic here
    console.log(`Removed bookmark for ${type} ${id}`);
  };

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved problems and blog posts
        </p>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700 md:w-[calc(60% - 2rem)]">
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "problems" ? "text-gray-900 border-b-2 border-gray-600 dark:text-blue-400 dark:border-blue-400" : "text-gray-500 dark:text-gray-400"}`}
            onClick={() => setActiveTab("problems")}
          >
            <FiCode /> Problems
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "blogs" ? "text-gray-900 border-b-2 border-gray-600 dark:text-blue-400 dark:border-blue-400" : "text-gray-500 dark:text-gray-400"}`}
            onClick={() => setActiveTab("blogs")}
          >
            <FiFileText /> Blogs
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {activeTab === "problems" ? (
          filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <ProblemBookmarkCard
                key={problem.id}
                problem={problem}
                onRemove={() => removeBookmark(problem.id, "problem")}
              />
            ))
          ) : (
            <EmptyState type="problems" />
          )
        ) : filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogBookmarkCard
              key={blog.id}
              blog={blog}
              onRemove={() => removeBookmark(blog.id, "blog")}
            />
          ))
        ) : (
          <EmptyState type="blogs" />
        )}
      </div>
    </Container>
  );
}

function ProblemBookmarkCard({ problem, onRemove }: { problem: DSAProblem; onRemove: () => void }) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusColors = {
    Solved: "text-green-600 dark:text-green-400",
    Attempted: "text-yellow-600 dark:text-yellow-400",
    "Not Started": "text-gray-600 dark:text-gray-400",
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="absolute top-4 right-4">
        <button
          onClick={onRemove}
          className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Remove bookmark"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {problem.problemName}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[problem.status]}`}>
                {problem.status}
              </span>
              {problem.lastRevised && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Revised: {problem.lastRevised}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {problem.leetcodeLink && (
            <a
              href={problem.leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              LeetCode <FiExternalLink className="w-3 h-3" />
            </a>
          )}
          {problem.gfgLink && (
            <a
              href={problem.gfgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              GfG <FiExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogBookmarkCard({ blog, onRemove }: { blog: BlogPost; onRemove: () => void }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="absolute top-4 right-4">
        <button
          onClick={onRemove}
          className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Remove bookmark"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {blog.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
          >
            Read Article <FiExternalLink className="w-3 h-3" />
          </a>
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: "problems" | "blogs" }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
        <FiBookmark className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
        No bookmarked {type}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
        {type === "problems"
          ? "Save problems to revisit them later by clicking the bookmark icon."
          : "Save interesting blog posts to read later by clicking the bookmark icon."}
      </p>
    </div>
  );
}