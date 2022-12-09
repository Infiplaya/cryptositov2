import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SignUp = () => {
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <form className="mt-5">
          <div>
            <label>Email</label>
            <div>
              <input type="email" className="rounded-md" />
              <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
            </div>
          </div>
          <div className="mt-3">
            <label>Password</label>
            <div>
              <input type="password" className="rounded-md" />
              <FontAwesomeIcon icon={faLock} className="ml-2" />
            </div>
          </div>
          <button className="px-4 py-1 bg-blue-500 rounded-lg mt-3">Sign In</button>
        </form>
        <p className="flex flex-col text-xl mt-5">
          Don&apos;t have an account?
          <Link href={`/signup`}>Sign up!</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
