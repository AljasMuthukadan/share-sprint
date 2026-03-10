import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JoinRoomBox from "./JoinRoomBox";

function HeroSection({
  showJoin,
  setShowJoin,
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
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center px-12 lg:px-24 relative z-10">

      <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Share Files <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Instantly & Securely
            </span>
          </h1>

          <p className="text-lg opacity-80 max-w-lg leading-relaxed">
            Create a room or join one in seconds.  
            Real-time, peer-to-peer file sharing made simple.
          </p>

          <AnimatePresence mode="wait">
            {!showJoin ? (
              <motion.div
                key="buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-5 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/create-room")}
                  className="px-10 py-4 rounded-2xl text-white text-lg shadow-xl bg-orange-500 hover:bg-orange-600 transition"
                >
                  <Upload className="inline mr-2" size={20} />
                  Create Room
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowJoin(true)}
                  className="px-10 py-4 rounded-2xl border-2 border-orange-400 text-lg shadow-md hover:bg-orange-500 transition"
                >
                  <Download className="inline mr-2" size={20} />
                  Join Room
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="join"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="pt-6"
              >
                <JoinRoomBox
                  roomCode={roomCode}
                  setRoomCode={setRoomCode}
                  inputsRef={inputsRef}
                  handleChange={handleChange}
                  handleBackspace={handleBackspace}
                  handlePaste={handlePaste}
                  handleJoin={handleJoin}
                  error={error}
                  darkMode={darkMode}
                  copied={copied}
                  copyCode={copyCode}
                  setShowJoin={setShowJoin}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT SIDE (Cleaner Layout Placeholder) */}
        <div className="hidden lg:flex justify-center items-center relative">
          <div className="w-[420px] h-[420px] rounded-full bg-orange-400/20 blur-3xl absolute"></div>

          <div className="relative z-10">
            {/* Feature card will visually align better now */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;