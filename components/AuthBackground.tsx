"use client";
import { useEffect, useState } from "react";

export default function AuthBackground() {
  const [sparkles, setSparkles] = useState<{ top: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    const s = Array.from({ length: 12 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setSparkles(s);
  }, []);

  return (
    <>
      {/* Gradient */}
      <div className="absolute inset-0 -z-20 animate-gradient bg-gradient-to-br from-[#0d1117] via-[#1b1f2a] to-[#0d1117] bg-[length:400%_400%]" />

      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full -z-10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,300 C150,100 350,500 500,300 S850,500 1000,300"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          fill="none"
          className="animate-move-line-fast"
        />
      </svg>

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/50 rounded-full animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
          }}
        />
      ))}
    </>
  );
}
