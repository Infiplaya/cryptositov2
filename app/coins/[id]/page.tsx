import { Suspense } from "react";
import { avoidRateLimit } from "../../../rateLimit";
import { getMarketData } from "../../Components/CoinsContainer";
import { Container } from "../../Components/Container";
import { LoadingSkeleton } from "../../Components/LoadingSkeleton";
import { CoinInfo } from "./CoinInfo";

export default async function CoinPage({ params }: any) {
  return (
    <>
      <Container>
        <Suspense fallback={<LoadingSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <CoinInfo id={params.id} />
        </Suspense>
      </Container>
    </>
  );
}

