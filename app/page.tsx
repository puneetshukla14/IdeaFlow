import { currentUser } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const client = await clientPromise;
  const db = client.db();
  const accounts = db.collection("accounts");

  // Check if the user has a profile
  const existing = await accounts.findOne({ clerkId: user.id });

  if (!existing) {
    redirect("/setup-profile");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome back, {existing.fullName}</h1>
    </main>
  );
}
