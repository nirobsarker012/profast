import React from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, signInWithGoogle } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  // Handle google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="font-extrabold inter text-[34px] lg:text-[42px]">
        Create an Account
      </h2>
      <p>Register with Profast</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2.5"
      >
        {/* Name */}
        <div className="flex flex-col gap-y-1">
          <label className="inter text-[14px] font-medium">Name</label>
          <input
            {...register("name", { required: "Please insert your name" })}
            className="py-2 px-3 text-[#94A3BB] rounded-xl outline-none border border-[#CBD5E1]"
            type="text"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-y-1">
          <label className="inter text-[14px] font-medium">Email</label>
          <input
            {...register("email", {
              required: "Please insert your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="py-2 px-3 text-[#94A3BB] rounded-xl outline-none border border-[#CBD5E1]"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label className="inter text-[14px] font-medium">Password</label>
          <input
            {...register("password", {
              required: "Please insert a password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="py-2 px-3 text-[#94A3BB] rounded-xl outline-none border border-[#CBD5E1]"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-[#CAEB66] py-2 rounded-[6px] cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="flex flex-col space-y-7">
        <span className="text-[#71717a]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </span>
        <span className="text-center">Or</span>
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center justify-center gap-x-2.5 bg-[#DADADA] py-2 rounded-[6px] cursor-pointer"
        >
          <FcGoogle size={28} />
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
