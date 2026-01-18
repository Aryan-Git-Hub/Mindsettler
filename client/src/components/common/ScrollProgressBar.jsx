import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(scrolled / scrollHeight);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] via-[#DD1764] to-[#3F2965] z-[9999] origin-left"
      style={{ scaleX: progress }}
    />
  );
};