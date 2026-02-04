import { authClient } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
