import HomePage from "./pages/HomePage.jsx";
import CreateRoom from "./pages/CreateRoomPage.jsx";
import { Routes, Route } from "react-router-dom";
import ShareDashboard from "./pages/ShareDashboard.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import GetStarted from "./pages/GetStarted.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/share/:roomCode" element={<ShareDashboard />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/get-started" element={<GetStarted />} />
    </Routes>
  );
}

export default App;