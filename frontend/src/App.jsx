import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MemberProfile from "./pages/MemberProfile";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:id" element={<MemberProfile />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}
