import { useState } from "react";
import { motion } from "framer-motion";

export default function PopupComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Popup
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center"
          >
            <h2 className="text-xl font-bold mb-4">Popup Title</h2>
            <p className="text-gray-600 mb-4">
              This is a sample popup with blur effect.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
