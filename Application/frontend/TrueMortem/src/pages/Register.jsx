import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setIsAuthenticated }) => { // ✅ Receive setIsAuthenticated
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any old messages

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setIsAuthenticated(true); // ✅ Set user as authenticated
      setMessage("Registration successful!");
      window.alert("✅ Registration successful! Redirecting...");

      // Redirect to the stored page or /predict
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/predict";
      localStorage.removeItem("redirectAfterLogin"); // Clear stored path
      navigate(redirectPath);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/2 min-h-screen">
        <img src="/red_heart.png" className="w-full h-full object-cover opacity-80" alt="Heart Logo" />
      </div>

      <div className="w-1/2 flex justify-center items-center bg-white shadow-xl rounded-l-lg">
        <div className="w-96 p-8">
          <h2 className="text-3xl font-extrabold text-gray-700 mb-6 text-center">Register</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />

            <button type="submit" className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Register
            </button>
          </form>

          {message && <p className="text-red-500 text-sm mt-2 text-center">{message}</p>}

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
