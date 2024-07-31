import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCrops } from "../context/CropsContext";
import { useUser } from "../context/UserContext";

function CropDetails() {
  const { user } = useUser();
  const { name: cropName } = useParams();
  const { crops } = useCrops();
  const navigate = useNavigate();
  const handleBuySell = () => {
    navigate(`/buySell/${cropName}`);
  };
  if (!crops) return null;
  const items = crops[cropName].items;
  //arrival_date ,commodity,district,market,max_price,min_price,modal_price,variety
  return !items ? null : (
    <div className="w-full">
      <div className="flex px-4 mb-10 max-w-[95%] mx-auto justify-between items-center mt-3">
        <h1 className="text-3xl font-bold text-center text-blue-500">
          {cropName}
        </h1>
        <div className="flex gap-3">
          {user && user?.type !== "farmer" && (
            <button
              onClick={handleBuySell}
              className="text-lg px-4 py-2 text-xl text-white bg-purple-700 rounded-lg hover:bg-gray-200 hover:text-purple-700 "
            >
              Buy
            </button>
          )}

          {user && user?.type === "farmer" && (
            <button
              onClick={handleBuySell}
              className="text-lg px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-gray-200 hover:text-purple-700"
            >
              Sell
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto max-w-[95%] mx-auto hide-scrollbar">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Market
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                District
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Min Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Max Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Average Price
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {item.arrival_date}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.market}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.district}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.min_price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.max_price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.modal_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CropDetails;
