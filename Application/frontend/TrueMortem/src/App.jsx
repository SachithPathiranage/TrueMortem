import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import PMForm from "./pages/PMForm";
import VAForm from "./pages/VAForm";
import Chatbot from "./pages/Chatbot";
import Signin from "./pages/Signin"; 
import Register from "./pages/Register";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pmForm" element={<PMForm />} />
        <Route path="/vaForm" element={<VAForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
