// components/DSATable.tsx
"use client";
import React, { useState } from "react";
import {
  FiExternalLink,
  FiEdit2,
  FiPlus,
  FiChevronDown,
  FiBookmark,
  FiStar,
} from "react-icons/fi";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { FaBookmark } from "react-icons/fa6";

export type ProblemStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Revisited";

export type DSAProblem = {
  id: number;
  problem_slug: string;
  problemName: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  notes: string;
  leetcodeLink?: string;
  gfgLink?: string;
  status: ProblemStatus;
  lastRevised?: string;
  isBookmarked?: boolean;
  isFavorite?: boolean;
  upvotes?: number;
  solution?: string;
  constraints?: string[];
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
};
export type Difficulty = "Easy" | "Medium" | "Hard";
type ColumnDefinition<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
  render?: (value: any, row: any) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type DSATableProps = {
  data: DSAProblem[];
  topic: string;
  onNotesUpdate: (id: number, notes: string) => void;
  onStatusUpdate: (id: number, status: ProblemStatus) => void;
  onBookmarkToggle: (id: number, isBookmarked: boolean) => void;
};

const statusColors = {
  "Not Started":
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "In Progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Revisited:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const difficultyColors = {
  Easy: "text-green-600 dark:text-green-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  Hard: "text-red-600 dark:text-red-400",
};

const DSATable: React.FC<DSATableProps> = ({
  data,
  onNotesUpdate,
  onStatusUpdate,
  onBookmarkToggle,
  topic,
}) => {
  const [notesModal, setNotesModal] = useState<{
    isOpen: boolean;
    problemId: number | null;
    currentNotes: string;
  }>({
    isOpen: false,
    problemId: null,
    currentNotes: "",
  });
  const router = useRouter();

  const [statusDropdown, setStatusDropdown] = useState<{
    isOpen: boolean;
    problemId: number | null;
  }>({
    isOpen: false,
    problemId: null,
  });

  const openNotesModal = (problemId: number, currentNotes: string) => {
    setNotesModal({
      isOpen: true,
      problemId,
      currentNotes,
    });
  };

  const closeNotesModal = () => {
    setNotesModal({
      isOpen: false,
      problemId: null,
      currentNotes: "",
    });
  };

  const saveNotes = () => {
    if (notesModal.problemId !== null) {
      onNotesUpdate(notesModal.problemId, notesModal.currentNotes);
    }
    closeNotesModal();
  };

  const toggleStatusDropdown = (problemId: number) => {
    setStatusDropdown((prev) => ({
      isOpen: prev.problemId === problemId ? !prev.isOpen : true,
      problemId,
    }));
  };

  const closeStatusDropdown = () => {
    setStatusDropdown({
      isOpen: false,
      problemId: null,
    });
  };

  const updateStatus = (problemId: number, status: ProblemStatus) => {
    onStatusUpdate(problemId, status);
    closeStatusDropdown();
  };

  const toggleBookmark = (
    problemId: number,
    currentBookmarkStatus: boolean
  ) => {
    onBookmarkToggle(problemId, !currentBookmarkStatus);
  };

  const columns: ColumnDefinition<any, keyof any>[] = [
    {
      key: "id",
      header: "Serial No.",
      width: "8%",
      align: "center",
    },
    {
      key: "isBookmarked",
      header: "",
      width: "5%",
      render: (value: boolean | undefined, row: any) => (
        <button
          onClick={() => toggleBookmark(row.id, value || false)}
          className="text-xl hover:text-yellow-500 transition-colors"
          aria-label={value ? "Remove bookmark" : "Add bookmark"}
        >
          {value ? (
            <FaBookmark className="text-yellow-500 fill-yellow-500" />
          ) : (
            <FiBookmark className="text-gray-400 hover:text-yellow-500" />
          )}
        </button>
      ),
      align: "center",
    },
    {
      key: "problemName",
      header: "Problem Name",
      width: "25%",
      render: (value: string, row: any) => {

        const handleClick = () => {
          const slug = row.problem_slug;
          router.push(`/problems/${topic}/${slug}`);
        };
        return (
          <div className="flex flex-col cursor-pointer" onClick={handleClick}>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {value}
            </span>
          </div>
        );
      },
    },
    {
      key: "difficulty",
      header: "Difficulty",
      width: "12%",
      render: (value: string, row: DSAProblem) => (
        <span
          className={`text-xs font-bold ${difficultyColors[row.difficulty]}`}
        >
          {row.difficulty}
        </span>
      ),
    },
    {
      key: "notes",
      header: "Notes",
      width: "15%",
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <button
            onClick={() => openNotesModal(row.id, value)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {value ? (
              <>
                {/* <FiEdit2 className="mr-1" />
                <span className="truncate max-w-xs">{value}</span> */}
                <CgNotes className="ml-3 size-4" />
              </>
            ) : (
              <>
                <MdOutlineAddCircleOutline className="ml-3 size-5" />
                {/* <span>Add notes</span> */}
              </>
            )}
          </button>
        </div>
      ),
    },
    {
      key: "links",
      header: "Links",
      width: "20%",
      render: (_, row: any) => (
        <div className="flex space-x-3">
          {row.leetcodeLink && (
            <a
              href={row.leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-bold items-center text-sm text-orange-500 hover:text-orange-700 dark:hover:text-orange-400"
            >
              <SiLeetcode className="mr-1" />
              LeetCode
            </a>
          )}
          {row.gfgLink && (
            <a
              href={row.gfgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-bold items-center text-sm text-green-600 hover:text-green-700 dark:hover:text-green-400"
            >
              <SiGeeksforgeeks className="mr-1" />
              GFG
            </a>
          )}
        </div>
      ),
      align: "center",
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (value: ProblemStatus, row: any) => (
        <div className="relative">
          <button
            onClick={() => toggleStatusDropdown(row.id)}
            className={`flex items-center justify-around px-1 py-1 text-xs font-medium rounded-full w-full ${statusColors[value]}`}
          >
            {value}
            <FiChevronDown className="ml-1" />
          </button>

          {statusDropdown.isOpen && statusDropdown.problemId === row.id && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
              {Object.keys(statusColors).map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(row.id, status as ProblemStatus)}
                  className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    statusColors[status as ProblemStatus]
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      ),
      align: "left",
    },
  ];

  return (
    <div className="overflow-x-auto">
      {/* Notes Modal */}
      {notesModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-4"
          onClick={closeNotesModal}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              Edit Problem Notes
            </h3>

            <textarea
              value={notesModal.currentNotes}
              onChange={(e) =>
                setNotesModal({ ...notesModal, currentNotes: e.target.value })
              }
              className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add your notes here..."
            />

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closeNotesModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`p-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider dark:text-gray-300 ${
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                    ? "text-right"
                    : "text-left"
                }`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                No problems added yet. Start by adding your first DSA problem!
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                  row.isBookmarked ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
                }`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-3 py-5 text-sm text-gray-700 dark:text-gray-300 ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof DSAProblem], row)
                      : String(row[column.key as keyof DSAProblem])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DSATable;
