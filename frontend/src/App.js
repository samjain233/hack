import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const finduser = localStorage.getItem("userHack");
    setUser(finduser);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />}></Route>
          <Route
            exact
            path="/login"
            element={
              !user ? <Login token={user} func={setUser} /> : <Navigate to="/dashboard" />
            }
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={
              user ? <Dashboard token={user} func={setUser} /> : <Navigate to="/login" />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
