import Link from 'next/link';
import Image from 'next/image';
import AppleLogo from '../public/apple-logo.png';
import { User } from 'firebase/auth'; // Import Firebase User type
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase signOut

interface NavbarProps {
  user: User | null; // The user prop can be either a User or null
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign out the user
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-[99999] w-full flex justify-center">
      <div className="w-1/2 min-w-[250px] shadow-lg max-w-[650px] pt-0 pr-[3px] pb-[3px] pl-[3px] rounded-b-[20px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-300">
        <nav className="flex justify-between items-center py-4 px-6 bg-white rounded-b-[17px] hover:pt-[25px] transition-all duration-300">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src={AppleLogo}
              alt="Apple Logo"
              width={35}
              height={35}
              className="mx-auto"
            />
          </Link>
          <div className="space-x-6">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/work" className="text-gray-600 hover:text-gray-900">
              Work
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            {user ? (
              // If user is logged in, show "Logout" button
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            ) : (
              // If no user is logged in, show "Login" link
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
