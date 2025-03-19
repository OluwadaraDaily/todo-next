"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
      } else {
        console.log('User session:', data);
        router.push('/dashboard'); // Redirect to a protected page
      }
    };
    getSession();
  }, [router]);

  return (
    <div className='flex h-screen'>
      <Skeleton className='w-[40%] min-h-[100vh] lg:block hidden rounded-none' />
      <div className='w-full m-8 flex flex-col gap-5'>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Skeleton className='aspect-video rounded-xl' />
          <Skeleton className='aspect-video rounded-xl' />
          <Skeleton className='aspect-video rounded-xl' />
        </div>
        <Skeleton className="min-h-[100vh] flex-1 rounded-xl md:min-h-min h-full" />
      </div>
    </div>
  );
}