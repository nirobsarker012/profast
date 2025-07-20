import React from "react";
import { data, Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { signInWithGoogle, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const from = location?.state.form || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(from);
      })
      .catch((err) => console.log(err));
    reset();
  };

  // Handle gooogleSignWithPopup
  const handleGoogleSign = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="font-extrabold inter text-[34px] lg:text-[42px]">
        Welcome Back
      </h2>
      <p className="">Login with Profast</p>
      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2.5"
      >
        {/* Email */}
        <div className="flex flex-col gap-y-1">
          <label className="inter text-[14px] font-medium" htmlFor="">
            Email
          </label>
          <input
            className="py-2 px-3 text-[#94A3BB] rounded-xl outline-none border border-[#CBD5E1]"
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: "Please Insert your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Insert Valid Email Address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <label className="inter text-[14px] font-medium" htmlFor="">
            Password
          </label>
          <input
            className="py-2 px-3 text-[#94A3BB] rounded-xl outline-none border border-[#CBD5E1]"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "Password Required",
              minLength: {
                value: 6,
                message: "Password must be 6 characters or longer",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {/* Forget Password */}
        <span className="text-[#71717a]">
          <Link>Forget Password?</Link>
        </span>
        {/* submit btn */}
        <button
          className="bg-[#CAEB66] py-2 rounded-[6px] cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="flex flex-col space-y-7">
        <span className="text-[#71717a]">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </span>
        <span className="text-center">Or</span>
        <button
          onClick={handleGoogleSign}
          className="inline-flex items-center justify-center gap-x-2.5 bg-[#DADADA] py-2 rounded-[6px] cursor-pointer"
        >
          <FcGoogle size={28} />
          Login with google
        </button>
      </div>
    </div>
  );
};

export default Login;
