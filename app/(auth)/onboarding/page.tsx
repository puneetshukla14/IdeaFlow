import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const user = await currentUser();

  // If not logged in, send to sign-in
  if (!user) {
    redirect("/sign-in");
  }

  // TEMP: Replace with DB check later
  // For now, pretend everyone is "new" and needs onboarding
  const isNewUser = true;

  if (!isNewUser) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Complete your profile</h1>
      <p className="mt-2 text-gray-400">
        Fill in your details to start using IdeaFlow.
      </p>

      {/* Here you can render your SetupProfilePage form */}
    </main>
  );
}
