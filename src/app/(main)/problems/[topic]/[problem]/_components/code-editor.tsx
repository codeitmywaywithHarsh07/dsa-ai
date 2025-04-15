"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FiLoader } from "react-icons/fi";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  fontSize?: number;
  readOnly?: boolean;
  height?: string | number;
}

export default function CodeEditor({
  code,
  onChange,
  language = "java",
  theme = "vs-dark",
  fontSize = 14,
  readOnly = false,
  height = "100%",
}: CodeEditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      onChange(value);
    }
  }

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
        <FiLoader className="animate-spin text-gray-500 dark:text-gray-400" />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Editor
        height={height}
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize,
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          wordWrap: "on",
          folding: true,
          lineDecorationsWidth: 10,
          overviewRulerBorder: false,
          scrollbar: {
            verticalSliderSize: 6,
            horizontalSliderSize: 6,
          },
        }}
      />
    </div>
  );
}