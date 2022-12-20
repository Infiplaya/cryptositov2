"use client";

import Link from "next/link";
import { MouseEventHandler, useCallback, useState } from "react";
import { CoinItem } from "./CoinItem";
import { CryptoData } from "./CoinsContainer";

type Data = CryptoData;

type SortKeys = keyof Data[0];

type SortOrder = "ascn" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: SortKeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick}>
      {sortKey === columnKey && sortOrder === "desc" ? "▼" : "▲"}
    </button>
  );
}

export function CoinSearch({ coins }: { coins: CryptoData }) {
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKeys>("market_cap_rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

  function hideRows(key:string) {
    if (key === "total_volume" || key === "market_cap") {
      return "hidden md:table-cell"
    } else {
      return;
    }
  }

  const headers: { key: SortKeys; label: string }[] = [
    { key: "market_cap_rank", label: "#" },
    { key: "name", label: "Coin" },
    { key: "current_price", label: "Price" },
    { key: "price_change_percentage_24h", label: "24h %" },
    { key: "total_volume", label: "Volume 24h" },
    { key: "market_cap", label: "Market Cap" },
  ];

  const sortedCoins = useCallback(
    () =>
      sortData({ tableData: coins, sortKey, reverse: sortOrder === "desc" }),
    [coins, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-2">Search Cryptos</h3>
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
          <tr>
            <td></td>
            {headers.map((row) => {
              return (
                <td key={row.key} className={hideRows(row.key)}>
                  {row.label}{" "}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedCoins()
            .filter((val: any) => {
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
