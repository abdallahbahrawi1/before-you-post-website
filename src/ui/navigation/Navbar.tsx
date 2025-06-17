import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center bg-[rgba(250,251,255,0.8)] backdrop-blur-md z-50 shadow-lg">
      <Link href="https://example.com" className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-coral font-extrabold text-2xl">
        supportify
      </Link>
      
      <div className="flex gap-8 items-center">
        <Link href="https://example.com/features" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Features
        </Link>
        <Link href="https://example.com/pricing" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Pricing
        </Link>
        <Link href="https://example.com/community" className="text-deep-blue font-semibold transition duration-300 hover:text-purple">
          Community
        </Link>
        <Link href={'/signin'}>
          <button className="px-6 py-2 rounded-lg font-semibold text-white bg-purple shadow-lg transition transform hover:shadow-xl hover:translate-y-[-2px]">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
