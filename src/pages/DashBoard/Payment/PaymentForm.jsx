import React from "react";
import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaLock } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: data.email,
        name: data.name,
        address: {
          postal_code: data.zip,
        },
      },
    });

    if (error) {
      console.error("Stripe error:", error);
    } else {
      console.log("Stripe PaymentMethod:", paymentMethod);
      // You can now confirm paymentIntent or send to backend
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#e53e3e",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          defaultValue={user?.email}
          {...register("email", { required: "Email is required" })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card information
        </label>
        <div className="p-3 border border-gray-300 rounded-md">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name on card
        </label>
        <input
          type="text"
          placeholder="Card Name"
          {...register("name", { required: "Name is required" })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country or region
        </label>
        <select
          {...register("country", { required: "Country is required" })}
          className="w-full border border-gray-300 rounded-t-md p-2"
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="BD">Bangladesh</option>
          <option value="IN">India</option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
        <input
          type="text"
          placeholder="12345"
          {...register("zip", { required: "ZIP code is required" })}
          className="w-full border border-gray-300 rounded-b-md p-2"
        />
        {errors.zip && (
          <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-gray-900 text-white rounded-md py-2 flex justify-center items-center gap-2 hover:bg-gray-800 transition"
      >
        <FaLock />
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
