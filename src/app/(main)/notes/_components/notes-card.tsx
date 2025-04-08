'use client'
import { FiEdit2, FiTrash2, FiExternalLink, FiBookmark } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

const difficultyColors = {
  Easy: "text-green-600 dark:text-green-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  Hard: "text-red-600 dark:text-red-400",
};

interface NoteProblem {
    id: number;
    name: string;
    difficulty: "Easy" | "Medium" | "Hard";
    tags: string[];
}

export default function NotesCard({
  note,
}: {
  note: {
    id: number;
    problem: NoteProblem;
    lastUpdated: string;
    content: string;
  };
}) {
    const [openModal, setOpenModal] = useState(false);



  return (
    <div className="relative group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {openModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-30 p-4"
          onClick={openModal ? () => setOpenModal(false) : undefined}   
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Your Note
            </h3>

            <textarea
              value={note.content}
              onChange={(e) =>
                // setNotesModal({ ...notesModal, currentNotes: e.target.value })
                note.content = e.target.value
              }
              className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Add your notes here..."
            />

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={()=> setOpenModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={()=>{}}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Gradient accent bar */}
      <div
        className={`absolute top-0 left-0 h-1 w-full 
        ${
          note.problem.difficulty === "Easy"
            ? "bg-gradient-to-r from-green-500 to-green-400"
            : note.problem.difficulty === "Medium"
            ? "bg-gradient-to-r from-yellow-400 to-yellow-300"
            : "bg-gradient-to-r from-red-400 to-red-300"
        }`}
      ></div>

      {/* Card header with problem info */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-center mb-2">
          <Link
            href={`/problems/${note.problem.id}`}
            className="hover:underline decoration-blue-500"
          >
            <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-1">
              Problem:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {note.problem.name}
              </span>
            </h3>
          </Link>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs font-semibold ${
                difficultyColors[note.problem.difficulty]
              }`}
            >
              {note.problem.difficulty}
            </span>
            <span className="text-xs text-gray-400">#{note.problem.id}</span>
          </div>
        </div>
      </div>

      {/* Note content - now the main focus */}
      <div className="px-5 pb-5 flex-1">
        <div className="relative bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 h-full " onClick={()=>{setOpenModal(true)}}>
          {/* Note content with subtle parchment-like background */}
          <div className="absolute inset-0 bg-[url('/note-pattern.svg')] opacity-10 dark:opacity-5"></div>

          {/* Actual note content */}
          <div className="relative h-full">
            <p className="text-gray-800 dark:text-gray-200 font-light leading-relaxed">
              {note.content.substring(0,60)}...
            </p>
          </div>
        </div>
      </div>

      {/* Tags and actions */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {note.problem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last updated:{" "}
            {new Date(note.lastUpdated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <div className="flex space-x-3">
            <button
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
              title="Edit note"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1"
              title="Delete note"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover effect indicator */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 pointer-events-none rounded-xl transition-all duration-300"></div>
    </div>
  );
}
