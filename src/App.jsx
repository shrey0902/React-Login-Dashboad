import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TableView from "./pages/TableView";
import PieChartPage from "./pages/PieChartPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <Router>
      {/* {isLoggedIn &&( */}
      <nav style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#282c34",
        color: "white"
      }}>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/table" style={{ color: "white", textDecoration: "none" }}>Table View</Link>
        <Link to="/chart" style={{ color: "white", textDecoration: "none" }}>Type Chart</Link>
      </nav>
      {/* )} */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/table" element={
          <ProtectedRoute>
            <TableView />
          </ProtectedRoute>
        } />

        <Route path="/chart" element={
          <ProtectedRoute>
            <PieChartPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
