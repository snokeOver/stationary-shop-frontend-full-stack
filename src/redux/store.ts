import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";
import { baseAPI } from "./api/baseAPI";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    counter: counterReducer,
    todo: taskReducer,
    user: userReducer,
  },

  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
