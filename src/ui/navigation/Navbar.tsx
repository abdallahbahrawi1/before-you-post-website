'use client'
import { useAuth } from '@/features/auth/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import img  from '../../../public/assets/beforeyoupost_logo_no_text.png'


const Navbar: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  return (
  <nav className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center bg-[rgba(250,251,255,0.8)] backdrop-blur-md z-50 shadow-lg">
      {/* Logo + brand */}
      <Link href="/" className="flex items-center gap-3 group">
        <Image
          src={img}            // place your exported logo here (/public/logo.png)
          alt="Before You Post logo"
          width={36}
          height={36}
          priority
          className="rounded-md"
        />
        <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-purple to-coral font-extrabold text-2xl group-hover:opacity-90 transition-opacity">
          Before You Post
        </span>
      </Link>

      <div className="flex gap-8 items-center">
        <Link href="/vote-feed" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Vote
        </Link>
        <Link href="/dashboard" prefetch={false} className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Dashboard
        </Link>

        {isLoggedIn() ? (
          <span className="font-semibold text-purple">
            Welcome, {user?.fullName}
          </span>
        ) : (
          <Link
            href="/signin"
            className="px-6 py-2 rounded-lg font-semibold text-white bg-purple shadow-lg transition transform hover:shadow-xl hover:-translate-y-0.5"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
