import { IUser } from '../../models/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserById } from './ActionCreators';

interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: {id: 0, name: '', email: ''},
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  //redux toolkit reducer
  extraReducers: {
    [fetchUserById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    [fetchUserById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

export default userSlice.reducer;