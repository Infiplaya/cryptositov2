import Image from "next/image";
import { z } from "zod";

const TrendingsResult = z.object({
  coins: z.array(
    z.object({
      item: z.object({
        id: z.string(),
        large: z.string(),
        name: z.string(),
        symbol: z.string(),
        price_btc: z.number(),
      }),
    })
  ),
});
export type TrendingCoins = z.infer<typeof TrendingsResult>;

async function getTrendingData() {
  const url = "https://api.coingecko.com/api/v3/search/trending";
  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const trendingCoins: Promise<TrendingCoins> = await res.json();

  return trendingCoins;
}

export const TrendingCoins = async () => {
  const trendingCoins = await getTrendingData();
  return (
    <div className="my-12 py-8">
      <h1 className="text-2xl font-bold">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingCoins.coins.map((coin) => (
          <div
            key={coin.item.id}
            className="flex justify-between p-4 hover:scale-105 ease-in-out duration-300 shadow-md"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <Image
                  src={coin.item.large}
                  alt="coin-img"
                  width={50}
                  height={50}
                  className="mr-4 rounded-full"
                ></Image>
                <div>
                  <p className="font-bold">{coin.item.name}</p>
                  <p>{coin.item.symbol}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  src={`https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`}
                  alt="bitcoin-img"
                  width={100}
                  height={100}
                  className="w-4"
                ></Image>
                <p>{coin.item.price_btc.toFixed(7)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
