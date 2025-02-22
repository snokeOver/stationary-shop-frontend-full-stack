import { useLazyGetProductByIdQuery } from "@/redux/features/product/productApi";
import { useAppDispatch } from "@/hooks/useApp";
import { toast } from "sonner";
import { addToCart } from "@/redux/features/cart/cartSlice";

const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, error }] = useLazyGetProductByIdQuery();

  const addProdctToCart = async (productId: string) => {
    try {
      const result = await trigger(productId).unwrap();
      const product = result.data;

      const cartProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        purchaseQuantity: 1,
        availableQuantity: product.quantity,
        imageUrl: product.imageUrl,
      };

      dispatch(addToCart(cartProduct));
      toast(`${product.name} added`);
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  return { addProdctToCart, isLoading, error };
};

export default useAddToCart;
