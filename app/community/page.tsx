"use client"
import Link from "next/link";
import { useEffect } from "react";
import { Posts } from "./Posts";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";

export default function Page() {
  const router = useRouter();
  const {user} = UserAuth();
  useEffect(() => {
    // checks if the user is authenticated
    user ? router.push("/community") : router.push("/signup");
  }, [user, router]);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold">Posts wall</h2>
      <Posts />
      <Link href="/community/createpost"> <p className="text-xl mx-auto text-blue p-3 text-center bg-blue-500/20 w-56 rounded-lg mt-5">Create a new post</p></Link>
    </div>
  );
}
