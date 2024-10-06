import { configureStore } from "@reduxjs/toolkit";
import nasaReducer from "./features/nasaSlice";
import { useSelector } from "react-redux";

// Create the Redux store
export const store = configureStore({
  reducer: {
    nasa: nasaReducer,
  },
});

// Export the custom selector hook
export const useAppSelector = useSelector;
