'use client';

import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

const SocialSignInButtons = () => {

  const handleGoogleSignIn = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    window.location.href = `${apiUrl}/auth/google`;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100" onClick={handleGoogleSignIn}>
        <AiOutlineGoogle className="m-1" size={20} color="#1B2D45" />
        <span>Google</span>
      </button>
      <button 
        className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-100"
        disabled
        title="Coming soon">
        <FaFacebookF className="m-1" size={20} color="#1B2D45" />
        <span>Facebook</span>
      </button>
    </div>
  );
};

export default SocialSignInButtons;
