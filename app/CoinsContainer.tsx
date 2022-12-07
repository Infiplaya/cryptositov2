import { z } from "zod";
import { CoinSearch } from "./CoinSearch";
const cryptosResult = z.array(
  z.object({
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
  })
);
export type CryptoData = z.infer<typeof cryptosResult>;

async function getMarketData() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";
  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const coins: Promise<CryptoData> = await res.json();

  return coins;
}

export const CoinsContainer = async () => {
  const coins = await getMarketData();
  return <CoinSearch coins={coins} />;
};
