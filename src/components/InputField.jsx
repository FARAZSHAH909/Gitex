import { useState } from "react";

const InputField = ({ type = "text", placeholder, icon, value, onChange  }) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex items-center border rounded-lg px-3 py-3 mb-3 bg-gray-100 gap-2">
      {icon && <span className="text-gray-500">{icon}</span>}

      <input
      
        type={inputType}
        placeholder={placeholder}
        className="bg-transparent flex-1 outline-none text-sm"
        value={value}
        onChange={onChange}
        
      />

      {type === "password" && (
        <span
          className="text-gray-500 cursor-pointer"
          onClick={() => setInputType(inputType === "password" ? "text" : "password")}
        >
          👁
        </span>
      )}
    </div>
  );
};

export default InputField;
