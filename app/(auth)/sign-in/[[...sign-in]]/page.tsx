import { SignIn } from "@clerk/nextjs";
 
export default function Page({
  searchParams,
}: {
  searchParams: { redirectUrl: string | undefined },
}) {
  const { redirectUrl } = searchParams;
  return <SignIn redirectUrl={redirectUrl || "/"} />;
}