import { Suspense } from "react";
import { LoadingSkeleton } from "../../Components/LoadingSkeleton";
import { CoinInfo } from "./CoinInfo";

export default async function CoinPage({ params }: any) {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <CoinInfo id={params.id} />
      </Suspense>
    </>
  );
}
