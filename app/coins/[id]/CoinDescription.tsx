"use client";
import { useState } from "react";

export function CoinDescription({
  description,
  name,
}: {
  description: string;
  name: string;
}) {
  const [showMore, setShowMore] = useState(false);

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + "...";
  }

  console.log(description.length);

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
      {description.length > 290 && (
        <button
          className="py-3 bg-gray-500/20 w-full font-bold text-gray-200 rounded-lg mt-5"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <p className="text-gray-600 dark:text-gray-200">
            {showMore ? "Show less" : "Show more"}
          </p>
        </button>
      )}
    </section>
  );
}
