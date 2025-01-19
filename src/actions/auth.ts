"use server";

import { auth } from "@/auth";
import { DefaultSession } from "next-auth";

export async function getCurrentUser(): Promise<DefaultSession["user"] | null> {
  try {
    const session = await auth();

    if (!session) {
      return null;
    } else {
      return session.user;
    }
  } catch {
    return null;
  }
}
