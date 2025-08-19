import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
}

export default function InputField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  // size styles
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  // variant styles
  const variantClasses = {
    outlined: "border border-gray-400 dark:border-gray-600 bg-transparent",
    filled:
      "bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-indigo-500",
    ghost: "bg-transparent border border-transparent",
  };

  const inputType = passwordToggle && !showPassword ? "password" : type;

  return (
    <div className="flex flex-col gap-1 w-full max-w-md">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-lg focus:outline-none focus:ring-2
            focus:ring-indigo-500 transition
            ${sizeClasses[size]} ${variantClasses[variant]}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${invalid ? "border-red-500 focus:ring-red-500" : ""}
          `}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<
                HTMLInputElement
              >)
            }
            className="absolute right-2 text-gray-500 hover:text-black dark:hover:text-white"
          >
            <X size={16} />
          </button>
        )}

        {/* Password toggle */}
        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-gray-500 hover:text-black dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4"></div>
        )}
      </div>

      {/* Helper / error text */}
      {invalid && errorMessage ? (
        <span className="text-sm text-red-600">{errorMessage}</span>
      ) : helperText ? (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
