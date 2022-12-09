"use client";

import { Container } from "./Container";
import { NavLink } from "./NavLink";
import ThemeSwitch from "./ThemeSwitch";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleNav() {
    setIsNavOpen((previous) => !previous);
  }
  return (
    <header className="p-4 bg-gray-50 dark:bg-gray-900 shadow-sm">
      <Container>
        <nav className="flex gap-5 text-sm font-semibold align-middle items-center">
          <NavLink
            href={`/`}
            classNames="text-2xl italic antialiased tracking-wide"
          >
            Cryptosito
          </NavLink>
          <NavLink href={`/account`} classNames="ml-auto hidden md:block">
            Profile
          </NavLink>
          <NavLink href={`/signin`} classNames="hidden md:block">
            Sign In
          </NavLink>
          <NavLink
            href={`/signup`}
            classNames="px-3 rounded-lg py-1 bg-blue-500 text-gray-50 hidden md:block"
          >
            Sign Up
          </NavLink>
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
          <NavLink href={`/account`}>Account</NavLink>
          <ThemeSwitch />
          <NavLink href={`/signin`}>Sign In</NavLink>
          <NavLink
            href={`/signup`}
            classNames="px-3 py-1 rounded-lg bg-blue-500"
          >
            Sign Up
          </NavLink>
        </nav>
      </Container>
    </header>
  );
};
