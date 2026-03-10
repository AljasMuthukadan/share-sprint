import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  return (
    <nav
      className={`flex items-center justify-between px-8 py-5 shadow-sm relative z-10 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h1 className="text-2xl font-bold tracking-tight">
        <span className="text-orange-400">Share</span>{" "}
        <span className="text-4xl font-mono">Sprint</span>
      </h1>

      <div className="flex items-center space-x-4">
        <button
        onClick={ ()=> navigate("/how-it-works")}
        className={`px-5 py-2 rounded-lg border hidden md:block ${darkMode ? "text-white" : "text-black"}`}>
          How it works
        </button>
        <button 
          onClick={() => navigate("/get-started")}
          className="px-5 py-2 rounded-lg bg-orange-500 text-white hidden md:block"
        >
          Get Started
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;