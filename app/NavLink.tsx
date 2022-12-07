import Link from "next/link";
import React from "react";

export const NavLink = ({
  children,
  href,
  classNames
}: {
  children: React.ReactNode;
  href: string;
  classNames?: string;
}) => {
  return <Link href={href} className={classNames}>{children}</Link>;
};
