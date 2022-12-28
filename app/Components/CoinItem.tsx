"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const coinSchema = z.object({
  market_cap_rank: z.number(),
  name: z.string(),
  symbol: z.string(),
  id: z.string(),
  image: z.string(),
  current_price: z.number(),
  price_change_percentage_24h: z.number(),
  market_cap: z.number(),
  total_volume: z.number(),
  circulating_supply: z.number(),
  sparkline_in_7d: z.object({
    price: z.array(z.number()),
  }),
});

type Coin = z.infer<typeof coinSchema>;

export const CoinItem = ({ coin }: { coin: Coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);

  const { user } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("you must be signed in");
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="py-4 px-6" onClick={saveCoin}>
        <FontAwesomeIcon
          icon={savedCoin ? faStar : outlineStar}
          cursor={`pointer`}
        />
      </td>
      <td className="py-4 px-6">{coin.market_cap_rank}</td>
      <td className="py-4 px-6">
        <Link href={`/coins/${coin.id}`}>
          <div className="flex items-center gap-1">
            <Image
              className="w-6 mr-2 rounded-full"
              alt="coin-image"
              src={coin.image}
              width={20}
              height={20}
            />
            <p className="hidden sm:table-cell text-gray-800 dark:text-gray-100">
              {coin.name}
            </p>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </Link>
      </td>
      <td className="py-4 px-6">${coin.current_price.toLocaleString()}</td>
      <td
        className={`${
          coin.price_change_percentage_24h > 0
            ? "text-green-500"
            : "text-red-500"
        } py-4 px-6`}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="py-4 px-6 hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="py-4 px-6 hidden md:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color={coin.price_change_percentage_24h > 0 ? "green" : "red"}/>
        </Sparklines>
      </td>
    </tr>
  );
};
