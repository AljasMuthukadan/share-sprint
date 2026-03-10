import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  Upload,
  X,
  CheckCircle,
  Clock,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import socket from "../utils/socket.js";

function ShareDashboard() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* ================= THEME ================= */

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") return true;
      if (savedTheme === "light") return false;
    } catch (err) {
      return false;
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    } catch (err) {}
  }, [darkMode]);

  /* ================= STATES ================= */

  const [usersCount, setUsersCount] = useState(1);
  const [copied, setCopied] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [transferProgress, setTransferProgress] = useState(0);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(null);
  const [eta, setEta] = useState(null);
  const [transferredMB, setTransferredMB] = useState(0);
  const [totalMB, setTotalMB] = useState(0);

  const [history, setHistory] = useState([]);

  const receivedChunks = useRef({});
  const CHUNK_SIZE = 512 * 1024;

  const isConnected = usersCount === 2;

  /* ================= SOCKET ================= */

  useEffect(() => {
    if (!roomCode) return;

    socket.emit("join-room", roomCode);

    socket.on("room-joined", (data) => {
      if (data.success) {
        setUsersCount(data.users);
      }
    });

    socket.on("file-chunk", (data) => {
      const { fileName, fileType, chunk, chunkIndex, totalChunks } = data;

      if (!receivedChunks.current[fileName]) {
        receivedChunks.current[fileName] = {
          chunks: [],
          fileType,
          totalChunks,
        };
      }

      receivedChunks.current[fileName].chunks[chunkIndex] =
        new Uint8Array(chunk);

      const receivedCount =
        receivedChunks.current[fileName].chunks.filter(Boolean).length;

      setReceiveProgress((receivedCount / totalChunks) * 100);
    });

    socket.on("file-complete", (data) => {
      const fileData = receivedChunks.current[data.fileName];

      const blob = new Blob(fileData.chunks, {
        type: fileData.fileType,
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = data.fileName;

      document.body.appendChild(a);
      a.click();
      a.remove();

      delete receivedChunks.current[data.fileName];

      setReceiveProgress(100);

      setTimeout(() => {
        setReceiveProgress(0);
      }, 2000);

      setHistory((prev) => [
        {
          name: data.fileName,
          type: "Received",
          time: new Date(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("room-joined");
      socket.off("file-chunk");
      socket.off("file-complete");
    };
  }, [roomCode]);

  /* ================= SEND FILE ================= */

  const sendFiles = async () => {
    if (!isConnected) {
      alert("Waiting for peer...");
      return;
    }

    for (let file of files) {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      let offset = 0;
      let chunkIndex = 0;
      let uploadedBytes = 0;

      const startTime = Date.now();

      setTotalMB((file.size / 1024 / 1024).toFixed(2));

      while (offset < file.size) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);

        const buffer = await chunk.arrayBuffer();

        socket.emit("file-chunk", {
          roomCode,
          fileName: file.name,
          fileType: file.type,
          chunk: buffer,
          chunkIndex,
          totalChunks,
        });

        offset += CHUNK_SIZE;
        chunkIndex++;

        uploadedBytes += CHUNK_SIZE;

        const elapsed = (Date.now() - startTime) / 1000;

        const speed = uploadedBytes / 1024 / 1024 / elapsed;

        const remainingBytes = file.size - uploadedBytes;

        const etaSeconds = remainingBytes / (speed * 1024 * 1024);

        setTransferSpeed(speed.toFixed(2));

        setTransferredMB((uploadedBytes / 1024 / 1024).toFixed(2));

        setEta(etaSeconds > 0 ? etaSeconds.toFixed(1) : 0);

        setTransferProgress((chunkIndex / totalChunks) * 100);
      }

      socket.emit("file-complete", {
        roomCode,
        fileName: file.name,
      });

      setHistory((prev) => [
        {
          name: file.name,
          type: "Sent",
          time: new Date(),
        },
        ...prev,
      ]);

      setTimeout(() => {
        setTransferProgress(0);
        setTransferSpeed(null);
        setEta(null);
        setTransferredMB(0);
      }, 2000);
    }

    setFiles([]);
  };

  /* ================= HELPERS ================= */

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const formatSize = (size) => {
    return (size / 1024 / 1024).toFixed(2) + " MB";
  };

  /* ================= UI ================= */

  return (
    <div
      className={`h-screen w-full flex flex-col md:flex-row overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* SIDEBAR */}

      <div
        className={`w-full md:w-96 flex-shrink-0 border-r flex flex-col ${
          darkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {/* Header */}

          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <h2 className="text-2xl font-bold mt-6">Share Room</h2>

          <div className="mt-3 flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                isConnected
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />

            <span className="text-sm">
              {isConnected
                ? "Peer Connected"
                : "Waiting for peer..."}
            </span>
          </div>

          {/* ROOM CODE */}

          <div className="mt-6 p-4 rounded-xl bg-orange-500 text-white">
            <p className="text-xs opacity-80">Room Code</p>

            <div className="flex justify-between items-center mt-1">
              <span className="font-mono text-xl tracking-widest">
                {roomCode}
              </span>

              <button onClick={copyCode}>
                <Copy size={16} />
              </button>
            </div>

            {copied && <p className="text-xs mt-1">Copied</p>}
          </div>

          {/* FILE DROP */}

          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
              isDragging
                ? "border-orange-500 bg-orange-50"
                : darkMode
                ? "border-gray-700"
                : "border-gray-300"
            }`}
          >
            <Upload
              size={28}
              className="mx-auto text-orange-500"
            />

            <p className="mt-2 text-sm">
              Drag & Drop or Click
            </p>
          </div>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {/* FILE LIST */}

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      darkMode
                        ? "bg-gray-800"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="truncate w-40">
                      <p className="text-sm truncate">
                        {file.name}
                      </p>

                      <p className="text-xs opacity-70">
                        {formatSize(file.size)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFile(index)}
                    >
                      <X
                        size={16}
                        className="text-red-500"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={sendFiles}
                disabled={!isConnected}
                className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium disabled:opacity-50"
              >
                {isConnected
                  ? "Send Files"
                  : "Waiting..."}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 overflow-y-auto p-8">
        <h3 className="text-2xl font-bold mb-6">
          Transfer Activity
        </h3>

        {(transferProgress > 0 || receiveProgress > 0) && (
          <div className="mb-8">
            <div
              className={`h-3 rounded-full overflow-hidden ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
              }`}
            >
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{
                  width: `${
                    transferProgress || receiveProgress
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs opacity-70">
              <span>
                {transferProgress > 0
                  ? "Sending..."
                  : "Receiving..."}
              </span>

              {transferSpeed && (
                <span>
                  {transferredMB}/{totalMB} MB •{" "}
                  {transferSpeed} MB/s • ETA {eta}s
                </span>
              )}
            </div>
          </div>
        )}

        {history.length === 0 ? (
          <p className="opacity-60">
            No transfer history yet.
          </p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 mb-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div>
                <p className="text-sm">{item.name}</p>

                <p className="text-xs opacity-70">
                  {item.type} •{" "}
                  {item.time.toLocaleTimeString()}
                </p>
              </div>

              {item.type === "Sent" ? (
                <CheckCircle
                  size={18}
                  className="text-orange-500"
                />
              ) : (
                <Clock
                  size={18}
                  className="text-green-500"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShareDashboard;