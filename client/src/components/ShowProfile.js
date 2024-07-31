import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ShowProfile = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [fetchedUser, setFetchedUser] = useState(false);

  const getUser = async () => {
    setFetchedUser(true);
    try {
      const response = await fetch(`http://localhost:4000/getUser?id=${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      } else {
        throw new Error("something went from from front");
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  if (fetchedUser === false) getUser();
  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex flex-col w-3/4 lg:w-1/2 h-auto mx-auto my-10 bg-[#F0F8FF] p-8 rounded-3xl">
      <div className=" w-full flex justify-center items-center text-3xl font-bold mb-4">
        {currentUser.username} Profile
      </div>
      <form>
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">Name</label>
          <input
            type="text"
            placeholder="enter your name"
            name="name"
            value={currentUser.username}
            readOnly
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
        </div>

        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">Email</label>
          <input
            type="text"
            placeholder="enter your email"
            name="email"
            value={currentUser.email}
            readOnly
            required
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">
            Address
          </label>
          <input
            type="text"
            placeholder="enter your address"
            name="address"
            value={currentUser.address}
            readOnly
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
        </div>
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">
            Contact No
          </label>
          <input
            type="text"
            placeholder="enter your contact no"
            name="contact"
            value={currentUser.contactNumber}
            readOnly
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ShowProfile;
