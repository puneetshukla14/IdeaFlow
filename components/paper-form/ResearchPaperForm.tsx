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

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addKeyword = () => {
    const k = formData.keywordInput.trim();
    if (k && !formData.keywords.includes(k)) {
      updateField("keywords", [...formData.keywords, k]);
      updateField("keywordInput", "");
    }
  };

  const removeKeyword = (k: string) => {
    updateField(
      "keywords",
      formData.keywords.filter((kw) => kw !== k)
    );
  };

  const addAuthor = () => {
    const a = formData.authorInput.trim();
    if (a && !formData.authors.includes(a)) {
      updateField("authors", [...formData.authors, a]);
      updateField("authorInput", "");
    }
  };

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

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.8rem",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1px solid #444",
    backgroundColor: "#1e1e2f",
    color: "#e0e0e0",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    marginBottom: 6,
    color: "#cfd8dc",
  };

  const sectionSpacing = { marginBottom: 24 };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 720,
        margin: "2rem auto",
        padding: "2rem 2.5rem",
        backgroundColor: "#121223",
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,0.7)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#e0e0e0",
      }}
    >
      <h1
        style={{
          fontWeight: "800",
          fontSize: "2.25rem",
          marginBottom: 32,
          borderBottom: "2px solid #2c2f47",
          paddingBottom: 12,
        }}
      >
        Create Research Paper
      </h1>

      {/* Title */}
      <div style={sectionSpacing}>
        <label htmlFor="title" style={labelStyle}>
          Title
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          style={inputStyle}
          placeholder="Enter paper title"
          autoComplete="off"
        />
      </div>

      {/* Abstract */}
      <div style={sectionSpacing}>
        <label htmlFor="abstract" style={labelStyle}>
          Abstract
        </label>
        <textarea
          id="abstract"
          value={formData.abstract}
          onChange={(e) => updateField("abstract", e.target.value)}
          required
          rows={6}
          style={{
            ...inputStyle,
            resize: "vertical",
            fontFamily: "'Georgia', serif",
            minHeight: 120,
          }}
          placeholder="Enter paper abstract"
        />
      </div>

      {/* Field of Study */}
      <div style={sectionSpacing}>
        <label htmlFor="field" style={labelStyle}>
          Field of Study
        </label>
        <select
          id="field"
          value={formData.field}
          onChange={(e) => updateField("field", e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select field
          </option>
          {FIELD_OPTIONS.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      {/* Keywords */}
      <div style={sectionSpacing}>
        <label style={labelStyle}>Keywords</label>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            value={formData.keywordInput}
            onChange={(e) => updateField("keywordInput", e.target.value)}
            placeholder="Add a keyword"
            style={{ ...inputStyle, flexGrow: 1 }}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={addKeyword}
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              color: "#fff",
              fontWeight: "700",
              padding: "0.65rem 1.2rem",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c387e")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3f51b5")}
          >
            Add
          </button>
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {formData.keywords.map((kw) => (
            <span
              key={kw}
              onClick={() => removeKeyword(kw)}
              title="Remove keyword"
              style={{
                backgroundColor: "#2c2f47",
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: "0.9rem",
                color: "#cfd8dc",
                cursor: "pointer",
                userSelect: "none",
                border: "1px solid #3f51b5",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3f51b5")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2c2f47")}
            >
              {kw} &times;
            </span>
          ))}
        </div>
      </div>

      {/* Authors */}
      <div style={sectionSpacing}>
        <label style={labelStyle}>Authors</label>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            value={formData.authorInput}
            onChange={(e) => updateField("authorInput", e.target.value)}
            placeholder="Add an author"
            style={{ ...inputStyle, flexGrow: 1 }}
            autoComplete="off"
          />
          <button
            type="button"
            onClick={addAuthor}
            style={{
              backgroundColor: "#009688",
              border: "none",
              color: "#fff",
              fontWeight: "700",
              padding: "0.65rem 1.2rem",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#00695c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#009688")}
          >
            Add
          </button>
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {formData.authors.map((author) => (
            <span
              key={author}
              onClick={() => removeAuthor(author)}
              title="Remove author"
              style={{
                backgroundColor: "#263238",
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: "0.9rem",
                color: "#b0bec5",
                cursor: "pointer",
                userSelect: "none",
                border: "1px solid #009688",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#009688")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#263238")}
            >
              {author} &times;
            </span>
          ))}
        </div>
      </div>

      {/* Affiliation */}
      <div style={sectionSpacing}>
        <label htmlFor="affiliation" style={labelStyle}>
          Affiliation
        </label>
        <input
          id="affiliation"
          type="text"
          value={formData.affiliation}
          onChange={(e) => updateField("affiliation", e.target.value)}
          placeholder="Your institution or organization"
          style={inputStyle}
          autoComplete="off"
        />
      </div>

      {/* Paper Type */}
      <div style={sectionSpacing}>
        <label htmlFor="paperType" style={labelStyle}>
          Paper Type
        </label>
        <select
          id="paperType"
          value={formData.paperType}
          onChange={(e) => updateField("paperType", e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select type
          </option>
          {PAPER_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Reference Style */}
      <div style={sectionSpacing}>
        <label htmlFor="referenceStyle" style={labelStyle}>
          Reference Style
        </label>
        <select
          id="referenceStyle"
          value={formData.referenceStyle}
          onChange={(e) => updateField("referenceStyle", e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select style
          </option>
          {REFERENCE_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Uploads */}
      <div style={sectionSpacing}>
        <label htmlFor="uploads" style={labelStyle}>
          Upload Files (PDF, ZIP, etc.)
        </label>
        <input
          id="uploads"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            color: "#e0e0e0",
            backgroundColor: "#1e1e2f",
            borderRadius: 6,
            border: "1px solid #444",
            padding: "6px 12px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        />
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {formData.uploads.map((file) => (
            <span
              key={file.name}
              style={{
                backgroundColor: "#2c2f47",
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: "0.9rem",
                color: "#cfd8dc",
                border: "1px solid #3f51b5",
                userSelect: "none",
              }}
            >
              {file.name}
            </span>
          ))}
        </div>
      </div>

      {/* Publish Mode */}
      <div style={{ ...sectionSpacing, marginBottom: 32 }}>
        <label htmlFor="publishMode" style={labelStyle}>
          Publish Mode
        </label>
        <select
          id="publishMode"
          value={formData.publishMode}
          onChange={(e) => updateField("publishMode", e.target.value)}
          style={inputStyle}
        >
          <option value="draft">Draft</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Submit */}
      <div style={{ textAlign: "right" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            padding: "0.8rem 2rem",
            fontWeight: "700",
            fontSize: "1.1rem",
            borderRadius: 8,
            cursor: "pointer",
            border: "none",
            letterSpacing: 1,
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2c387e")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3f51b5")}
        >
          Submit Paper
        </button>
      </div>
    </form>
  );
}
