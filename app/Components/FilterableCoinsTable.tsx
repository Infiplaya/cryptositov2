"use client";
import { useState } from "react";
import { CoinSearch } from "./CoinSearch";
import Pagination from "./Pagination";

export const FilterableCoinsTable = ({ coins }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = coins.slice(firstCoinIndex, lastCoinIndex);
  return (
    <>
      <CoinSearch coins={currentCoins} />
      <Pagination
        totalCoins={coins.length}
        coinsPerPage={coinsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};
