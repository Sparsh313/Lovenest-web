import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => action.payload,
    removeFeed: () => null,

    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addfeed, removeFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
