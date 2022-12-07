import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";

const coinSchema = z.object({
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
});

type Coin = z.infer<typeof coinSchema>;

export const CoinItem = ({ coin }: { coin: Coin }) => {
  return (
    <tr className="h-[80px] border-b dark:border-gray-700 overflow-hidden">
        <td>
          <FontAwesomeIcon icon={outlineStar} />
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
          <div className="flex items-center">
            <Image
              className="w-6 mr-2 rounded-full"
              alt="coin-image"
              src={coin.image}
              width={20}
              height={20}
            />
            <p className="hidden sm:table-cell">
              {coin.name} {coin.symbol.toUpperCase()}
            </p>
          </div>
        </td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td
          className={
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td className="w-[180px] hidden md:table-cell">
          ${coin.total_volume.toLocaleString()}
        </td>
        <td className="w-[180px] hidden md:table-cell">
          ${coin.market_cap.toLocaleString()}
        </td>
    </tr>
  );
};
