import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { CoinDescription } from "./CoinDescription";

const CoinResults = z.object({
  name: z.string(),
  image: z.object({
    large: z.string(),
  }),
  symbol: z.string(),
  market_cap_rank: z.number().nullable(),
  links: z.object({
    homepage: z.array(z.string()),
  }),
  market_data: z
    .object({
      current_price: z.object({
        usd: z.number(),
      }),
      price_change_percentage_24h: z.number(),
      price_change_percentage_7d: z.number(),
      price_change_percentage_14d: z.number(),
      market_cap: z.object({
        usd: z.number(),
      }),
      high_24h: z.object({
        usd: z.number().optional(),
      }),
      low_24h: z.object({
        usd: z.number().optional(),
      }),
      fully_diluted_valuation: z.object({
        usd: z.number().optional(),
      }),
      total_volume: z.object({
        usd: z.number().optional(),
      }),
      circulating_supply: z.number(),
    })
    .optional()
    .nullable(),
  description: z.object({
    en: z.string(),
  }),
});
export type Coin = z.infer<typeof CoinResults>;

async function getCoin(id: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false`;
  const res = await fetch(url, { cache: 'force-cache' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const coinInfo: Promise<Coin> = await res.json();

  return coinInfo;
}

export async function CoinInfo({ id }: {id: string}) {
  const coinInfo = await getCoin(id);
  return (
    <>
      <div className="mt-10 flex py-8">
        <Image
          src={coinInfo.image.large}
          alt="coin-image"
          width={100}
          height={100}
          className="rounded-full w-20 mr-8"
        ></Image>
        <div>
          <p className="text-3xl font-bold">{coinInfo.name}</p>
          <p>{coinInfo.symbol.toUpperCase()} / USD</p>
          <Link href={coinInfo.links.homepage[0]}>
            {coinInfo.links.homepage[0]}
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div>
            {coinInfo.market_data?.current_price.usd ? (
              <p className="text-3xl font-bold">
                Price: $
                {coinInfo.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
          </div>
          <div className="p-3 shadow-md mt-5 dark:shadow-gray-700 rounded-lg">
            <p className="text-xl font-bold">Market Cap</p>
            {coinInfo.market_data?.market_cap ? (
              <p>${coinInfo.market_data.market_cap.usd.toLocaleString()}</p>
            ) : null}
          </div>
          <div className="p-3 shadow-md mt-5 dark:shadow-gray-700 rounded-lg">
            <p className="text-xl font-bold">Volume 24h</p>
            {coinInfo.market_data?.total_volume ? (
              <p>${coinInfo.market_data.total_volume.usd?.toLocaleString()}</p>
            ) : null}
          </div>
          <div className="flex gap-5 p-3 shadow-md dark:shadow-gray-700 mt-5 rounded-lg">
            <div className="border-r-2 dark:border-gray-700  p-3">
              <p className="text-xl font-bold">24 High</p>
              {coinInfo.market_data?.high_24h ? (
                <p>{coinInfo.market_data.high_24h.usd?.toLocaleString()}</p>
              ) : null}
            </div>
            <div className="border-r-2 dark:border-gray-700 p-3">
              <p className="text-xl font-bold">24 low</p>
              {coinInfo.market_data?.low_24h ? (
                <p>{coinInfo.market_data.low_24h.usd?.toLocaleString()}</p>
              ) : null}
            </div>
            <div className="p-3">
              <p className="text-xl font-bold">Circulating supply</p>
              {coinInfo.market_data?.circulating_supply ? (
                <p>{coinInfo.market_data.circulating_supply}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <div className="p-3 shadow-md dark:shadow-gray-700 rounded-lg">
            <p className="text-xl font-bold">Price Change 24h</p>
            <p
              className={
                coinInfo.market_data?.price_change_percentage_24h! > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coinInfo.market_data?.price_change_percentage_24h.toFixed(2)}
            </p>
          </div>
          <div className="p-3 shadow-md dark:shadow-gray-700 rounded-lg">
            <p className="text-xl font-bold">Price Change 7d</p>
            <p
              className={
                coinInfo.market_data?.price_change_percentage_7d! > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coinInfo.market_data?.price_change_percentage_7d.toFixed(2)}
            </p>
          </div>
          <div className="p-3 shadow-md dark:shadow-gray-700 rounded-lg">
            <p className="text-xl font-bold">Price Change 14d</p>
            <p
              className={
                coinInfo.market_data?.price_change_percentage_14d! > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {coinInfo.market_data?.price_change_percentage_14d.toFixed(2)}
            </p>
          </div>
        </div>
        <CoinDescription
          name={coinInfo.name}
          description={coinInfo.description.en}
        />
      </div>
    </>
  );
}
