"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResearchPaperForm from "@/components/paper-form/ResearchPaperForm";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default function CreatePaperPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      const userData = await getCurrentUser();

      if (!userData) {
        router.replace("/sign-in");
        return;
      }

      setUser(userData);
      setLoading(false);
    }

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f13] text-white">
      <div className="lg:ml-64 p-6">
        <ResearchPaperForm />
      </div>
    </div>
  );
}
