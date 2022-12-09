import { Suspense } from "react";
import { Container } from "./Components/Container";
import { TrendingCoins } from "./Components/TrendingCoins";
import { CoinsContainer } from "./Components/CoinsContainer";
import { LoadingSkeleton } from "./Components/LoadingSkeleton";

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
