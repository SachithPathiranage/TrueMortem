import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "What is TrueMortem?",
      answer:
        "TrueMortem is an AI-powered platform that predicts causes of death using post-mortem organ data and verbal autopsy information. It primarily focuses on identifying heart-related causes of death. By combining medical data with insights from verbal autopsies, TrueMortem aims to provide accurate and reliable predictions to support medical research and investigations.",
    },
    {
      question: "How does TrueMortem work?",
      answer:
        "TrueMortem uses advanced machine learning techniques to analyze post-mortem organ data and verbal autopsy data  to  determine probable causes of death. It also features an integrated chatbot designed to answer heart-related questions, providing users with quick insights and guidance on cardiovascular conditions.",
    },
    {
      question: "Is TrueMortem accurate?",
      answer:
        "TrueMortem is trained on vast and diverse datasets of post-mortem organ data and heart-related cases to deliver highly accurate cause-of-death predictions. However, while TrueMortem provides valuable insights, its results are intended to support — not replace — medical expertise. Final conclusions should always be made in consultation with healthcare professionals and forensic experts.",
    },
    {
      question: "Who can use TrueMortem?",
      answer:
        "TrueMortem is specifically designed to assist forensic experts, medical examiners, and researchers involved in post-mortem analysis. It serves as a powerful decision-support tool, helping professionals analyze complex post-mortem organ data and heart-related findings more efficiently. By combining AI-driven insights with expert knowledge, TrueMortem aims to enhance accuracy and speed in forensic investigations.",
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-10 h-screen mb-25">
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
