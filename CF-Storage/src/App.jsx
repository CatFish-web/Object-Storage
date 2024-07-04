import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import CreateAccountPage from "./components/CreateAccountPage.jsx";
import VerifyPage from "./components/VerifyPage.jsx";
import AddPeople from "./components/AddPeople.jsx";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {

    sessionStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </>
  );
};

export default App;
