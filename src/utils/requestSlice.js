import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeAllRequest: () => null,
    removeRequest: (state, action) => {
      return state.filter(
        (request) => request.fromUserId._id !== action.payload
      );
    },
  },
});

export const { addRequest, removeRequest, removeAllRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
