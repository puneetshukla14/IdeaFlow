// app/create/paper/page.tsx
"use client";

import ResearchPaperForm from "@/components/paper-form/ResearchPaperForm";

export default function CreatePaperPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <ResearchPaperForm />
    </div>
  );
}
