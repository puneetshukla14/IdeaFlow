<!-- GLOBAL WRAPPER WITH ANIMATED BACKGROUND -->
<div style="
  background: linear-gradient(-45deg, #0d1117, #1b1f2a, #111827, #1e293b);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  color: #ffffff;
  padding: 0;
">

<style>
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

<!-- HERO -->
<div align="center" style="padding: 70px 20px; border-bottom: 1px solid rgba(255,255,255,0.05);">

  <img src="assets/logo.png" alt="IdeaFlow Logo" width="120" style="margin-bottom: 20px; filter: drop-shadow(0 0 12px rgba(124,58,237,0.5));" />

  <h1 style="
    font-size: 46px;
    font-weight: 900;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
    margin: 0;
    background: linear-gradient(90deg, #7c3aed, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  ">IDEAFLOW</h1>

  <p style="max-width: 640px; margin: 18px auto 30px; font-size: 17px; color: #9ca3af; line-height: 1.6;">
    The research platform built for continuity.<br>
    When one researcher stops, another continues — without losing progress.
  </p>

  <p>
    <a href="#about" style="background: rgba(255,255,255,0.05); color: #60a5fa; padding: 12px 26px; border-radius: 10px; font-weight: 600; text-decoration: none; margin-right: 10px; border: 1px solid rgba(96,165,250,0.5); backdrop-filter: blur(6px); display: inline-block;">
      Explore Documentation
    </a>
    <a href="#demo" style="background: linear-gradient(90deg, #10b981, #059669); color: #ffffff; padding: 12px 26px; border-radius: 10px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 14px rgba(16,185,129,0.4); display: inline-block;">
      View Demo
    </a>
  </p>

  <p style="margin-top: 12px; font-size: 14px; color: #9ca3af;">
    <a href="https://github.com/your-username/ideaflow/issues" style="color: #60a5fa; text-decoration: none;">Report Bug</a> •
    <a href="https://github.com/your-username/ideaflow/issues" style="color: #60a5fa; text-decoration: none;">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<p align="center" style="margin-top: 35px;">
  <img src="https://img.shields.io/github/license/your-username/ideaflow?color=gray&style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/your-username/ideaflow?color=yellow&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-0ea5e9?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4ea94b?style=for-the-badge&logo=mongodb" />
</p>

---

<!-- ABOUT -->
## <div id="about">About the Project</div>
<p align="center">
  <img src="assets/banner.png" alt="IdeaFlow Banner" width="100%" style="border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.4);" />
</p>

**IdeaFlow** is not just another research repository — it’s a **continuity engine for global research**.  
Where most research dies when a project halts, IdeaFlow ensures it lives on.  

Our mission is simple:  
> *Make research unstoppable by connecting researchers, preserving progress, and enabling seamless handoffs.*

Think of **GitHub meets ResearchGate**, but with:
- A **collaboration‑first approach**  
- Built‑in **version control for research data, papers, and code**  
- **Real‑time co‑editing** and **discussion boards**  
- **Open contribution system** so anyone qualified can join and continue a project  

---

<!-- PROBLEM -->
## Problem Statement
Researchers often work in **isolation**, and when they stop or abandon a project, their work is **lost or inaccessible**.  
This leads to:
- Duplication of effort  
- Wasted time  
- Slower innovation  

There’s **no unified platform** for researchers to:
- Start a project  
- Share progress  
- Allow others to continue seamlessly  

---

<!-- SOLUTION -->
## Solution Overview
**IdeaFlow** solves this by creating a **Next.js-based full-stack platform** where:
1. Researchers create projects and share progress.
2. Others can **pick up exactly where they left off**.
3. All updates are tracked with **version control for research**.
4. Collaboration happens in **real-time or asynchronously**.

---

<!-- FEATURES -->
## Key Features
<div align="center">
<table>
<tr>
<td width="33%" align="center"><b>📂 Project Management</b><br>Create, manage, and store research projects.</td>
<td width="33%" align="center"><b>🤝 Collaboration</b><br>Open projects for others to contribute.</td>
<td width="33%" align="center"><b>📝 Real-Time Notes</b><br>Shared document editing & discussions.</td>
</tr>
<tr>
<td align="center"><b>📊 Contribution Tracking</b><br>Reputation & version control for research.</td>
<td align="center"><b>🔍 Search & Discover</b><br>Find projects by keywords & tags.</td>
<td align="center"><b>🤖 AI Assistance</b><br>Summarize research & suggest next steps.</td>
</tr>
</table>
</div>

---

<!-- UI PREVIEW -->
## UI Preview
<p align="center">
  <img src="assets/ui-preview.png" width="90%" style="border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.3);" />
</p>

---

<!-- TECH STACK -->
## Tech Stack
<p align="center">
  <img src="https://skillicons.dev/icons?i=next,tailwind,mongodb,nodejs,vercel" />
</p>

---

<!-- INSTALLATION -->
## Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ideaflow.git

# Enter the project directory
cd ideaflow

# Install dependencies
npm install

# Start the development server
npm run dev
