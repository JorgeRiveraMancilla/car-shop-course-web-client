import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineCar } from "react-icons/ai";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-red-500"
        >
          <AiOutlineCar size={34} />
          <span>Subastas</span>
        </Link>

        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar autos..."
              className="pl-8 w-full bg-white border-gray-300"
            />
          </div>
        </div>

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
