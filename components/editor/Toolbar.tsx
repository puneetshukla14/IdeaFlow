"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-[#1f2937] rounded-lg border border-gray-700">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("bold") ? "bg-gray-700" : ""
        }`}
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("italic") ? "bg-gray-700" : ""
        }`}
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-700" : ""
        }`}
      >
        <Heading1 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-700" : ""
        }`}
      >
        <Heading2 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("bulletList") ? "bg-gray-700" : ""
        }`}
      >
        <List size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-700 ${
          editor.isActive("orderedList") ? "bg-gray-700" : ""
        }`}
      >
        <ListOrdered size={16} />
      </button>
    </div>
  );
}
