import { useSelector } from "react-redux";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import HowItWorks from "./HowItWorks";
import CTABanner from "./CtaBanner";
import HomeFooter from "./HomeFooter";
import HomeSkeletonLoader from "../../utils/HomeSkeletonLoader";

const Home = () => {
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  if (!authChecked || loading) return <HomeSkeletonLoader />;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans overflow-x-hidden">
      <HeroSection user={user} />
      <FeatureSection />
      <HowItWorks />
      <CTABanner user={user} />
      <HomeFooter />
    </div>
  );
};

export default Home;