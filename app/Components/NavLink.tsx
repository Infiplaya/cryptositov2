"use client";

import Link from "next/link";
import React from "react";

export const NavLink = ({
  children,
  href,
  classNames,
  setIsNavOpen,
}: {
  children: React.ReactNode;
  href: string;
  classNames?: string;
  setIsNavOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  function handleNav() {
    setIsNavOpen((previous) => !previous);
  }
  return (
    <Link href={href} className={classNames} onClick={handleNav}>
      {children}
    </Link>
  );
};
