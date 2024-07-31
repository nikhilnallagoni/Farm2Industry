import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ShowProfile from "./ShowProfile";

const BuySell = () => {
  const { user, loggedIn } = useUser();
  const { name } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState(false);
  const [displayUsers, setDisplayUsers] = useState(null);
  const navigate = useNavigate();
  //make an api call to get users of specific crop
  const getDisplayUsers = async () => {
    setFetchedUsers(true);
    try {
      const response = await fetch(`http://localhost:4000/users?crop=${name}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data?.displayUsers);
        if (data?.displayUsers === null) return null;
        setDisplayUsers(data?.displayUsers);
      } else {
        throw new Error("something went from from front");
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  if (loggedIn === false) {
    return <Navigate to="/" />;
  }

  if (fetchedUsers === false) {
    getDisplayUsers();
  }
  if (!displayUsers) {
    return (
      <div className="mx-auto text-center text-3xl my-10 font-bold">{`There are currently no ${
        user.type === "farmer" ? "buyers" : "sellers"
      } of ${name}`}</div>
    );
  }
  return (
    <div className="w-3/4 lg:w-1/2 mx-auto my-10">
      <div className="flex justify-center items-center mx-auto p-4 text-3xl mb-10 font-bold">{`${name} ${
        user.type === "farmer" ? "Buyers" : "Sellers"
      }`}</div>
      {displayUsers.map((displayUser) => (
        <div
          key={displayUser._id}
          className="flex  flex-col mb-16 bg-gray-300 p-6 rounded-lg shadow-lg"
        >
          <div className="flex gap-3 flex-col  lg:flex-row lg:gap-0 justify-between px-2 text-xl font-bold mb-8">
            <div>
              {`${displayUser.type === "farmer" ? "Seller" : "Buyer"} Name`} :{" "}
              <span className="ml-2 text-blue-500 font-semibold text-lg">
                {displayUser.username}
              </span>
            </div>
            <div className="flex gap-3 flex-col lg:flex-row lg:gap-12">
              <div>
                Min Price :
                <span className="ml-4 text-blue-500 font-semibold text-lg">
                  {
                    displayUser.cropDetails.find((crop) => crop.name === name)
                      .minPrice
                  }
                </span>
              </div>
              <div>
                Max Price :
                <span className=" ml-4 text-blue-500 font-semibold text-lg">
                  {
                    displayUser.cropDetails.find((crop) => crop.name === name)
                      .maxPrice
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="px-2 flex justify-start lg:justify-end items-center w-full">
            <button
              onClick={() => navigate(`/showUser/${displayUser._id}`)}
              className="py-2 px-4 bg-blue-500 rounded-lg text-white  hover:shadow-xl"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuySell;
