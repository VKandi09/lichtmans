import { useState, useEffect } from "react";
import Hero from "./Hero";
import Featured from "./Featured";
import BestSellers from './BestSellers';
import AgeVerificationModal from "../components/AgeVerification";

const Home = () => {
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setAgeVerified(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <main
        className={`flex-1 transition-all duration-500 ${
          !ageVerified ? "pointer-events-none select-none blur-sm" : ""
        }`}
      >
        <Hero />
        <Featured />
        {/* <NewArrivals /> */}
        <BestSellers />
      </main>

      {/* Age Verification Modal */}
      {!ageVerified && <AgeVerificationModal onVerified={setAgeVerified} />}
    </div>
  );
};

export default Home;
