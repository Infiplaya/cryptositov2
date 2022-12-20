"use client";

import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "./context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeProvider>
  );
}
