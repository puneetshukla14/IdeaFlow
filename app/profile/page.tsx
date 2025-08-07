"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-2">My Profile</h1>
      <div className="space-y-1 text-sm text-zinc-400">
        <div><span className="text-zinc-500">Username:</span> {user.username}</div>
        <div><span className="text-zinc-500">Email:</span> {user.email}</div>
        <div><span className="text-zinc-500">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
}
