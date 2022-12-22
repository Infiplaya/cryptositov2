"use client";

import { NavLink } from "./NavLink";
import ThemeSwitch from "./ThemeSwitch";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const Mainbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  function handleNav() {
    setIsNavOpen((previous) => !previous);
  }

  return (
    <>
      <nav className="flex gap-5 text-sm font-semibold align-middle items-center p-4">
        <NavLink
          href={`/`}
          classNames="text-2xl italic antialiased tracking-wide mr-auto"
          setIsNavOpen={setIsNavOpen}
        >
          Cryptosito
        </NavLink>
        {user?.email ? (
          <>
            <NavLink
              href={`/account`}
              classNames="hidden md:block"
              setIsNavOpen={setIsNavOpen}
            >
              Account
            </NavLink>
            <NavLink
              href={`/community`}
              classNames="hidden md:block"
              setIsNavOpen={setIsNavOpen}
            >
              Community
            </NavLink>
            <button
              onClick={handleSignOut}
              className="px-3 rounded-lg py-1 bg-blue-500 text-gray-50 hidden md:block"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              href={`/signin`}
              classNames="hidden md:block"
              setIsNavOpen={setIsNavOpen}
            >
              Sign In
            </NavLink>
            <NavLink
              href={`/signup`}
              classNames="px-3 rounded-lg py-1 bg-blue-500 text-gray-50 hidden md:block"
              setIsNavOpen={setIsNavOpen}
            >
              Sign Up
            </NavLink>
          </>
        )}

        <div className="hidden md:block">
          <ThemeSwitch />
        </div>
        <div
          className="block md:hidden ease-in duration-300 ml-auto"
          onClick={handleNav}
        >
          <FontAwesomeIcon
            icon={isNavOpen ? faXmark : faBars}
            className="cursor-pointer"
            size="lg"
          />
        </div>
      </nav>
      <nav
        className={
          isNavOpen
            ? "flex flex-col space-y-3 items-center w-full h-full z-10 md:hidden p-4"
            : "hidden"
        }
      >
        <NavLink href={`/`} setIsNavOpen={setIsNavOpen}>
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink href={`/account`} setIsNavOpen={setIsNavOpen}>
              Account
            </NavLink>
            <NavLink
              href={`/community`}
              classNames="hidden md:block"
              setIsNavOpen={setIsNavOpen}
            >
              Community
            </NavLink>
            <button
              onClick={handleSignOut}
              className="px-3 rounded-lg py-1 bg-blue-500 text-gray-50"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            {" "}
            <NavLink href={`/signin`} setIsNavOpen={setIsNavOpen}>
              Sign In
            </NavLink>
            <NavLink
              href={`/signup`}
              classNames="px-3 py-1 rounded-lg bg-blue-500"
              setIsNavOpen={setIsNavOpen}
            >
              Sign Up
            </NavLink>{" "}
          </>
        )}
        <ThemeSwitch />
      </nav>
    </>
  );
};
