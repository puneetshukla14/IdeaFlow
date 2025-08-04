"use client";

import React from "react";

export default function Readme() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* Background Layers */}
      <div className="absolute inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#0d1117] via-[#1b1f2a] via-[#111827] to-[#1e293b] bg-[length:400%_400%]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] animate-grid" />

      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 text-center backdrop-blur-sm">
        <img
          src="/images/logo.png"
          alt="IdeaFlow Logo"
          className="mx-auto mb-6 w-28 drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]"
        />
        <h1 className="bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 bg-clip-text text-5xl font-extrabold tracking-wide text-transparent sm:text-6xl">
          IDEAFLOW
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300 leading-relaxed">
          The research platform built for continuity. <br />
          When one researcher stops, another continues — without losing progress.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#about"
            className="rounded-lg border border-blue-400/50 bg-white/5 px-8 py-3 font-semibold text-blue-300 backdrop-blur hover:bg-white/10 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300"
          >
            Explore Documentation
          </a>
          <a
            href="#demo"
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
            View Demo
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">
          <a href="https://github.com/your-username/ideaflow/issues" className="text-blue-300 hover:underline">
            Report Bug
          </a>{" "}
          •{" "}
          <a href="https://github.com/your-username/ideaflow/issues" className="text-blue-300 hover:underline">
            Request Feature
          </a>
        </p>
      </section>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-4 px-6 py-8 bg-black/20">
        <img src="https://img.shields.io/github/license/your-username/ideaflow?color=gray&style=for-the-badge" />
        <img src="https://img.shields.io/github/stars/your-username/ideaflow?color=yellow&style=for-the-badge" />
        <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js" />
        <img src="https://img.shields.io/badge/TailwindCSS-3-0ea5e9?style=for-the-badge&logo=tailwindcss" />
        <img src="https://img.shields.io/badge/MongoDB-Atlas-4ea94b?style=for-the-badge&logo=mongodb" />
      </div>

      {/* About */}
      <section id="about" className="px-6 py-20 max-w-5xl mx-auto">
        <img
          src="/assets/banner.png"
          alt="IdeaFlow Banner"
          className="mx-auto mb-8 w-full rounded-lg shadow-xl"
        />
        <div className="space-y-5 text-lg text-gray-300">
          <p>
            <strong className="text-white">IdeaFlow</strong> is not just another research repository —
            it’s a <strong className="text-white">continuity engine for global research</strong>.
            Where most research dies when a project halts, IdeaFlow ensures it lives on.
          </p>
          <blockquote className="border-l-4 border-blue-400 pl-5 italic text-gray-400">
            Make research unstoppable by connecting researchers, preserving progress, and enabling seamless handoffs.
          </blockquote>
          <p>
            Think of <strong className="text-white">GitHub meets ResearchGate</strong>, but with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Collaboration‑first approach</li>
            <li>Built‑in version control for research data, papers, and code</li>
            <li>Real‑time co‑editing and discussion boards</li>
            <li>Open contribution system for qualified researchers</li>
          </ul>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-20 bg-black/20">
        <h2 className="text-center text-3xl font-bold mb-6">Problem Statement</h2>
        <div className="max-w-4xl mx-auto text-lg text-gray-300 space-y-5">
          <p>
            Researchers often work in isolation, and when they stop or abandon a project, their work is lost or inaccessible. This leads to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Duplication of effort</li>
            <li>Wasted time</li>
            <li>Slower innovation</li>
          </ul>
          <p>There’s no unified platform for researchers to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Start a project</li>
            <li>Share progress</li>
            <li>Allow others to continue seamlessly</li>
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20">
        <h2 className="text-center text-3xl font-bold mb-6">Solution Overview</h2>
        <ol className="max-w-4xl mx-auto list-decimal pl-6 text-lg text-gray-300 space-y-1">
          <li>Researchers create projects and share progress.</li>
          <li>Others can pick up exactly where they left off.</li>
          <li>All updates are tracked with version control for research.</li>
          <li>Collaboration happens in real-time or asynchronously.</li>
        </ol>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-black/20">
        <h2 className="text-center text-3xl font-bold mb-10">Key Features</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            ["📂 Project Management", "Create, manage, and store research projects."],
            ["🤝 Collaboration", "Open projects for others to contribute."],
            ["📝 Real-Time Notes", "Shared document editing & discussions."],
            ["📊 Contribution Tracking", "Reputation & version control for research."],
            ["🔍 Search & Discover", "Find projects by keywords & tags."],
            ["🤖 AI Assistance", "Summarize research & suggest next steps."]
          ].map(([title, desc]) => (
            <div
              key={title}
              className="p-6 rounded-lg bg-white/5 backdrop-blur hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-gray-300 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UI Preview */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">UI Preview</h2>
        <img
          src="/assets/ui-preview.png"
          alt="UI Preview"
          className="mx-auto w-full max-w-5xl rounded-lg shadow-xl"
        />
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-20 text-center bg-black/20">
        <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
        <img
          src="https://skillicons.dev/icons?i=next,tailwind,mongodb,nodejs,vercel"
          className="mx-auto"
        />
      </section>

      {/* Installation */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">Installation</h2>
        <pre className="mx-auto max-w-3xl overflow-x-auto rounded-lg bg-black/50 p-6 text-sm text-gray-300">
{`# Clone the repository
git clone https://github.com/your-username/ideaflow.git

# Enter the project directory
cd ideaflow

# Install dependencies
npm install

# Start the development server
npm run dev`}
        </pre>
      </section>
    </div>
  );
}
