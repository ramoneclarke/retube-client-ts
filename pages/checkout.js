import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getCsrfToken } from "next-auth/react";
import CheckoutForm from "@/components/Shared/CheckoutForm";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const csrf = getCsrfToken();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-payment-intent/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
        // "Access-Control-Request-Method": "POST",
      },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "night",
  };
  let options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements
          options={options}
          stripe={stripePromise}
          key={options.clientSecret}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
