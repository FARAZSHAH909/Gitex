import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice"; // Import login action
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { AuthButton, ArrowButton, Logo, CustomLink } from "../components/ReusableButton";

export default function PassengerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // ✅ Redirect if user is logged in
  if (user) {
    navigate("/MobileNumber");
  }
  const LogintermsData = {
    contant: "  By signing in you agree to our ",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
  };
  return (
    <div className="flex text-center items-center justify-center min-h-screen pt-20">
      <div className="w-full max-w-sm h-screen p-6 bg-white">
        <ArrowButton />
        <Logo />

        {/* Input Fields */}
        <InputField
          type="text"
          placeholder="Username"
          icon="👤"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          icon="🔒"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black hover:underline py-3 px-10 font-bold rounded-lg text-lg block w-full text-center no-underline outline-none mb-5"
          disabled={loading}
        >
          {loading ? "Signing In..." : "SIGN IN"}
        </button>

        {/* Show Error if Login Fails */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Forgot Password */}
        <CustomLink to="/ForgotPassword" text="Forgot Password?" className="text-blue-500 hover:underline " />


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
