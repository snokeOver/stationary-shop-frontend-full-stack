import { Edit, Info, ShoppingCart } from "lucide-react";
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
import { CreateProductDialogue } from "@/pages/admin/CreateProductDialogue";

import { toast } from "sonner";
import PrimaryActionButton from "../shared/buttons/PrimaryActionButton";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import { useAppDispatch } from "@/hooks/useApp";
import { storeProduct } from "@/redux/features/product/productSlice";
import { useState } from "react";
import { ConfirmationDialogue } from "@/pages/admin/ConfirmationDialogue";
import PrimaryNavButton from "../shared/buttons/PrimaryNavButton";

type ProductCardProps = {
  product: IProduct;
  className?: string;
  isAdmin?: boolean;
  fetchData?: () => void;
};

export function ProductCard({
  product,
  className,
  isAdmin = false,
  fetchData,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { addProdctToCart } = useAddToCart();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  // State for confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Handle delete confirmation
  const handleDelete = async (productId: string) => {
    if (!productId) return toast("Product ID is missing!");
    if (!fetchData) return;

    const res = await deleteProduct(productId).unwrap();
    if (!res.status) return toast(`${product.name} deletion failed`);
    if (res.status) toast(`${product.name} deleted successfully`);
    fetchData();
    setIsDeleteDialogOpen(false); // Close the dialog after deletion
  };

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
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
        {isAdmin ? (
          <CreateProductDialogue editMode fetchData={fetchData!}>
            <div
              onClick={() => dispatch(storeProduct(product))}
              className="flex-1 flex flex-row gap-3 items-center px-3 bg-none border border-gray-300 rounded-md py-1.5"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </div>
          </CreateProductDialogue>
        ) : (
          <Button
            onClick={() => addProdctToCart(product._id)}
            variant="outline"
            className="flex-1"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
        {isAdmin ? (
          <>
            {/* Confirmation Dialog */}
            <ConfirmationDialogue
              isOpen={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
              onConfirm={() => handleDelete(product._id)}
              bodyText={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
              isLoading={isLoading}
            />
            {/* Delete Button */}
            <PrimaryNavButton
              btnText="Delete"
              onClick={() => setIsDeleteDialogOpen(true)}
            />
          </>
        ) : (
          <Button
            onClick={() => navigate(`/details?slug=${product._id}`)}
            className="flex-1"
          >
            <Info className="mr-2 h-4 w-4" />
            Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
