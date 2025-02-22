import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ICartProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { checkoutSchema } from "@/schemas";
import PrimaryActionButton from "../shared/buttons/PrimaryActionButton";
import { useAuthSelector } from "@/hooks/useApp";
import CheckoutForm from "../form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

interface CheckoutSectionProps {
  items: ICartProduct[];
  totalPrice: number;
  onGoBack: () => void;
}

export function CheckoutSection({
  items,
  totalPrice,
  onGoBack,
}: CheckoutSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null>(null); // State to store user information

  const { user } = useAuthSelector();
  const pk_key = import.meta.env.VITE_STRIPE_PK;
  const stripePromise = loadStripe(pk_key);

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    setIsLoading(true);
    try {
      // Store user information in state
      setUserInfo({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

      // Show the CheckoutForm after placing the order
      setShowCheckoutForm(true);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      void error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showCheckoutForm && userInfo ? (
        // Render the CheckoutForm component with userInfo
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userInfo={userInfo}
            items={items}
            totalPrice={totalPrice}
          />
        </Elements>
      ) : (
        // Render the User Information Form
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className="placeholder:text-white/50 text-white/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="placeholder:text-white/50 text-white/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="placeholder:text-white/50 text-white/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        className="placeholder:text-white/50 text-white/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Order Summary</h3>
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm">
                      {item.name} (x{item.purchaseQuantity})
                    </p>
                    <p className="text-sm font-bold">
                      ${(item.price * item.purchaseQuantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons (Fixed at the Bottom) */}
            <div className="border-t pt-4">
              <div className="flex flex-col gap-2">
                <PrimaryActionButton
                  btnText="Checkout Now"
                  loadingText="Processing..."
                  isLoading={isLoading}
                  type="submit"
                />

                <Button
                  variant="outline"
                  onClick={onGoBack}
                  disabled={isLoading}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
