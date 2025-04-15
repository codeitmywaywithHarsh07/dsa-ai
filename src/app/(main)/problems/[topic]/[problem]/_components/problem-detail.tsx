"use client";
import {
  FiArrowLeft,
  FiBookmark,
  FiCheck,
  FiClock,
  FiCode,
  FiExternalLink,
  FiHeart,
  FiMessageSquare,
  FiRefreshCw,
  FiStar,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { DSAProblem } from "@/components/Table";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import CodeEditor from "./code-editor";
// import CodeEditor from '@/components/CodeEditor';

type ProblemStatus = "Not Started" | "In Progress" | "Completed" | "Revisited";
type Difficulty = "Easy" | "Medium" | "Hard";

interface Problem {
  id: number;
  problemName: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  notes: string;
  leetcodeLink: string;
  gfgLink?: string;
  status: ProblemStatus;
  lastRevised?: string;
  isBookmarked: boolean;
  isFavorite: boolean;
  upvotes: number;
  solution: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
}

export default function ProblemDetailPage({ prob }: { prob: string }) {
  const router = useRouter();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [activeTab, setActiveTab] = useState("problem");
  const [userCode, setUserCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState<ProblemStatus>("Not Started");
  const [showNotesEditor, setShowNotesEditor] = useState(false);
  const [testCases, setTestCases] = useState([
    { input: "", output: "", result: "", isRunning: false },
  ]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [language, setLanguage] = useState("java");

  // Fetch problem data (in a real app, this would be an API call)
  useEffect(() => {
    // This is mock data - replace with your actual data fetching logic
    const mockProblem: Problem = {
      id: 1,
      problemName: decodeURIComponent(prob.replace(/-/g, " ")),
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      notes:
        "Use a hash map to store values and their indices for O(1) lookups. This reduces the time complexity from O(n^2) to O(n).",
      leetcodeLink: "https://leetcode.com/problems/two-sum/",
      gfgLink:
        "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/",
      status: "In Progress",
      lastRevised: "2023-10-15",
      isBookmarked: true,
      isFavorite: false,
      upvotes: 1245,
      solution: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
        {
          input: "nums = [3,3], target = 6",
          output: "[0,1]",
        },
      ],
    };

    setProblem(mockProblem);
    setStatus(mockProblem.status);
    setIsBookmarked(mockProblem.isBookmarked);
    setIsFavorite(mockProblem.isFavorite);
    setNotes(mockProblem.notes);
    // setUserCode(mockProblem.solution);
  }, [prob]);

  const handleStatusChange = (newStatus: ProblemStatus) => {
    setStatus(newStatus);
    // In a real app, you would update this in your database/state management
    if (problem) {
      setProblem({
        ...problem,
        status: newStatus,
        lastRevised:
          newStatus === "Completed" || newStatus === "Revisited"
            ? new Date().toISOString().split("T")[0]
            : problem.lastRevised,
      });
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Update in your state/database
    if (problem) {
      setProblem({ ...problem, isBookmarked: !isBookmarked });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Update in your state/database
    if (problem) {
      setProblem({ ...problem, isFavorite: !isFavorite });
    }
  };

  const handleRunCode = () => {
    setIsSubmitting(true);

    // Mock execution - in a real app, this would call your backend API
    setTimeout(() => {
      const newTestCases = [...testCases];
      newTestCases[activeTestCase].result = "Mock execution result";
      newTestCases[activeTestCase].isRunning = false;
      setTestCases(newTestCases);
      setIsSubmitting(false);
    }, 1500);

    const newTestCases = [...testCases];
    newTestCases[activeTestCase].isRunning = true;
    setTestCases(newTestCases);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    // Simulate code submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle results in a real app
    }, 2000);
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-full">
        <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FiArrowLeft className="mr-2" />
            Back to Problems
          </button>

          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                problem.difficulty === "Easy"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : problem.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {problem.difficulty}
            </div>

            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}
            >
              {!isFavorite ? (
                <FiHeart className="w-5 h-5" />
              ) : (
                <FaHeart className="w-5 h-5 text-red-500" />
              )}
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}
            >
              {!isBookmarked ? (
                <FiBookmark className="w-5 h-5" />
              ) : (
                <FaBookmark className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        {/* Problem Description Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {problem.problemName}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {problem.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p>{problem.description}</p>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg">Constraints:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.constraints.map((constraint, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                {problem.examples.map((example, i) => (
                  <div key={i} className="mt-6">
                    <h3 className="font-semibold text-lg">Example {i + 1}:</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Input:
                          </p>
                          <pre className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            {example.input}
                          </pre>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Output:
                          </p>
                          <pre className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            {example.output}
                          </pre>
                        </div>
                      </div>
                      {example.explanation && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Explanation:
                          </p>
                          <p className="mt-1 text-sm">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Notes
                </h2>
                <button
                  onClick={() => setShowNotesEditor(!showNotesEditor)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showNotesEditor ? "Cancel" : "Edit Notes"}
                </button>
              </div>

              {showNotesEditor ? (
                <div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Add your notes about this problem..."
                  />
                  <div className="flex justify-end mt-3 space-x-2">
                    <button
                      onClick={() => setShowNotesEditor(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Save notes to your state/database
                        if (problem) {
                          setProblem({ ...problem, notes });
                        }
                        setShowNotesEditor(false);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {notes ? (
                    <p>{notes}</p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No notes added yet. Click "Edit Notes" to add your
                      thoughts.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coding Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("problem")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "problem"
                      ? "border-gray-500 text-gray-900 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Problem
                </button>
                <button
                  onClick={() => setActiveTab("solution")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "solution"
                      ? "border-gray-500 text-gray-900 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Solution
                </button>
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "submissions"
                      ? "border-gray-500 text-gray-900 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Submissions
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "problem" && (
                <div className="space-y-4">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                  </select>


                  <CodeEditor
                    code={userCode}
                    onChange={setUserCode}
                    language={language}
                    theme="vs-dark"
                    fontSize={14}
                    readOnly={false}
                    height="400px"
                  />

                  <div className="mt-4">
                    <div className="flex mb-2">
                      {testCases.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTestCase(i)}
                          className={`px-3 py-1 text-sm mr-2 rounded ${
                            activeTestCase === i
                              ? "bg-gray-200 dark:bg-gray-700"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          Case {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setTestCases([
                            ...testCases,
                            {
                              input: "",
                              output: "",
                              result: "",
                              isRunning: false,
                            },
                          ])
                        }
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Input
                        </label>
                        <textarea
                          value={testCases[activeTestCase].input}
                          onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[activeTestCase].input = e.target.value;
                            setTestCases(newTestCases);
                          }}
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expected Output
                        </label>
                        <textarea
                          value={testCases[activeTestCase].output}
                          onChange={(e) => {
                            const newTestCases = [...testCases];
                            newTestCases[activeTestCase].output =
                              e.target.value;
                            setTestCases(newTestCases);
                          }}
                          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={handleRunCode}
                        disabled={isSubmitting}
                        className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <FiRefreshCw className="animate-spin mr-2" />
                        ) : (
                          <FiCode className="mr-2" />
                        )}
                        Run Code
                      </button>
                      <button
                        onClick={handleSubmitCode}
                        disabled={isSubmitting}
                        className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <FiRefreshCw className="animate-spin mr-2" />
                        ) : (
                          <FiCheck className="mr-2" />
                        )}
                        Submit
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1" />
                        <span>
                          Last revised: {problem.lastRevised || "Never"}
                        </span>
                      </div>

                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(e.target.value as ProblemStatus)
                        }
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Revisited">Revisited</option>
                      </select>
                    </div>
                  </div>

                  {testCases[activeTestCase].result && (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Result</h3>
                      <pre className="whitespace-pre-wrap">
                        {testCases[activeTestCase].result}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "solution" && (
                <div>
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-semibold mb-2">Approach</h3>
                    <p className="mb-4">
                      The optimal solution uses a hash map to store the numbers
                      we've seen so far along with their indices. This allows us
                      to check if the complement (target - current number)
                      exists in constant time.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">
                      Complexity Analysis
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>
                        <strong>Time Complexity:</strong> O(n) - We traverse the
                        list containing n elements only once.
                      </li>
                      <li>
                        <strong>Space Complexity:</strong> O(n) - The extra
                        space required depends on the number of items stored in
                        the hash table.
                      </li>
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">
                      Solution Code
                    </h3>
                    <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                      <code>{problem.solution}</code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === "submissions" && (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400 mb-2">
                    <FiMessageSquare className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No submissions yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Submit your code to see your submission history.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resources Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h2>

              <div className="space-y-3">
                <a
                  href={problem.leetcodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <div className="flex items-center">
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-orange-500 dark:text-orange-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
                      </svg>
                    </div>
                    <span className="font-medium">LeetCode Problem</span>
                  </div>
                  <FiExternalLink className="text-gray-400" />
                </a>

                {problem.gfgLink && (
                  <a
                    href={problem.gfgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-green-500 dark:text-green-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.76 16.24s2.343-2.343 2.343-4.593c0-2.25-1.875-4.594-4.125-4.594s-4.125 2.344-4.125 4.594 1.875 4.593 4.125 4.593c1.266 0 2.406-.563 3.187-1.453h-3.187v-1.969h5.625v5.625h-1.969v-2.625h-.375zm-4.594-4.593c0-1.313 1.078-2.625 2.391-2.625s2.391 1.312 2.391 2.625-1.078 2.625-2.391 2.625-2.391-1.313-2.391-2.625zm16.875-2.625s-2.344 2.344-2.344 4.594 1.875 4.594 4.125 4.594 4.125-2.344 4.125-4.594-1.875-4.594-4.125-4.594c-1.266 0-2.438.563-3.188 1.453h3.188v1.969h-5.625v-5.625h1.969v2.625h.375zm-.375 4.594c0 1.312-1.078 2.625-2.391 2.625s-2.391-1.313-2.391-2.625 1.078-2.625 2.391-2.625 2.391 1.313 2.391 2.625z" />
                        </svg>
                      </div>
                      <span className="font-medium">
                        GeeksforGeeks Solution
                      </span>
                    </div>
                    <FiExternalLink className="text-gray-400" />
                  </a>
                )}

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                      <FiHeart className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div>
                      <span className="font-medium block">
                        Community Rating
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {problem.upvotes} upvotes
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                    <FiHeart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
