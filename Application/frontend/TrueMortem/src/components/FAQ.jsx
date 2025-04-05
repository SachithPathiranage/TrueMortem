import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "What is TrueMortem?",
      answer:
        "TrueMortem is an AI platform that predicts causes of death using post-mortem organ data.",
    },
    {
      question: "How does TrueMortem work?",
      answer:
        "TrueMortem uses machine learning algorithms to analyze organ data and determine probable causes of death.",
    },
    {
      question: "Is TrueMortem accurate?",
      answer:
        "TrueMortem is trained on vast datasets to provide highly accurate predictions, but results should be used alongside expert analysis.",
    },
    {
      question: "Who can use TrueMortem?",
      answer:
        "TrueMortem is designed for forensic experts, medical examiners, and researchers in post-mortem analysis.",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10 h-screen mb-20">
      {/* Title */}
      <div className="flex items-center justify-center">
        <p className="text-[4rem] font-medium leading-tight text-black">FAQ</p>
        <div className="p-[0.6rem] rounded-full bg-blue-600 ml-2 mt-11"></div>
      </div>
      <p className="text-gray-500 text-center mb-8">
        Find answers to your questions here
      </p>

      {/* FAQ Section */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#ffffff70] p-10 rounded-xl shadow-sm">
      <div
        className="flex w-full h-full justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold">{question}</h3>
        <button
          className={`w-10 h-10 text-white rounded-full flex items-center justify-center text-xl font-bold ${
            isOpen ? "bg-blue-500" : "bg-blue-500"
          }`}
        >
          <span className="mb-1">{isOpen ? "−" : "+"}</span>
        </button>
      </div>
      {isOpen && <p className="text-gray-600 mt-2">{answer}</p>}
    </div>
  );
}

export default FAQ;
