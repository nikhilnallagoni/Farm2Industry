// import React from "react";
// import { NavLink } from "react-router-dom";
// import RegisterPage from "./RegisterPage";
// import LoginPage from "./LoginPage";
// import { Route } from "react-router-dom";

// function Home() {
//   function HandleRegister() {
//     <Route path="register" element={<RegisterPage />} />;
//   }
//   function HandleLogin() {
//     <Route path="login" element={<LoginPage />} />;
//   }
//   return (
//     // <>
//     //   <button onClick={HandleRegister}> register</button>
//     //   <button onClick={HandleLogin}> login</button>
//     // </>
//     <>
//       <div>Home</div>
//       <div>
//         <NavLink to={"register"}>register</NavLink>
//         <NavLink to={"login"}>login</NavLink>
//       </div>
//     </>
//   );
// }

// export default Home;
import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import { Route } from "react-router-dom";
import ImgMediaCard from "./ImgMediaCard";
import { useCrops } from "../context/CropsContext";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "react-responsive";
import MobileSideBar from "./MobileSideBar";
import { useUser } from "../context/UserContext";

function Home() {
  function HandleRegister() {
    <Route path="register" element={<RegisterPage />} />;
  }
  function HandleLogin() {
    <Route path="login" element={<LoginPage />} />;
  }
  const { crops } = useCrops();
  const isMediumOrLarger = useMediaQuery({ query: "(min-width: 1000px)" });
  const { isOpen } = useUser();
  return (
    // <>
    //   <button onClick={HandleRegister}> register</button>
    //   <button onClick={HandleLogin}> login</button>
    // </>
    <>
      <div className="px-2 md:px-0 card-wrapper-div bg-[#6D95201A]">
        {isMediumOrLarger && <Sidebar />}
        {!isMediumOrLarger && <MobileSideBar />}

        <div className="home-cards mx-auto">
          <h1 className="heading p-6 font-bold text-3xl">Trending crops</h1>
          <div
            className={`grid ${
              isOpen ? "grid-cols-1" : "grid-cols-2"
            } md:grid-cols-3 gap-6 md:gap-10`}
          >
            {crops &&
              Object.keys(crops).map((crop, index) => (
                <ImgMediaCard
                  cropName={crop}
                  key={crop}
                  imameLink={crops[crop].imageLink}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
