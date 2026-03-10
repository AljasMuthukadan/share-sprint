import  { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundBlobs from "../components/BackgroundBlobs";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesCard from "../components/FeaturesCard";
import socket from "../utils/socket.js";

function HomePage() {
  const navigate = useNavigate();

  const [showJoin, setShowJoin] = useState(false);
  const [roomCode, setRoomCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    const handleRoomJoined = (data) => {
      if (data.success) {
        navigate(`/share/${data.roomCode}`);
      }
    };

    const handleRoomError = () => {
      setError(true);
      setTimeout(() => setError(false), 500);
    };

    socket.on("room-joined", handleRoomJoined);
    socket.on("room-error", handleRoomError);

    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-error", handleRoomError);
    };
  }, [navigate]);

  const handleChange = (value, index) => {
    if (!/^[A-Za-z0-9]?$/.test(value)) return;
    const updated = [...roomCode];
    updated[index] = value.toUpperCase();
    setRoomCode(updated);
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !roomCode[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[A-Za-z0-9]+$/.test(paste)) return;
    const updated = paste.toUpperCase().split("");
    while (updated.length < 6) updated.push("");
    setRoomCode(updated);
  };

  const handleJoin = () => {
    const code = roomCode.join("");

    if (code.length < 6) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    socket.emit("join-room", code);
    console.log("Joining room:", code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode.join(""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      className={`relative overflow-hidden  min-h-screen flex flex-col transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-amber-50 to-orange-100"
      }`}
    >
      <BackgroundBlobs />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <HeroSection
        showJoin={showJoin}
        setShowJoin={setShowJoin}
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
      />

      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 hidden md:block lg:block ">
        <FeaturesCard darkMode={darkMode} />
      </div>

      <footer className="text-center py-6 text-sm opacity-70 relative z-10">
        © {new Date().getFullYear()} Share Sprint
      </footer>
    </div>
  );
}

export default HomePage;