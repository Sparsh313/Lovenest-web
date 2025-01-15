import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => action.payload,
    removeFeed: () => null,
  },
});

export const { addfeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
