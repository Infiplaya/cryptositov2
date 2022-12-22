import { Suspense } from "react";
import { Container } from "./Components/Container";
import { TrendingCoins } from "./Components/TrendingCoins";
import { CoinsContainer } from "./Components/CoinsContainer";
import { LoadingSkeleton } from "./Components/LoadingSkeleton";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <TrendingCoins />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CoinsContainer />
      </Suspense>
    </>
  );
}
