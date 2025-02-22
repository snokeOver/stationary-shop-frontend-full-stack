import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { ProductCard } from "../global/ProductCard";
import { IProduct } from "@/types";
import LoadingSection from "../global/LoadingSection";

const ProductSection = () => {
  const { data, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 2,
  });

  if (!data) return null;
  if (isLoading) return <LoadingSection />;
  return (
    <div className="grid grid-cols-1 gap-3 items-center justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
      {data.data.map((item: IProduct, index: number) => (
        <ProductCard product={item} key={index} />
      ))}
    </div>
  );
};

export default ProductSection;
