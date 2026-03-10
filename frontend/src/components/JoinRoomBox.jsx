import { motion } from "framer-motion";
import { ArrowLeft, Copy } from "lucide-react";

function JoinRoomBox({
  roomCode,
  setRoomCode,
  inputsRef,
  handleChange,
  handleBackspace,
  handlePaste,
  handleJoin,
  error,
  darkMode,
  copied,
  copyCode,
  setShowJoin,
}) {
  return (
    <motion.div
      key="joinbox"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      className="space-y-6 w-full max-w-md"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Enter Room Code</h3>
        <button
          onClick={() => {
            setShowJoin(false);
            setRoomCode(["", "", "", "", "", ""]);
          }}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      <motion.div
        animate={
          error
            ? {
                x: [-8, 8, -6, 6, -3, 3, 0],
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        onPaste={handlePaste}
        className="flex justify-center gap-2"
      >
        {roomCode.map((char, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            whileFocus={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="w-9 h-11 text-center text-base font-mono rounded-lg border-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-300 outline-none bg-transparent"
          />
        ))}
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250 }}
        onClick={handleJoin}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
      >
        Join Now
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-sm opacity-70">
        <span>{roomCode.join("")}</span>
      </div>
    </motion.div>
  );
}

export default JoinRoomBox;