import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import CropDetails from "./components/CropDetails";
import { useEffect, useState } from "react";
import { CropsContext, cropContext, useCrops } from "./context/CropsContext";
import UserProfile from "./components/UserProfile";
import { UserContext } from "./context/UserContext";
import Logout from "./components/Logout";
import React from "react";
import { Toaster, toast } from "react-hot-toast";
import BuySell from "./components/BuySell";
import ShowProfile from "./components/ShowProfile";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cropDetails/:name" element={<CropDetails />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="logout" element={<Logout />} />
        <Route path="buySell/:name" element={<BuySell />} />
        <Route path="showUser/:id" element={<ShowProfile />} />
      </Route>
    </Route>
  )
);

function App() {
  const [crops, setCrops] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(user !== null);
  const [isOpen, setIsOpen] = useState(false);
  const getUserFromDb = async () => {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setLoggedIn(true);
      } else {
        throw new Error("failed to fetch user");
      }
    } catch (err) {
      setUser(null);
      setLoggedIn(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getUserFromDb();
  }, [loggedIn]);
  return (
    <CropsContext.Provider value={{ crops, setCrops }}>
      <UserContext.Provider
        value={{
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          getUserFromDb,
          isOpen,
          setIsOpen,
        }}
      >
        <Toaster />
        <RouterProvider router={router} />
      </UserContext.Provider>
    </CropsContext.Provider>
  );
}

export default App;
