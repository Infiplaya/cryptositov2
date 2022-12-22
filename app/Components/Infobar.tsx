import { z } from "zod";

const GlobalResult = z.object({
  data: z.object({
    total_market_cap: z.object({
      usd: z.number(),
    }),
    market_cap_change_percentage_24h_usd: z.number(),
    total_volume: z.object({
      usd: z.number(),
    }),
    market_cap_percentage: z.object({
      btc: z.number(),
      eth: z.number(),
    }),
    active_cryptocurrencies: z.number(),
    markets: z.number(),
  }),
});
type GlobalData = z.infer<typeof GlobalResult>;

async function getData() {
  const res = await fetch("https://api.coingecko.com/api/v3/global", {
    next: { revalidate: 60 * 60 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const globalData: Promise<GlobalData> = await res.json();
  return globalData;
}

export const Infobar = async () => {
  const { data: globalData } = await getData();

  return (
    <nav className="overflow-x-auto border-b border-gray-300 dark:border-gray-800 hidden md:flex">
      <ul className="flex gap-3 text-sm font-semibold align-middle items-center p-4 border-b border-gray-200 md:border-none dark:border-gray-700 text-gray-700 dark:text-gray-300">
        <li className="text-blue-500 font-bold">
          Active Currencies:{" "}
          <span className="text-gray-800 dark:text-gray-200 font-base">
            {globalData.active_cryptocurrencies}
          </span>
        </li>
        <li className="text-blue-500 font-bold">
          Markets:{" "}
          <span className="text-gray-800 dark:text-gray-200 font-base">
            {globalData.markets}
          </span>
        </li>
        <li className="text-blue-500 font-bold">
          Market Change:{" "}
          <span className="text-gray-800 dark:text-gray-200 font-base">
            {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </span>
        </li>
        <li className="text-blue-500 font-bold">
          BTC:{" "}
          <span className="text-gray-800 dark:text-gray-200 font-base">
            {globalData.market_cap_percentage.btc.toFixed(2)}%
          </span>
        </li>
        <li className="text-blue-500 font-bold">
          ETH:{" "}
          <span className="text-gray-800 dark:text-gray-200 font-base">
            {globalData.market_cap_percentage.eth.toFixed(2)}%
          </span>
        </li>
      </ul>
    </nav>
  );
};
