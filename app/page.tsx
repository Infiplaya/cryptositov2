import { TrendingCoins } from "./Components/TrendingCoins";
import { CoinsContainer, CryptoData } from "./Components/CoinsContainer";

async function getTrendingData() {
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const res = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const trendingCoins: Promise<TrendingCoins> = await res.json();

  return trendingCoins;
}

export async function getMarketData() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true";
  const res = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const coins: Promise<CryptoData> = await res.json();

  return coins;
}

export default async function Home() {
  const trendingData = getTrendingData();
  const marketData = getMarketData();

  const [trending, market] = await Promise.all([trendingData, marketData]);

  return (
    <>
      <TrendingCoins trending={trending} />
      <CoinsContainer market={market}/>
    </>
  );
}
