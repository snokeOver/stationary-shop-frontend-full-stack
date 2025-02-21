import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

export interface IUser {
  name: "Snoke" | "Laluji" | "Khuro";
}

interface IInitialState {
  users: IUser[];
}

const initialState: IInitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      // console.log("User:", action.payload);
      state.users.push(action.payload);
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.name !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
