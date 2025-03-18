import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";
import Footer from "../components/Footer.jsx";
import React, { useState } from "react";
import AnimatedBackground from "../components/Animation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit inquiry");
      }

      // ✅ Replace toast with alert
      alert("✅ Inquiry submitted successfully!");

      // ✅ Clear form after submission
      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {
      // ✅ Replace toast error with alert
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div>
      <AnimatedBackground />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 max-w-[1100px] mx-auto mt-7 mb-20">
        {/* Left Section */}
        <div className="w-[33rem] mx-auto max-h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-[33rem] object-cover mb-5">
              <img className="rounded-[3rem] w-full shadow-lg" src="/contact.jpg" alt="Contact" />
            </div>

            <div className="w-full rounded-2xl p-4 bg-white shadow-lg">
              <div className="flex items-center gap-4 mb-4 hover:scale-105 duration-300">
                <div className="bg-[#0064f1] ml-3 p-4 rounded-full text-xl text-white">
                  <TfiEmail />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p>inquiries@truemortem.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 hover:scale-105 duration-300">
                <div className="bg-[#0064f1] ml-3 p-4 rounded-full text-xl text-white">
                  <HiOutlinePhone />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p>+94-777 888 999</p>
                </div>
              </div>

              <div className="flex items-center gap-4 hover:scale-105 duration-300">
                <div className="bg-[#0064f1] ml-3 p-4 rounded-full text-2xl text-white">
                  <MdOutlineLocationOn />
                </div>
                <div>
                  <p className="font-bold">Office</p>
                  <p>No. 100, Colombo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="md:ml-10">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Get in Touch</h2>
            <p className="text-gray-600 text-center mb-6">Fill out the form below and we'll get back to you soon.</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1 pb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 pb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full p-3 border rounded-lg ${
                    isSubmitted && emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {isSubmitted && emailError && <p className="text-red-500 text-sm mt-1">Invalid email address.</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 pb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 pb-2">Message</label>
                <textarea
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
