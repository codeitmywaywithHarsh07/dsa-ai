"use client";
import DSATable, { DSAProblem } from "@/components/Table";
import React, { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

const ProblemView = ({ topic }: { topic: string }) => {
  // Sample problems data (extended)
  const allProblems: DSAProblem[] = [
    {
      id: 1,
      problem_slug: "two-sum",
      problemName: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      notes: "Use hash map for O(n) solution",
      leetcodeLink: "https://leetcode.com/problems/two-sum/",
      gfgLink:
        "https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/",
      status: "Completed",
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
      ],
    },
    {
      id: 2,
      problem_slug: "best-time-to-buy-and-sell-stock",
      problemName: "Best Time to Buy and Sell Stock",
      description:
        "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      difficulty: "Easy",
      topics: ["Array", "Dynamic Programming"],
      notes: "Track minimum price and max profit",
      leetcodeLink:
        "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      status: "Completed",
      lastRevised: "2023-09-10",
      isBookmarked: false,
      isFavorite: true,
      upvotes: 987,
      solution: `function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
      if (price < minPrice) {
        minPrice = price;
      } else if (price - minPrice > maxProfit) {
        maxProfit = price - minPrice;
      }
    }
    
    return maxProfit;
  }`,
      constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
      examples: [
        {
          input: "prices = [7,1,5,3,6,4]",
          output: "5",
          explanation:
            "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
        },
        {
          input: "prices = [7,6,4,3,1]",
          output: "0",
          explanation: "No transactions are done and the max profit = 0.",
        },
      ],
    },
    {
      id: 3,
      problem_slug: "contains-duplicate",
      problemName: "Contains Duplicate",
      description:
        "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      notes: "Hash set for O(n) solution",
      leetcodeLink: "https://leetcode.com/problems/contains-duplicate/",
      status: "Completed",
      lastRevised: "2023-08-25",
      isBookmarked: false,
      isFavorite: false,
      upvotes: 756,
      solution: `function containsDuplicate(nums: number[]): boolean {
    const seen = new Set<number>();
    
    for (const num of nums) {
      if (seen.has(num)) return true;
      seen.add(num);
    }
    
    return false;
  }`,
      constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
      examples: [
        {
          input: "nums = [1,2,3,1]",
          output: "true",
        },
        {
          input: "nums = [1,2,3,4]",
          output: "false",
        },
      ],
    },
    {
      id: 4,
      problem_slug: "valid-palindrome",
      problemName: "Valid Palindrome",
      description:
        "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",
      difficulty: "Easy",
      topics: ["String", "Two Pointers"],
      notes: "Two pointers from start and end",
      leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",
      status: "In Progress",
      lastRevised: "2023-10-10",
      isBookmarked: true,
      isFavorite: false,
      upvotes: 654,
      solution: `function isPalindrome(s: string): boolean {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = clean.length - 1;
    
    while (left < right) {
      if (clean[left] !== clean[right]) return false;
      left++;
      right--;
    }
    
    return true;
  }`,
      constraints: [
        "1 <= s.length <= 2 * 10^5",
        "s consists only of printable ASCII characters.",
      ],
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: "true",
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
        {
          input: 's = "race a car"',
          output: "false",
          explanation: '"raceacar" is not a palindrome.',
        },
      ],
    },
    {
      id: 5,
      problem_slug: "longest-substring-without-repeating-characters",
      problemName: "Longest Substring Without Repeating Characters",
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      topics: ["String", "Sliding Window"],
      notes: "Sliding window technique",
      leetcodeLink:
        "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      status: "Revisited",
      lastRevised: "2023-09-28",
      isBookmarked: true,
      isFavorite: true,
      upvotes: 2345,
      solution: `function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>();
    let max = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
      const char = s[right];
      if (map.has(char) && map.get(char)! >= left) {
        left = map.get(char)! + 1;
      }
      map.set(char, right);
      max = Math.max(max, right - left + 1);
    }
    
    return max;
  }`,
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces.",
      ],
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation: "The answer is 'abc', with the length of 3.",
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: "The answer is 'b', with the length of 1.",
        },
      ],
    },
    // Additional 5 problems
    {
      id: 6,
      problem_slug: "valid-anagram",
      problemName: "Valid Anagram",
      description:
        "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      difficulty: "Easy",
      topics: ["String", "Hash Table", "Sorting"],
      notes: "Compare character frequency maps or sort both strings",
      leetcodeLink: "https://leetcode.com/problems/valid-anagram/",
      status: "Completed",
      lastRevised: "2023-08-15",
      isBookmarked: false,
      isFavorite: false,
      upvotes: 876,
      solution: `function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    
    const charCount: Record<string, number> = {};
    
    for (const char of s) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of t) {
      if (!charCount[char]) return false;
      charCount[char]--;
    }
    
    return true;
  }`,
      constraints: [
        "1 <= s.length, t.length <= 5 * 10^4",
        "s and t consist of lowercase English letters.",
      ],
      examples: [
        {
          input: 's = "anagram", t = "nagaram"',
          output: "true",
        },
        {
          input: 's = "rat", t = "car"',
          output: "false",
        },
      ],
    },
    {
      id: 7,
      problem_slug: "reverse-linked-list",
      problemName: "Reverse Linked List",
      description:
        "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      difficulty: "Easy",
      topics: ["Linked List", "Recursion"],
      notes: "Iterative and recursive approaches",
      leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
      status: "Completed",
      lastRevised: "2023-10-05",
      isBookmarked: false,
      isFavorite: true,
      upvotes: 1567,
      solution: `function reverseList(head: ListNode | null): ListNode | null {
    let prev = null;
    let current = head;
    
    while (current !== null) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    
    return prev;
  }`,
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 <= Node.val <= 5000",
      ],
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
        },
        {
          input: "head = [1,2]",
          output: "[2,1]",
        },
      ],
    },
    {
      id: 8,
      problem_slug: "binary-tree-inorder-traversal",
      problemName: "Binary Tree Inorder Traversal",
      description:
        "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      difficulty: "Easy",
      topics: ["Binary Tree", "Stack", "Depth-First Search"],
      notes: "Iterative solution using stack",
      leetcodeLink:
        "https://leetcode.com/problems/binary-tree-inorder-traversal/",
      status: "Completed",
      lastRevised: "2023-09-15",
      isBookmarked: true,
      isFavorite: false,
      upvotes: 987,
      solution: `function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let current = root;
    
    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop()!;
      result.push(current.val);
      current = current.right;
    }
    
    return result;
  }`,
      constraints: [
        "The number of nodes in the tree is in the range [0, 100]",
        "-100 <= Node.val <= 100",
      ],
      examples: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,3,2]",
        },
        {
          input: "root = []",
          output: "[]",
        },
      ],
    },
    {
      id: 9,
      problem_slug: "number-of-islands",
      problemName: "Number of Islands",
      description:
        "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
      difficulty: "Medium",
      topics: [
        "Matrix",
        "Depth-First Search",
        "Breadth-First Search",
        "Union Find",
      ],
      notes: "DFS/BFS grid traversal",
      leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
      status: "Revisited",
      lastRevised: "2023-10-01",
      isBookmarked: true,
      isFavorite: true,
      upvotes: 1876,
      solution: `function numIslands(grid: string[][]): number {
    if (!grid.length) return 0;
    
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    
    function dfs(r: number, c: number) {
      if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
      
      grid[r][c] = '0';
      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === '1') {
          count++;
          dfs(r, c);
        }
      }
    }
    
    return count;
  }`,
      constraints: [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 300",
        "grid[i][j] is '0' or '1'",
      ],
      examples: [
        {
          input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
          output: "1",
        },
        {
          input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
          output: "3",
        },
      ],
    },
    {
      id: 10,
      problem_slug: "climbing-stairs",
      problemName: "Climbing Stairs",
      description:
        "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      difficulty: "Easy",
      topics: ["Dynamic Programming", "Math", "Memoization"],
      notes: "Fibonacci sequence pattern",
      leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
      status: "Completed",
      lastRevised: "2023-08-30",
      isBookmarked: false,
      isFavorite: false,
      upvotes: 1432,
      solution: `function climbStairs(n: number): number {
    if (n <= 2) return n;
    
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
      const c = a + b;
      a = b;
      b = c;
    }
    
    return b;
  }`,
      constraints: ["1 <= n <= 45"],
      examples: [
        {
          input: "n = 2",
          output: "2",
          explanation:
            "There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps",
        },
        {
          input: "n = 3",
          output: "3",
          explanation:
            "There are three ways to climb to the top. 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step",
        },
      ],
    },
  ];

  const [problems, setProblems] = useState<DSAProblem[]>(
    allProblems.slice(0, 5)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filter problems based on search query
  const filteredProblems = allProblems.filter(
    (problem) =>
      problem.problemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle infinite scroll
  const loadMoreProblems = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const currentLength = problems.length;
      const nextProblems = allProblems.slice(currentLength, currentLength + 5);

      if (nextProblems.length === 0) {
        setHasMore(false);
      } else {
        setProblems((prev) => [...prev, ...nextProblems]);
      }

      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore, problems.length]);

  // Add scroll event listener for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;

      loadMoreProblems();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProblems]);

  const handleNameSplit = (name: string) => {
    const [firstPart, secondPart] = name.split("-");
    if (secondPart === undefined) return firstPart.trim();
    else {
      return firstPart.trim() + " " + secondPart.trim();
    }
  };

  const handleNotesUpdate = (id: number, notes: string) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === id ? { ...problem, notes } : problem
      )
    );
  };

  const handleStatusUpdate = (id: number, status: any) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === id
          ? {
              ...problem,
              status,
              lastRevised:
                status === "Completed" || status === "Revisited"
                  ? new Date().toISOString().split("T")[0]
                  : problem.lastRevised,
            }
          : problem
      )
    );
  };

  const handleBookmarkToggle = (id: number, isBookmarked: boolean) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === id ? { ...problem, isBookmarked } : problem
      )
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-4 md:mb-0">
              {handleNameSplit(topic)} Problems
            </h1>
            <p className="text-gray-500">
              {searchQuery ? filteredProblems.length : allProblems.length}{" "}
              Problems found
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <DSATable
            topic={topic}
            data={searchQuery ? filteredProblems : problems}
            onNotesUpdate={handleNotesUpdate}
            onStatusUpdate={handleStatusUpdate}
            onBookmarkToggle={handleBookmarkToggle}
          />

          {/* Loading indicator for infinite scroll */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading more problems...
            </div>
          )}

          {/* End of results message */}
          {!hasMore && !searchQuery && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              You've reached the end of the problem list
            </div>
          )}

          {/* No results found message */}
          {searchQuery && filteredProblems.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No problems found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemView;
