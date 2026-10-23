import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "Harshal",
  },
  reducers: {
    changeUsername: (state) => {
      state.username = "Rahul";
    },
  },
});

export const { changeUsername } = userSlice.actions;

export default userSlice.reducer;