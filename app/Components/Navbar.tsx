"use client";

import { Container } from "./Container";
import { NavLink } from "./NavLink";
import ThemeSwitch from "./ThemeSwitch";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const Navbar = () => {
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
    <header className="bg-gray-50 dark:bg-gray-900 shadow-sm">
      <Container>
        <nav className="flex gap-5 text-sm font-semibold align-middle items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <NavLink
            href={`/`}
            classNames="text-2xl italic antialiased tracking-wide mr-auto"
          >
            Cryptosito
          </NavLink>
          {user?.email ? (
            <>
              <NavLink href={`/account`} classNames="hidden md:block">
                Account
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
              <NavLink href={`/signin`} classNames="hidden md:block">
                Sign In
              </NavLink>
              <NavLink
                href={`/signup`}
                classNames="px-3 rounded-lg py-1 bg-blue-500 text-gray-50 hidden md:block"
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
        {/* mobile nav */}
        <nav
          className={
            isNavOpen
              ? "flex flex-col space-y-3 items-center w-full h-full z-10 md:hidden p-4"
              : "hidden"
          }
        >
          <NavLink href={`/`}>Home</NavLink>
          {user ? (
            <NavLink href={`/account`}>Account</NavLink>
          ) : (
            <>
              {" "}
              <NavLink href={`/signin`}>Sign In</NavLink>
              <NavLink
                href={`/signup`}
                classNames="px-3 py-1 rounded-lg bg-blue-500"
              >
                Sign Up
              </NavLink>{" "}
            </>
          )}
          <ThemeSwitch />
        </nav>
      </Container>
    </header>
  );
};
