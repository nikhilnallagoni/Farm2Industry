import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useCrops } from "../context/CropsContext";
import CropDetails from "./CropDetails";
import validateUser from "../validations/validateUser";
import toast from "react-hot-toast";

const getUpdatedUser = (user) => {
  const updatedUser = {
    username: user.name,
    email: user.email,
    address: user.address,
    contactNumber: user.contact,
    cropDetails: [...user.crops],
    type: user.type,
    _id: user._id,
  };
  return updatedUser;
};

const showSuccess = () => {
  toast.success("Updated Successfully", {
    position: "top-right",
    style: {
      padding: "4",
    },
  });
};
const showFailure = () => {
  toast.error("Something went wrong", {
    position: "top-right",
  });
};

const UserProfile = () => {
  const { user, getUserFromDb } = useUser();
  const { crops } = useCrops();
  const navigate = useNavigate();
  let middleUser = null;
  if (user) {
    middleUser = {
      ...user,
      crops: [...user.cropDetails],
      contact: user.contactNumber,
      name: user.username,
    };
  }
  if (middleUser && !middleUser.address) middleUser.address = "";
  if (middleUser && !middleUser.contact) middleUser.contact = "";
  const [currentUser, setCurrentUser] = useState(middleUser);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const handleCropPriceChange = (index, e) => {
    const newCrops = currentUser.crops;
    newCrops[index][e.target.name] = e.target.value;
    setCurrentUser({
      ...currentUser,
      crops: [...newCrops],
    });
  };
  const validateAddNewCrop = () => {
    if (selectedCrop === "") {
      return false;
    }
    if (Number(minPrice) > Number(maxPrice) || minPrice <= 0 || maxPrice <= 0)
      return false;
    return true;
  };

  const handleAddMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleAddMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleRemoveCrop = (index, e) => {
    e.preventDefault();
    const newCrops = currentUser.crops.filter((val, ind) => ind !== index);
    setCurrentUser({
      ...currentUser,
      crops: [...newCrops],
    });
  };
  const handleAddCrop = (newCrop, e) => {
    e.preventDefault();
    if (!validateAddNewCrop()) {
      alert("invalid details");
      return;
    }
    setCurrentUser({ ...currentUser, crops: [...currentUser.crops, newCrop] });
    setMaxPrice(0);
    setMinPrice(0);
    setSelectedCrop("");
  };
  const handleSelectedCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateUser(currentUser);
    if (errors) {
      setErrors(errors);
    } else {
      setErrors({});
      const updatedUser = getUpdatedUser(currentUser);
      //make an api call
      try {
        setIsloading(true);
        const response = await fetch("http://localhost:4000/update", {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({ updatedUser }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setIsloading(false);
          showSuccess();
          await getUserFromDb();
          navigate("/userProfile");
        } else {
          throw new Error("something went wrong");
        }
      } catch (err) {
        setIsloading(false);
        showFailure();
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col w-4/5 lg:w-1/2 h-auto mx-auto my-10 bg-[#F0F8FF] p-8 rounded-3xl">
      <div className=" w-full flex justify-center items-center text-3xl font-bold mb-4">
        Profile
      </div>
      <form>
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">Name</label>
          <input
            type="text"
            placeholder="enter your name"
            name="name"
            value={currentUser.name}
            onChange={handleChange}
            required
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
          {errors.name && (
            <span className="text-red-500 mb-2">{errors.name}</span>
          )}
        </div>
        <div className="font-semibold text-lg text-[#6D9520] mb-4">
          Your Crops
        </div>
        {currentUser &&
          currentUser.crops &&
          currentUser.crops.length !== 0 &&
          currentUser.crops.map((crop, index) => (
            <div key={index} className="flex flex-col gap-3 w-full mb-4">
              <div className="flex gap-3 flex-col lg:flex-row lg:gap-0 justify-between">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-lg text-[#4169E1]">
                    Crop Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={crop.name}
                    required
                    readOnly
                    className="p-2 rounded-md bg-[#CCCCCC] max-w-full lg:w-[140px]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-lg text-[#4169E1]">
                    Min Price
                  </label>

                  <input
                    type="number"
                    name="minPrice"
                    value={crop.minPrice}
                    onChange={(e) => handleCropPriceChange(index, e)}
                    className="p-2 rounded-md bg-[#CCCCCC] lg:w-[140px]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-lg text-[#4169E1]">
                    Max Price
                  </label>

                  <input
                    type="number"
                    name="maxPrice"
                    value={crop.maxPrice}
                    onChange={(e) => handleCropPriceChange(index, e)}
                    className="p-2 rounded-md bg-[#CCCCCC] lg:w-[140px]"
                    required
                  />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={(e) => handleRemoveCrop(index, e)}
                  className=" px-4 py-2 text-sm shadow-xl shadow-blue-300 font-semibold text-white hover:text-red-500 hover:bg-white hover:border-red-500 hover:border rounded-lg bg-[#4169E1] hover:shadow-red-200 hover:shadow-lg "
                >
                  Remove {crop.name} ?
                </button>
              </div>
            </div>
          ))}
        {currentUser && currentUser.crops.length === 0 && (
          <div className="text-red-500 flex justify-center items-center">
            Please add some crops
          </div>
        )}
        {
          //new crops here
          <div className="flex flex-col gap-3 w-full mb-4">
            <div className="font-semibold text-lg text-[#6D9520]">
              Add New Crops
            </div>
            <div className="flex gap-3 flex-col lg:flex-row lg:gap-0 justify-between">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-lg text-[#4169E1]">
                  Crop Name
                </label>
                <select
                  className="p-2 rounded-md bg-[#CCCCCC]  lg:w-[140px]"
                  onChange={handleSelectedCropChange}
                  value={selectedCrop}
                >
                  <option value={""} className="w-full">
                    {"select new crop"}
                  </option>
                  {crops &&
                    Object.keys(crops).map((crop, index) => {
                      if (currentUser.crops.find((val) => val.name === crop))
                        return null;
                      return (
                        <option key={crop} value={crop} className="w-full">
                          {crop}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-lg text-[#4169E1] ">
                  Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  onChange={handleAddMinPriceChange}
                  value={minPrice}
                  className="p-2 rounded-md bg-[#CCCCCC]  lg:w-[140px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-lg text-[#4169E1]">
                  Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  onChange={handleAddMaxPriceChange}
                  value={maxPrice}
                  className="p-2 md:rounded-md bg-[#CCCCCC]  lg:w-[140px]"
                />
              </div>
            </div>
            {
              <div className="w-full flex justify-end">
                <button
                  onClick={(e) =>
                    handleAddCrop({ name: selectedCrop, minPrice, maxPrice }, e)
                  }
                  className=" px-4 py-2 text-sm shadow-xl shadow-blue-300 font-semibold text-white hover:text-green-500 hover:bg-white hover:border-green-500 hover:border rounded-lg bg-[#4169E1] hover:shadow-green-200 hover:shadow-lg "
                >
                  Add {selectedCrop} ?
                </button>
              </div>
            }
          </div>
        }

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
            onChange={handleChange}
            required
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
          {errors.address && (
            <span className="text-red-500 mb-2">{errors.address}</span>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full mb-4">
          <label className="font-semibold text-lg text-[#4169E1]">
            Contact No
          </label>
          <input
            type="text"
            placeholder="enter your contact no"
            name="contact"
            value={currentUser.contact}
            onChange={handleChange}
            required
            className="p-2 rounded-md bg-[#CCCCCC] max-w-full"
          />
          {errors.contact && (
            <span className="text-red-500 mb-2">{errors.contact}</span>
          )}
        </div>
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="px-4 py-3 text-lg shadow-xl shadow-blue-300 font-semibold text-white hover:text-[#4169E1] hover:bg-white hover:border-[#4169E1] hover:border rounded-lg bg-[#4169E1] "
          >
            {isLoading ? "Updating..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
