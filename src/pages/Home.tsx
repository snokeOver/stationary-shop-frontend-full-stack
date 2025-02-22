import ProductSection from "@/components/home/ProductSection";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <Button variant="outline">Show Toast</Button>
      <div className="max-w-7xl mx-auto px-3">
        <ProductSection />
      </div>
    </div>
  );
};

export default Home;
