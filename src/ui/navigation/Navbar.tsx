import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center bg-[rgba(250,251,255,0.8)] backdrop-blur-md z-50 shadow-lg">
      <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-coral font-extrabold text-2xl">
        supportify
      </Link>
      
      <div className="flex gap-8 items-center">
        <Link href="vote-feed" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Vote
        </Link>
        <Link href="dashboard" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Dashboard
        </Link>
        <Link 
          href="/signin" className="px-6 py-2 rounded-lg font-semibold text-white bg-purple shadow-lg transition transform hover:shadow-xl hover:translate-y-[-2px]"
          >
            Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
