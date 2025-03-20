import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Predict from "./pages/Predict";
import Chatbot from "./pages/Chatbot";
import Signin from "./pages/Signin";
import Register from "./pages/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ Authentication state

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/predict" 
          element={isAuthenticated ? <Predict /> : <Signin setIsAuthenticated={setIsAuthenticated} />} 
        />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} /> 
      </Routes>
    </Router>
  );
};

export default App;
