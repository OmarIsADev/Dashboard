import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoginUser {
  email: string;
  firstName: string;
  lastName: string;
  img: string;
}

const initialState: LoginUser = {
  email: "",
  firstName: "",
  lastName: "",
  img: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginUser>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.img =
        action.payload.img ||
        `https://placehold.co/300x300?text=${action.payload.firstName.at(0)}${action.payload.lastName.at(0)}`;
    },
    removeUser: (state) => {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.img = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
