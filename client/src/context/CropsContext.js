import { createContext, useContext } from "react";

export const CropsContext = createContext();

export const useCrops = () => {
  return useContext(CropsContext);
};
