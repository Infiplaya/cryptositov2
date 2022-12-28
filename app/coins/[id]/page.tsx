import { Suspense } from "react";
import { getMarketData } from "../../Components/CoinsContainer";
import { LoadingSkeleton } from "../../Components/LoadingSkeleton";
import { CoinInfo } from "./CoinInfo";

export default async function CoinPage({ params }: any) {
  const {id} = params.id
  console.log(id)

  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CoinInfo id={params.id} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const coins = await getMarketData();
  console.log(coins)
  
  return coins.map((coin) => ({
    id: coin.id,
  }));
}
