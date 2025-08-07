"use client";

import { FileText, Database, Code, Users } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface FeedItem {
  id: number;
  type: "paper" | "dataset" | "code" | "collaboration";
  title: string;
  author: string;
  timestamp: string; // ISO format
}

/* ------------------ ICON SELECTOR ------------------ */
function getIcon(type: FeedItem["type"]) {
  const styles = "w-5 h-5";
  switch (type) {
    case "paper":
      return <FileText className={clsx(styles, "text-blue-400")} />;
    case "dataset":
      return <Database className={clsx(styles, "text-green-400")} />;
    case "code":
      return <Code className={clsx(styles, "text-purple-400")} />;
    case "collaboration":
      return <Users className={clsx(styles, "text-orange-400")} />;
    default:
      return null;
  }
}

/* ------------------ TIME FORMAT ------------------ */
function timeAgo(date: string) {
  const diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ------------------ MAIN FEED ------------------ */
export default function LiveFeed({ className }: { className?: string }) {
  const [feed, setFeed] = useState<FeedItem[]>([
    {
      id: 1,
      type: "paper",
      title: "Published research paper on AI in Healthcare",
      author: "Dr. Meera Sharma",
      timestamp: "2025-08-06T08:20:00Z",
    },
    {
      id: 2,
      type: "collaboration",
      title: "Joined collaboration on Quantum Computing",
      author: "Rajesh Kumar",
      timestamp: "2025-08-06T06:15:00Z",
    },
    {
      id: 3,
      type: "dataset",
      title: "Uploaded dataset for Climate Studies",
      author: "Ananya Singh",
      timestamp: "2025-08-05T15:40:00Z",
    },
  ]);

  // Simulated updates (demo only)
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((prev) => [
        {
          id: prev.length + 1,
          type: ["paper", "dataset", "code", "collaboration"][
            Math.floor(Math.random() * 4)
          ] as FeedItem["type"],
          title: "New contribution added",
          author: "User " + (prev.length + 1),
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={clsx(
        className,
        "bg-[#1f2937] rounded-xl shadow-md border border-gray-800 hover:border-gray-700 transition-colors duration-200"
      )}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
        <h3 className="font-semibold text-lg text-gray-100">
          Global Live Feed
        </h3>
        <span className="text-xs text-gray-400">
          Latest public contributions
        </span>
      </div>

      {/* Feed List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto px-4 py-3">
        {feed.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-800 cursor-pointer animate-fade-in"
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5 p-1 rounded-full bg-gray-900">
              {getIcon(item.type)}
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-medium text-gray-200 leading-snug">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.author} • {timeAgo(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
