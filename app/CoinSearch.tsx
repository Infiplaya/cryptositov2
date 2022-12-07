"use client";

import Link from "next/link";
import { useState } from "react";
import { CoinItem } from "./CoinItem";
import { CryptoData } from "./page";

export function CoinSearch({ coins }: { coins: CryptoData }) {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold">Search Cryptos</h3>
        <form className="mt-2">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search a coin"
            className="py-1 px-3 rounded-lg w-full md:w-64 shadow-md"
          />
        </form>
      </div>

      <table className="mt-10 w-full border-collapse text-center">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th></th>
            <th className="px-4 py-3">#</th>
            <th className="text-left">Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th className="hidden md:table-cell">Market Cap</th>
            <th className="hidden sm:table-cell">Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((val) => {
              if (searchText === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return val;
              }
            })
            .map((coin) => (
              <CoinItem coin={coin} key={coin.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
