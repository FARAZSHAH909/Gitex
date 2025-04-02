import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField"; 
import { AuthButton, ArrowButton, Logo , CustomLink } from "../components/ReusableButton";

export default function PassengerLogin() {
   const navigate = useNavigate();
  
  // ✅ Define Input Fields in an Array
  const inputFields = [
    { id: "username", type: "text", placeholder: "Username", icon: "👤" },
    { id: "password", type: "password", placeholder: "Password", icon: "🔒" }
  ];

  const LogintermsData = {
    contant: "  By signing in you agree to our ",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  };

  // ✅ Store Input Data
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // ✅ Handle Input Change
  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex text-center items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-sm h-screen p-6 bg-white">
        
        {/* Back Button */}
        <ArrowButton />

        {/* Logo */}
        <Logo />

        {/* Render Input Fields Dynamically */}
        {inputFields.map((field) => (
          <InputField 
            key={field.id}
            type={field.type}
            placeholder={field.placeholder}
            icon={field.icon}
            value={formData[field.id]}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        ))}

        {/* Sign In Button */}
        <AuthButton 
          text="SIGN IN" 
          bgColor="bg-yellow-400" 
          textColor="text-black" 
         navigateLink="/AcceptJobScreen"
          
        >
        </AuthButton>

        {/* Forgot Password */}
        <CustomLink to="/ForgotPassword" text="Forgot Password?" className="text-blue-500 hover:underline" />


        {/* Privacy Policy */}
        <p className="text-gray-500 mt-4 text-xs">
          {LogintermsData.contant} <br />
          <span className="text-black font-semibold cursor-pointer mt-1">
           {LogintermsData.terms} & {LogintermsData.privacy}
          </span>
        </p>
      </div>
    </div>
  );
}
