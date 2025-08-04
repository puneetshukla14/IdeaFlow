"use client";
import React from "react";

export default function Readme() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white font-sans">
      {/* Background Layer: Animated gradient */}
      <div className="absolute inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#0d1117] via-[#1b1f2a] to-[#1e293b] bg-[length:400%_400%]" />

      {/* Background Layer: Glowing moving grid */}
      <div className="absolute inset-0 -z-10 animate-glow-grid pointer-events-none" />

      {/* Hero Section */}
      <section className="border-b border-white/5 px-4 py-16 text-center">
        <img
          src="/images/logo.png"
          alt="IdeaFlow Logo"
          className="mx-auto mb-6 w-28 drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]"
        />
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#9b87f5] via-[#6c63ff] to-[#00d4ff]">
          IDEAFLOW
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300 text-lg leading-relaxed">
          The research platform built for continuity. <br />
          When one researcher stops, another continues — without losing progress.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="#about"
            className="rounded-lg border border-blue-400/50 bg-white/5 px-6 py-3 font-semibold text-blue-300 backdrop-blur hover:bg-white/10 transition"
          >
            Explore Documentation
          </a>
          <a
            href="#demo"
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition"
          >
            View Demo
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          <a
            href="https://github.com/your-username/ideaflow/issues"
            className="text-blue-400 hover:underline"
          >
            Report Bug
          </a>{" "}
          •{" "}
          <a
            href="https://github.com/your-username/ideaflow/issues"
            className="text-blue-400 hover:underline"
          >
            Request Feature
          </a>
        </p>
      </section>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3 px-4 py-6">
        <img src="https://img.shields.io/github/license/your-username/ideaflow?color=gray&style=for-the-badge" />
        <img src="https://img.shields.io/github/stars/your-username/ideaflow?color=yellow&style=for-the-badge" />
        <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js" />
        <img src="https://img.shields.io/badge/TailwindCSS-3-0ea5e9?style=for-the-badge&logo=tailwindcss" />
        <img src="https://img.shields.io/badge/MongoDB-Atlas-4ea94b?style=for-the-badge&logo=mongodb" />
      </div>

      {/* About Section */}
      <section id="about" className="px-4 py-16">
        <img
          src="/assets/banner.png"
          alt="IdeaFlow Banner"
          className="mx-auto mb-6 w-full max-w-5xl rounded-lg shadow-lg"
        />
        <div className="mx-auto max-w-4xl space-y-4 text-lg text-gray-300">
          <p>
            <strong>IdeaFlow</strong> is not just another research repository — it’s a{" "}
            <strong>continuity engine for global research</strong>. Where most research
            dies when a project halts, IdeaFlow ensures it lives on.
          </p>
          <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-400">
            Make research unstoppable by connecting researchers, preserving progress,
            and enabling seamless handoffs.
          </blockquote>
          <p>
            Think of <strong>GitHub meets ResearchGate</strong>, but with:
          </p>
          <ul className="list-disc pl-6">
            <li>Collaboration‑first approach</li>
            <li>Built‑in version control for research data, papers, and code</li>
            <li>Real‑time co‑editing and discussion boards</li>
            <li>Open contribution so anyone qualified can continue a project</li>
          </ul>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">Problem Statement</h2>
        <div className="mx-auto max-w-4xl text-lg text-gray-300">
          <p>Researchers often work in isolation. When they stop, their work is lost:</p>
          <ul className="list-disc pl-6">
            <li>Duplication of effort</li>
            <li>Wasted time</li>
            <li>Slower innovation</li>
          </ul>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">Solution Overview</h2>
        <div className="mx-auto max-w-4xl text-lg text-gray-300">
          <ol className="list-decimal pl-6">
            <li>Researchers create projects and share progress.</li>
            <li>Others continue where they left off.</li>
            <li>All updates tracked with research version control.</li>
            <li>Collaboration in real-time or async.</li>
          </ol>
        </div>
      </section>

      {/* Features Table */}
      <section className="px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-gray-300">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-4 font-bold">Project Management</td>
                <td>Create, manage, and store research projects.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-bold">Collaboration</td>
                <td>Open projects for others to contribute.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-bold">Real-Time Notes</td>
                <td>Shared document editing & discussions.</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-bold">Contribution Tracking</td>
                <td>Reputation & research version control.</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">AI Assistance</td>
                <td>Summarize research & suggest next steps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* UI Preview */}
      <section className="px-4 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold">UI Preview</h2>
        <img
          src="/assets/ui-preview.png"
          alt="UI Preview"
          className="mx-auto w-full max-w-5xl rounded-lg shadow-lg"
        />
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold">Tech Stack</h2>
        <img
          src="https://skillicons.dev/icons?i=next,tailwind,mongodb,nodejs,vercel"
          className="mx-auto"
        />
      </section>

      {/* Installation */}
      <section className="px-4 py-16">
        <h2 className="mb-6 text-center text-3xl font-bold">Installation</h2>
        <pre className="mx-auto max-w-3xl overflow-x-auto rounded-lg bg-black/50 p-4 text-sm text-gray-300">
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
