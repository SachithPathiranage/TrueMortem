import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css";

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      setIsAuthenticated(true);
      setMessage("Login successful!");
      window.alert("✅ Login successful! Redirecting...");

      // Redirect to stored page or home
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin"); // Clear stored path
      navigate(redirectPath);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex h-[calc(100vh-13vh)] bg-white">
      <div className="w-1/2">
        <img
          src="/red_heart.png"
          className="w-full h-[calc(100vh-13vh)] object-cover opacity-80 mix-blend-multiply transition duration-300 hover:opacity-100 slide-left"
          alt="Heart Logo"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-white shadow-xl rounded-l-lg slide-right">
        <div className="w-96 p-8">
          <h2 className="text-3xl font-extrabold text-gray-700 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Sign in
            </button>
          </form>

          {message && (
            <p className="text-red-500 text-sm mt-2 text-center">{message}</p>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Are you new?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
