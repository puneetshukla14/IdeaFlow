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
      return <FileText className={clsx(styles, "text-blue-500")} />;
    case "dataset":
      return <Database className={clsx(styles, "text-green-500")} />;
    case "code":
      return <Code className={clsx(styles, "text-purple-500")} />;
    case "collaboration":
      return <Users className={clsx(styles, "text-orange-500")} />;
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

  // Simulated updates (for demo purposes only)
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
        "bg-white rounded-xl shadow-sm p-4 border border-gray-100"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Global Live Feed</h3>
        <span className="text-xs text-gray-500">Latest public contributions</span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        {feed.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 animate-fade-in"
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">{getIcon(item.type)}</div>

            {/* Content */}
            <div>
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-500">
                {item.author} • {timeAgo(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
