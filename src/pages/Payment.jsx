import React, { useState } from "react";
import { FaArrowLeft, FaPlus, FaCheckCircle } from "react-icons/fa";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";

const paymentMethods = [
  { id: "card", icon: FaCreditCard, label: "Visa **** 4242", subtext: "Exp: 12/25", color: "text-gray-700" },
  { id: "paypal", icon: FaPaypal, label: "PayPal", subtext: "", color: "text-blue-500" },
  { id: "cash", icon: FaMoneyBillWave, label: "Cash", subtext: "", color: "text-green-500" }
];

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="relative bg-white shadow-md p-4 flex items-center">
        <button onClick={() => window.history.back()} className="text-xl text-gray-600">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-center flex-1">Payment Methods</h2>
      </div>

      {/* Payment Methods List */}
      <div className="flex-1 p-4 space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
              selectedMethod === method.id ? "border-black bg-gray-200" : "border-gray-300 bg-white"
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center gap-3">
              <method.icon className={`${method.color} text-xl`} />
              <div>
                <p className="font-semibold text-gray-800">{method.label}</p>
                {method.subtext && <p className="text-gray-500 text-sm">{method.subtext}</p>}
              </div>
            </div>
            {selectedMethod === method.id && <FaCheckCircle className="text-green-500 text-lg" />}
          </div>
        ))}
      </div>

      {/* Add New Payment Method */}
      <div className="p-4 bg-white shadow-md">
        <a >
          <button onClick={() => navigate('/AddPayment')} className="flex items-center justify-center gap-2 w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition">
            <FaPlus /> Add Payment Method
          </button>
        </a>
      </div>
    </div>
  );
};

export default Payment;