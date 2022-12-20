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
  const deleteCoin = async (passedid:string) => {
    try {
      const result = coins.filter((coin:any) => coin.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {coins.length === 0 ? (
        <p>Don&apos;t have any coins</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Coin</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin:any) => (
              <tr key={coin.id}>
                <td>{coin?.rank}</td>
                <td>
                  <Link href={`/coins/${coin.id}`}>
                    <Image
                      src={coin.image}
                      alt="coin"
                      width={100}
                      height={100}
                    ></Image>
                    <p>{coin.name}</p>
                    <p>{coin.symbol}</p>
                  </Link>
                </td>
                <td>
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
      )}
    </div>
  );
}
