import { Info, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types";
import { useNavigate } from "react-router-dom";
import useAddToCart from "@/hooks/useAddToCart";

type ProductCardProps = {
  product: IProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const { addProdctToCart } = useAddToCart();
  return (
    <Card className={cn("w-full  overflow-hidden", className)}>
      <CardHeader className="p-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          ${product.price}
        </p>
        <CardTitle className="text-sm font-medium mt-1">
          {product.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={() => addProdctToCart(product._id)}
          variant="outline"
          className="flex-1"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          onClick={() => navigate(`/details?slug=${product._id}`)}
          className="flex-1"
        >
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
