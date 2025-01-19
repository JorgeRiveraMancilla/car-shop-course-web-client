"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LoginButton() {
  function login() {
    signIn("id-server", {
      callbackUrl: "/",
      prompt: "login",
      redirect: true,
    });
  }

  return (
    <Button
      variant="default"
      className="bg-black hover:bg-gray-800 text-white"
      onClick={login}
    >
      Iniciar Sesión
    </Button>
  );
}
