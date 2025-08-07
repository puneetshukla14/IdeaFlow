"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Save, Download, FileText, PlusCircle } from "lucide-react";
import Sidebar from "@/components/Sidebar"; // main dark theme sidebar

const ResearchPaperEditor = dynamic(
  () => import("@/components/editor/ResearchPaperEditor"),
  { ssr: false }
);

export default function CreateResearchPaperPage() {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSave = () => {
    console.log("Saving paper:", { title, authors, abstract, keywords });
    alert("Paper saved (mock)");
  };

  const handleExport = () => {
    console.log("Exporting paper");
    alert("Paper exported as PDF (mock)");
  };

  return (
    <div className="flex min-h-screen bg-[#0e0f12] text-gray-200">
      {/* Main Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT - Sections */}
        <aside className="w-60 border-r border-gray-800 bg-[#1a1b1f] p-4 space-y-2">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">Sections</h2>
          {[
            "Title & Abstract",
            "Introduction",
            "Methods",
            "Results",
            "Discussion",
            "Conclusion",
            "References",
          ].map((section) => (
            <button
              key={section}
              className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-[#25272d] hover:text-white transition"
            >
              {section}
            </button>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 mt-2 w-full rounded-md bg-blue-600/20 text-blue-400 text-sm hover:bg-blue-600/30 transition">
            <PlusCircle size={16} />
            Add Section
          </button>
        </aside>

        {/* CENTER - Editor */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Metadata */}
            <div className="bg-[#1a1b1f] rounded-lg shadow p-4 space-y-4 border border-gray-800">
              <input
                type="text"
                placeholder="Paper Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold outline-none border-b border-gray-700 pb-2 bg-transparent text-white"
              />
              <input
                type="text"
                placeholder="Authors (comma separated)"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="w-full text-sm outline-none border-b border-gray-700 pb-1 bg-transparent text-gray-300"
              />
              <textarea
                placeholder="Abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className="w-full text-sm outline-none border border-gray-700 rounded-md p-2 bg-transparent text-gray-300"
                rows={3}
              />
              <input
                type="text"
                placeholder="Keywords (comma separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full text-sm outline-none border-b border-gray-700 pb-1 bg-transparent text-gray-300"
              />
            </div>

            {/* Editor */}
            <div className="bg-[#1a1b1f] rounded-lg shadow border border-gray-800 p-4">
              <ResearchPaperEditor />
            </div>
          </div>
        </main>

        {/* RIGHT - Actions */}
        <aside className="w-64 border-l border-gray-800 bg-[#1a1b1f] p-4 flex flex-col gap-4">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <Save size={16} /> Save Draft
          </button>
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Download size={16} /> Export as PDF
          </button>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition"
          >
            <FileText size={16} /> View Preview
          </button>
        </aside>
      </div>
    </div>
  );
}
