import { z } from "zod";
import { FilterableCoinsTable } from "./FilterableCoinsTable";
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

export const CoinsContainer = ({ market }: { market: CryptoData }) => {
  return <FilterableCoinsTable coins={market} />;
};
