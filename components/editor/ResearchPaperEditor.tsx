"use client";

import { useState } from "react";
import Toolbar from "./Toolbar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function ResearchPaperEditor() {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Start writing your research paper here...</p>`,
    immediatelyRender: false, // 👈 Fix hydration mismatch
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[500px] p-4 bg-[#111827] rounded-lg border border-gray-700",
      },
    },
  });

  if (!editor) return null; // 👈 Ensure no SSR mismatch

  return (
    <div className="space-y-4">
      {/* Paper Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter paper title..."
        className="w-full bg-transparent text-3xl font-bold border-b border-gray-700 p-2 focus:outline-none"
      />

      {/* Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Debug Save Button */}
      <div className="pt-4">
        <button
          onClick={() =>
            console.log({
              title,
              content: editor.getHTML(),
            })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Save Draft (Console Log)
        </button>
      </div>
    </div>
  );
}
