"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export function Watchlist() {
  const [coins, setCoins] = useState<any>([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList);
    });
  }, [user?.email]);

  const coinPath = doc(db, "users", `${user?.email}`);
  const deleteCoin = async (passedid: string) => {
    try {
      const result = coins.filter((coin: any) => coin.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {coins.length === 0 ? (
        <p>Don&apos;t have any coins</p>
      ) : (
        <div className="overflow-x-auto relative mt-5">
          <table className="w-full text-sm text-left text-gray-500 font-semibold dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Coin</th>
                <th className="py-3 px-6">Remove</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin: any) => (
                <tr
                  key={coin.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{coin?.rank}</td>
                  <td className="py-4 px-6">
                    <Link
                      href={`/coins/${coin.id}`}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src={coin.image}
                        className="w-6 mr-2 rounded-full"
                        alt="coin"
                        width={20}
                        height={20}
                      ></Image>
                      <p>{coin.name}</p>
                      <p>{coin.symbol.toUpperCase()}</p>
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <FontAwesomeIcon
                      icon={faClose}
                      onClick={() => deleteCoin(coin.id)}
                      cursor={`pointer`}
                    ></FontAwesomeIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
