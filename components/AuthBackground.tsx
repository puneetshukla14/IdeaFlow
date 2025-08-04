"use client";

import { useEffect, useState, useRef } from "react";

interface Sparkle {
  top: string;
  left: string;
  delay: string;
}

export default function AuthBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const flareRef = useRef<HTMLDivElement>(null);

  // Generate sparkles
  useEffect(() => {
    const s = Array.from({ length: 35 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setSparkles(s);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Flare sweep loop
  useEffect(() => {
    if (!flareRef.current) return;
    let i = 0;
    const sweep = () => {
      if (flareRef.current) {
        flareRef.current.style.left = "-20%";
        flareRef.current.style.opacity = "0";
        setTimeout(() => {
          if (flareRef.current) {
            flareRef.current.style.transition = "transform 1.5s ease, opacity 1.5s ease";
            flareRef.current.style.left = "120%";
            flareRef.current.style.opacity = "0.6";
          }
        }, 100);
      }
      i++;
      setTimeout(sweep, 6000);
    };
    sweep();
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-screen h-screen overflow-hidden">
      {/* Animated Gradient Layers */}
      <div className="absolute inset-0 animate-gradient-slow bg-gradient-to-br from-purple-900 via-black to-blue-900 bg-[length:400%_400%]" />
      <div className="absolute inset-0 opacity-60 animate-gradient-fast bg-gradient-to-tr from-fuchsia-700/40 via-blue-500/30 to-teal-400/40 bg-[length:300%_300%]" />

      {/* Lens Flare Sweep */}
      <div
        ref={flareRef}
        className="absolute top-0 h-full w-[20%] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        style={{ transform: `translateY(${mouse.y * 15}px)` }}
      />

      {/* Parallax SVG Waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00cc">
              <animate
                attributeName="stop-color"
                values="#ff00cc; #3333ff; #00ffcc; #ff00cc"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#3333ff">
              <animate
                attributeName="stop-color"
                values="#3333ff; #00ffcc; #ff00cc; #3333ff"
                dur="15s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <path
          d="M0 400 C 300 250, 700 550, 1000 400 S 1600 550, 2000 400"
          stroke="url(#waveGradient1)"
          strokeWidth="3"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-400 0"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M0 600 C 300 450, 700 750, 1000 600 S 1600 750, 2000 600"
          stroke="url(#waveGradient1)"
          strokeWidth="2"
          opacity="0.5"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-500 0"
            dur="25s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M0 800 C 300 650, 700 950, 1000 800 S 1600 950, 2000 800"
          stroke="url(#waveGradient1)"
          strokeWidth="1.5"
          opacity="0.3"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="-600 0"
            dur="30s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/80 rounded-full animate-sparkle"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="absolute w-[6px] h-[6px] bg-white/10 rounded-full animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Animations */}
      <style jsx global>{`
        @keyframes gradientShiftSlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes gradientShiftFast {
          0% {
            background-position: 50% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
        .animate-gradient-slow {
          animation: gradientShiftSlow 18s ease infinite;
        }
        .animate-gradient-fast {
          animation: gradientShiftFast 12s ease infinite;
        }
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(0.6);
          }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite ease-in-out;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
