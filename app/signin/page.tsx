import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <form className="mt-5">
          <div>
            <label>Email</label>
            <div className="relative shadow:md my-2 w-full">
              <input type="email" className="rounded-md p-2 mt-1 w-full" />
              <FontAwesomeIcon icon={faEnvelope} className="ml-2 absolute right-2 top-4" />
            </div>
          </div>
          <div className="mt-3">
            <label>Password</label>
            <div className="relative shadow:md my-2 w-full">
              <input type="password" className="rounded-md p-2 mt-1 w-full" />
              <FontAwesomeIcon icon={faLock} className="ml-2 absolute right-2 top-4" />
            </div>
          </div>
          <button className="px-4 py-1 bg-blue-500 text-gray-50 rounded-lg mt-3 w-full">Sign In</button>
        </form>
        <p className="mt-10">Don&apos;t have an account? <Link href={`/signup`} className="text-blue-500 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
