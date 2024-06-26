import "./styles/app.scss";
import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Layout from "./components/layout/Layout";
import Register from "./pages/register/Register";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";
import Page404 from "./pages/page404/Page404";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
