import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useCrops } from "../context/CropsContext";

function Layout() {
  const { crops, setCrops } = useCrops();
  const getAndSetCrops = async () => {
    const res = await getCrops();
    setCrops(res);
  };
  const getImages = async () => {
    const obj = crops;
    Object.keys(obj).map(async (crop) => {
      const res = await fetch(
        `https://pixabay.com/api/?key=43142140-830dc5fb2553f64e86dbcdabf&q=${crop}&per_page=10`
      );
      const json = await res.json();
      const link = json?.hits?.[0]?.largeImageURL;
      obj[crop].imageLink = link;
    });
    setCrops(obj);
  };
  // console.log(crops);
  useEffect(() => {
    getAndSetCrops();
  }, []);
  useEffect(() => {
    if (crops) {
      getImages();
    }
  });
  return (
    <>
      <div className="font-lexend">
        <Navbar />
        <div className="pt-16">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;

async function getCrops() {
  try {
    const res = await fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001577b4b3572cd4e8d638cf00b9ee3cd3f&format=json&limit=1000&filters%5Bstate.keyword%5D=Telangana"
    );
    const data = await res.json();
    const cropDetails = data?.records;
    if (!cropDetails) {
      throw new Error("no records found");
    }
    // need array of objects , where each object is array of that specific crop
    const filteredCropsObject = {};
    cropDetails.map((crop) => {
      if (!filteredCropsObject[crop?.commodity]) {
        filteredCropsObject[crop?.commodity] = { items: [crop], imageLink: "" };
      } else {
        filteredCropsObject[crop?.commodity].items.push(crop);
      }
    });
    return filteredCropsObject;
  } catch (err) {
    console.log("fetch error", err);
  }
}
