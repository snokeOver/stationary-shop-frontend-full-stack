import React, { useEffect, useState, FormEvent } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import PrimaryActionButton from "../shared/buttons/PrimaryActionButton";
import {
  useCreateInentMutation,
  useCreateOrderMutation,
} from "@/redux/features/order/orderApi";
import { ICartProduct } from "@/types";
import { useAppDispatch } from "@/hooks/useApp";

interface CheckoutFormProps {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: ICartProduct[];
  totalPrice: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  userInfo,
  items,
  totalPrice,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [createIntent, { isLoading: isIntentLoading }] =
    useCreateInentMutation();
  const [createOrder, { isLoading: orderCreateLoading }] =
    useCreateOrderMutation();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been initialized.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Card details are incomplete.");
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: card as StripeCardElement,
        });

      if (paymentMethodError) {
        setErrorMessage(
          paymentMethodError.message ||
            "An error occurred while processing your payment."
        );
        setLoading(false);
        return;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card as StripeCardElement,
            billing_details: {
              email: userInfo.email,
              name: userInfo.name,
            },
          },
        });

      if (confirmError) {
        setErrorMessage(
          confirmError.message ||
            "An error occurred while confirming your payment."
        );
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded; save payment details on the server
        await handleCreatePaymentDetails(paymentIntent.id);
        toast.success(`Payment of $${totalPrice} was successful!`);
        dispatch(clearCart());
        navigate("/dashboard/user");
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create payment intent when totalPrice > 0
  useEffect(() => {
    const createAPaymentIntent = async () => {
      try {
        const res = await createIntent({ amount: totalPrice }).unwrap();
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        setErrorMessage("Failed to create payment intent. Please try again.");
        console.error("Error creating payment intent:", error);
      }
    };

    createAPaymentIntent();
  }, [createIntent, totalPrice]);

  // Save payment details on the server
  const handleCreatePaymentDetails = async (txId: string) => {
    const orderData = {
      userInfo, // Use the userInfo passed as props
      paidAmount: totalPrice,
      txId: txId,
      orderItems: items,
      status: "Pending",
    };

    console.log("Order data:", orderData);

    try {
      const res = await createOrder(orderData).unwrap();
      // console.log("Order create res:", res);
      if (!res.success) return;
      if (res.data) {
        toast.success("Order created successfully!");
      }
    } catch (error) {
      setErrorMessage("Failed to create order. Please try again.");
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-300">Pay with Stripe</h2>
        <p className="text-gray-200">
          Complete your payment securely with Stripe.
        </p>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fbbf24", // Yellow-500 text color
                  "::placeholder": {
                    color: "#9ca3af", // Gray-400 placeholder color
                  },
                  iconColor: "#fbbf24", // Yellow-500 icon color
                },
                invalid: {
                  color: "#ef4444", // Red-500 for invalid input
                },
              },
              classes: {
                base: "bg-gray-700 p-3 rounded-lg border border-gray-600", // Custom container styling
                focus: "border-yellow-500 ring-2 ring-yellow-500", // Focus state
              },
            }}
          />
        </div>

        <PrimaryActionButton
          btnText={`Pay $${totalPrice} Now`}
          loadingText="Processing..."
          isLoading={loading}
          isDisable={!stripe || loading}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
