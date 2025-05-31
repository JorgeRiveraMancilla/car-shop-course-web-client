import { getCurrentUser } from '@/actions/authAction';
import LoginButton from './LoginButton';
import LogoIcon from './LogoIcon';
import SearchBar from './SearchBar';
import UserDropdown from './UserDropdown';

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <LogoIcon />

        <SearchBar />

        {user ? <UserDropdown user={user} /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Navbar;
