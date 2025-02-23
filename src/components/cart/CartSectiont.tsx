import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { ICartProduct } from "@/types";
import { useAppDispatch } from "@/hooks/useApp";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

interface CartSectionProps {
  items: ICartProduct[];
  totalPrice: number;
  onCheckout: () => void;
}

export function CartSection({
  items,
  totalPrice,
  onCheckout,
}: CartSectionProps) {
  const dispatch = useAppDispatch();

  const handleIncrease = (item: ICartProduct) => {
    if (item.purchaseQuantity < item.availableQuantity) {
      dispatch(
        updateQuantity({
          _id: item._id,
          purchaseQuantity: item.purchaseQuantity + 1,
        })
      );
    } else {
      toast("Reached available quantity");
    }
  };

  const handleDecrease = (item: ICartProduct) => {
    if (item.purchaseQuantity > 1) {
      dispatch(
        updateQuantity({
          _id: item._id,
          purchaseQuantity: item.purchaseQuantity - 1,
        })
      );
    } else {
      toast("Minimum quantity reached");
    }
  };

  const handleDeleteItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Product Details Cards */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
            <p className="text-lg text-gray-500">Your cart is empty.</p>
            <p className="text-sm text-gray-400">
              Add some items to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 relative"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Available: {item.availableQuantity}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecrease(item)}
                    disabled={item.purchaseQuantity <= 1}
                    className="w-8 h-8 p-0"
                  >
                    –
                  </Button>
                  <span className="text-sm">{item.purchaseQuantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleIncrease(item)}
                    disabled={item.purchaseQuantity >= item.availableQuantity}
                    className="w-8 h-8 p-0"
                  >
                    +
                  </Button>
                </div>

                {/* Subtotal */}
                <div className="text-sm font-bold">
                  ${(item.price * item.purchaseQuantity).toFixed(2)}
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-white hover:text-red-600 absolute top-0 right-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons (Clear Cart and Proceed to Checkout) */}
      {items.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={onCheckout}>
              Next
            </Button>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
