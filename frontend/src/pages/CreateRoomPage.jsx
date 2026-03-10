import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Users,
  CheckCircle,
  Zap,
  Link2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket.js";
import MobileFeatureCards from "../components/MobileFeatureCards";

function CreateRoom() {

  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [userCount, setUserCount] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {

    const generateCode = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";

      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }

      return code;
    };

    const code = generateCode();
    setRoomCode(code);

    socket.emit("create-room", code);

    const handleRoomJoined = (data) => {

      if (data.success) {
        setUserCount(data.users);

        if (data.users === 2) {
          setIsConnecting(true);
        }
      }

    };

    socket.on("room-joined", handleRoomJoined);

    return () => {
      socket.off("room-joined", handleRoomJoined);
    };

  }, [navigate]);

  const copyCode = () => {

    navigator.clipboard.writeText(roomCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);

  };

  const shareRoom = () => {

    if (navigator.share) {
      navigator.share({
        title: "Join my ShareSprint room",
        text: `Join my room with code: ${roomCode}`,
      });
    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center px-6 lg:px-20 relative overflow-hidden">

      {/* Floating Particles */}

      {[...Array(8)].map((_, i) => (

        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-orange-400 rounded-full opacity-40"
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />

      ))}

      {/* Background Blob */}

      <motion.div
        className="absolute w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-orange-400 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -150, 100, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity
        }}
      />

      <div className="grid lg:grid-cols-2 w-full items-center gap-12 lg:gap-20 relative z-10">

        {/* LEFT SECTION */}

        <div className="space-y-8">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            Room Created 🎉
          </h1>

          <p className="text-base lg:text-lg opacity-70 max-w-md">
            Share this code with the person you want to send files to.
            Once they join, you'll be redirected automatically.
          </p>

          {/* ROOM CODE */}

          <div className="flex items-center gap-4 pt-4 flex-wrap">

            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl lg:text-5xl font-mono font-bold tracking-widest text-orange-600"
            >
              {roomCode}
            </motion.span>

            <button
              onClick={copyCode}
              className="p-3 rounded-xl border border-orange-400 hover:bg-orange-100 transition"
            >
              <Copy size={20} />
            </button>

            <button
              onClick={shareRoom}
              className="p-3 rounded-xl border border-orange-400 hover:bg-orange-100 transition"
            >
              <Link2 size={20} />
            </button>

          </div>

          {copied && (

            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              Copied to clipboard
            </div>

          )}

          {/* USER STATUS */}

          <div className="flex items-center gap-3 pt-4 text-gray-700">

            <Users size={20} />

            <div className="flex items-center gap-1 text-base lg:text-lg">

              {userCount === 1 ? (
                <>
                  Waiting for someone to join
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ...
                  </motion.span>
                </>
              ) : (
                <>
                  User joined! Connecting
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ...
                  </motion.span>
                </>
              )}

            </div>

          </div>

          {/* PROGRESS BAR */}

          {userCount === 1 && (

            <div className="h-2 w-full max-w-xs bg-gray-200 rounded-full overflow-hidden mt-2">

              <motion.div
                className="h-full bg-orange-500"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

            </div>

          )}

          <MobileFeatureCards />

        </div>

        {/* DESKTOP FEATURES */}

        <div className="hidden lg:flex flex-col gap-10">

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">⚡ Instant Transfer</h3>
            <p className="opacity-70">
              Files are shared directly between devices in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
            <p className="opacity-70">
              Room-based connection ensures private transfers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">🚀 Fast Setup</h3>
            <p className="opacity-70">
              No login required. Just share the code and connect.
            </p>
          </div>

        </div>

      </div>

      {/* CONNECTING OVERLAY */}

      <AnimatePresence>

        {isConnecting && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => {

              setTimeout(() => {
                navigate(`/share/${roomCode}`);
              }, 1200);

            }}
            className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-50"
          >

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="p-6 rounded-full bg-orange-100 shadow-xl"
            >
              <Zap size={40} className="text-orange-500" />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-6"
            >
              <Link2 size={36} className="text-orange-500" />
            </motion.div>

            <motion.h2
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-6 text-2xl font-semibold text-orange-600"
            >
              Establishing Secure Connection...
            </motion.h2>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );

}

export default CreateRoom;