'use client'
import { useAuth } from '@/features/auth/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure auth state has loaded
    const timer = setTimeout(() => {
      console.log("Auth state:", isLoggedIn());
      if (!isLoggedIn()) {
        router.push('/signin');
      }
      setIsChecking(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return isLoggedIn() ? <>{children}</> : null;
}

export default ProtectedRoute;