"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = UserAuth();

  const router = useRouter();

  function redirect() {
    router.push('/account')
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      redirect();

    } catch (e:any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error ? <p className="text-red-500 p-3 my-2">{error}</p> : null}
        <form className="mt-5" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <div className="relative shadow:md my-2 w-full">
              <input
                type="email"
                className="rounded-md p-2 mt-1 w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="ml-2 absolute right-2 top-4"
              />
            </div>
          </div>
          <div className="mt-3">
            <label>Password</label>
            <div className="relative shadow:md my-2 w-full">
              <input
                type="password"
                className="rounded-md p-2 mt-1 w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FontAwesomeIcon
                icon={faLock}
                className="ml-2 absolute right-2 top-4"
              />
            </div>
          </div>
          <button className="px-4 py-1 bg-blue-500 text-gray-50 rounded-lg mt-3 w-full">
            Sign Up
          </button>
        </form>
        <p className="mt-10">
          Already have an account?{" "}
          <Link href={`/signin`} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
