import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    // removeConnection: () => null,
    removeAllConnnection: () => null,
  },
});

export const { addConnection, removeConnection, removeAllConnnection } =
  connectionSlice.actions;

export default connectionSlice.reducer;
