import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useDarkMode from "./hooks/useDarkMode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateRoom from "./pages/CreateRoom";
import ViewRoom from "./pages/ViewRoom";
import EditProfile from "./pages/EditProfile";
import Header from "./components/Header";
import Alerts from "./components/Alerts";

function App() {
  const { isDarkMode } = useDarkMode();
  const { isSigningIn, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);
  return (
    <div className={`h-screen ${isDarkMode ? "dark bg-primaryDark" : ""}`}>
      <Alerts />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login isSigningIn={isSigningIn} />}
        ></Route>
        <Route path="/rooms/create" element={<CreateRoom />}></Route>
        <Route path="/rooms/:roomId" element={<ViewRoom />}></Route>
        <Route path="/users/:userId/edit" element={<EditProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
