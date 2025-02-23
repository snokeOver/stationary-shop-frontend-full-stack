import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { ProductCard } from "../global/ProductCard";
import { IProduct } from "@/types";
import LoadingSection from "../global/LoadingSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = () => {
  const { data, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 6, // Fetch only 6 products for the featured section
  });

  const navigate = useNavigate();

  if (!data) return null;
  if (isLoading) return <LoadingSection />;

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((item: IProduct, index: number) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Button
          onClick={() => navigate("/all-products")} // Redirect to the All Products page
          className=" px-8 py-3 rounded-lg font-bold "
        >
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProduct;
