'use client'
import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const Integration = () => {
    const [leetcodeUsername, setLeetcodeUsername] = useState("");
      const [githubUsername, setGithubUsername] = useState("");
  return (
    <>
      <div className="mt-8 bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all ">
        {/* Section Header */}
        <div className="bg-gray-700 dark:from-gray-800 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white dark:text-white">
                Account Integrations
              </h3>
            </div>
            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-gray-800 dark:bg-blue-900/50 dark:text-blue-300">
              2 platforms available
            </span>
          </div>
          <p className="text-gray-300 dark:text-gray-400 mt-2">
            Connect your coding profiles to track all progress in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-700">
          {/* LeetCode Integration Card */}
          <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <SiLeetcode className="text-3xl text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                    LeetCode
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track your problem solving progress
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  leetcodeUsername
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {leetcodeUsername ? "Connected" : "Not connected"}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="e.g. leetcode_coder123"
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                  leetcodeUsername
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950"
                } text-white font-medium shadow-md hover:shadow-lg`}
              >
                {leetcodeUsername ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    Sync Now
                  </>
                ) : (
                  <>
                    <SiLeetcode className="text-lg" />
                    Connect LeetCode
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GitHub Integration Card */}
          <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700">
                  <FaGithub className="text-3xl text-gray-800 dark:text-gray-200" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                    GitHub
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track your repository contributions
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  githubUsername
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {githubUsername ? "Connected" : "Not connected"}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="e.g. github-dev"
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                  githubUsername
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
                    : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-950"
                } text-white font-medium shadow-md hover:shadow-lg`}
              >
                {githubUsername ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    Sync Now
                  </>
                ) : (
                  <>
                    <FaGithub className="text-lg" />
                    Connect GitHub
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help connecting accounts?{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Integration;
