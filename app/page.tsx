import { Suspense } from "react";
import { Container } from "./Container";
import { TrendingCoins } from "./TrendingCoins";
import { CoinsContainer } from "./CoinsContainer";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default async function Home() {
  return (
    <Container>
      <Suspense fallback={<LoadingSkeleton />}>
        <TrendingCoins />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <CoinsContainer />
      </Suspense>
    </Container>
  );
}
