"use client";

export default function Logo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-lg group">
      {/* Outer pulsing ring */}
      <div className="absolute w-full h-full rounded-full border-2 border-cyan-500 animate-ping opacity-30" />

      {/* Inner rotating lines */}
      <div className="absolute w-5 h-5 border-t-2 border-cyan-400 rounded-full animate-spin-slow" />
      <div className="absolute w-3 h-3 border-b-2 border-blue-500 rounded-full animate-spin-slower" />

      {/* Central glowing dot */}
      <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg" />
    </div>
  );
}
