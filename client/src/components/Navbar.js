import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Avatar from "react-avatar";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const { user, loggedIn, isOpen, setIsOpen } = useUser();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {}, [loggedIn]);
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 1000px)" });

  return (
    <div className="flex justify-between py-4 px-6 md:px-16 bg-[#6D9520] h-16 max-h-16 items-center font-semibold text-white text-lg fixed w-screen z-10">
      <div className="flex items-center gap-2">
        {!isMediumOrLarger && (
          <button
            onClick={toggleSidebar}
            className="text-2xl p-2 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        <Link to={"/"}>
          <div className=" cursor-pointer ">Home</div>
        </Link>
      </div>

      <div className="flex gap-6 justify-center items-center">
        {!user && (
          <Link to={"login"}>
            <div className=" cursor-pointer ">Login</div>
          </Link>
        )}
        {!user && (
          <Link to={"register"}>
            <div className=" cursor-pointer ">Register</div>
          </Link>
        )}
        {user && (
          <Link to={"userProfile"}>
            <div className=" cursor-pointer  hidden md:block">Profile</div>
          </Link>
        )}
        {user && (
          <Link to={"logout"}>
            <div className=" cursor-pointer">Logout</div>
          </Link>
        )}

        {user && (
          <Link to={"userProfile"}>
            <Avatar name={user.username} size="45" round={true} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
