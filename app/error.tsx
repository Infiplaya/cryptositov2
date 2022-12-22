"use client";

import { useEffect } from "react";
import { Container } from "./Components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container>
      <p className="text-xl font-bold">Something went wrong!</p>
      <button onClick={() => reset()} className="bg-blue-500 p-2 rounded-lg">
        Reset error boundary
      </button>
    </Container>
  );
}
