import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <main className="p-6">
      <h1>Hello, {user?.firstName}</h1>
      <SignOutButton>
        <button className="px-4 py-2 bg-red-500 text-white mt-4">
          Sign out
        </button>
      </SignOutButton>
    </main>
  );
}
