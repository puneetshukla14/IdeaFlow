"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const avatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.jpg",
  "/avatars/avatar3.jpg",
  "/avatars/avatar4.jpg",
  "/avatars/avatar5.jpg",
  "/avatars/avatar6.jpg",
];

export default function SetupProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    affiliation: "",
    fieldOfResearch: "",
    username: "",
    avatar: avatars[0],
    bio: "",
    keywords: "",
    orcid: "",
    website: "",
    email: "",
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch logged-in user
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            setUserId(data.user._id);
            setForm((prev) => ({
              ...prev,
              fullName: data.user.fullName || "",
              email: data.user.email || "",
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Generate username suggestions
  useEffect(() => {
    if (!form.fullName.trim()) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(() => {
      const base = form.fullName.toLowerCase().replace(/\s+/g, "");
      const newSuggestions = [
        `@${base}`,
        `@${base}${Math.floor(Math.random() * 100)}`,
        `@${base}_${Math.floor(Math.random() * 999)}`,
      ];
      setSuggestions(newSuggestions);
    }, 400);
    return () => clearTimeout(timeout);
  }, [form.fullName]);

  const handleSelectSuggestion = (value: string) => {
    handleChange("username", value);
    setSuggestions([]);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loadingUser) {
      alert("User data is still loading...");
      return;
    }
    if (!userId) {
      alert("No signed-in user found.");
      return;
    }

    try {
      const res = await fetch("/api/setup-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT
        body: JSON.stringify({ ...form, userId }),
      });

if (res.ok) {
  const data = await res.json();
  window.location.href = data.redirectTo || "/dashboard"; // force reload, cookie is present
}

 else {
  const err = await res.json().catch(() => ({}));
  alert("Error saving profile: " + (err.error || "Unknown error"));
}

    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-blue-900 via-gray-900 to-black p-6">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-2xl animate-pulse-slow" />

      {/* Background Waves */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 300 Q500 100 1000 300 T2000 300"
          stroke="url(#grad1)"
          strokeWidth="3"
          fill="transparent"
          className="animate-wave-slow"
        />
        <path
          d="M0 500 Q500 300 1000 500 T2000 500"
          stroke="url(#grad2)"
          strokeWidth="2"
          fill="transparent"
          className="animate-wave-slower"
        />
        <path
          d="M0 700 Q500 500 1000 700 T2000 700"
          stroke="url(#grad3)"
          strokeWidth="4"
          fill="transparent"
          className="animate-wave-slowest"
        />

        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>

      {/* Left Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10 relative z-10">
        <div className="text-center text-white space-y-6 max-w-md">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-blue-400">ResearchHub</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Connect with researchers, share your work, and collaborate globally.
          </p>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm text-gray-500">© 2025 ResearchHub</p>
            <div className="w-20 border-t border-gray-700 mx-auto my-1"></div>
            <p className="text-xs text-gray-500">Developed by Puneet Shukla</p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-6xl bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/60 shadow-2xl overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Complete Your Profile
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Tell us more about yourself to get started.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["Full Name", "fullName", true],
                ["Affiliation / Institution", "affiliation", false],
                ["Primary Field of Research", "fieldOfResearch", true],
                ["Username / Handle", "username", true],
                ["Research Keywords", "keywords", false],
                ["ORCID / ResearcherID", "orcid", false],
                ["Website / Portfolio", "website", false],
              ].map(([label, fieldKey, required], idx) => (
                <div
                  key={`${fieldKey}-${idx}`}
                  className={`relative ${idx === 6 ? "md:col-span-2" : ""}`}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {label}{" "}
                    {!required && (
                      <span className="text-gray-500 text-xs">(optional)</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={form[fieldKey as keyof typeof form]}
                    onChange={(e) =>
                      handleChange(fieldKey as string, e.target.value)
                    }
                    className="w-full p-3 rounded-xl bg-gray-800/70 text-white outline-none border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40"
                    required={required as boolean}
                  />

                  {fieldKey === "username" && suggestions.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {suggestions.map((s, i) => (
                        <button
                          key={`${s}-${i}`}
                          type="button"
                          onClick={() => handleSelectSuggestion(s)}
                          className="px-3 py-1 rounded-lg bg-gray-700 text-blue-300 hover:bg-blue-600/50 transition text-sm whitespace-nowrap"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose an Avatar
              </label>
              <div className="flex gap-4 flex-wrap">
                {avatars.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => handleChange("avatar", av)}
                    className={`rounded-full border-4 transition-all duration-200 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] ${
                      form.avatar === av
                        ? "border-blue-500 shadow-lg shadow-blue-500/40"
                        : "border-transparent"
                    }`}
                    style={{
                      width: "72px",
                      height: "72px",
                      overflow: "hidden",
                      borderRadius: "9999px",
                    }}
                  >
                    <Image
                      src={av}
                      alt="Avatar"
                      width={72}
                      height={72}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Short Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                maxLength={250}
                placeholder="Tell us a bit about yourself..."
                className="w-full p-3 rounded-xl bg-gray-800/70 text-white outline-none border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.bio.length} / 250 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes wave-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes wave-slower {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-30%);
          }
        }
        @keyframes wave-slowest {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }
        .animate-wave-slow {
          animation: wave-slow 30s ease-in-out infinite;
        }
        .animate-wave-slower {
          animation: wave-slower 40s ease-in-out infinite;
        }
        .animate-wave-slowest {
          animation: wave-slowest 50s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
