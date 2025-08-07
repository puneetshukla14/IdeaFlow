"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PaperEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your paper here...</p>",
    editorProps: {
      attributes: {
        class: "prose prose-invert min-h-[300px] focus:outline-none",
      },
    },
    // This is the important line to fix hydration error
    // It prevents editor from trying to render during SSR
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="bg-zinc-900 p-4 rounded-md">
      <EditorContent editor={editor} />
    </div>
  );
}
