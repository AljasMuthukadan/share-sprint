import { ArrowLeft, Upload, Wifi, Download, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 px-6 py-16">

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-10"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="max-w-5xl mx-auto space-y-16">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">How ShareSprint Works</h1>
          <p className="opacity-70 max-w-2xl mx-auto">
            ShareSprint allows you to transfer files instantly between devices
            using a secure peer-to-peer connection. Files never pass through
            our servers — they move directly from your device to the other user.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <Upload className="text-orange-500" size={40} />
            <h3 className="text-xl font-semibold">1. Create a Room</h3>
            <p className="opacity-70">
              When you click “Create Room”, ShareSprint generates a secure
              6-character code. This code acts as a private room where two
              devices can connect safely.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <Wifi className="text-orange-500" size={40} />
            <h3 className="text-xl font-semibold">2. Connect Devices</h3>
            <p className="opacity-70">
              Share the room code with the person you want to send files to.
              When they enter the code, both devices establish a direct
              connection using WebRTC technology.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <Download className="text-orange-500" size={40} />
            <h3 className="text-xl font-semibold">3. Transfer Files</h3>
            <p className="opacity-70">
              Once connected, files transfer instantly between the two devices.
              The files do not get stored on any server — they move directly
              from sender to receiver.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
            <Shield className="text-orange-500" size={40} />
            <h3 className="text-2xl font-semibold">Secure Transfer</h3>
            <p className="opacity-70">
              ShareSprint uses encrypted peer-to-peer communication. The server
              only helps devices discover each other but never stores the files
              being transferred. This ensures privacy and security.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg space-y-4">
            <Zap className="text-orange-500" size={40} />
            <h3 className="text-2xl font-semibold">Lightning Fast</h3>
            <p className="opacity-70">
              Because files move directly between devices instead of uploading
              to the cloud, transfer speeds are much faster and depend only on
              the internet connection between the two users.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HowItWorks;