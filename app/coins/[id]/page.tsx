import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { Container } from "../../Container";

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
  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const coinInfo: Promise<Coin> = await res.json();

  return coinInfo;
}

export default async function CoinPage({ params }: any) {
  const coinInfo = await getCoin(params.id);
  return (
    <>
      <Container>
        <div>
          <Image
            src={coinInfo.image.large}
            alt="coin-image"
            width={100}
            height={100}
          ></Image>
          <div>
            <p>{coinInfo.name} price</p>
            <p>{coinInfo.symbol.toUpperCase()} / USD</p>
            <Link href={coinInfo.links.homepage[0]}>
              {coinInfo.links.homepage[0]}
            </Link>
          </div>
        </div>
        <div>
          <div>
            <div>
              {coinInfo.market_data?.current_price.usd ? (
                <p>{coinInfo.market_data.current_price.usd.toLocaleString()}</p>
              ) : null}
              <p>7 day</p>
            </div>
            <div>
              <p>Market Cap</p>
              {coinInfo.market_data?.market_cap ? (
                <p>${coinInfo.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p>Volume 24h</p>
              {coinInfo.market_data?.total_volume ? (
                <p>
                  ${coinInfo.market_data.total_volume.usd?.toLocaleString()}
                </p>
              ) : null}
            </div>
            <div>
              <div>
                <p>24 High</p>
                {coinInfo.market_data?.high_24h ? (
                  <p>{coinInfo.market_data.high_24h.usd?.toLocaleString()}</p>
                ) : null}
              </div>
              <div>
                <p>24 low</p>
                {coinInfo.market_data?.low_24h ? (
                  <p>{coinInfo.market_data.low_24h.usd?.toLocaleString()}</p>
                ) : null}
              </div>
              <div>
                <p>Circulating supply</p>
                {coinInfo.market_data?.circulating_supply ? (
                  <p>{coinInfo.market_data.circulating_supply}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <p>Price Change 24h</p>
            {coinInfo.market_data?.price_change_percentage_24h.toFixed(2)}
          </div>
          <div>
            <p>Price Change 7d</p>
            {coinInfo.market_data?.price_change_percentage_7d.toFixed(2)}
          </div>
          <div>
            <p>Price Change 14d</p>
            {coinInfo.market_data?.price_change_percentage_14d.toFixed(2)}
          </div>
        </div>
        <section>
          <p>About {coinInfo.name}</p>
          <p>{coinInfo.description.en}</p>
        </section>
      </Container>
    </>
  );
}
