import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/signUpSlice"; // Import the Redux Action
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";
import InputField from "../components/InputField"; // Importing Reusable Input
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To navigate to the login page after successful signup
  const { loading, error, success } = useSelector((state) => state.signUp); // Added success state to track signup success

  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to Handle Input Changes
  const getSignUpData = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  // Handle Signup Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUp.password !== signUp.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(signUpUser(signUp)); // Dispatch signup action
  };

  // Dynamic Input Fields
  const inputFields = [
    { type: "text", placeholder: "Username", icon: "👤", name: "username" },
    { type: "email", placeholder: "Email", icon: "📧", name: "email" },
    { type: "password", placeholder: "Password", icon: "🔒", name: "password" },
    { type: "password", placeholder: "Confirm Password", icon: "🔒", name: "confirmPassword" },
  ];

  // Terms & Privacy Data
  const termsData = {
    content: "By signing up you agree to our",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  };

  // Redirect to Login after successful signup
  if (success) {
    setTimeout(() => {
      navigate("/PassengerLogin"); // Navigate to login page after 2 seconds
    }, 2000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-sm h-screen p-6 bg-white">
        
        {/* ✅ Back Button */}
        <div className="flex items-center justify-start mb-4">
          <ArrowButton />
        </div>

        {/* Logo */}
        <Logo />

        {/* Dynamic Input Fields */}
        {inputFields.map((field, index) => (
          <InputField key={index} {...field} onChange={getSignUpData} />
        ))}

        {/* ✅ Signup Button */}
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-black hover:underline py-3 px-10 font-bold rounded-lg text-lg block w-full text-center no-underline outline-none"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "SIGN UP WITH EMAIL"}
        </button>

        {/* Show Error if Signup Fails */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Show Success Message */}
        {success && (
          <p className="text-green-500 text-lg mt-4 font-semibold">
            🎉 Signup Successful! Redirecting to login...
          </p>
        )}

        {/* Terms & Privacy */}
        <p className="text-gray-500 text-xs mt-10">
          {termsData.content}{" "}
          <span className="text-blue-500 underline">{termsData.terms}</span> &{" "}
          <span className="text-blue-500 underline">{termsData.privacy}</span>
        </p>
      </div>
    </div>
  );
}
