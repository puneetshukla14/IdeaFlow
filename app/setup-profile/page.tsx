"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const presetAvatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
];

export default function SetupProfilePage() {
  const { user } = useUser();
  const [form, setForm] = useState({
    fullName: "",
    affiliation: "",
    fieldOfResearch: "",
    username: "",
    avatar: "",
    bio: "",
    keywords: "",
    orcid: "",
    website: "",
  });

  // Initialize with Clerk defaults
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        avatar: user.imageUrl || presetAvatars[0],
      }));
    }
  }, [user]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/setup-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, clerkId: user?.id }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Error saving profile");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-gray-900 to-black p-6">
      {/* Left Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10 relative">
        <div className="text-center text-white space-y-6 max-w-md">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-blue-400">ResearchHub</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Connect with researchers, share your work, and collaborate globally.
          </p>
          <div className="absolute bottom-10 left-10 text-sm text-gray-500">
            © 2025 ResearchHub
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
            <p className="text-sm text-gray-300 mt-1">
              Tell us more about yourself to get started.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Affiliation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Affiliation / Institution
                </label>
                <input
                  type="text"
                  value={form.affiliation}
                  onChange={(e) => handleChange("affiliation", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Field of Research */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Primary Field of Research
                </label>
                <input
                  type="text"
                  value={form.fieldOfResearch}
                  onChange={(e) => handleChange("fieldOfResearch", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username / Handle
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Research Keywords
                </label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                  placeholder="AI, ML, Data Science"
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ORCID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  ORCID / ResearcherID
                </label>
                <input
                  type="text"
                  value={form.orcid}
                  onChange={(e) => handleChange("orcid", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Website / Portfolio
                </label>
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Your Avatar
              </label>
              <div className="flex gap-4 flex-wrap">
                {/* Clerk Default Avatar */}
                <button
                  type="button"
                  onClick={() => handleChange("avatar", user?.imageUrl || "")}
                  className={`rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                    form.avatar === user?.imageUrl
                      ? "border-blue-500 shadow-lg shadow-blue-500/30"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={user?.imageUrl || "/avatars/avatar1.png"}
                    alt="Default Avatar"
                    width={72}
                    height={72}
                    className="rounded-full"
                  />
                </button>

                {/* Preset Avatars */}
                {presetAvatars.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => handleChange("avatar", av)}
                    className={`rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                      form.avatar === av
                        ? "border-blue-500 shadow-lg shadow-blue-500/30"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={av}
                      alt="Avatar"
                      width={72}
                      height={72}
                      className="rounded-full"
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
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.bio.length} / 250 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg font-semibold text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
