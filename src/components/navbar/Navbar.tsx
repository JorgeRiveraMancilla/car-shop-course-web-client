import { getCurrentUser } from "@/actions/authAction";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import Search from "./Search";
import UserDropdown from "./UserDropdown";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <Logo />

        <Search />

        {user ? <UserDropdown username={user.username} /> : <LoginButton />}
      </div>
    </header>
  );
}
