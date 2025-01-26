"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignInPage() {
  useEffect(() => {
    signIn("id-server", { callbackUrl: "/" });
  }, []);

  return <div>Redirigiendo al inicio de sesión...</div>;
}
