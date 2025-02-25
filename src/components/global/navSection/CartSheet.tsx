import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCartSelector } from "@/hooks/useApp";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

import { CheckoutSection } from "@/components/cart/CheckoutSection";
import { CartSection } from "@/components/cart/CartSectiont";

export function CartSheet() {
  const { items } = useCartSelector();
  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.purchaseQuantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handleGoBack = () => {
    setIsCheckout(false);
  };

  // const handlePlaceOrder = (userInfo: {
  //   name: string;
  //   email: string;
  //   phone: string;
  //   address: string;
  // }) => {
  //   // Submit order logic (e.g., API call)
  //   toast.success("Order placed successfully!");
  //   setIsCheckout(false);
  // };

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
        <DialogTitle>{isCheckout ? "Checkout" : "Your Cart"}</DialogTitle>
        <DialogDescription />

        {isCheckout ? (
          <CheckoutSection
            items={items}
            totalPrice={totalPrice}
            onGoBack={handleGoBack}
            // onPlaceOrder={handlePlaceOrder}
          />
        ) : (
          <CartSection
            items={items}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
