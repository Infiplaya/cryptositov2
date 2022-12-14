"use client";
import { Container } from "../Components/Container";
import { Watchlist } from "./watchlist";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const Account = () => {
  const { user, logOut } = UserAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // checks if the user is authenticated
    user ? router.push("/account") : router.push("/signup");
  }, [user, router]);

  return (
    <>
      <h1 className="text-2xl mt-10 font-bold">Welcome, {user?.email}</h1>
      <Link href={"/community/createpost"}><p className="text-xl text-blue p-3 bg-blue-500/20 w-48 rounded-lg mt-5">Post something!</p></Link>
      <p className="mt-5 text-xl font-medium">Your watchlist:</p>
      <Watchlist />
    </>
  );
};

export default Account;
