"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const withAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.push("/dashboard"); // Redirect to dashboard if logged in
      }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;
    
    if (user) return null; // Prevent flickering before redirecting

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;