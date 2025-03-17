import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const numCircles = 20; // Number of moving circles
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    // Array of different shades of blue
    const blueShades = [
      "#3B82F6", // Blue-500
      "#2563EB", // Blue-600
      "#1E40AF", // Blue-700
      "#1E3A8A", // Blue-800
      "#172554", // Blue-900
    ];

    // Initialize circles with random properties
    const initialCircles = Array.from({ length: numCircles }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 10 + 5, // Circle size between 5px and 15px
      duration: Math.random() * 6 + 4, // Movement duration
      color: blueShades[Math.floor(Math.random() * blueShades.length)], // Random blue shade
    }));

    setCircles(initialCircles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            backgroundColor: circle.color,
          }}
          animate={{
            x: [circle.x, Math.random() * window.innerWidth],
            y: [circle.y, Math.random() * window.innerHeight],
          }}
          transition={{
            repeat: Infinity,
            duration: circle.duration,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
