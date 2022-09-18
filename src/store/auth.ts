import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") as any) || null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction<any>) => {
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, removeUser, updateUser } = auth.actions;
export default auth.reducer;
