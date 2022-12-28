"use client";
import { useState } from "react";
import { CoinSearch } from "./CoinSearch";
import Pagination from "./Pagination";

export const FilterableCoinsTable = ({ coins }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(20);

  const handleCoinsPerPageChange = (event: any) => {
    setCoinsPerPage(event.target.value);
  };

  const lastCoinIndex = currentPage * coinsPerPage;
  const firstCoinIndex = lastCoinIndex - coinsPerPage;
  const currentCoins = coins.slice(firstCoinIndex, lastCoinIndex);
  return (
    <>
      <CoinSearch coins={currentCoins} />
      <div className="flex w-full justify-between">
        <Pagination
          totalCoins={coins.length}
          coinsPerPage={coinsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <div className="p-2">
          <p>Show rows:</p>
          <select onChange={handleCoinsPerPageChange} value={coinsPerPage} className="w-36 p-2 rounded-lg">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </>
  );
};
