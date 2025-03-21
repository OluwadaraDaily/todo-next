"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    console.log("User =>", user);

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;