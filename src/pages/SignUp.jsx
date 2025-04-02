import React from "react";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";
import InputField from "../components/InputField"; // Importing Reusable Input

export default function SignUp() {
  //  Dynamic Input Fields
  const inputFields = [
    { type: "text", placeholder: "Username", icon: "👤" },
    { type: "email", placeholder: "Email", icon: "📧" },
    { type: "password", placeholder: "Password", icon: "🔒" },
    { type: "password", placeholder: "Confirm Password", icon: "🔒" },


  ];
  const termsData = {
    contant: "By signing up you agree to our",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-sm h-screen p-6 bg-white">

        {/* ✅ Back Button (Fixed) */}
        <div className="flex items-center justify-start mb-4">
          <ArrowButton />
        </div>

        {/* Logo */}
        <Logo />

        {/* Dynamic Input Fields */}
        {inputFields.map((field, index) => (
          <InputField key={index} {...field} />
        ))}


        <CustomLink to="/MobileNumber" text="SIGN UP WITH EMAIL" className="bg-yellow-500 text-black hover:underline py-3 px-10 font-bold rounded-lg  text-lg block w-full text-center no-underline outline-none" />

        {/* Terms & Privacy */}

        <p className="text-gray-500 text-xs mt-10">
          {termsData.contant}{" "}
          <span className="text-blue-500 underline">{termsData.terms}</span> &{" "}
          <span className="text-blue-500 underline">{termsData.privacy}</span>
        </p>


      </div>
    </div>
  );
}
