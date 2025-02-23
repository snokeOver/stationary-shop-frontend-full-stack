import BannerSection from "@/components/home/BannerSection";
import FeaturedProduct from "@/components/home/ProductSection";

import TestimonialSection from "@/components/home/TestimonialSection";

const Home = () => {
  return (
    <div>
      <BannerSection />
      <div className="max-w-7xl mx-auto px-3 mb-5 md:mb-10">
        <FeaturedProduct />
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
