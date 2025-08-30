'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAuth } from '../AuthContext';


type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect( () => {
    console.log(isLoggedIn())
    if(!isLoggedIn()){
      router.push('/signin')
    }
  }, [isLoggedIn, router])
  return isLoggedIn() ? <>{children}</> : null;
}

export default ProtectedRoute