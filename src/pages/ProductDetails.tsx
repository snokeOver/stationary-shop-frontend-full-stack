import { useLocation, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import LoadingSection from "@/components/global/LoadingSection";
import { Button } from "@/components/ui/button"; // Import shadcn Button
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"; // Import shadcn Card components
import { ArrowLeft, ShoppingCart } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slug = queryParams.get("slug");
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductByIdQuery(slug);

  if (isLoading) return <LoadingSection />;
  if (error) return <div>Error loading product details</div>;
  if (!data) return <div>Product not found</div>;

  const {
    _id,
    name,
    brand,
    imageUrl,
    price,
    category,
    description,
    quantity,
    inStock,
  } = data.data;

  return (
    <div className="max-w-7xl mx-auto p-3 md:p-6   text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="mb-5 ">
        <ArrowLeft
          onClick={() => navigate("/")}
          className="rounded-full border cursor-pointer bg-yellow-400 p-1 text-black font-semibold"
        />
      </div>
      {/* Product Details Section */}
      <Card className="bg-gray-50 dark:bg-gray-800 shadow-lg">
        <CardContent className="flex flex-col md:flex-row gap-6 md:gap-12 p-6">
          {/* Left: Product Image */}
          <div className="flex-1">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-md transition-transform hover:scale-105"
            />
          </div>

          {/* Right: Product Information */}
          <div className="flex-1 flex flex-col space-y-6  justify-center  ">
            <CardTitle className="text-4xl font-bold">{name}</CardTitle>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Brand: {brand}
            </p>

            <div className="space-y-4">
              <p className="text-2xl font-semibold text-yellow-500 ">
                ${price.toFixed(2)}{" "}
                <span className="text-sm text-gray-400">per piece</span>
              </p>
              <p className="text-md text-gray-700 dark:text-gray-300">
                Category: {category}
              </p>
              <p
                className={`text-sm font-semibold ${
                  inStock
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quantity Available:
                <span className="font-semibold"> {quantity}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <CardFooter className="flex gap-2">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
