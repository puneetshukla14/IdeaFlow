"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();

      if (!userData) {
        // No user found, redirect to sign-in
        router.replace("/sign-in");
        return;
      }

      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-2">My Profile</h1>
      <div className="space-y-1 text-sm text-zinc-400">
        <div>
          <span className="text-zinc-500">Username:</span> {user.username}
        </div>
        <div>
          <span className="text-zinc-500">Email:</span> {user.email}
        </div>
        <div>
          <span className="text-zinc-500">Joined:</span>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
      >
        Logout
      </button>
    </div>
  );

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.replace("/sign-in");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error", err);
    }
  }
}
