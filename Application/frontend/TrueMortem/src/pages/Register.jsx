import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsAuthenticated(true);
      setMessage("Registration successful!");
    } else {
      setMessage(data.detail);
    }
  };

  return (
    <div className="flex h-[calc(100vh-13vh)]">
      {/* Left Side with Full-Sized Image */}
      <div className="w-1/2">
        <img
          src="/red_heart.png"
          className="object-cover w-full h-full  opacity-80 mix-blend-multiply transition duration-300 hover:opacity-100 slide-left"
          alt="Heart Logo"
        />
      </div>

      {/* Right Side with Form */}
      <div className="w-1/2 flex justify-center items-center bg-white shadow-md rounded-l-lg slide-right">
        <div className="w-96 p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-800 text-white rounded-lg hover:bg-gray-900"
            >
              Register
            </button>
          </form>
          {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
          <div className="my-4 text-center text-gray-500">or</div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
