"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <Logo />

        <Search />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            asChild
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <Link href="/login">Iniciar Sesión</Link>
          </Button>

          <Button
            variant="default"
            asChild
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
