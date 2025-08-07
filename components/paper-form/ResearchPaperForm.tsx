"use client";

import { useState } from "react";

export default function ResearchPaperForm() {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    field: "",
    keywords: [] as string[],
    keywordInput: "",
    authors: [] as string[],
    authorInput: "",
    affiliation: "",
    paperType: "",
    referenceStyle: "",
    uploads: [] as File[],
    publishMode: "draft",
  });

  // Update any form field except inputs for keywords/authors (handled separately)
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add keyword from input and clear input
  const addKeyword = () => {
    const k = formData.keywordInput.trim();
    if (k && !formData.keywords.includes(k)) {
      updateField("keywords", [...formData.keywords, k]);
      updateField("keywordInput", "");
    }
  };

  // Remove keyword by value
  const removeKeyword = (k: string) => {
    updateField(
      "keywords",
      formData.keywords.filter((kw) => kw !== k)
    );
  };

  // Add author from input and clear input
  const addAuthor = () => {
    const a = formData.authorInput.trim();
    if (a && !formData.authors.includes(a)) {
      updateField("authors", [...formData.authors, a]);
      updateField("authorInput", "");
    }
  };

  // Remove author by value
  const removeAuthor = (a: string) => {
    updateField(
      "authors",
      formData.authors.filter((au) => au !== a)
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateField("uploads", Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare payload, omit inputs used only for UI (keywordInput, authorInput)
      const payload = {
        ...formData,
        keywordInput: undefined,
        authorInput: undefined,
      };

      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit paper");

      // Redirect or clear form here as needed
      alert("Paper submitted successfully.");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const FIELD_OPTIONS = [
    "Physics",
    "Biology",
    "Chemistry",
    "Computer Science",
    "Mathematics",
    "Medicine",
    "Engineering",
    "Psychology",
    "Economics",
  ];

  const PAPER_TYPES = [
    "Original Research",
    "Review",
    "Case Study",
    "Methodology",
    "Short Communication",
  ];

  const REFERENCE_STYLES = [
    "APA",
    "MLA",
    "Chicago",
    "Harvard",
    "Vancouver",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto py-12 px-6 text-white">
      <h1 className="text-3xl font-bold">Create Research Paper</h1>

      {/* Title */}
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          placeholder="Enter paper title"
        />
      </div>

      {/* Abstract */}
      <div>
        <label className="block mb-1 font-semibold">Abstract</label>
        <textarea
          value={formData.abstract}
          onChange={(e) => updateField("abstract", e.target.value)}
          required
          rows={5}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 resize-none"
          placeholder="Enter paper abstract"
        />
      </div>

      {/* Field */}
      <div>
        <label className="block mb-1 font-semibold">Field of Study</label>
        <select
          value={formData.field}
          onChange={(e) => updateField("field", e.target.value)}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        >
          <option value="">Select field</option>
          {FIELD_OPTIONS.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      {/* Keywords */}
      <div>
        <label className="block mb-1 font-semibold">Keywords</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.keywordInput}
            onChange={(e) => updateField("keywordInput", e.target.value)}
            placeholder="Add a keyword"
            className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="bg-blue-600 px-4 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.keywords.map((kw) => (
            <span
              key={kw}
              className="bg-blue-700 px-2 py-1 rounded cursor-pointer"
              onClick={() => removeKeyword(kw)}
              title="Click to remove"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div>
        <label className="block mb-1 font-semibold">Authors</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.authorInput}
            onChange={(e) => updateField("authorInput", e.target.value)}
            placeholder="Add an author"
            className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
          <button
            type="button"
            onClick={addAuthor}
            className="bg-blue-600 px-4 rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.authors.map((author) => (
            <span
              key={author}
              className="bg-green-700 px-2 py-1 rounded cursor-pointer"
              onClick={() => removeAuthor(author)}
              title="Click to remove"
            >
              {author}
            </span>
          ))}
        </div>
      </div>

      {/* Affiliation */}
      <div>
        <label className="block mb-1 font-semibold">Affiliation</label>
        <input
          type="text"
          value={formData.affiliation}
          onChange={(e) => updateField("affiliation", e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          placeholder="Your institution or organization"
        />
      </div>

      {/* Paper Type */}
      <div>
        <label className="block mb-1 font-semibold">Paper Type</label>
        <select
          value={formData.paperType}
          onChange={(e) => updateField("paperType", e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          required
        >
          <option value="">Select type</option>
          {PAPER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Reference Style */}
      <div>
        <label className="block mb-1 font-semibold">Reference Style</label>
        <select
          value={formData.referenceStyle}
          onChange={(e) => updateField("referenceStyle", e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          required
        >
          <option value="">Select style</option>
          {REFERENCE_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* File Upload */}
      <div>
        <label className="block mb-1 font-semibold">Upload Files (PDF, ZIP, etc.)</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="text-white"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.uploads.map((file) => (
            <span key={file.name} className="bg-purple-700 px-2 py-1 rounded">
              {file.name}
            </span>
          ))}
        </div>
      </div>

      {/* Publish Mode */}
      <div>
        <label className="block mb-1 font-semibold">Publish Mode</label>
        <select
          value={formData.publishMode}
          onChange={(e) => updateField("publishMode", e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
        >
          <option value="draft">Draft</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Submit Paper
        </button>
      </div>
    </form>
  );
}
