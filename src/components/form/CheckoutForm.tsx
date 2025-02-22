import React, { useEffect, useState, FormEvent } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

import "./CheckFormStayles.css";
import {
  useAppDispatch,
  useAuthSelector,
  useCartSelector,
} from "@/hooks/useApp";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import PrimaryActionButton from "../shared/buttons/PrimaryActionButton";
import {
  useCreateInentMutation,
  useCreateOrderMutation,
} from "@/redux/features/order/orderApi";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { user } = useAuthSelector();
  const { items, totalPrice } = useCartSelector();

  const [createIntent, { isLoading: isIntentLoading }] =
    useCreateInentMutation();
  const [createOrder, { isLoading: orderCreateLoading }] =
    useCreateOrderMutation();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card as StripeCardElement,
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      console.error(error);
      setLoading(false);
      return;
    } else {
      console.log("Payment Method:", paymentMethod);
      setErrorMessage("");
    }
    if (!user) return;
    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card as StripeCardElement,
          billing_details: {
            email: user.email,
            name: user.name,
          },
        },
      });

    if (confirmError) {
      console.error("Confirm Error:", confirmError);
      setLoading(false);
    } else {
      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded; save payment details on the server
        handleCreatePaymentDetils(paymentIntent.id);
      } else {
        setLoading(false);
      }
    }
  };

  // Create payment intent when currAmount > 0 and userDetails exist
  useEffect(() => {
    const createAPaymentIntent = async () => {
      const postData = { amount: totalPrice };
      try {
        const res = await createIntent(postData).unwrap();

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    if (user && totalPrice > 0) {
      createAPaymentIntent();
    }
  }, [createIntent, totalPrice, user]);

  // Create payment details on successful payment
  const handleCreatePaymentDetils = async (txId: string) => {
    if (!user) return null;
    const postData = {
      email: user.email,
      paidAmount: totalPrice,
      txId: txId,
      orderItems: items,
    };
    try {
      const res = await createOrder(postData).unwrap();

      if (res.data) {
        toast(`suc $${totalPrice} Payment Successful.`);
        dispatch(clearCart());

        setLoading(false);
        navigate("/dashboard/user");
      }
    } catch (err) {
      console.error("Error creating payment details:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p className="text-red-400 text-center mb-10">{errorMessage}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="mt-5">
          <PrimaryActionButton
            btnText={`Pay $${totalPrice} Now`}
            loadingText="Processing..."
            isLoading={loading}
            isDisable={!stripe || !clientSecret}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
