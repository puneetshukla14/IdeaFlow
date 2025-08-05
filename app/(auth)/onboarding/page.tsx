import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

export default async function OnboardingPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user.username,
    name: userInfo?.name || user.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user.imageUrl,
  };

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold">Onboarding</h1>
      <p className="mt-2 text-gray-400">
        Complete your profile to start using IdeaFlow.
      </p>

      <section className="mt-6 bg-gray-900 p-6 rounded-lg">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
