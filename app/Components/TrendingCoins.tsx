import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { CryptoData } from "./CoinsContainer";

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

export const TrendingCoins = ({ trending }: { trending: TrendingCoins }) => {
  return (
    <div className="my-2 md:my-12">
      <h1 className="text-2xl font-bold mb-2">Trending Coins</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.coins.map((coin) => (
          <Link href={`/coins/${coin.item.id}`} key={coin.item.id}>
            <div className="flex justify-between p-4 hover:scale-105 ease-in-out duration-300 shadow-md">
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
                <div className="flex items-center gap-2">
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
          </Link>
        ))}
      </div>
    </div>
  );
};
