import { ArrowLeft, Rocket, Users, Link2, File } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GetStarted() {
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

      <div className="max-w-4xl mx-auto space-y-16 text-center">

        <div className="space-y-4">
          <Rocket className="mx-auto text-orange-500" size={50} />
          <h1 className="text-4xl font-bold">Get Started with ShareSprint</h1>
          <p className="opacity-70 max-w-xl mx-auto">
            ShareSprint is designed to make file sharing extremely simple.
            Follow these steps to start transferring files instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 text-left">

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <Users className="text-orange-500" size={36} />
            <h3 className="text-xl font-semibold">Step 1</h3>
            <p className="opacity-70">
              Open ShareSprint and create a new room. A unique room code will
              be generated automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <Link2 className="text-orange-500" size={36} />
            <h3 className="text-xl font-semibold">Step 2</h3>
            <p className="opacity-70">
              Share the room code with the other user. They can join the room
              by entering the same code on their device.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <File className="text-orange-500" size={36} />
            <h3 className="text-xl font-semibold">Step 3</h3>
            <p className="opacity-70">
              Drag and drop files or select them from your device. The files
              will instantly transfer to the other device.
            </p>
          </div>

        </div>

        <div className="pt-10">

          <button
            onClick={() => navigate("/create-room")}
            className="px-10 py-4 bg-orange-500 text-white text-lg rounded-xl shadow-lg hover:bg-orange-600 transition"
          >
            Create Your First Room
          </button>

        </div>

      </div>

    </div>
  );
}

export default GetStarted;