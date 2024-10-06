import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  isApodActive: true,
  apodPhotos: [],
  marsRoverPhotos: [],
};

// Create the NASA slice
export const nasa = createSlice({
  name: "nasa",
  initialState,
  reducers: {
    handleTabs: (state, action) => {
      state.isApodActive = action.payload;
    },
    // Reducer to store Mars rover photos
    storeApodPhotos: (state, action) => {
      state.apodPhotos = action.payload;
      state.marsRoverPhotos = [];
    },
    // Reducer to store apod
    storeMarsRoverPhotos: (state, action) => {
      state.marsRoverPhotos = action.payload;
      state.apodPhotos = [];
    },
  },
});

// Export the action for use in components
export const { handleTabs, storeApodPhotos, storeMarsRoverPhotos } =
  nasa.actions;

// Export the reducer to be used in the store
export default nasa.reducer;
