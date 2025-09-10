import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoginUser {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    img: string;
  } | null;
  token: string | null;
}

const initialState: LoginUser = {
  data: null,
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);

      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<LoginUser["data"]>) => {
      if (!action.payload) return;

      action.payload.img =
        action.payload.img ||
        `https://placehold.co/300x300?text=${action.payload.firstName.at(0)}${action.payload.lastName.at(0)}`;

      state.data = action.payload as LoginUser["data"];
    },
    removeUserAndToken: (state) => {
      localStorage.removeItem("token");

      state.token = null;
      state.data = null;
    },
  },
});

export const { setToken, setUser, removeUserAndToken } = userSlice.actions;
export default userSlice.reducer;
