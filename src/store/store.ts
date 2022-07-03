import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { postAPI } from "../services/PostService";
import usersReducer from './reducers/UsersSlice'
import userReducer from './reducers/OneUserSlice'

const rootReducer = combineReducers({
  usersReducer,
  userReducer,
  [postAPI.reducerPath]: postAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postAPI.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']