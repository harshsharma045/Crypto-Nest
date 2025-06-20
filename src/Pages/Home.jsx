import { Suspense, lazy } from "react";

const Banner = lazy(() => import("../Components/Banner/Banner"));
const CoinsTable = lazy(() => import("../Components/CoinsTable/CoinsTable"));

function Home() {
  return (
    <div>
        <Banner />
      <Suspense fallback={<div>Loading Coins Table...</div>}>
        <CoinsTable />
      </Suspense>
    </div>
  );
}

export default Home;
