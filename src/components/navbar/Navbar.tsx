import LoginButton from "./LoginButton";
import Logo from "./Logo";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <Logo />

        <Search />

        <LoginButton />
      </div>
    </header>
  );
}
