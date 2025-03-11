import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles.css'

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsAuthenticated(true);
      setMessage("Login successful!");
    } else {
      setMessage(data.detail);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side with Full-Sized Image */}
      <div className="w-1/2 min-h-screen">
        <img 
          src="/red_heart.png"            
          className="w-full h-full object-cover opacity-80 mix-blend-multiply transition duration-300 hover:opacity-100 slide-left"
          alt="Heart Logo"
        />
      </div>

      {/* Right Side with Form */}
      <div className="w-1/2 flex justify-center items-center bg-white shadow-xl rounded-l-lg slide-right">
        <div className="w-96 p-8">
          <h2 className="text-3xl font-extrabold text-gray-700 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Username or email"
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

          {message && <p className="text-red-500 text-sm mt-2 text-center">{message}</p>}

          <div className="my-4 text-center text-gray-500">or</div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Are you new?{" "}
            <Link to="/register" className="text-green-600 font-semibold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
