import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <h1>Hello {user.firstName || "User"}</h1>;
}
