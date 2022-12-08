"use client";
import { useState } from "react";

function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

export function CoinDescription({
  description,
  name,
}: {
  description: string;
  name: string;
}) {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="mt-5">
      <p className="text-2xl font-bold">About {name}</p>
      {showMore ? (
        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="mt-5"
        ></p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: truncateString(description, 290),
          }}
          className="mt-5"
        ></p>
      )}
      <button
        className="py-3 bg-gradient-to-t from-transparent via-gray-900 to-transparent w-full font-bold text-gray-200 rounded-lg"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Show less" : "Show more"}
      </button>
    </section>
  );
}
