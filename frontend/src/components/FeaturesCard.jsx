import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, UserCheck } from "lucide-react";

function FeaturesCard({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-[50%] "
    >
      <div
        className={`rounded-2xl shadow-xl p-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="mb-6">
          <h3
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Why use ShareSprint?
          </h3>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Fast, private file sharing between devices.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Feature 1 */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-500">
              <Zap size={18} />
            </div>

            <div>
              <p
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Lightning Fast
              </p>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Files transfer directly between devices for maximum speed.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-500">
              <Shield size={18} />
            </div>

            <div>
              <p
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Private & Secure
              </p>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your files never get stored on a server.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-500">
              <Smartphone size={18} />
            </div>

            <div>
              <p
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Any Device
              </p>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Works on phones, tablets, and desktops instantly.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-500">
              <UserCheck size={18} />
            </div>

            <div>
              <p
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                No Sign-Up
              </p>

              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Just share a room code and start transferring.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Info */}
        <div
          className={`mt-6 border-t pt-4 text-xs ${
            darkMode ? "text-gray-400 border-gray-700" : "text-gray-500"
          }`}
        >
          Simple. Instant. Device-to-device sharing.
        </div>
      </div>
    </motion.div>
  );
}

export default FeaturesCard;