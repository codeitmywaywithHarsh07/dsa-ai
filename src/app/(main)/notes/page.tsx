"use client";
import { FaBook, FaNoteSticky } from "react-icons/fa6";
import NotesCard from "./_components/notes-card";
import NotesFilter from "./_components/notes-filter";
import Container from "@/components/Container";
import { useState } from "react";
import NotesEmptyState from "./_components/empty-state";

export default function NotesPage() {
  // Sample data - in a real app, this would come from your database/state
  const [notes, setNotes] = useState([
    {
    id: 1,
    problem: {
        id: 101,
        name: "Two Sum",
        difficulty: "Easy",
        tags: ["Hash Table", "Arrays"],
    },
    content:
        "Used hash map for O(n) solution. Edge cases: empty array, no solution.",
    lastUpdated: "2023-10-15",
    },
    {
    id: 2,
    problem: {
        id: 205,
        name: "Reverse Linked List",
        difficulty: "Medium",
        tags: ["Linked List", "Recursion"],
    },
    content:
        "Iterative approach with three pointers. Recursive solution also possible but uses O(n) space.",
    lastUpdated: "2023-10-18",
    },
    {
    id: 3,
    problem: {
        id: 76,
        name: "Minimum Window Substring",
        difficulty: "Hard",
        tags: ["Hash Table", "Arrays"],
    },
    content:
        "Sliding window technique with two pointers. Used frequency map to track characters.",
    lastUpdated: "2023-10-20",
    },
  ]);

  return (
    <Container>
      <div className="flex items-center h-full justify-between mb-8">
        <div className="flex items-center">
          <FaNoteSticky className="text-2xl mr-3 text-[#232c33] dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Notes
          </h1>
        </div>
        {notes.length !== 0 && (
          <div className="flex space-x-4">
            <NotesFilter />
          </div>
        )}
      </div>
      {notes.length === 0 ? (
        <div className="flex items-center justify-center">
          <NotesEmptyState />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NotesCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </Container>
  );
}
