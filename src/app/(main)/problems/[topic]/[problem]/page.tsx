
// import CodeEditor from '@/components/CodeEditor';

import ProblemDetailPage from "./_components/problem-detail";

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

export default async function DetailPage({
  params,
}: {
  params: Promise<{ topic: string, problem: string }>;
}) {
  const {problem} = await params

  // Fetch problem data (in a real app, this would be an API call)
  
  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProblemDetailPage prob={problem}/>
  );
}
