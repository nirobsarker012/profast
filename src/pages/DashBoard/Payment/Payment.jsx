import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <PaymentForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
