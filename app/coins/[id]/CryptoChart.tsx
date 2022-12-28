"use client";
import { Sparklines, SparklinesLine } from "react-sparklines";

export const CryptoChart = (market_data: any) => {
  console.log(market_data);
  return (
    <div>
      <Sparklines data={market_data.sparkline_7d.price}>
        <SparklinesLine
          color={
            market_data && market_data?.price_change_percentage_24h > 0
              ? "#253e56"
              : "red"
          }
        />
      </Sparklines>
    </div>
  );
};
