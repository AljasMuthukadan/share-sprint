import { motion } from "framer-motion";

function BackgroundBlobs() {
  return (
    <motion.div
      className="absolute w-96 h-96 bg-orange-400 rounded-full opacity-20 blur-3xl"
      animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0] }}
      transition={{ duration: 20, repeat: Infinity }}
    />
  );
}

export default BackgroundBlobs;