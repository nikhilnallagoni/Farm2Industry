import React, { useState } from "react";
import { useCrops } from "../context/CropsContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { crops } = useCrops();
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className=" min-w-[100px] w-48 min-h-screen max-w-48 bg-gray-100 flex flex-col gap-5 shadow-sm shadow-[#6D9520]">
      <div className="flex justify-between items-center w-full p-2">
        <input
          className="p-2 w-full rounded-full border border-[#6D9520]"
          type="text"
          name="searchText"
          value={searchText}
          placeholder="Search..."
          onChange={handleChange}
        />
      </div>
      {crops &&
        Object.keys(crops).map((crop, index) => {
          if (!crop.toLowerCase().includes(searchText.toLowerCase()))
            return null;
          return (
            <Link key={crop} to={`/cropDetails/${crop}`}>
              <span className="text-[#6D9540] px-4 cursor-pointer max-w-44 overflow-x-scroll hide-scrollbar hover:text-red-500 leading-4 block">
                {crop}
              </span>
            </Link>
          );
        })}
    </div>
  );
};

export default Sidebar;
