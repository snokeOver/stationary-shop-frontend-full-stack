import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartSelector, useAppDispatch } from "@/hooks/useApp";
import {
  updateQuantity,
  clearCart,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { ICartProduct } from "@/types";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function CartSheet() {
  const { items } = useCartSelector();
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

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.purchaseQuantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="cursor-pointer hover:text-yellow-500" />
          {items.length > 0 && (
            <div
              className={`absolute flex items-center justify-center rounded-full bg-yellow-500 font-medium text-black ${
                items.length > 9
                  ? "-right-2 -top-3 h-6 w-6 text-xs"
                  : "-right-2 -top-2 h-5 w-5 text-[13px]"
              }`}
            >
              <span>{items.length}</span>
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col py-6 px-2">
        <DialogTitle>Your Cart</DialogTitle>
        <DialogDescription />

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

                  <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between items-center">
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
                        disabled={
                          item.purchaseQuantity >= item.availableQuantity
                        }
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-sm font-bold">
                      ${(item.price * item.purchaseQuantity).toFixed(2)}
                    </div>
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

        {/* Total Price, Clear Cart, and Checkout Buttons */}
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                Clear Cart
              </Button>
              <Button className="w-full" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
