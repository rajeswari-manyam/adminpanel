import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 🔐 Password validation
  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 6 characters and include uppercase, lowercase, and a number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ❌ Stop submit if password invalid
    if (passwordError) {
      return;
    }

    console.log({ email, password });

    // later: validate login via API
    navigate("/dashboard"); // 🚀 redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0B0E92] to-[#69A6F0]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#0B0E92]">
          Rentongo
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Super Admin Login
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@rentongo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              className={`w-full mt-1 px-4 py-2 border rounded-lg outline-none
                ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
            />

            {passwordError && (
              <p className="text-red-500 text-xs mt-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Admin access only
        </p>
      </div>
    </div>
  );
};

export default Login;
